
from datetime import datetime, timedelta
from flask import request
from flask_api import status
from secrets import token_urlsafe


from pkg.webapi import create_response, ServiceMessages, parse_json_from_request

from .get import get_user_from_tokens_db

from db import Tokens


TOKEN_UPDATE_TIME, IS_PROD = 1233, False


def user_access(account_types: list[str]):
    """
    Декоратор для разграничения доступа, с параметром тип аккаунта

    :param: account_types - список аккаиунтов
    :type: list[str]

    :return: функция
    :rtype: Callable
    """

    def only_authenticated(handler):
        if not IS_PROD:
            return handler

        def inner(*args, **kwargs):
            # получаем данные из куки
            user_tokens = {
                "token": request.cookies.get("token"),
                "refresh_token": request.cookies.get("refresh_token", ""),
            }
            if not user_tokens.get("token"):
                (user_tokens, err) = parse_json_from_request(request)
                if err:
                    response = create_response(
                        status=status.HTTP_401_UNAUTHORIZED,
                        message=getattr(ServiceMessages.language("en"), err, "error"),
                    )
                    return response

                if not user_tokens.get("token"):
                    response = create_response(status=status.HTTP_401_UNAUTHORIZED, message="Failed to get token")
                    return response


            (db_user_tokens, err) = get_user_from_tokens_db({"token": user_tokens["token"]})
            if err:
                response = create_response(
                    status=status.HTTP_401_UNAUTHORIZED, message=ServiceMessages.language("en").user_unauthorized
                )
                return response

            if db_user_tokens.account_type not in account_types:
                response = create_response(
                    status=status.HTTP_406_NOT_ACCEPTABLE, message="You do not have the rights to use this request"
                )
                return response

            logger.info(db_user_tokens.to_dict())

            diff: timedelta = datetime.now() - db_user_tokens.data_time  # type: ignore
            diff_seconds = int(diff.total_seconds())


            if diff_seconds <= TOKEN_UPDATE_TIME or db_user_tokens.is_permanent:

                # * HANDLER CALL
                response = handler(
                    *args,
                    **kwargs,
                    session={
                        "token": db_user_tokens.token,
                        "users": db_user_tokens.to_dict(),
                        "refresh_token": db_user_tokens.refresh_token,
                    },
                )
            else:
                if user_tokens["refresh_token"] == db_user_tokens.refresh_token:
                    datetime_now = datetime.now()
                    new_token_data = {
                        "token": token_urlsafe(64),
                        "refresh_token": token_urlsafe(64),
                        "data_time": datetime_now,
                    }
                    Tokens.UPDATE(new_values=new_token_data, hash_map={"Id": db_user_tokens.Id})
                    logger.info("↺↺↺ update token ↺↺↺")

                    # * HANDLER CALL
                    response = handler(
                        *args,
                        **kwargs,
                        session={
                            "token": new_token_data["token"],
                            "users": {**db_user_tokens.to_dict(), **new_token_data},
                            "refresh_token": new_token_data["refresh_token"],
                        },
                    )

                    response.set_cookie("token", new_token_data["token"])
                    response.set_cookie("refresh_token", new_token_data["refresh_token"])

                else:
                    response = create_response(
                        status=status.HTTP_403_FORBIDDEN, message="Error 403 refresh tokens is incorrect"
                    )

            return response

        inner.__name__ = handler.__name__
        return inner

    return only_authenticated

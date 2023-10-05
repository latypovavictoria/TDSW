from app import app

from flask import request
from flask_api import status

from db import create_session
from ui import get_role, create_new_user, get_user, with_db_session


from pkg.webapi import parse_json_from_request, create_response, ServiceMessages


@app.route("/v2/auth/registration/<account_type>", methods=["POST"])
@with_db_session
def registration(account_type: str, db_session=create_session()):
    """
    Регистрация нового пользователя

    :param: account_type - type of account
    :type: str
    :param: db_session database session
    :type: Session

    :return: Response to front (status, message, data)
    :rtype: dict
    """
    (request_data, err) = parse_json_from_request(request)
    if err:
        response = create_response(
            status=status.HTTP_400_BAD_REQUEST, message=getattr(ServiceMessages.language("en"), err, "error")
        )
        return response

    request_data["account_type"] = account_type

    if "login" in request_data:
        _, is_user = get_user(hash_map={"login": request_data["login"]})
        if not is_user:
            response = create_response(
                status=status.HTTP_409_CONFLICT,
                message=ServiceMessages.language("en").login_already_exists(request_data["login"]),
            )
            return response

    (person, err) = create_new_user(hash_map=request_data, session=db_session)
    if err:
        response = create_response(status=status.HTTP_409_CONFLICT, message=err)
        return response
    message = "✅Successfully\n"

    response = create_response(
        status=status.HTTP_201_CREATED, message=message, data={"hash_link": person.user.hash_link}
    )

    return response


from pkg.webapi import create_response, ServiceMessages, parse_json_from_request


from flask import request
from flask_api import status

from werkzeug.security import check_password_hash

from ui import get_role, get_user_from_tokens_db, get_user, create_token
from flask import Flask

app = Flask(__name__)


@app.route("/v2/auth/login", methods=["POST"])
def page_login():
    """
    Авторизация

    :return: Reponse
    :rtype: dict
    """

    (request_data, err) = parse_json_from_request(request)
    if err:
        response = create_response(
            status=status.HTTP_400_BAD_REQUEST, message=getattr(ServiceMessages.language("en"), err, "error")
        )
        return response

    (user, err) = get_user({"login": request_data["login"]})
    if err:
        response = create_response(
            status=status.HTTP_404_NOT_FOUND,
            message=ServiceMessages.language(request_data["language"]).user_not_found,
        )
        return response

    if not check_password_hash(str(user.password), request_data["password"]):
        response = create_response(
            status=status.HTTP_403_FORBIDDEN,
            message=ServiceMessages.language(request_data["language"]).incorrect_pass,
        )
        return response

    (role, err) = get_role(hash_map={"user_id": user.Id})
    if err:
        response = create_response(status=status.HTTP_404_NOT_FOUND, message=err)
        return response

    token, err = get_user_from_tokens_db(hash_map={"user_id": user.Id})
    if err:
        token_data = create_token(
            account_type=str(role.account_type), user_id=int(str(role.user_id)), language="ru"
        )
    else:
        token_data = token.to_dict()
        del token_data["id"]

    patronymic = role.json_data.get("patronymic")
    firstname = role.json_data.get("firstName")
    if patronymic:
        token_data["name"] = (
                role.json_data.get("lastName") + " " + firstname[0].upper() + "." + patronymic[0].upper() + "."
        )
    else:
        token_data["name"] = firstname

    response = create_response(status=status.HTTP_200_OK, message="ok", data=token_data)

    response.set_cookie("token", token_data["token"])
    response.set_cookie("refresh_token", token_data["refresh_token"])
    return response

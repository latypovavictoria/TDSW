from app import app

from flask import request
from flask_api import status

from ui import get_user_scheme_obj
from pkg.webapi import parse_json_from_request, ServiceMessages, create_response


@app.route('/v2/auth/forms', methods=['POST'])
def sending_types_for_each_user_type():
    """
    Функция для отправки типов данных по каждому типу пользователя


    :return: Схему конкретной роли
    :rtype: dict
    """
    (data, err) = parse_json_from_request(request)
    if err:
        response = create_response(
            status=status.HTTP_400_BAD_REQUEST,
            message=getattr(ServiceMessages.language("en"), err, "error")
        )
        return response

    account_type = data['account_type']
    user_scheme_obj = get_user_scheme_obj(account_type)
    response = create_response(
        status=status.HTTP_201_CREATED,
        message='ok',
        data=user_scheme_obj[0].to_dict()
    )

    return response

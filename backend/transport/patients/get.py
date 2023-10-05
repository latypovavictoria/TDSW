from app import app
from flask_api import status


from ui import get_role, user_access

from pkg.webapi import create_response, ServiceMessages


@app.route("/v2/patients/get/<user_id>", methods=["GET"])
@user_access(["supervisor", "administrator", "doctor", "patient"])
def server_path_get_patients(user_id: int, **kwargs):
    """
    Функция для получения пациентов

    :param: user_id: id пользователя
    :type: int
    :param: kwargs - параметры сессии
    :type: dict

    :return: Response
    :rtype: dict
    """
    (role, err) = get_role(hash_map={"user_id": int(user_id), "account_type": "patient"})
    if err:
        response = create_response(status=status.HTTP_404_NOT_FOUND, message=err)
        return response

    if kwargs.get("session", {}).get("users", {}).get("account_type") == "patient":
        if not str(kwargs["session"]["users"]["user_id"]) == str(role.user_id):
            response = create_response(
                status=status.HTTP_403_FORBIDDEN, message=ServiceMessages.language("en").not_access
            )
            return response
    (inspections_results_count, last_access_status, err) = get_inspections_results_count(
        patient_id=int(str(role.user_id))
    )
    if err:
        response = create_response(
            status=status.HTTP_400_BAD_REQUEST, message=getattr(ServiceMessages.language("en"), err, "error")
        )
        return response

    (person, err) = get_user(hash_map={"user_id": int(user_id), "account_type": "patient"})
    if err:
        response = create_response(status=status.HTTP_404_NOT_FOUND,
                                   message=getattr(ServiceMessages.language("en"), err, "error"))
        return response

    user_data = preparing_user_data_for_response(person)
    response = create_response(
        status=status.HTTP_200_OK, data={"user": user_data}
    )
    return response

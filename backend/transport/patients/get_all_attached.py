from app import app
from flask_api import status

from ui import user_access, get_user, get_role, get_child_roles

from pkg.webapi import create_response, ServiceMessages


@app.route("/v2/patients/get/attached/<doctor_id>", methods=["GET"])
@user_access(["supervisor", "administrator", "doctor"])
def get_all_doctor_patients(doctor_id: int, **kwargs):
    """
    Получение всех пациентов, прикрепленных к врачу

    :param: doctor_id id of doctor
    :type: int
    :param: kwargs tokens
    :type: dict

    :return: Response to front (status, message, data)
    :rtype: dict
    """
    (doctor, err) = get_role(hash_map={"user_id": int(doctor_id), "account_type": "doctor"})
    if err:
        response = create_response(status=status.HTTP_404_NOT_FOUND, message=err)
        return response

    (roles, err) = get_child_roles(int(str(doctor.Id)))
    if err:
        response = create_response(status=status.HTTP_404_NOT_FOUND, message=err)
        return response

    patients = []

    for role in roles:

        if err:
            response = create_response(
                status=status.HTTP_400_BAD_REQUEST,
                message=getattr(ServiceMessages.language("en"), err, "error"),
            )
            return response

        (person, _) = get_user({"Id": role.user_id})

        patients.append(
            {"user": person}
        )

    result = sorted(
        patients,
        key=lambda x: x["inspections_short_info"]["danger_inspections_count"]
        + x["inspections_short_info"]["warn_inspections_count"],
        reverse=True,
    )

    response = create_response(status=status.HTTP_200_OK, data={"result": result})
    return response

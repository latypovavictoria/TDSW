from cfg import JsonSchemes
from db import InspectionSchemes, RolesSchemes

from typing import Dict

scheme = JsonSchemes()

doctor_scheme = {
    "type": "object",
    "properties": {
        "firstName": {"type": "string"},
        "lastName": {"type": "string"},
        "patronymic": {"type": "string"}
    },
    "required": ["firstName", "lastName"]
}

patient_scheme = {
    "type": "object",
    "properties": {
        "firstName": {"type": "string"},
        "lastName": {"type": "string"},
        "patronymic": {"type": "string"},
        "weight": {"type": "number"},
        "height": {"type": "number"},
        "insure_number": {"type": "string"}
    },
    "required": ["firstName", "lastName", "weight", "height"]
}

staff_scheme = {
    "type": "object",
    "properties": {
        "firstName": {"type": "string"},
        "lastName": {"type": "string"},
        "patronymic": {"type": "string"}
    },
    "required": ["firstName", "lastName"]
}


def add_inspections_schemes() -> None:
    """
    Добавление схемы осмотров в БД


    :return: None
    :rtype: None
    """
    data = InspectionSchemes.GET(hash_map=None)
    if not data:
        load_inspections_schemes(
            'pre-shift',
            language='ru',
            visualisation_type="table")
        load_inspections_schemes(
            'pre-shift',
            language='en',
            visualisation_type="table")
        load_inspections_schemes(
            'post-shift',
            language='ru',
            visualisation_type="table")
        load_inspections_schemes(
            'post-shift',
            language='en',
            visualisation_type="table")
        # # загрузим схемы по экг
        load_inspections_schemes('ecg', language='ru', visualisation_type="table")
        load_inspections_schemes('ecg', language='en', visualisation_type="table")

        load_inspections_schemes('veins', language='ru', visualisation_type="table")


def add_users_schemes() -> None:
    """
    Добавление схем пользователей для регистрации


    :return: None
    :rtype: None
    """
    data = RolesSchemes.GET(hash_map=None)
    if not data:
        load_users_schemes(
            user_scheme=doctor_scheme,
            account_type='doctor')
        load_users_schemes(
            user_scheme=patient_scheme,
            account_type='patient')
        load_users_schemes(
            user_scheme=staff_scheme,
            account_type='supervisor')
        load_users_schemes(
            user_scheme=staff_scheme,
            account_type='administrator')


def load_inspections_schemes(
        inspection_type: str,
        language: str,
        visualisation_type: str,
        sch: JsonSchemes = scheme
) -> None:
    """
    Функция для загрузки схем осмотров в таблицы перед первым запросом

    :param: inspection_type
    :type: str
    :param: language
    :type: str
    :param: visualisation_type
    :type: str
    :param: sch
    :type: JsonSchemes

    :return: None
    :rtype: None
    """

    hash_map = {
        'inspection_type': inspection_type,
        'json_data_format': sch.set_params(inspection_type, language=language),
        'language': language,
        'visualisation_type': visualisation_type
    }

    obj = InspectionSchemes(**hash_map)
    InspectionSchemes.INSERT(obj)


def load_users_schemes(
        user_scheme: Dict[str, str],
        account_type: str
) -> None:
    """
    Фукнция для загрузки схем пациентов перед первым запросом

    :param: user_scheme
    :type: Dict[str, str]
    :param: account_type
    :type: str

    :return: None
    :rtype: None
    """

    hash_map = {'json_data_scheme': user_scheme,
                'role': account_type}
    obj = RolesSchemes(**hash_map)
    RolesSchemes.INSERT(obj)

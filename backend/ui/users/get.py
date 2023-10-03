from db import RolesSchemes


def get_user_scheme_obj(account_type: str) -> list[RolesSchemes]:
    """
    Получение схемы типов данных в зависимости от типа аккаунта

    :param: account_type
    :type: str

    :return: Схема аккаунта
    :rtype: list[RolesSchemes]
    """
    user_scheme_obj = RolesSchemes.GET(hash_map={"role": account_type})
    return user_scheme_obj

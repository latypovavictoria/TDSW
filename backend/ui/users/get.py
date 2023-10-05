from db import RolesSchemes, Users, Tokens

from typing import Any


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


def get_user(hash_map: dict[str, Any]) -> tuple[Users,  None]:
    """
    Получение юзера из БД

    :param: hash_map фильтр
    :type: dict[str, Any]

    :return: объект из бд с ошибкой
    :rtype: tuple[Users,  None]
    """
    users = Users.GET(hash_map=hash_map)
    if len(users) == 0:
        return Users(), "Can not find User"
    return users[0], None


def get_user_from_tokens_db(hash_map: dict[str, Any]) -> tuple[Tokens, bool]:
    """
    Получение токена юзера из БД

    :param: hash_map фильтр
    :type: dict[str, Any]

    :return: объект из бд с ошибкой
    :rtype: tuple[Tokens, bool]
    """
    user_token = Tokens.GET(hash_map=hash_map)
    if not user_token:
        return (Tokens(), True)
    return (user_token[0], False)
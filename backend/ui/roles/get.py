from typing import Any
from db import Roles, ParentsChildren


scheme = {
    "Id": int,
    "account_type": str,
    "user_id": int,
}


def get_role(hash_map: dict[str, Any]) -> tuple[Roles,  None]:
    """
    Получение роли из бд

    :param: hash_map фильтр
    :type: dict[str, Any]

    :return: объект из бд с ошибкой
    :rtype: tuple[Roles,  None]
    """
    err = validate_dict(hash_map, scheme)
    if err:
        return Roles(), err
    roles = Roles.GET(hash_map=hash_map)
    if len(roles) == 0:
        return Roles(), f"Can not find Role: -> {hash_map}"
    return roles[0], None


def get_child_roles(parent_id: int) -> tuple[list[Roles],  None]:
    roles = ParentsChildren.get_child_roles(parent_id)
    if len(roles) == 0:
        return ([], "could not find child users")
    return (roles, None)

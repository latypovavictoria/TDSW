from db import Files

from typing import Any


def get_file(hash_map: dict[str, Any]) -> tuple[Files, None]:
    """
    Функция полечения файла из бд

    :param: hash_map: фильтр
    :type: dict[str, Any]

    :return: file with error
    :rtype: tuple[Files, None]
    """
    file = Files.GET(hash_map=hash_map)
    if len(file) == 0:
        return (Files(), "file_not_found")
    return (file[0], None)

def get_files(hash_map: dict[str, Any]) -> tuple[list[Files], bool]:
    file = Files.GET(hash_map=hash_map)
    if len(file) == 0:
        return ([Files()], True)
    return (file, False)

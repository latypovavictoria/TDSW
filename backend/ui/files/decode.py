import base64


def decode_file(inspection_type: str, file: bytes) -> bytes:
    """
    Функция для декодирования файла экг

    :param: inspection_type: type of each inspection
    :type: str
    :param file: file
    :type: bytes
    :return: new bytes row
    :rtype: bytes
    """
    return base64.b64decode(file) if 'ecg' in inspection_type else file

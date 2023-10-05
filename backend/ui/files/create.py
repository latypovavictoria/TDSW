from datetime import datetime
from hashlib import sha256
from pkg import os_create_file
from db import Files

from sqlalchemy.orm import scoped_session


def create_file(file_data: bytes, file_type: str, inspection_id: int, session: scoped_session) -> Files:
    """
    Создание файла

    :param: file_data: file
    :type: bytes
    :param: inspection_id: id of inspection
    :type: int
    :param: session: db ses
    :type: Session

    :return: File object in db
    :rtype: Files
    """

    file_hash = sha256(file_data).hexdigest() if file_data != '' else None

    prefix = f"{inspection_id}-{file_type}-{datetime.now().strftime('%Y_%m_%d_%H_%M_%S')}"

    (full_path, err) = os_create_file(file_data, file_type, prefix)
    file_data_hash = {
        "file": full_path,
        "file_hash": file_hash,
        "file_type": file_type,
        "inspection_id": inspection_id
    }
    return Files.INSERT(Files(**file_data_hash), session)

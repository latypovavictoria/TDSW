from db import create_session
from typing import Callable


def with_db_session(handler: Callable) -> Callable:
    """
    Декоратор для обработчиков, создающий им отдельную сессию

    :param: handler - функция
    :type: Callable

    :return: функция
    :rtype: Callable
    """

    def inner_with_session(*args, **kwargs):
        db_session = create_session()
        response = handler(*args, **kwargs, db_session=db_session)
        db_session.close()
        return response

    inner_with_session.__name__ = handler.__name__
    return inner_with_session

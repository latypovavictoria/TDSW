from app import app

from ui import add_users_schemes, add_inspections_schemes
from flask import jsonify


@app.before_first_request
def before_first_request():
    """
    Подключение перед первым запросом для создания схема в бд


    :return: Статус запроса
    :rtype: dict
    """
    add_inspections_schemes()
    add_users_schemes()
    return jsonify({"status": "ok"})

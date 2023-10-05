import secrets
import logging
import os

IS_PROD = False
DATABASE_PATH = 'sqlite:///../backend/Test.db'


# общие настройки
class Configuration(object):
    SECRET_KEY = secrets.token_urlsafe(100)
    DEVELOPMENT = True
    DB = os.getenv("DB")


# настройки режима разработки
class DevConfig(Configuration):
    ENV = os.getenv("FLASK_ENV_DEV")
    DEVELOPMENT = True
    SERVER_HOST = os.getenv("SERVER_HOST_DEV")
    SERVER_PORT = os.getenv("SERVER_PORT_DEV")


# найстройки режима деплоя
class ProdConfig(Configuration):
    ENV = os.getenv("FLASK_ENV_PROD")
    DEVELOPMENT = False
    SERVER_HOST = os.getenv("SERVER_HOST_PROD")
    SERVER_PORT = os.getenv("SERVER_PORT_PROD")


# установим настройки режимов работы
if IS_PROD:
    SERVER_HOST = ProdConfig().SERVER_HOST
    SERVER_PORT = ProdConfig().SERVER_PORT
    DEBUG = ProdConfig().DEVELOPMENT

else:
    SERVER_HOST = DevConfig().SERVER_HOST
    SERVER_PORT = DevConfig().SERVER_PORT
    DEBUG = DevConfig().DEVELOPMENT

DB = Configuration().DB


class JsonSchemes:
    """
    Класс для определения параметров схемы у рейсовых и осмотров по экг
    """

    names = {
        "ru": {
            "arterial": "Артериальное",
            "sis": "Систолическое",
            "pressure": "Давление",
            "temperature": "Температура",
            "pulse": "Пульс",
            "alcohol": "Алкоголь",
        },
        "en": {
            "arterial": "Arterial",
            "sis": "Systolic",
            "pressure": "Pressure",
            "temperature": "Temperature",
            "pulse": "Pulse",
            "alcohol": "Alcohol",
        },
    }
    names_ecg = {
        "ru": {
            "frequency": "Частота Дискретизации",
            "duration": "Длительность съема",
            "events": "События",
            "risks": "Риски",
            "data_points": "Данные съема",
        },
        "en": {
            "frequency": "Frequency",
            "duration": "Duration",
            "events": "Events",
            "risks": "Risks",
            "data_points": "Data_points",
        },
    }

    def set_params(self, inspection_type: str, language: str) -> dict:
        """
        Метод для установки параметров в схему

        Параметры
        ----------
        language: str
            язык
        inspection_type: str
            тип осмотра

        Возвращает
        ----------
        data: str
            схема типа данных по конкретному осмотру
        """
        if inspection_type in ("pre-shift", "post-shift"):
            return {
                "inspection_type": inspection_type,
                "data": {
                    "type": "object",
                    "properties": {
                        "temperature": {"type": "number", "name": self.names[language]["temperature"]},
                        "pulse": {"type": "number", "name": self.names[language]["pulse"]},
                        "alcohol": {"type": "boolean", "name": self.names[language]["alcohol"]},
                        "pressure": {
                            "type": "object",
                            "name": self.names[language]["pressure"],
                            "properties": {
                                "first": {"type": "number", "name": self.names[language]["arterial"]},
                                "second": {"type": "number", "name": self.names[language]["sis"]},
                            },
                        },
                    },
                    "required": ["temperature", "pulse", "alcohol", "pressure"],
                },
                "language": language,
            }
        if inspection_type == "ecg":
            return {
                "inspection_type": inspection_type,
                "data": {
                    "type": "object",
                    "properties": {
                        "data_points": {"type": "number", "name": self.names_ecg[language]["frequency"]},
                    },
                },
                "language": language,
            }
        if inspection_type == "ecg_TMT_bracelet":
            return {
                "inspection_type": inspection_type,
                "data": {
                    "type": "object",
                    "properties": {"data_points": {"type": "array", "name": self.names_ecg[language]["data_points"]}},
                },
                "language": language,
            }
        if inspection_type == "veins":
            return {
                "inspection_type": inspection_type,
                "data": {"type": "object", "properties": {}, "file": {"file_type": "jpg", "file": "bytes"}},
            }
        return {}

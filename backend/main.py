"""
Исполняемый файл, точка входа
"""


from transport import app
from cfg import SERVER_PORT, SERVER_HOST, DEBUG


# производим запуск приложения в зависимоти от режима работы

# Не помню, кто написал этот мультФрединг, но нам это не нужно
if __name__ == "__main__":
    app.run(host=SERVER_HOST, port=SERVER_PORT, debug=DEBUG)

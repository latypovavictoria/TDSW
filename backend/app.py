"""
Initializing the application ✅
"""
from flask import Flask
from flask_cors import CORS
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base

from cfg import DATABASE_PATH, IS_PROD, ProdConfig, DevConfig

# Base = declarative_base()
# engine = create_engine(DATABASE_PATH)
#
# Base.metadata.create_all(engine)
# Base.metadata.bind = engine
#
# SESSION = None

# Создание приложения
app = Flask(__name__)

# установим настройки режимов работы
if IS_PROD:
    app.config.from_object(ProdConfig)
else:
    app.config.from_object(DevConfig)

CORS(app, supports_credentials=True)

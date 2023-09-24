"""
Файл для работы с таблицами бд к моделям и запросами к ним
"""
from typing import Union, List

from digital_reanimation.schemes.scheme import DigitalReanimation
from server_config import MODEL_DATABASE_PATH, MODELS_PATHS

from sqlalchemy import Column, Integer, String, JSON, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine

from logger import logger

logger = logger('DB')

Base = declarative_base()
engine = create_engine(MODEL_DATABASE_PATH, connect_args={'check_same_thread': False})

model_id = 1


class Models(Base):
    """
    Таблица для хранения данных о модели
    """
    __tablename__ = 'models'
    Id = Column(Integer, primary_key=True)
    path = Column(String(50), nullable=False)

    def get_info(self):
        return ({
            'id': self.Id,
            'path': self.path
        })


class ModelsSchemes(Base):
    """
    Таблица для хранения схем фичей моделей
    """
    __tablename__ = "models_schemes"
    Id = Column(Integer, primary_key=True)
    features_scheme = Column(JSON, default={})
    target_scheme = Column(JSON, default={})
    model_id = Column(Integer(), ForeignKey('models.Id'))
    lang = Column(String(10))
    inspection_type = Column(String(10))
    visual_type_features = Column(String(10))
    visual_type_target = Column(String(10))

    def get_info(self):
        return ({
            'id': self.Id,
            'features_scheme': self.features_scheme,
            'target_scheme': self.target_scheme,
            'model_id': self.model_id,
            'lang': self.lang,
            'visual_type_features': self.visual_type_features,
            'visual_type_target': self.visual_type_target
        })


def create_obj(hash_map: dict, objtype: str) -> Base:
    """
    Функция для создания объекта в бд моделей

    Параметры
    ----------
    hash_map: dict
        данные для записи в бд
    objtype: str
        параметр для выбора таблицы

    Возвращает
    ----------
    new_obj: Base
        Объек класса Base - основново класса таблиц бд
    """
    if objtype == 'model':
        new_obj = Models(
            path=hash_map.get('path')
        )

    elif objtype == 'scheme':
        new_obj = ModelsSchemes(
            features_scheme=hash_map.get('features_scheme'),
            target_scheme=hash_map.get('target_scheme'),
            model_id=hash_map.get('model_id'),
            lang=hash_map.get('lang'),
            inspection_type=hash_map.get('inspection_type'),
            visual_type_target=hash_map.get('visual_type_target'),
            visual_type_features=hash_map.get('visual_type_features')
        )

    else:
        raise Exception('Not valid type')

    try:
        session.add(new_obj)
        session.commit()
        return new_obj
    except Exception as e:
        session.rollback()
        logger.error(f'Exception on creating object: {e}')
        raise


def get_model_by_id(n: int, get_row_obj: bool = False) -> Union[Models, dict]:
    """
    Функция для получения модели по id

    Параметры
    ----------
    n: int
        id записи в таблице
    get_row_obj: bool
        флаг для выбора типа возвращаемых данных

    Возвращает
    ----------
    obj: Models or dict
        Объек класса Models или dict с данными из таблицы Models
    """
    obj = session.query(Models).filter_by(Id=n).one()
    if get_row_obj:
        return obj
    return obj.get_info()


def get_model_scheme(lang: str, inspection_type: str) -> ModelsSchemes:
    """
    Функция для получения схемы модели

    Параметры
    ----------
    lang: str
        язык
    inspection_type: str
        тип осмотра

    Возвращает
    ----------
    obj: ModelsSchemes
        Объек класса ModelsSchemes
    """
    try:
        obj = session.query(ModelsSchemes).filter_by(lang=lang).filter_by(inspection_type=inspection_type).one()
        return obj
    except Exception as e:
        logger.debug(f'[ERROR]: {e}')
        return str(e)


Base.metadata.create_all(engine)
Base.metadata.bind = engine
DBSession = sessionmaker(bind=engine)
session = DBSession()


def load_model_paths(paths: List[str] = MODELS_PATHS) -> None:
    """
    Функция для загрузки путей к моделям (если заданы)

    Параметры
    ----------
    paths: list[str]
        список путей к моделям

    Возвращает
    ----------
    None
    """
    for model_path in paths:
        hash_map = {'path': model_path}
        create_obj(hash_map, 'model')


def add_model(model_path: str) -> None:
    """
    Функция для добавления новой модели при необходимости

    Параметры
    ----------
    model_path: str
        путь к моделе

    Возвращает
    ----------
    None
    """
    hash_map = {'path': model_path}
    create_obj(hash_map, 'model')


scheme = DigitalReanimation()


def load_schemes(lang: str, inspection_type: str,
                 visual_type_target: str = None, visual_type_features: str = None, Id: int = model_id) -> None:
    """
    Функция для загрузки схем типов данных фичей

    Параметры
    ----------
    lang: str
        язык
    inspection_type: str
        тип осмотра
    visual_type_target: str
         тип визуализации таргетов
    visual_type_features: str
        тип визуализации признаков
    Id: int
        id модели

    Возвращает
    ----------
    None
    """
    has_map = {
        'features_scheme': scheme.set_params(inspection_type, lang)[0],
        'target_scheme': scheme.set_params(inspection_type, lang)[1],
        'model_id': Id,
        'lang': lang,
        'inspection_type': inspection_type,
        'visual_type_target': visual_type_target,
        'visual_type_features': visual_type_features
    }

    create_obj(has_map, 'scheme')

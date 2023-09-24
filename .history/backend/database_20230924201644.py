"""
Файл для работы с таблицами бд к моделям и запросами к ним
"""


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



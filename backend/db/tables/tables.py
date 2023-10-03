from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime,
    ForeignKey,
    Boolean,
    LargeBinary,
    JSON,
    Float,
)
from sqlalchemy.ext.hybrid import hybrid_property

from werkzeug.security import check_password_hash
from inspect import getmembers

from .db import Base, create_session
from .parent import Table

capacity = 500


class RolesSchemes(Base, Table):
    """
    Таблица описания каждой роли
    """

    __tablename__ = "roles_schemes"
    role = Column(String(capacity), primary_key=True, nullable=False)
    json_data_scheme = Column(JSON(none_as_null=True), nullable=False)


class InspectionSchemes(Base, Table):
    """
    Таблица описания каждого осмотра
    """

    __tablename__ = "inspection_schemes"
    Id = Column(Integer, primary_key=True, autoincrement=True)
    inspection_type = Column(String(capacity), nullable=False)
    json_data_format = Column(JSON(none_as_null=True), nullable=False)
    language = Column(String(capacity), nullable=False)
    visualisation_type = Column(String(capacity), default=None)

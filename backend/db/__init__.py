from db.tables.db import engine, create_session
from .tables.tables import Base

from sqlalchemy import inspect

from cfg import IS_PROD

# Base.metadata.create_all(engine)
# Base.metadata.bind = engine
# session = create_session()
# Base.query = session.query_property()

from .tables.tables import (

    RolesSchemes,
    InspectionSchemes,

)

__all__ = [

    "create_session",
    "RolesSchemes",

    "InspectionSchemes",

]

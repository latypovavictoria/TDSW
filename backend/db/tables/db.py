from cfg import DATABASE_PATH

from sqlalchemy.ext.declarative import declarative_base

from sqlalchemy.orm import sessionmaker, scoped_session
from sqlalchemy import create_engine


engine = create_engine(DATABASE_PATH)
Session = sessionmaker(bind=engine)


def create_session():
    return scoped_session(Session)


Base = declarative_base()

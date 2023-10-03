import sys
from inspect import getmembers
from typing import Dict, Any, List

from sqlalchemy import and_, or_
from db import create_session
from sqlalchemy.orm import scoped_session, Session


class Table:

    def to_dict(self):
        result = {k: v for k, v in dict(getmembers(self)).items() if not (self._is_valid(k, v))}
        if "Id" in result.keys():
            id_ = result.pop('Id')
            result['id'] = id_
        return result

    def _is_valid(self, k, v):
        return k.startswith('_') or callable(v) or k in [
            'login', 'hash_link', 'password', 'query', 'registry', 'metadata', 'avatar'
        ]

    @classmethod
    def validate(cls, self) -> bool:
        if all(value == None for value in self.to_dict().values()):
            return False
        cls_schema = {k: v for k, v in dict(getmembers(cls)).items()}
        id_ = cls_schema.pop('Id')
        cls_schema['id'] = id_
        self_schema = self.to_dict()
        # FIXME: Нету проверки на то, если вдруг поле будет пропущено
        # FIXME: Нет валидации на тип данных
        return all(item in cls_schema for item in self_schema)

    @classmethod
    def GET(cls, hash_map: Dict[str, Any], session: scoped_session = None):
        table_name = cls.__name__
        table = getattr(sys.modules["db"], table_name)
        if not session:
            session = create_session()
            should_close_session = True
        else:
            should_close_session = False
        try:
            obj = session.query(table)

            if hasattr(table, "is_deleted"):
                obj = obj.filter_by(is_deleted=False)

            if hash_map is not None:
                obj = obj.filter_by(**hash_map)

            rows: List[Self] = obj.all()
        except:
            session.rollback()
            rows: List[Self] = []
        finally:
            if should_close_session:
                session.close()

        return rows

    @classmethod
    def INSERT(cls, new_obj, session: scoped_session = None):
        """
        Общий метод для сохранения объекта в бд
        """
        if not session:
            session = create_session()
            should_close_session = True
        else:
            should_close_session = False

        _session: Session = session()  # Create a Session object from the scoped_session

        try:
            # if not _session.transaction:
            #     with session.begin():
            #         session.add(new_obj)
            #         session.commit()
            # else:
            session.add(new_obj)
            session.commit()
        except:
            session.rollback()
            raise
        finally:
            if should_close_session:
                session.close()

        return new_obj

    @classmethod
    def UPDATE(cls, new_values: dict[str, Any], hash_map: dict[str, Any], session: scoped_session = None):
        """
        Общая функция для обновления полей таблиц
        """
        table_name = cls.__name__
        table = getattr(sys.modules["db"], table_name)
        if not session:
            session = create_session()
            should_close_session = True
        else:
            should_close_session = False
        try:
            with session.begin():
                objects = session.query(table).filter_by(**hash_map).all()
                for obj in objects:
                    for key, value in new_values.items():
                        if hasattr(obj, key):
                            setattr(obj, key, value)
                    session.commit()
        except:
            session.rollback()
            return True
        finally:
            if should_close_session:
                session.close()
            return False

    def delete_self(self):
        session = create_session()
        try:
            with session.begin():
                session.delete(self)
                session.commit()
        except:
            session.rollback()
        finally:
            session.close()
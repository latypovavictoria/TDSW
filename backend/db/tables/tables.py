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
    __table_args__ = {'extend_existing': True}
    role = Column(String(capacity), primary_key=True, nullable=False)
    json_data_scheme = Column(JSON(none_as_null=True), nullable=False)


class InspectionSchemes(Base, Table):
    """
    Таблица описания каждого осмотра
    """

    __tablename__ = "inspection_schemes"
    __table_args__ = {'extend_existing': True}
    Id = Column(Integer, primary_key=True, autoincrement=True)
    inspection_type = Column(String(capacity), nullable=False)
    json_data_format = Column(JSON(none_as_null=True), nullable=False)
    language = Column(String(capacity), nullable=False)
    visualisation_type = Column(String(capacity), default=None)


class ParentsChildren(Base, Table):

    __tablename__ = "parents_children"
    __table_args__ = {'extend_existing': True}
    parent_id = Column(Integer, ForeignKey("roles.Id"), primary_key=True)
    child_id = Column(Integer, ForeignKey("roles.Id"), primary_key=True)

    @classmethod
    def get_child_roles(cls, parent_role_id: int):
        session = create_session()
        query = (
            session.query(Roles)
                .join(ParentsChildren, ParentsChildren.child_id == Roles.Id)
                .filter_by(parent_id=parent_role_id)
        )
        row: list[Roles] = query.all()
        session.close()
        return row


class Roles(Base, Table):
    __tablename__ = "roles"
    __table_args__ = {'extend_existing': True}
    Id = Column(Integer, primary_key=True, autoincrement=True)
    json_data = Column(JSON(none_as_null=True), nullable=False, default={})

    user_id = Column(Integer(), ForeignKey("users.Id"))
    account_type = Column(String(capacity), ForeignKey("roles_schemes.role"))

    def attach_to_parents(self, parent_id: int):
        ParentsChildren.INSERT(ParentsChildren(parent_id=parent_id, child_id=self.Id))

    def dettach_from_parents(self, parent_id: int):
        PCs = ParentsChildren.GET({"parent_id": parent_id, "child_id": self.Id})
        if len(PCs) != 0:
            PCs[0].delete_self()

    @classmethod
    def get_all_roles_by_org_id(cls, organization_id: int, role: str) -> tuple[list,  None]:
        RSc = RolesSchemes.GET({"role": role})
        if len(RSc) == 0:
            return ([], f"{role} do not exist in system")

        session = create_session()
        query = (
            session.query(Roles)
                .join(OrganizationsUsers, Roles.user_id == OrganizationsUsers.user_id)
                .filter(
                Roles.account_type == role,
                OrganizationsUsers.organization_id == organization_id,
            )
        )
        row: list[Self] = query.all()
        session.close()
        return (row, None)

    @classmethod
    def get_child_roles_in_same_org_as_parent(cls, parent_user_id: int, parent: str = "doctor", child: str = "patient"):
        session = create_session()

        # Subquery to get organization IDs with doctor users
        subquery = (
            session.query(OrganizationsUsers.organization_id)
                .join(Roles, OrganizationsUsers.user_id == Roles.user_id)
                .filter(Roles.account_type == parent, Roles.user_id == parent_user_id)
        )

        # Main query to get patient users from the same organizations
        query = (
            session.query(Roles)
                .join(OrganizationsUsers, Roles.user_id == OrganizationsUsers.user_id)
                .filter(
                Roles.account_type == child,
                OrganizationsUsers.organization_id.in_(subquery),
            )
        )

        row: list[Self] = query.all()
        session.close()
        return row


class Users(Base, Table):
    """
    Общая таблица с данными о всех пользователях
    """

    __tablename__ = "users"
    __table_args__ = {'extend_existing': True}
    Id = Column(Integer, primary_key=True, autoincrement=True)

    login = Column(String(capacity), unique=True, default=None)
    hash_link = Column(String(capacity), nullable=True, default="")

    password = Column(String(capacity), nullable=False)

    birthday = Column(String, nullable=True, default="")
    sex = Column(Integer, default=None)

    email = Column(String(capacity), default="")
    phone = Column(String(capacity), nullable=True, default="")
    edsignature = Column(String, nullable=True, default=None)
    avatar = Column(LargeBinary)

    is_deleted = Column(Boolean, default=False)

    def check_password(self, password):
        user_hash = self.password
        return check_password_hash(str(user_hash), password)

    def attach_to_organization(self, organization_id: int):
        OrganizationsUsers.INSERT(OrganizationsUsers(user_id=self.Id, organization_id=organization_id))

    def dettach_from_organization(self, organization_id: int):
        session = create_session()
        organization = session.query(Organizations).filter(Organizations.Id == organization_id).first()
        if organization:
            user = (
                session.query(OrganizationsUsers)
                    .filter(
                    OrganizationsUsers.organization_id == organization.Id,
                    OrganizationsUsers.user_id == self.Id,
                )
                    .first()
            )
            if user:
                with session.begin():
                    session.delete(user)
                    session.commit()
        session.close()

    def delete_self(self):
        Users.UPDATE(new_values={"is_deleted": True}, hash_map={"Id": self.Id})



class Tokens(Base, Table):
    """
    Таблица токенов пациентов и врачей
    """

    __tablename__ = "tokens"
    __table_args__ = {'extend_existing': True}
    Id = Column(Integer, primary_key=True, autoincrement=True)
    token = Column(String(capacity), unique=True)
    refresh_token = Column(String(capacity), unique=True)
    data_time = Column(DateTime())
    account_type = Column(String(capacity), nullable=False)
    language = Column(String(capacity), nullable=False)
    user_id = Column(Integer(), ForeignKey("users.Id"), nullable=False)
    is_permanent = Column(Boolean, default=False)


class Files(Base, Table):
    __tablename__ = "files"
    __table_args__ = {'extend_existing': True}
    Id = Column(Integer, primary_key=True, autoincrement=True)

    file = Column(String(capacity), default=None)
    file_hash = Column(String(capacity), default=None)
    file_type = Column(String(capacity), default="")

    inspection_id = Column(Integer(), ForeignKey("inspections.Id"))


class Inspections(Base, Table):
    """
    Таблица осмотров
    """

    __tablename__ = "inspections"
    __table_args__ = {'extend_existing': True}
    Id = Column(Integer, primary_key=True, autoincrement=True)

    inspection_type = Column(String(capacity), nullable=False)
    json_data = Column(JSON(none_as_null=True), nullable=False, default={})
    result = Column(JSON(none_as_null=True), default={})
    ai_result = Column(String(capacity), default="")
    access = Column(Boolean, default=None)
    comments = Column(String(capacity), default=None)
    complaints = Column(String(capacity), default=None)
    datetime_created = Column(DateTime())
    access_features = Column(Boolean, default=None)
    access_output = Column(Boolean, default=None)

    dynamic_link = Column(String(capacity), default=None)

    patient_id = Column(Integer(), ForeignKey("roles.Id"))
    doctor_id = Column(Integer(), ForeignKey("roles.Id"))

    scheme_id = Column(Integer(), ForeignKey("inspection_schemes.Id"), default=None)
    organization_id = Column(Integer(), ForeignKey("organizations.Id"))

    @hybrid_property
    def datetime_created_formated(self):
        # @todo: add python parsing of date and time to produce the result
        value = self.datetime_created
        return value.strftime("%d/%m/%Y %H:%M:%S")

    def to_dict(self):
        result = {k: v for k, v in dict(getmembers(self)).items() if not (self._is_valid(k, v))}
        id_ = result.pop("Id")
        result["datetime_created_formated"] = self.datetime_created_formated
        if result["json_data"].get("temperature") is np.NaN:
            result["json_data"]["temperature"] = 0
        if result["json_data"].get("pulse") is np.NaN:
            result["json_data"]["pulse"] = 0
        result["id"] = id_
        return result

    def set_dynamic_link(self, dynamic_link: str):
        Inspections.UPDATE({"dynamic_link": dynamic_link}, {"Id": self.Id})

    def set_result(self, result):
        Inspections.UPDATE({"result": result}, {"Id": self.Id})

    def set_ai_result(self, ai_result):
        Inspections.UPDATE({"ai_result": ai_result}, {"Id": self.Id})

    def set_access(self, access):
        Inspections.UPDATE({"access": access}, {"Id": self.Id})

    def set_model_flags(self, data_type):
        for key in data_type:
            if key == "features":
                Inspections.UPDATE({"access_features": data_type[key]}, {"Id": self.Id})
            elif key == "target":
                Inspections.UPDATE({"access_output": data_type[key]}, {"Id": self.Id})

    def set_json_data(self, json_data):
        Inspections.UPDATE({"json_data": json_data}, {"Id": self.Id})

    # устанавливаем хэш
    def set_file_hash(self, hs):
        # FIXME:
        Inspections.UPDATE({"file_hash": hs}, {"Id": self.Id})

    def set_file_type(self, file_type):
        Inspections.UPDATE({"file_type": file_type}, {"Id": self.Id})

    def get_file(self) -> tuple[Files, bool]:
        files = Files.GET(hash_map={"inspection_id": self.Id})
        if len(files) == 0:
            return (Files(), True)
        else:
            return (files[0], False)

    def save_file(self, file):
        Files.INSERT(Files(**file))

    def reset_ai_result(self):
        Inspections.UPDATE(new_values={"result": {}, "ai_result": DEFAULT_MODULE_OUTPUT}, hash_map={"Id": self.Id})
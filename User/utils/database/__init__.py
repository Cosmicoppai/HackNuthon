from config import DBSettings
import logging
from datetime import datetime
from sqlalchemy.sql import func
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import String, Column, create_engine, Index, CHAR, BOOLEAN, ARRAY, Integer, DDL, event, ForeignKey, \
    CheckConstraint, DateTime, Float, Date
from sqlalchemy.orm import sessionmaker, DeclarativeBase
from typing import List, Optional
from copy import deepcopy

db = DBSettings()


class _Base(DeclarativeBase):

    def dict(self):
        return self.__dict__


class DBMeta(type):
    _instance = None

    def __call__(cls, *args, **kwargs):
        if not cls._instance:
            cls._instance = super().__call__(*args, **kwargs)
        return cls._instance


class DataBase(metaclass=DBMeta):
    db_name: str = db.db_name

    def __init__(self):
        self.engine = create_engine(
            f"postgresql://{db.db_username}:{db.db_password}@{db.db_host}/{db.db_name}",
            echo=False)
        event.listen(_Base.metadata, 'before_create', DDL(f"CREATE SCHEMA IF NOT EXISTS {db.db_name}"))

        _Base.metadata.create_all(bind=self.engine)
        self.session = sessionmaker(bind=self.engine)()
        logging.info("DB Instance created")


class UsersData(_Base):
    __tablename__ = "users_data"

    ayur_id = Column("ayur_id", String(12), primary_key=True)
    name = Column("name", String(50), nullable=False)
    photo = Column("photo", String(300), nullable=False)
    sex = Column("sex", CHAR, nullable=False)
    weight = Column("weight", Integer, nullable=False)
    height = Column("height", Integer, nullable=False)
    emergency_contact_number = Column("emergency_contact", ARRAY(String(20)), nullable=False)
    email_id = Column("email_id", String(100), nullable=False)
    allergies = Column("allergies", ARRAY(String(200)), nullable=True)
    major_problems = Column("major_problems", ARRAY(String(200)), nullable=True)
    dob = Column("dob", Date, nullable=False)
    birth_mark = Column("birth_mark", String(200), nullable=False)
    blood_group = Column("blood_group", String(10), nullable=False)
    phone_number = Column("phone_number", String(15), nullable=False)

    def __init__(self, ayur_id: str, name: str, photo: str, sex: str,
                 weight: str, height: str, emergency_contact: List[str], email_id: str, allergies: str,
                 major_problems: str, dob: datetime.date, birth_mark: str, blood_group: str, phone_number: str):
        self.ayur_id = ayur_id
        self.name = name
        self.photo = photo
        self.sex = sex
        self.weight = weight
        self.height = height
        self.emergency_contact_number = emergency_contact
        self.email_id = email_id
        self.allergies = allergies
        self.major_problems = major_problems
        self.dob = dob
        self.birth_mark = birth_mark
        self.blood_group = blood_group
        self.phone_number = phone_number

    def __repr__(self):
        return f"{self.ayur_id} - {self.name}"

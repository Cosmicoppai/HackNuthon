from config import DBSettings
import logging
from datetime import datetime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import String, Column, create_engine, Index, CHAR, BOOLEAN, ARRAY, Integer, DDL, event, ForeignKey, \
    CheckConstraint
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


class Hospitals(_Base):
    __tablename__ = "hospitals"

    hospital_id = Column("id", String(15), primary_key=True)
    name = Column("name", String(300), nullable=False)
    registration_no = Column("registration_no", String(300), nullable=False)
    location = Column(Integer, ForeignKey("address.id", ondelete='CASCADE'), nullable=False)  # location foreign key

    def __init__(self, hospital_id, name, registration_no, location):
        self.hospital_id = hospital_id
        self.name = name
        self.registration_no = registration_no
        self.location = location

    def __repr__(self):
        return f"{self._id} - {self.registration_no} - {self.name}"


class Address(_Base):
    __tablename__ = "address"
    aid = Column("id", Integer, primary_key=True)
    state = Column("state", String(50), nullable=False)
    district = Column("district", String(50), nullable=False)
    city = Column("city", String(50), nullable=False)
    landmark = Column("landmark", String(100), nullable=False)
    pin_code = Column("pin_code", Integer, nullable=False)

    def __init__(self, state, district, city, landmark, pin_code):
        self.state = state
        self.district = district
        self.city = city
        self.landmark = landmark
        self.pin_code = pin_code

    def __repr__(self):
        return f"{self._id} - {self.pincode}"

    # create check for pin code

    __table_args__ = (CheckConstraint('pin_code between 100000 and 999999'),)


class Doctors(_Base):
    __tablename__ = "doctors"
    doctor_id = Column("id", String(15), primary_key=True, nullable=False)
    hospital_id = Column("hospital_id", ForeignKey("hospitals.id", ondelete='CASCADE'), nullable=False)  # foreign key
    registration_no = Column("registration_no", String(30), nullable=False)
    name = Column("name", String(200), nullable=False)
    sex = Column("sex", CHAR, nullable=False)
    speciality = Column("speciality", ARRAY(String(100)), nullable=False)

    def __init__(self, doctor_id, hospital_id, registration_no, name, sex, speciality):
        self.doctor_id = doctor_id
        self.hospital_id = hospital_id
        self.registration_no = registration_no
        self.name = name
        self.sex = sex
        self.speciality = speciality

    def __repr__(self):
        return f"{self.registration_no} - {self.hospital_id} - {self.name}"

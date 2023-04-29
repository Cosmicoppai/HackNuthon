from config import DBSettings
import logging
from datetime import datetime
from sqlalchemy.sql import func
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import String, Column, create_engine, Index, CHAR, BOOLEAN, ARRAY, Integer, DDL, event, ForeignKey, \
    CheckConstraint, DateTime
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


class Reports(_Base):

    """
    This table will contain reports of a checkups
    """
    __tablename__ = "reports"

    report_id = Column("id", Integer, primary_key=True)
    checkup_id = Column("checkup_id", String(15), ForeignKey("checkups.id", ondelete="CASCADE"), index=True)  # mapping to checkups.id
    typ = Column("type", String(15), nullable=False)
    files = Column("files", ARRAY(String(500)), nullable=False)  # file_path, added via app_layer

    def __init__(self, report_id: str, checkup_id: str, typ: str, files: List[str]):

        self.report_id = report_id
        self.checkup_id = checkup_id
        self.typ = typ
        self.files = files

    def __repr__(self):
        return f"{self.report_id} - {self.checkup_id} - {self.file_name}"


class Checkups(_Base):
    __tablename__ = "checkups"

    checkup_id = Column("id", String(15), primary_key=True)  # created automatically
    doctor_id = Column("doctor_id", String(15), nullable=False, index=True)  # added via user
    ayur_id = Column("ayur_id", String(15), nullable=False, index=True)  # added via query params
    hospital_id = Column("hospital_id", String(15), nullable=False, index=True)  # added via token
    name = Column("name", String(30), nullable=False)  # via name else f"{checkup_id} - {date}"
    reason_to_visit = Column("reason_to_visit", String(5000), nullable=False)
    deduction = Column("deduction", String(5000), nullable=True)  # via user, can be omitted
    created_by = Column("created_by", String(15), nullable=False, index=True)  # added via token
    created_on = Column("created_on", DateTime(timezone=True), server_default=func.now(), nullable=False)  # created automatically
    next_checkup = Column("next_checkup", DateTime(timezone=True), nullable=True)  # next checkup_date

    def __init__(self, checkup_id: str, doctor_id: str, ayur_id: str, hospital_id: str, reason_to_vist: str,
                 created_by: str,  deduction: str = None, next_checkup: datetime = datetime.now(), name: str = None):
        self.checkup_id = checkup_id
        self.doctor_id = doctor_id
        self.ayur_id = ayur_id
        self.hospital_id = hospital_id
        self.name = name
        self.reason_to_visit = reason_to_vist
        self.created_by = created_by
        self.deduction = deduction
        self.next_checkup = next_checkup
        if not name:
            self.name = f"{self.checkup_id} - {self.created_by}"
        else:
            self.name = name

    def __repr__(self):
        return f"{self.checkup_id} - {self.created_on}"

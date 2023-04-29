from fastapi import Depends, HTTPException, status, APIRouter, Request
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import Optional, List, Dict
from datetime import datetime, timedelta
from jose import jwt, JWTError
from config import JWT_Settings
from functools import lru_cache
import exceptions as exceptions
from pydantic.validators import dict_validator
from pydantic import EmailStr
from utils.token import validate_token
from sqlalchemy import or_
from logging import info
from utils.database import DataBase, Hospitals, Address, Doctors
from models import Hospital, Doctor, AddDoctor, AddHospital
from utils.uuid import generate_id

hospital_router = APIRouter()


@hospital_router.get("/staffs", status_code=status.HTTP_200_OK, tags=["staff"])
def get_staffs(staff_data=Depends(validate_token)):
    ...


@hospital_router.get("/staff{staff_id}", status_code=status.HTTP_200_OK, tags=["staff"])
def get_staff(staff_data=Depends(validate_token)):
    ...


@hospital_router.get("/doctors", status_code=status.HTTP_200_OK, tags=["doctors"])
def get_doctors(staff_data=Depends(validate_token)) -> List[Doctor]:
    doctors = []
    for doctor in DataBase().session.query(Doctors).all():
        doctors.append(Doctor(**doctor.dict()))
    return doctors


@hospital_router.get("/doctor/{doctor_id}", status_code=status.HTTP_200_OK, tags=["doctors"])
def get_doctor(doctor_id: str, staff_data=Depends(validate_token)) -> Doctor:
    doc = DataBase().session.query(Doctors).filter(Doctors.doctor_id == doctor_id).first()
    if not doc:
        raise exceptions.HTTP_404("invalid doctor id")
    return Doctor(**doc.dict())


@hospital_router.post("/doctor", status_code=status.HTTP_201_CREATED, tags=["doctors", ])
def add_doctor(doctor: AddDoctor, staff_data=Depends(validate_token)):
    if not staff_data.is_admin:
        exceptions.HTTP_403("UnAuthorized")

    session = DataBase().session

    tries = 15
    while tries > 0:
        tries -= 1

        did = str(generate_id())

        if not session.query(Doctors).filter(Doctors.doctor_id == did).first():
            session.add(Doctors(doctor_id=did, hospital_id=staff_data.hospital_id,
                                registration_no=doctor.registration_no, name=doctor.name, sex=doctor.sex.value,
                                speciality=doctor.speciality))

            session.commit()
            return JSONResponse({"doctor_id": did})
        raise exceptions.HTTP_503("Try Again After Sometime")


@hospital_router.post("/register", status_code=status.HTTP_201_CREATED, tags=["hospital", ])
def add_hospital(hospital: AddHospital):
    session = DataBase().session

    add = hospital.location
    addr = Address(state=add.state, district=add.district, city=add.city, landmark=add.landmark,
                   pin_code=add.pin_code)
    session.add(addr)

    tries = 15
    while tries > 0:
        tries -= 1
        hid = str(generate_id())

        if not session.query(Hospitals).filter(Hospitals.hospital_id == hid).first():
            session.add(Hospitals(hospital_id=hid, name=hospital.name, registration_no=hospital.registration_no,
                                  location=addr.aid))

            session.commit()
            return JSONResponse({"hospital_id": hid})

    session.rollback()
    raise exceptions.HTTP_503("Try Again After SomeTime")

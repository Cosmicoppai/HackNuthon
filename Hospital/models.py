from pydantic import BaseModel, validator, Field
from typing import List, Optional
from enum import Enum


class BaseStaff(BaseModel):
    username: str
    password: str


class Staff(BaseStaff):
    hospital_id: str
    is_admin: bool
    access: List[str]


class Token(BaseModel):
    sub: str  # user_id or staff_id
    aud: str  # issued to whom (hospital or  user)
    expire: int


class StaffToken(Token):
    hospital_id: Optional[str]
    is_admin: bool = False
    access: List[str]


class SexEnum(str, Enum):
    Male = "M"
    Female = "F"


class BaseDoctor(BaseModel):
    registration_no: str
    name: str
    sex: SexEnum
    speciality: List[str]

    @validator("registration_no")
    def check_reg_no(cls, registration_no: str):
        if len(registration_no) <= 30:
            return registration_no
        raise ValueError("Value too large")


class Doctor(BaseDoctor):
    doctor_id: str = Field()
    hospital_id: str


class AddDoctor(BaseDoctor):
    ...


class Address(BaseModel):
    state: str
    district: str
    city: str
    landmark: str
    pin_code: int

    @validator("pin_code")
    def validate_pin_code(cls, pin_code: str):
        if 999999 >= pin_code > 99999:
            return pin_code
        raise ValueError("Invalid Pin Code")


class BaseHospital(BaseModel):
    name: str
    registration_no: str
    location: Address

    @validator("registration_no")
    def check_reg_no(cls, registration_no: str):
        if len(registration_no) <= 30:
            return registration_no
        raise ValueError("Value too large")


class Hospital(BaseHospital):
    hospital_id: str


class AddHospital(BaseHospital):
    ...

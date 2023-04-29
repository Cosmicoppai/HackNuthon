import json

from pydantic import BaseModel, validator, Field, EmailStr
from typing import List, Optional
from enum import Enum
from datetime import date


class Token(BaseModel):
    sub: str  # ayur_id or staff_id
    aud: str  # issued to whom (hospital or  user)
    expire: int


class UserToken(Token):
    phone_number: Optional[str]


class User(BaseModel):
    ...


class SexEnum(str, Enum):
    Male = "M"
    Female = "F"

    class Config:
        use_enum_values = True


class BloodGroupEnum(str, Enum):
    A1 = 'A+'
    A2 = 'A-'
    B1 = 'B+'
    B2 = 'B-'
    O1 = 'O+'
    O2 = 'O-'
    AB1 = 'AB+'
    AB2 = 'AB-'

    class Config:
        use_enum_values = True


class BaseDetails(BaseModel):
    email_id: EmailStr


class BasicDetails(BaseDetails):
    name: str
    sex: SexEnum
    weight: int
    height: int
    emergency_contact_number: List[str]
    allergies: List[str]
    major_problems: List[str]
    dob: date
    birth_mark: str
    blood_group: BloodGroupEnum


class UserDetails(BasicDetails):
    phone_number: str
    ayur_id: str
    photo: str

    @validator("phone_number")
    def validate_phone_number(cls, phone_number):
        try:
            if phone_number[:3] !="+91" or len(phone_number[3:]):
                int(phone_number)
                return phone_number
            raise ValueError("Invalid Phone Number")
        except ValueError:
            raise ValueError("Invalid phone number")


class UpdateDetails(BaseModel):
    email_id: str | None
    phone_number: str | None
    weight: int | None  # weight in kg
    height: int | None  # height in cm
    emergency_contact_number: List[str] | None
    allergies: List[str] | None

    @validator("phone_number")
    def validate_phone_number(cls, phone_number):
        try:
            if phone_number[:3] != "+91" or len(phone_number[3:]):
                int(phone_number)
                return phone_number
            raise ValueError("Invalid Phone Number")
        except ValueError:
            raise ValueError("Invalid phone number")


if __name__ == "__main__":
    t ='{"email_id": "cosmicoppai@protonmail.com","phone_number": "+918007611826","weight": 69,"height": 180,"emergency_contact_number": ["+918828087038"],"allergies": ["love"]}'
    data = json.loads(t)
    print(data)
    print(UpdateDetails(**data))

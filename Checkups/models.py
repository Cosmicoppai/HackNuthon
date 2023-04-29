from pydantic import BaseModel, validator, Field
from typing import List, Optional
from enum import Enum
from datetime import datetime


class Token(BaseModel):
    sub: str  # ayur_id or staff_id
    aud: str  # issued to whom (hospital or  user)
    expire: int


class UserToken(Token):
    phone_number: Optional[str]


class StaffToken(Token):
    hospital_id: Optional[str]
    is_admin: bool = False
    access: List[str]


class ReportTypeEnum(str, Enum):
    report = "report"
    scan = "scan"


class BaseCheckup(BaseModel):
    name: str  # default name will be f"{ayur_id} - {created_on}"
    reason_to_visit: str
    deduction: Optional[str]
    doctor_id: str


class BaseReport(BaseModel):
    checkup_id: str
    typ: ReportTypeEnum

    class Config:
        use_enum_values = True


class Report(BaseReport):
    report_id: str
    files: List[str]


class AddReport(BaseReport):
    ...


class AddCheckup(BaseCheckup):  # model to add checkup
    ...


class Checkup(BaseCheckup):  # model to return checkup response
    ayur_id: str
    hospital_id: str
    checkup_id: str
    created_by: str
    created_on: datetime
    next_checkup: Optional[datetime] = datetime.now()
    reports: List[Report]

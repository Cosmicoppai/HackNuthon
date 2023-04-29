import sqlalchemy.exc
from fastapi import Depends, HTTPException, status, APIRouter, Request, UploadFile, File
from fastapi.responses import JSONResponse, FileResponse
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime, timedelta
from jose import jwt, JWTError
from config import JWT_Settings
from functools import lru_cache
import exceptions as exceptions
from pydantic.validators import dict_validator
from pydantic import EmailStr
from utils.token import validate_token
from sqlalchemy import or_, and_
from logging import info, error
from utils.database import DataBase, Checkups, Reports
from models import AddCheckup, Checkup, AddReport, StaffToken, UserToken, Report
from utils.uuid import generate_id
from utils.files import process_report_files
from sqlalchemy.sql.expression import func
from config import FileConfig, StaticFilesConfig

checkup_router = APIRouter()


@checkup_router.get("/", status_code=status.HTTP_200_OK,
                    description="return all checkups for requested hospital")
def get_checkups(token_data: UserToken | StaffToken = Depends(validate_token)) -> List[Checkup]:

    """
    Return all checkups of particular user or hospital
    """
    try:
        if token_data.aud != "hospital":
            return serialize_checkup(_get_checkup_by_(ayur_id=token_data.sub))

        return serialize_checkup(_get_checkup_by_(hospital_id=token_data.hospital_id))

    except sqlalchemy.exc.OperationalError:
        raise exceptions.HTTP_500("Internal Server Error! Try again after sometime :(")


@checkup_router.get("/checkups/{ayur_id}", status_code=status.HTTP_200_OK,
                    description="return all checkups for a requested ayur_id")
def get_checkups_by_ayur_id(ayur_id: str, token_data: UserToken = Depends(validate_token)):
    """
       Endpoint to get all checkups of user requested by hospital
       """

    if token_data.aud != "hospital":
        raise exceptions.HTTP_403(Forbidden)

    return serialize_checkup(_get_checkup_by_(ayur_id))


def _get_checkup_by_(ayur_id: str = None, checkup_id: str = None, hospital_id: str = None) -> List[Checkup]:
    checkups = []
    session = DataBase().session
    if hospital_id:
        _checkups = session.query(Checkups).filter(Checkups.hospital_id == hospital_id)
    elif ayur_id:
        _checkups = session.query(Checkups).filter(Checkups.ayur_id == ayur_id)
    else:
        _checkups = session.query(Checkups).filter(Checkups.checkup_id == checkup_id)

    return _checkups


def serialize_checkup(_checkups) -> List[Checkup]:
    session = DataBase().session

    checkups = []

    for checkup in _checkups:
        checkup = checkup.dict()
        checkup["reports"] = [report.dict() for report in session.query(Reports).filter(Reports.checkup_id == checkup["checkup_id"])]

        checkups.append(Checkup(**checkup))
    return checkups


@checkup_router.get("/checkup/{checkup_id}", status_code=status.HTTP_200_OK, description="return a checkup")
def get_checkup(checkup_id: str, token_data=Depends(validate_token)):
    """
       Endpoint to get particular checkup of a user
       """
    session = DataBase().session
    if token_data.aud != "hospital":
        """
        if requested party is not hospital check user is requesting their self data
        """
        checkup = session.query(Checkups).filter(
            and_(Checkups.checkup_id == checkup_id, Checkups.ayur_id == token_data.sub))
    else:
        checkup = _get_checkup_by_(checkup_id=checkup_id)

    return serialize_checkup(checkup)


@checkup_router.get("/reports", status_code=status.HTTP_200_OK, description="reports of user")
def get_reports(token_data: UserToken | StaffToken = Depends(validate_token)):
    """
       Endpoint to get all reports of if requested by user, else all reports of requested hospital
       """
    try:
        if token_data.aud != "hospital":
            reports = _get_report_by_(ayur_id=token_data.sub)
        else:
            reports = _get_report_by_(hospital_id=token_data.hospital_id)
        if not reports:
            raise exceptions.HTTP_404()
        return serialize_report(reports)
    except Exception as e:
        error(e)
        raise exceptions.HTTP_404()


@checkup_router.get("/reports/{ayur_id}", status_code=status.HTTP_200_OK, description ="Report of user")
def get_report(ayur_id: str, token_data: UserToken | StaffToken = Depends(validate_token)):
    """
    Endpoint to get all reports of requested user by hospital
    """
    if token_data.aud != "hospital":
        raise exceptions.HTTP_403("Forbidden")

    return serialize_report(_get_report_by_(ayur_id=ayur_id))


def _get_report_by_(ayur_id: str = None, report_id: str = None, hospital_id: str = None, checkup_id: str = None) -> List[Report]:
    try:
        session = DataBase().session
        if hospital_id:
            reports = session.query(Reports).join(Checkups).filter(and_(Checkups.hospital_id == hospital_id, Checkups.checkup_id == Reports.checkup_id))
        elif report_id:
            reports = session.query(Reports).filter(Reports.report_id == int(report_id))
        elif checkup_id:
            reports = session.query(Reports).filter(Reports.checkup_id == checkup_id)
        else:
            print(ayur_id)
            reports = session.query(Reports).join(Checkups).filter(and_(Reports.checkup_id == Checkups.checkup_id, Checkups.ayur_id == ayur_id))

        return reports
    except ValueError:
        raise exceptions.HTTP_404()


def serialize_report(_reports) -> List[Report]:
    return [Report(**report.dict()) for report in _reports]


@checkup_router.get("/report/{report_id}", status_code=status.HTTP_200_OK, description="report of a checkup")
def get_report(report_id: str, token_data=Depends(validate_token)):
    """
       Endpoint to get particular report of requested user by hospital/user
       """
    try:
        report_id = int(report_id)
        session = DataBase().session
        if token_data.aud != "hospital":
            """
            if requested party is not hospital check user is requesting their self data
            """
            report = session.query(Reports).join(Checkups).filter(and_(Checkups.ayur_id == token_data.sub, Reports.report_id == report_id))
        else:
            report = _get_report_by_(report_id=report_id)
        if not report:
            raise exceptions.HTTP_404()
        return serialize_report(report)
    except ValueError as e:
        raise exceptions.HTTP_404("Report Not Found")


@checkup_router.get("/checkup/{checkup_id}/reports", status_code=status.HTTP_200_OK)
def get_report_by_checkup(checkup_id: str, token_data: StaffToken = Depends(validate_token)):
    return serialize_report(_get_report_by_(checkup_id=checkup_id))


@checkup_router.post("/checkup/{ayur_id}", status_code=status.HTTP_201_CREATED)
def add_checkup(ayur_id: str, checkup: AddCheckup, staff_data=Depends(validate_token)):
    try:

        session = DataBase().session
        tries = 15

        while tries:
            tries -= 1
            checkup_id = str(generate_id())

            if not session.query(Checkups).filter(Checkups.checkup_id == checkup_id).first():
                session.add(Checkups(checkup_id=checkup_id, ayur_id=ayur_id, doctor_id=checkup.doctor_id,
                                     hospital_id=staff_data.hospital_id,
                                     created_by=staff_data.sub, name=checkup.name,
                                     reason_to_vist=checkup.reason_to_visit, deduction=checkup.deduction))
                session.commit()

                return JSONResponse({"checkup_id": checkup_id})

        raise exceptions.HTTP_500("Try Again After Sometime :(")

    except sqlalchemy.exc.OperationalError:
        raise exceptions.HTTP_500("Internal Server Error! Try again after sometime :(")


@checkup_router.post("/report", status_code=status.HTTP_201_CREATED)
async def add_report(files: List[UploadFile] = File(description="report files"), report: AddReport = Depends(), staff_data=Depends(validate_token)):
    session = DataBase().session

    report_id = _get_report_id(session)

    files_path = await process_report_files(files, report.typ, report.checkup_id, report_id)

    session.add(Reports(checkup_id=report.checkup_id, typ=report.typ, files=files_path, report_id=report_id))

    session.commit()

    return JSONResponse({'report_id': report_id})


def _get_report_id(session: DataBase().session) -> int:
    _id = session.query(func.max(Reports.report_id)).scalar()
    return 1 if not _id else _id + 1


@checkup_router.get(StaticFilesConfig.file_url+"/{file_type}/{checkup_id}/{file_name}")
def get_report(file_type: str, checkup_id: str, file_name: str, token_data: StaffToken | UserToken = Depends(validate_token)) -> List[str]:
    print(file_name, file_type, checkup_id)
    session = DataBase().session
    if token_data.aud != "hospital":
        if not session.query(Reports).join(Checkups).filter(and_(Checkups.ayur_id == token_data.sub, Reports.checkup_id == checkup_id)).first():
            raise exceptions.HTTP_404("File Not Found!")

    file_path = FileConfig.checkup_folder.joinpath(f"{file_type}/{checkup_id}/{file_name}")
    return FileResponse(file_path)


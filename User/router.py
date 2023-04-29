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
from utils.database import DataBase, UsersData
from models import UserDetails, UserToken, BasicDetails, UpdateDetails
from utils.uuid import generate_id
from utils.files import process_image
from sqlalchemy.sql.expression import func
from config import FileConfig, StaticFilesConfig
from datetime import date

user_router = APIRouter()


@user_router.get("/{ayur_id}", status_code=status.HTTP_200_OK)
def get_user(ayur_id: str):
    user_data = DataBase().session.query(UsersData).filter(UsersData.ayur_id == ayur_id).first()
    if not user_data:
        raise exceptions.HTTP_404("Details Not Found")

    return UserDetails(**user_data.dict())


@user_router.put("/{ayur_id}", status_code=status.HTTP_204_NO_CONTENT)
def update_user(ayur_id: str, user_data: UpdateDetails, token_data: UserToken = Depends(validate_token)) -> None:
    user_data = user_data.dict(exclude_none=True)
    if not user_data:
        raise exceptions.HTTP_400("One or more field should be present")

    session = DataBase().session
    session.query(UsersData).filter(UsersData.ayur_id == token_data.sub).update(user_data.dict(exclude_none=True    ))
    session.commit()


@user_router.post("/user_data", status_code=status.HTTP_201_CREATED)
async def create_user_data(user_data: BasicDetails = Depends(),
                           image: UploadFile = File(description="image of the user"),
                           token_data: UserToken = Depends(validate_token)):

    image_addr = await process_image(image, token_data.sub)

    session = DataBase().session
    if session.query(UsersData).filter(UsersData.ayur_id == token_data.sub).first():
        raise exceptions.HTTP_409()
    dob = user_data.dob
    session.add(UsersData(ayur_id=token_data.sub,
                          name=user_data.name, emergency_contact=user_data.emergency_contact_number,
                          phone_number=token_data.phone_number, email_id=user_data.email_id,
                          allergies=user_data.allergies,
                          major_problems=user_data.major_problems, height=user_data.height,
                          weight=user_data.weight, sex=user_data.sex, dob=date(dob.year, dob.month, dob.day),
                          birth_mark=user_data.birth_mark,
                          blood_group=user_data.blood_group.value, photo=image_addr))

    session.commit()

    return JSONResponse({"msg": "user data successfully added"}, status_code=status.HTTP_201_CREATED)

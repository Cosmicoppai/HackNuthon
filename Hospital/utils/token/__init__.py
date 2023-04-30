from functools import lru_cache
from config import JWT_Settings as _jwt
from jose import JWTError
import jwt
from typing import Dict
from datetime import timedelta, datetime
from fastapi import Request
import exceptions as exceptions
from models import StaffToken
from jwt.exceptions import ExpiredSignatureError


def decode_token(token: str) -> Dict[str, str]:
    return jwt.decode(token, _jwt.public_key, audience=_jwt.aud, algorithms=[_jwt.algorithm, ])


async def validate_token(request: Request) -> StaffToken:
    try:
        token = request.headers["Authorization"]
        token = token.split(" ")
        if token[0] != "Bearer":
            raise exceptions.HTTP_400_MISSING_DATA

        token = decode_token(token[1])

        if token["aud"] not in _jwt.aud:
            """
            Token is invalid if it is not meant for hospital
            """
            raise exceptions.HTTP_401("Invalid Token")
        return StaffToken(**token)

    except ExpiredSignatureError as e:
        logging.error(e)
        raise exceptions.HTTP_401("Expired Token")

    except JWTError or jwt.exceptions.InvalidAudienceError as e:
        logging.error(e)
        raise exceptions.HTTP_401("Invalid Token")

    except KeyError:  # when header is missing
        raise exceptions.HTTP_400("Required Headers are missing")
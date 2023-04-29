from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from config import OriginSettings, DBSettings
from router import user_router
from functools import lru_cache
from utils.database import DataBase

app = FastAPI(
    title='User Service',
    description='mere samne wali khidki pe',
    version='0.1',
    contact={
        "name": "MFtEK",
    },
    license_info={
        "name": "MIT",
        "url": "https://www.apache.org/licenses/LICENSE-2.0.html"
    },
    docs_url="/docs",
    redoc_url="/redocs"
)


@lru_cache()
def get_origin():
    return OriginSettings()


_origins = get_origin()


origin = [_origins.origin]

app.add_middleware(
    CORSMiddleware,
    allow_origins=[origin, "http://localhost:3000", "http://localhost:9000"],
    allow_credentials=True,
    allow_headers=['*', ],
    allow_methods=['*', ]
)


app.include_router(user_router)


@app.on_event("startup")
def init_db():
    DataBase()


@app.on_event("shutdown")
def close_db_conn():
    DataBase().session.commit()  # commit everything
    DataBase().engine.dispose()  # close connection

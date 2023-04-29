from os import makedirs
from pydantic import BaseSettings, BaseModel
from pathlib import Path
from cryptography.hazmat.primitives import serialization


class AppSettings(BaseSettings):

    class Config:
        env_file = Path(__file__).parent.joinpath('.env').__str__()
        env_file_encoding = 'utf-8'


class DBSettings(AppSettings):
    db_name: str
    db_username: str
    db_password: str
    db_host: str = "localhost"


class JWT_Settings:
    public_key_path: str = Path(__file__).parent.joinpath("./auth.pub")

    public_key: str = serialization.load_ssh_public_key(open(public_key_path, "r").read().encode())
    algorithm: str = "RS256"
    validity: int = 21600
    aud = ["user"]


class FileConfig:
    image_folder: Path = Path(__file__).parent.joinpath("images")

    makedirs(image_folder, exist_ok=True)  # create checkup_folder


class OriginSettings(AppSettings):
    origin: str


class StaticFilesConfig:
    file_url: str = "/file"

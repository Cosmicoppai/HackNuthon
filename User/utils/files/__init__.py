import os
from fastapi import UploadFile
from typing import List
from config import FileConfig, OriginSettings, StaticFilesConfig
import exceptions


async def process_image(file: UploadFile, ayur_id: str) -> List[str]:
    """
    This function will process uploaded and return Path List of files
    """

    if not file.size:
        raise exceptions.HTTP_400("Image not present")

    file_path = FileConfig.image_folder.joinpath(ayur_id)
    os.makedirs(file_path, exist_ok=True)
    file_path = file_path.joinpath(file.filename)
    print(file.filename)
    with open(file_path, "wb+") as _file:
        _file.write(await file.read())
        return file_path.__str__().replace(str(FileConfig.image_folder), f"{OriginSettings().origin}{StaticFilesConfig.file_url}")


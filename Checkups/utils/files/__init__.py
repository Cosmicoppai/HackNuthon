import os
from fastapi import UploadFile
from typing import List
from config import FileConfig, OriginSettings, StaticFilesConfig


async def process_report_files(files: List[UploadFile], file_type: str, checkup_id: str, report_id: str) -> List[str]:
    """
    This function will process uploaded and return Path List of files
    """
    files_path: List[str] = []

    for file in files:
        file_path = FileConfig.checkup_folder.joinpath(file_type).joinpath(checkup_id)
        os.makedirs(file_path, exist_ok=True)
        file_path = file_path.joinpath(file.filename)
        with open(file_path, "wb+") as _file:
            _file.write(await file.read())
            files_path.append(file_path.__str__().replace(str(FileConfig.checkup_folder), f"{OriginSettings}{StaticFilesConfig}"))
    return files_path


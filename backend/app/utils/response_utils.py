from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel
from typing import Optional, Any

def json_response(
  status_code: int,
  success: bool,
  message: str,
  data: Optional[Any] = None,
  headers: Optional[Any] = None
) -> JSONResponse:
  content: dict[str, Any] = {"success": success, "message": message}

  if data is not None:
    content["data"] = jsonable_encoder(data)

  return JSONResponse(status_code=status_code, content=content, headers=headers)

from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import Optional, Any

def json_res(
  status_code: int,
  success: bool,
  message: str,
  data: Optional[Any] = None
) -> JSONResponse:
  content: dict[str, Any] = {"success": success, "message": message}
  if data is not None:
    if isinstance(data, BaseModel):
      content["data"] = data.model_dump()
    else:
      content["data"] = data

  return JSONResponse(status_code=status_code, content=content)
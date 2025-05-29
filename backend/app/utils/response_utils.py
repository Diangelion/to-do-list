from fastapi.responses import JSONResponse
from typing import Optional, Any

def json_res(
  statusCode: int,
  success: bool,
  message: str,
  data: Optional[Any] = None
) -> JSONResponse:
  return JSONResponse(
    status_code=statusCode,
    content={
      'success': success,
      'message': message,
      'data': data
    }
  )
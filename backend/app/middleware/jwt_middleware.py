from fastapi import Request, Response, Depends, status
from redis import Redis
from typing import Callable, Awaitable
from jose import JWTError, ExpiredSignatureError
from app.schemas.jwt_schema import TokenData
from app.utils.jwt_utils import verify_token, create_access_token
from app.utils.redis_utils import get_refresh_token, delete_refresh_token
from app.utils.response_utils import json_res
from app.dependencies import get_redis_client

async def jwt_middleware(
  request: Request,
  call_next: Callable[[Request], Awaitable[Response]],
  redis_client: Redis = Depends(get_redis_client)
) -> Response:
  if request.method == "OPTIONS":
    return await call_next(request)

  if request.url.path in ["/login"]:
    return await call_next(request)

  auth_header = request.headers.get("Authorization", "")
  if not auth_header.startswith("Bearer "):
    return json_res(status.HTTP_401_UNAUTHORIZED, False, "Unauthorized. Missing Authorization header.")

  access_token = auth_header.replace("Bearer ", "").strip()

  try:
    access_token_data = verify_token(access_token)
    if access_token_data.token_type != "access":
      raise JWTError("Invalid token type.")

    request.state.user = access_token_data
    response = await call_next(request)
    return response

  except ExpiredSignatureError as e:
    user_id = verify_token(access_token, options={"verify_exp": False}).user_id

    try:
      refresh_token = await get_refresh_token(user_id, redis_client)
      if not refresh_token:
        return json_res(status.HTTP_401_UNAUTHORIZED, False, "Session expired. Please login again.")

      refresh_token_data = verify_token(refresh_token)

      if refresh_token_data.token_type != "refresh":
        raise JWTError("Invalid token type.")
      if refresh_token_data.user_id != user_id:
        raise JWTError("Token mismatch.")

      new_access_token = create_access_token(user_id)

      request.state.user = TokenData(user_id=user_id, token_type="access")
      response = await call_next(request)
      response.headers["Authorization"] = f"Bearer {new_access_token}"
      return response

    except JWTError as e:
      await delete_refresh_token(user_id=user_id, redis_client=redis_client)
      return json_res(status.HTTP_401_UNAUTHORIZED, False, "Session expired. Please login again.")

  except JWTError as e:
    return json_res(status.HTTP_401_UNAUTHORIZED, False, "Unauthorized. Invalid token.")
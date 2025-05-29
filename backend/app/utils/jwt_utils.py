from datetime import datetime, timedelta, timezone
from typing import Any
from jose import JWTError, jwt
from fastapi import HTTPException
from app.schemas.jwt_schema import TokenData
from app.config import settings

def create_payload(user_id: str, expire: datetime, token_type: str) -> dict[str, Any]:
  payload: dict[str, Any] = {
    "sub": user_id,
    "exp": expire,
    "type": token_type
  }
  return payload

def create_access_token(user_id: str) -> str:
  expire = datetime.now(timezone.utc) + timedelta(minutes=settings.jwt_access_token_expire_minutes)
  payload = create_payload(user_id, expire, "access")
  return jwt.encode(payload, settings.jwt_secret_key, algorithm=settings.jwt_algorithm)


def create_refresh_token(user_id: str) -> str:
  expire = datetime.now(timezone.utc) + timedelta(minutes=settings.jwt_refresh_token_expire_days)
  payload = create_payload(user_id, expire, "refresh")
  return jwt.encode(payload, settings.jwt_secret_key, algorithm=settings.jwt_algorithm)

def verify_token(token: str, credentials_exception: HTTPException) -> TokenData:
  try:
    payload = jwt.decode(token, settings.jwt_secret_key, algorithms=[settings.jwt_algorithm])
    user_id = payload.get("sub")
    token_type = payload.get("token_type")

    if user_id is None or token_type is None:
      raise credentials_exception
    return TokenData(user_id=user_id, token_type=token_type)
  except JWTError:
    raise credentials_exception
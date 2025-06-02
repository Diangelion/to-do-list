from datetime import datetime, timedelta, timezone
from typing import Any, Optional
from jose import JWTError, jwt
from app.schemas.jwt_schema import TokenData
from app.settings import settings

def create_payload(user_id: str, expire: datetime, token_type: str) -> dict[str, Any]:
  payload: dict[str, Any] = {
    'sub': user_id,
    'exp': expire,
    'type': token_type
  }
  return payload

def create_access_token(user_id: str) -> str:
  lifetime = timedelta(minutes=settings.jwt_access_token_expire_minutes)
  expire = datetime.now(timezone.utc) + lifetime
  payload = create_payload(user_id, expire, 'access')
  return jwt.encode(payload, settings.jwt_secret_key, algorithm=settings.jwt_algorithm)

def create_refresh_token(user_id: str) -> tuple[str, timedelta]:
  lifetime = timedelta(days=settings.jwt_refresh_token_expire_days)
  expire = datetime.now(timezone.utc) + lifetime
  payload = create_payload(user_id, expire, 'refresh')
  return jwt.encode(payload, settings.jwt_secret_key, algorithm=settings.jwt_algorithm), lifetime

def verify_token(
  token: str,
  options: Optional[dict[str, Any] | None] = None
) -> TokenData:
  payload = jwt.decode(
    token,
    settings.jwt_secret_key,
    algorithms=[settings.jwt_algorithm],
    options=options
  )
  user_id = payload.get('sub')
  token_type = payload.get('type')

  if user_id is None or token_type is None:
    raise JWTError("Invalid token payload.")
  if token_type not in ['access', 'refresh']:
    raise JWTError("Invalid token type.")

  return TokenData(user_id=user_id, token_type=token_type)

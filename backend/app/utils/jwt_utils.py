from uuid import uuid4
from datetime import datetime, timedelta, timezone
from typing import Any, Optional
from jose import JWTError, jwt
from app.schemas.jwt_schema import SchemaTokenPayload, SchemaTokenData
from app.settings import settings

def create_payload(
  user_id: str,
  user_email: str,
  expire: datetime,
  token_type: str
) -> SchemaTokenPayload:
  now = datetime.now(timezone.utc)
  payload: SchemaTokenPayload = {
    "sub": user_id,
    "email": user_email,
    "iat": int(now.timestamp()),
    "exp": int(expire.timestamp()),
    "jti": str(uuid4()),
    "type": token_type
  }

  return payload

def create_access_token(user_id: str, user_email: str) -> str:
  lifetime = timedelta(minutes=settings.jwt_access_token_expire_minutes)
  expire = datetime.now(timezone.utc) + lifetime
  payload = create_payload(user_id, user_email, expire, 'access')

  return jwt.encode(payload, settings.jwt_secret_key, algorithm=settings.jwt_algorithm)

def create_refresh_token(user_id: str, user_email: str) -> tuple[str, timedelta]:
  lifetime = timedelta(days=settings.jwt_refresh_token_expire_days)
  expire = datetime.now(timezone.utc) + lifetime
  payload = create_payload(user_id, user_email, expire, 'refresh')

  return jwt.encode(payload, settings.jwt_secret_key, algorithm=settings.jwt_algorithm), lifetime

def verify_token(
  token: str,
  options: Optional[dict[str, Any] | None] = None
) -> SchemaTokenData:
  payload = jwt.decode(
    token,
    settings.jwt_secret_key,
    algorithms=[settings.jwt_algorithm],
    options=options
  )
  user_id = payload.get('sub')
  user_email = payload.get('email')
  token_type = payload.get('type')

  if user_id is None or user_email is None or token_type is None:
    raise JWTError("Invalid token payload.")
  if token_type not in ['access', 'refresh']:
    raise JWTError("Invalid token type.")

  return SchemaTokenData(user_id=user_id, user_email=user_email, token_type=token_type)

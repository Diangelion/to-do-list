from redis import Redis
from datetime import timedelta
from app.settings import settings

def store_refresh_token(
  user_id: str,
  refresh_token: str,
  expire: timedelta,
  redis_client: Redis
):
  expiry_in_seconds = int(expire.total_seconds())
  key = f'{settings.redis_json_key}{user_id}'
  print(f'Expired: {expiry_in_seconds}, key: {key}')
  redis_client.set(key, refresh_token, ex=expiry_in_seconds)

def get_refresh_token(user_id: str, redis_client: Redis) -> str | None:
  key = f'{settings.redis_json_key}{user_id}'
  token = redis_client.get(key)
  if token is None:
    return None
  if isinstance(token, bytes):
    return token.decode('utf-8')
  if isinstance(token, str):
    return token
  return None

def delete_refresh_token(user_id: str, redis_client: Redis):
  key = f'{settings.redis_json_key}{user_id}'
  redis_client.delete(key)
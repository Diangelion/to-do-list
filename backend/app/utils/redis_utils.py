from redis import Redis
from datetime import timedelta
from app.settings import settings

async def store_refresh_token(
  user_id: str,
  refresh_token: str,
  expire: timedelta,
  redis_client: Redis
):
  expiry_in_seconds = int(expire.total_seconds())
  key = f'{settings.redis_json_key}{user_id}'
  print(f'Expired: {expiry_in_seconds}, key: {key}')
  await redis_client.set(key, refresh_token, ex=expiry_in_seconds)

async def get_refresh_token(user_id: str, redis_client: Redis) -> str | None:
  key = f'{settings.redis_json_key}{user_id}'
  token = await redis_client.get(key)
  if token is None:
    return None
  return token.decode('utf-8') if isinstance(token, bytes) else token

async def delete_refresh_token(user_id: str, redis_client: Redis):
  key = f'{settings.redis_json_key}{user_id}'
  await redis_client.delete(key)
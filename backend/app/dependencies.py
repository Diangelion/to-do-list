from fastapi import Request
from sqlalchemy.orm import Session
from typing import Generator
from redis.asyncio import Redis
from app.database import SessionLocal

def get_db() -> Generator[Session, None, None]:
  db = SessionLocal()
  try:
    yield db
  finally:
    db.close()

async def get_redis_client(request: Request) -> Redis:
  redis_client = request.app.state.redis
  if redis_client is None:
    raise RuntimeError("Redis client not available in app.state")
  return redis_client
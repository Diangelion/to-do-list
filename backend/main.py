import uvicorn
import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI, APIRouter, status
from fastapi.middleware.cors import CORSMiddleware
from redis.asyncio import Redis
from app.utils.response_utils import json_res
from app.database import engine, Base
from app.api import user_api
from app.settings import settings
from app.log.log_config import setup_logging

# Init Log
setup_logging()
logger = logging.getLogger(__name__)

# Init router
api_router = APIRouter(prefix=settings.api_prefix)

# Routers
api_router.include_router(user_api.router, prefix='/users', tags=['users'])

@asynccontextmanager
async def lifespan(app: FastAPI):
  # Initialize PostgreSQL connection
  Base.metadata.create_all(bind=engine)

  # Initialize Redis connection
  # app.state.redis = Redis(
  #   host=settings.redis_host,
  #   port=settings.redis_port,
  #   db=settings.redis_db,
  #   password=settings.redis_password,
  #   decode_responses=True
  # )
  app.state.redis = Redis.from_url(settings.redis_url, decode_responses=True) # type:ignore

  try:
    pong = await app.state.redis.ping()  # type:ignore
    if pong != True:
      raise ConnectionError('Redis ping failed')
    print('Redis connected')
  except Exception as e:
    print(f'Redis connection error: {e}')
    raise

  yield
  await app.state.redis.close()
  print('Redis disconnected')

def create_app() -> FastAPI:
  app = FastAPI(
    title='My FastAPI App',
    description='FastAPI application with environment-based configuration',
    version='1.0.0',
    debug=settings.debug,
    lifespan=lifespan
  )

  if settings.cors_origins:
    app.add_middleware(
      CORSMiddleware,
      allow_origins=settings.cors_origins,
      allow_credentials=True,
      allow_methods=settings.cors_methods,
      allow_headers=settings.cors_headers,
    )

  app.include_router(api_router)
  return app

app = create_app()

# Global exception
@app.exception_handler(Exception)
async def generic_exception_handler(_, exc: Exception):
  logger.critical(
    f"Unhandled exception caught by generic_exception_handler: {type(exc).__name__} - {str(exc)}",
    exc_info=True
  )
  error_message = "An unexpected internal server error occurred. Please try again later."
  if app.debug:
    error_message = f"Internal Server Error: {type(exc).__name__} - {str(exc)}"
  return json_res(status.HTTP_500_INTERNAL_SERVER_ERROR, False, error_message)

# Main
if __name__ == '__main__':
  uvicorn.run(
    'main:app',
    host=settings.api_host,
    port=settings.api_port,
    reload=settings.debug,
    log_level=settings.log_level.lower(),
  )
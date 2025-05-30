from fastapi import APIRouter, status, Depends
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from redis import Redis
from app.schemas.oauth_schema import OAuth
from app.schemas.user_schema import UserCreate
from app.services.user_service import authenticate_user
from app.utils.oauth_utils import main_oauth
from app.utils.response_utils import json_res
from app.dependencies import get_db, get_redis_client

router = APIRouter()

@router.post("/login", status_code=status.HTTP_200_OK)
async def login(
  oauth: OAuth,
  db: Session = Depends(get_db),
  redis_client: Redis = Depends(get_redis_client)
) -> JSONResponse:
  oauth_user: UserCreate = await main_oauth(oauth)
  login_data: dict[str, str] = await authenticate_user(oauth_user, db, redis_client)
  return json_res(status.HTTP_200_OK, True, 'Login success,', login_data)
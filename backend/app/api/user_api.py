from fastapi import APIRouter, status, Depends, Request
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from redis import Redis
from app.schemas.oauth_schema import OAuth
from app.schemas.user_schema import UserCreate
from app.services.user_service import authenticate_user, get_profile
from app.utils.oauth_utils import main_oauth
from app.utils.response_utils import json_res
from app.utils.redis_utils import delete_refresh_token
from app.dependencies import get_db, get_redis_client

router = APIRouter()

@router.post("/login", response_model=dict[str, str], status_code=status.HTTP_200_OK)
async def login(
  request: Request,
  db: Session = Depends(get_db),
  redis_client: Redis = Depends(get_redis_client)
) -> JSONResponse:
  request_data = await request.json()
  oauth = OAuth(**request_data)
  oauth_user: UserCreate = await main_oauth(oauth)
  login_data: dict[str, str] = await authenticate_user(oauth_user, db, redis_client)
  return json_res(status.HTTP_200_OK, True, 'Login success,', login_data)

@router.get('/profile', response_model=UserCreate, status_code=status.HTTP_200_OK)
async def profile(
  request: Request,
  db: Session = Depends(get_db),
  redis_client: Redis = Depends(get_redis_client)
) -> JSONResponse:
  user_id = request.state.user.user_id
  user = await get_profile(user_id, db, redis_client)
  if not user:
    return json_res(status.HTTP_401_UNAUTHORIZED, False, 'Unauthorized')
  return json_res(status.HTTP_200_OK, True, 'User verified', user)

@router.post('/logout', status_code=status.HTTP_200_OK)
async def logout(
  request: Request,
  redis_client: Redis = Depends(get_redis_client)
) -> JSONResponse:
  user_id = request.state.user.user_id
  await delete_refresh_token(user_id, redis_client)
  return json_res(status.HTTP_200_OK, True, 'Logout success')
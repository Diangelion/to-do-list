from fastapi import APIRouter, status, Depends, Request
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from redis import Redis
from app.schemas.oauth_schema import SchemaOAuth
from app.schemas.user_schema import SchemaUserCreate
from app.services.user_service import service_authenticate_user, service_get_profile
from app.utils.oauth_utils import main_oauth
from app.utils.response_utils import json_response
from app.utils.redis_utils import delete_refresh_token
from app.dependencies import get_db, get_redis_client

router = APIRouter()

@router.post("/login", response_model=dict[str, str], status_code=status.HTTP_200_OK)
async def api_login(
  request: Request,
  db: Session = Depends(get_db),
  redis_client: Redis = Depends(get_redis_client)
) -> JSONResponse:
  request_data = await request.json()
  oauth = SchemaOAuth(**request_data)
  oauth_user: SchemaUserCreate = await main_oauth(oauth)
  login_data: dict[str, str] = service_authenticate_user(oauth_user, db, redis_client)
  return json_response(status.HTTP_200_OK, True, 'Login success,', login_data)

@router.get('/profile', response_model=SchemaUserCreate, status_code=status.HTTP_200_OK)
def api_profile(
  request: Request,
  db: Session = Depends(get_db),
  redis_client: Redis = Depends(get_redis_client)
) -> JSONResponse:
  user_id = request.state.user.user_id
  user = service_get_profile(user_id, db)
  if not user:
    return json_response(status.HTTP_401_UNAUTHORIZED, False, 'Unauthorized')
  return json_response(status.HTTP_200_OK, True, 'User verified', user)

@router.post('/logout', status_code=status.HTTP_200_OK)
async def api_logout(
  request: Request,
  redis_client: Redis = Depends(get_redis_client)
) -> JSONResponse:
  user_id = request.state.user.user_id
  delete_refresh_token(user_id, redis_client)
  return json_response(status.HTTP_200_OK, True, 'Logout success')
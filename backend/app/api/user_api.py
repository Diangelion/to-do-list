from fastapi import APIRouter, status, Depends, Request
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from redis import Redis
from app.schemas.oauth_schema import SchemaOAuth
from app.schemas.user_schema import SchemaUserCreate, SchemaUser
from app.services.user_service import service_login_user, service_get_profile
from app.utils.oauth_utils import main_oauth
from app.utils.response_utils import json_response
from app.utils.redis_utils import delete_refresh_token
from app.dependencies import get_db, get_redis_client

router = APIRouter()

@router.post(
  '/login',
  response_model=dict[str, str],
  responses={
    status.HTTP_200_OK: {'description': 'Login successful.'},
    status.HTTP_401_UNAUTHORIZED: {'description': 'Unauthorized.'},
    status.HTTP_500_INTERNAL_SERVER_ERROR: {'description': 'An unexpected internal server error occurred. Please try again later.'}
  }
)
async def api_login(
  request: Request,
  db: Session = Depends(get_db),
  redis_client: Redis = Depends(get_redis_client)
) -> JSONResponse:
  request_data = await request.json()

  oauth = SchemaOAuth(**request_data)
  oauth_user = await main_oauth(oauth)

  login_data = service_login_user(oauth_user, db, redis_client)

  return json_response(status.HTTP_200_OK, True, 'Login successful', login_data)

# Handle user session (refresh token expired or not)
@router.get(
  '/refresh',
  response_model=SchemaUserCreate,
  responses={
    status.HTTP_200_OK: {'description': 'User refreshed.'},
    status.HTTP_401_UNAUTHORIZED: {'description': 'Unauthorized.'},
    status.HTTP_500_INTERNAL_SERVER_ERROR: {'description': 'An unexpected internal server error occurred. Please try again later.'}
  }
)
def api_refresh(
  request: Request,
  db: Session = Depends(get_db),
  redis_client: Redis = Depends(get_redis_client)
) -> JSONResponse:
  return json_response(status.HTTP_200_OK, True, 'User refreshed.')

@router.get(
  '/profile',
  response_model=SchemaUserCreate,
  responses={
    status.HTTP_200_OK: {'description': 'User found.'},
    status.HTTP_401_UNAUTHORIZED: {'description': 'Unauthorized.'},
    status.HTTP_404_NOT_FOUND: {'description': 'User not found.'},
    status.HTTP_500_INTERNAL_SERVER_ERROR: {'description': 'An unexpected internal server error occurred. Please try again later.'}
  }
)
def api_profile(
  request: Request,
  db: Session = Depends(get_db),
  redis_client: Redis = Depends(get_redis_client)
) -> JSONResponse:
  user_id =  request.state.user.user_id

  user = service_get_profile(user_id, db)

  if not user:
    return json_response(status.HTTP_404_NOT_FOUND, False, 'User not found.')

  return json_response(status.HTTP_200_OK, True, 'User found.', user)

@router.post(
  '/logout',
  responses={
    status.HTTP_200_OK: {'description': 'Logout successful.'},
    status.HTTP_401_UNAUTHORIZED: {'description': 'Unauthorized.'},
    status.HTTP_500_INTERNAL_SERVER_ERROR: {'description': 'An unexpected internal server error occurred. Please try again later.'}
  }
)
async def api_logout(
  request: Request,
  db: Session = Depends(get_db),
  redis_client: Redis = Depends(get_redis_client)
) -> JSONResponse:
  user_id = request.state.user.user_id
  delete_refresh_token(user_id, redis_client)
  return json_response(status.HTTP_200_OK, True, 'Logout successful.')
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
  '/proxy-image',
  response_model=dict[str, str],
  responses={
    status.HTTP_200_OK: {'description': 'Login successful.'},
    status.HTTP_401_UNAUTHORIZED: {'description': 'Unauthorized.'},
    status.HTTP_500_INTERNAL_SERVER_ERROR: {'description': 'An unexpected internal server error occurred. Please try again later.'}
  }
)
async def proxy_image(url: str):
    async with httpx.AsyncClient() as client:
        response = await client.get(url)
        if response.status_code != 200:
            raise HTTPException(status_code=404)
        return StreamingResponse(response.aiter_bytes(), media_type="image/jpeg")

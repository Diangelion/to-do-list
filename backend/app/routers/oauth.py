import httpx
from fastapi import APIRouter, status
from app.models.oauth import OAuth
from fastapi.security import HTTPBearer
from app.config import settings

router = APIRouter()
security = HTTPBearer()

@router.post('/google', status_code=status.HTTP_201_CREATED)
async def auth_google(oauth: OAuth):
  token_data = {
    'code': oauth.token,
    'client_id': settings.google_client_id,
    'client_secret': settings.google_client_secret,
    'redirect_uri': settings.google_redirect_uri,
    'grant_type': 'authorization_code',
  }
  print(f'Token Data: {token_data}')

  async with httpx.AsyncClient() as client:
    # Get access token from Google
    token_response = await client.post(settings.google_token_uri, data=token_data)
    print(f'Token Response: {token_response.json()}')
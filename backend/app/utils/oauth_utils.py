import httpx
from fastapi import APIRouter, status
from app.schemas.oauth_schema import OAuth
from app.schemas.error_schema import AppError
from app.schemas.user_schema import UserCreate
from app.config import settings

router = APIRouter()

async def main_oauth(oauth: OAuth) -> UserCreate:
  match oauth.provider:
    case 'google':
      return await auth_google(oauth.token)
    # case 'github':
    #   return await auth_github(oauth.token)
    case _:
      raise AppError("Unsupported OAuth provider", status.HTTP_400_BAD_REQUEST)

async def auth_google(token: str) -> UserCreate:
  token_data = {
    'code': token,
    'client_id': settings.google_client_id,
    'client_secret': settings.google_client_secret,
    'redirect_uri': settings.google_redirect_uri,
    'grant_type': 'authorization_code',
  }

  try:
    async with httpx.AsyncClient() as client:
      token_response = await client.post(settings.google_token_uri, data=token_data)
      print(f'Token Response: {token_response}, status_code: {token_response.status_code}')

      if token_response.status_code != status.HTTP_200_OK:
        error_detail = token_response.json().get('error_description', 'Unknown error')
        error_message = f'Google OAuth token exchange failed: {error_detail}'
        raise AppError(error_message, status.HTTP_503_SERVICE_UNAVAILABLE)

      token_json = token_response.json()
      access_token = token_json.get('access_token')

      if not access_token:
        error_message = 'No access token received from Google'
        raise AppError(error_message, status.HTTP_503_SERVICE_UNAVAILABLE)

      user_response = await client.get(
        settings.google_user_info_uri,
        headers={'Authorization': f'Bearer {access_token}'}
      )

      if user_response.status_code != status.HTTP_200_OK:
        error_detail = user_response.json().get('error_description', 'Unknown error')
        error_message = f'Google OAuth token exchange failed: {error_detail}'

      user_info = user_response.json()
      user = UserCreate(
        email=user_info.get('email'),
        name=user_info.get('name'),
        profile_picture=user_info.get('picture')

      )
      return user
  except httpx.RequestError as e:
    raise AppError(f'Could not connect to Google OAuth service: {str(e)}', status.HTTP_503_SERVICE_UNAVAILABLE)
  except Exception as e:
    raise AppError(f'An unexpected error occurred: {str(e)}', status.HTTP_500_INTERNAL_SERVER_ERROR)

# async def auth_github(token: str) -> UserCreate:
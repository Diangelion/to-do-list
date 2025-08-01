import httpx
from fastapi import APIRouter, status
from app.schemas.oauth_schema import SchemaOAuth
from app.schemas.user_schema import SchemaUserCreate
from app.settings import settings

router = APIRouter()

async def main_oauth(oauth: SchemaOAuth) -> SchemaUserCreate:
  match oauth.provider:
    case 'google':
      return await auth_google(oauth.token)
    case 'github':
      return await auth_github(oauth.token)
    case _:
      raise ValueError("Unsupported OAuth provider")

async def auth_google(token: str) -> SchemaUserCreate:
  token_data = {
    'code': token,
    'client_id': settings.google_client_id,
    'client_secret': settings.google_client_secret,
    'redirect_uri': settings.google_redirect_uri,
    'grant_type': 'authorization_code',
  }

  async with httpx.AsyncClient() as client:
    token_response = await client.post(
      settings.google_token_uri,
      data=token_data,
      headers={'Content-Type': 'application/x-www-form-urlencoded'}
    )

    if token_response.status_code != status.HTTP_200_OK:
      error_detail = token_response.json().get('error_description', 'Unknown error')
      error_message = f'Google OAuth token exchange failed: {error_detail}'
      raise ConnectionError(error_message)

    token_json = token_response.json()
    access_token = token_json.get('access_token')

    if not access_token:
      error_message = 'No access token received from Google'
      raise ConnectionError(error_message)

    user_response = await client.get(
      settings.google_user_info_uri,
      headers={'Authorization': f'Bearer {access_token}'}
    )

    if user_response.status_code != status.HTTP_200_OK:
      error_detail = user_response.json().get('error_description', 'Unknown error')
      error_message = f'Google OAuth token exchange failed: {error_detail}'

    user_info = user_response.json()
    user = SchemaUserCreate(
      email=user_info.get('email'),
      name=user_info.get('name'),
      profile_picture=user_info.get('picture')

    )
    return user

async def auth_github(token: str) -> SchemaUserCreate:
  token_data = {
    'code': token,
    'client_id': settings.github_client_id,
    'client_secret': settings.github_client_secret,
    'redirect_uri': settings.github_redirect_uri,
  }

  async with httpx.AsyncClient() as client:
    token_response = await client.post(
      settings.github_token_uri,
      data=token_data,
      headers={
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Accept-Encoding': 'application/json'
      }
    )

    if token_response.status_code != status.HTTP_200_OK:
      error_detail = token_response.json().get('error_description', 'Unknown error')
      error_message = f'GitHub OAuth token exchange failed: {error_detail}'
      raise ConnectionError(error_message)

    token_json = token_response.json()
    access_token = token_json.get('access_token')

    if not access_token:
      error_message = 'No access token received from GitHub'
      raise ConnectionError(error_message)

    user_response = await client.get(
      settings.github_user_info_uri,
      headers={'Authorization': f'Bearer {access_token}'}
    )

    if user_response.status_code != status.HTTP_200_OK:
      error_detail = user_response.json().get('error_description', 'Unknown error')
      error_message = f'Google OAuth token exchange failed: {error_detail}'

    user_info = user_response.json()
    user = SchemaUserCreate(
      email=user_info.get('email') | '',
      name=user_info.get('login'),
      profile_picture=user_info.get('avatar_url')

    )
    return user
from functools import lru_cache
from pydantic import Field, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict, NoDecode
from typing import Annotated

class Settings(BaseSettings):
    database_url: str = Field(..., description='Database connection URL')
    # database_pool_size: int = Field(..., description='Database connection pool size')

    jwt_secret_key: str = Field(..., description='JWT secret key')
    jwt_algorithm: str = Field(..., description='JWT algorithm')
    jwt_access_token_expire_minutes: int = Field(..., description='Access token expiration in minutes')
    jwt_refresh_token_expire_days: int = Field(..., description='Refresh token expiration in days')

    google_client_id: str = Field(..., description='Google Client ID')
    google_client_secret: str = Field(..., description='Google Client Secret')
    google_token_uri: str = Field(..., description='Google Token URI')
    google_redirect_uri: str = Field(..., description='Google Redirect URI')
    google_user_info_uri: str = Field(..., description='Google User Info URI')

    api_host: str = Field(..., description='API host')
    api_port: int = Field(..., description='API port')
    api_prefix: str = Field(..., description='API prefix path')
    api_public_url: Annotated[list[str], NoDecode] = Field(..., description='API public endpoint path')

    redis_url: str = Field(..., description='Redis connection URL')
    # redis_host: str = Field(..., description='Redis connection host')
    # redis_port: int = Field(..., description='Redis connection port')
    # redis_db: str = Field(..., description='Redis connection DB')
    # redis_password: str = Field(..., description='Redis connection password')
    redis_json_key: str = Field(..., description='Redis JSON key')

    # smtp_server: str = Field(..., description='SMTP server host')
    # smtp_port: int = Field(..., description='SMTP server port')
    # smtp_username: str = Field(..., description='SMTP username')
    # smtp_password: str = Field(..., description='SMTP password')

    # openai_api_key: str = Field(..., description='OpenAI API key')
    # stripe_secret_key: str = Field(..., description='Stripe secret key')
    # stripe_webhook_secret: str = Field(..., description='Stripe webhook secret')

    environment: str = Field(..., description='Environment (development/staging/production)')
    debug: bool = Field(..., description='Debug mode flag')

    cors_origins: Annotated[list[str], NoDecode] = Field(..., description='CORS allowed origins (comma-separated)')
    cors_methods: Annotated[list[str], NoDecode] = Field(..., description='CORS allowed methods (comma-separated)')
    cors_headers: Annotated[list[str], NoDecode] = Field(..., description='CORS allowed headers (comma-separated)')

    log_level: str = Field(..., description='Logging level')
    log_path: str = Field(..., description='Logging output file path')

    model_config = SettingsConfigDict(
      env_file='.env',
      env_file_encoding='utf-8',
      case_sensitive=False,  # Allow case-insensitive env vars
      extra='ignore',  # Ignore extra env vars not defined in model
      validate_assignment=True,  # Validate when values are assigned
    )

    @field_validator('cors_origins', 'cors_methods', 'cors_headers', mode='before')
    @classmethod
    def parse_cors(cls, v: str) -> list[str]:
      return [origin.strip() for origin in v.split(',')]

    @field_validator('api_public_url', mode='before')
    @classmethod
    def parse_api_public(cls, v: str) -> list[str]:
      return [path.strip() for path in v.split(',')]

    @field_validator('environment')
    @classmethod
    def validate_environment(cls, v: str) -> str:
      allowed_envs = {'development', 'staging', 'production'}
      if v.lower() not in allowed_envs:
        raise ValueError(f'Environment must be one of: {allowed_envs}.')
      return v.lower()

    @field_validator('log_level')
    @classmethod
    def validate_log_level(cls, v: str) -> str:
      allowed_levels = {'DEBUG', 'INFO', 'WARNING', 'ERROR', 'CRITICAL'}
      if v.upper() not in allowed_levels:
        raise ValueError(f'Log level must be one of: {allowed_levels}.')
      return v.upper()


@lru_cache()
def get_settings() -> Settings:
  return Settings() # type: ignore

settings: Settings = get_settings()

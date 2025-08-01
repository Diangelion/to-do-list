from sqlalchemy.orm import Session
from redis import Redis
from app.models.user_model import ModelUser
from app.schemas.user_schema import SchemaUserCreate, SchemaUser
from app.utils.jwt_utils import create_access_token, create_refresh_token
from app.utils.redis_utils import store_refresh_token

def service_get_or_create_user(oauth_user: SchemaUserCreate, db: Session) -> tuple[str, str]:
  user = db.query(ModelUser).filter(ModelUser.email == oauth_user.email).first()
  profile_picture = oauth_user.profile_picture or f'https://placehold.co/300?text={oauth_user.name.strip()[0]}'

  if not user:
    user = ModelUser(
      email=oauth_user.email,
      name=oauth_user.name,
      profile_picture=profile_picture
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return str(user.id), str(user.email)

  updated_fields: dict[str, str] = {}
  if str(user.name) != oauth_user.name:
    updated_fields["name"] = oauth_user.name
  if str(user.profile_picture) != profile_picture:
    updated_fields["profile_picture"] = profile_picture

  if updated_fields:
    for field, value in updated_fields.items():
      setattr(user, field, value)
    db.commit()
    db.refresh(user)

  return str(user.id), str(user.email)

def service_login_user(
  oauth_user: SchemaUserCreate,
  db: Session,
  redis_client: Redis
) -> dict[str, str]:
  user_id, user_email = service_get_or_create_user(oauth_user, db)

  access_token = create_access_token(user_id, user_email)
  refresh_token, lifetime = create_refresh_token(user_id, user_email)

  store_refresh_token(user_id, refresh_token, lifetime, redis_client)

  return { 'token': access_token }

def service_get_profile(
  user_id: str,
  db: Session
) -> SchemaUser | None:
  user = db.query(ModelUser).filter(ModelUser.id == user_id).first()

  if not user:
    return None

  return SchemaUser.model_validate(user)
from sqlalchemy.orm import Session
from redis import Redis
from app.models.user_model import User
from app.schemas.user_schema import UserCreate
from app.utils.jwt_utils import create_access_token, create_refresh_token
from app.utils.redis_utils import store_refresh_token

def get_or_create_user(oauth_user: UserCreate, db: Session) -> str:
  user = db.query(User).filter(User.email == oauth_user.email).first()
  profile_picture = oauth_user.profile_picture or f'https://placehold.co/300?text={oauth_user.name.strip()[0]}'
  if not user:
    user = User(
      email=oauth_user.email,
      name=oauth_user.name,
      profile_picture=profile_picture
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return str(user.id)

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

  return str(user.id)

def authenticate_user(
  oauth_user: UserCreate,
  db: Session,
  redis_client: Redis
) -> dict[str, str]:
  user_id = get_or_create_user(oauth_user, db)
  access_token = create_access_token(user_id)
  refresh_token, lifetime = create_refresh_token(user_id)
  store_refresh_token(user_id, refresh_token, lifetime, redis_client)
  return { 'access_token': access_token }

def get_profile(
  user_id: str,
  db: Session
) -> UserCreate | None:
  user = db.query(User).filter(User.id == user_id).first()

  if not user:
    return None

  return UserCreate(
    name=str(user.name),
    email=str(user.email),
    profile_picture=str(user.profile_picture)
  )
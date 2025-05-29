from fastapi import APIRouter, status
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from app.models.user import User, UserCreate
from app.models.oauth import OAuth
from app.models.error import AppError
from app.utils.oauth import main_oauth
from app.utils.response import json_res
from app.dependencies import db_dependencies

router = APIRouter()

@router.post('/', status_code=status.HTTP_200_OK)
async def login(oauth: OAuth, db: Session = db_dependencies) -> JSONResponse:
  try:
    user: UserCreate = await main_oauth(oauth)

    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
      # Perform JWT
      return json_res(400, True, 'HEHE')

    if not user.profile_picture:
      user.profile_picture = f'https://placehold.co/300?text=${user.name.strip()[0]}'

    new_user = User(**user.model_dump())
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    # Perform JWT
    return json_res(400, True, 'HEHE')
  except Exception as e:
    raise AppError(str(e), getattr(e, 'status_code', status.HTTP_500_INTERNAL_SERVER_ERROR))

# @router.get('/{user_id}', response_model=UserResponse)
# def get_user(user_id: int, db: Session = db_dependencies):
#   user = db.query(User).filter(User.id == user_id).first()
#   if not user:
#     raise HTTPException(status_code=404, detail='User not found')
#   return user
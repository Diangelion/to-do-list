from fastapi import APIRouter, HTTPException, status
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from app.models.user import User, UserResponse, UserRequest
from app.dependencies import db_dependencies

router = APIRouter()

@router.post("/", status_code=status.HTTP_201_CREATED)
def create_user(user: UserRequest, db: Session = db_dependencies):
  db_user = db.query(User).filter(User.email == user.email).first()
  if db_user:
    return JSONResponse(
        status_code=status.HTTP_409_CONFLICT,
        content={
          "success": False,
          "message": "Email already registered",
          "data": None,
        }
    )

  new_user = User(**user.model_dump())
  db.add(new_user)
  db.commit()
  db.refresh(new_user)

  return JSONResponse(
    status_code=status.HTTP_201_CREATED,
    content={
      "success": True,
      "message": "User created successfully",
      "data": None
    }
  )

@router.get("/{user_id}", response_model=UserResponse)
def get_user(user_id: int, db: Session = db_dependencies):
  user = db.query(User).filter(User.id == user_id).first()
  if not user:
    raise HTTPException(status_code=404, detail="User not found")
  return user
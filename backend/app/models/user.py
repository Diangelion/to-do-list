from fastapi import UploadFile
from sqlalchemy import Column, Integer, String, DateTime, func
from pydantic import BaseModel
from app.database import Base
from typing import Optional

# SQLAlchemy Model (Database)
class User(Base):
  __tablename__ = 'users'

  id = Column(Integer, primary_key=True, index=True)
  name = Column(String(100), nullable=False)
  email = Column(String(100), unique=True, nullable=False, index=True)
  profile_picture = Column(String(255), nullable=False)
  created_at = Column(
    DateTime(timezone=True),
    server_default=func.now(),
    nullable=False
  )
  updated_at = Column(
    DateTime(timezone=True),
    server_default=func.now(),
    onupdate=func.now(),
    nullable=False
  )

# Pydantic Schemas
class UserCreate(BaseModel):
  name: str
  email: str
  profile_picture: Optional[str]

class UserUpdate(BaseModel):
  id: str
  name: Optional[str]
  email: Optional[str]
  profile_picture: Optional[str | UploadFile]

  class Config:
    from_attributes = True
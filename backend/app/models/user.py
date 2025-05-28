from fastapi import UploadFile
from sqlalchemy import Column, ForeignKey, String, DateTime, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from pydantic import BaseModel
from typing import Optional
from app.database import Base

# SQLAlchemy Model (Database)
class User(Base):
  __tablename__ = 'users'

  id = Column(UUID(as_uuid=True), primary_key=True, index=True)
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

# class UserCredentials(Base):
#   __tablename__ = 'user_credentials'

#   id = Column(UUID(as_uuid=True), primary_key=True, index=True)
#   user_id = Column(String(100), nullable=False, index=True)


# Pydantic Schemas
class UserCreate(BaseModel):
  name: str
  email: str
  profile_picture: Optional[str]

# class UserUpdate(BaseModel):
#   id: str
#   name: Optional[str]
#   email: Optional[str]
#   profile_picture: Optional[str | UploadFile]

#   class Config:
#     from_attributes = True
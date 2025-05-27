from sqlalchemy import Column, Integer, String
from pydantic import BaseModel
from app.database import Base

# SQLAlchemy Model (Database)
class User(Base):
  __tablename__ = 'users'

  id = Column(Integer, primary_key=True, index=True)
  name = Column(String)
  email = Column(String, unique=True)

# Pydantic Schemas
class UserRequest(BaseModel):
  name: str
  email: str

class UserResponse(BaseModel):
  id: int
  email: str
  full_name: str

  class Config:
    orm_mode = True
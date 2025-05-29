from pydantic import BaseModel, EmailStr
from typing import Optional

class UserCreate(BaseModel):
  name: str
  email: EmailStr
  profile_picture: Optional[str]

# class UserUpdate(BaseModel):
#   id: str
#   name: Optional[str]
#   email: Optional[str]
#   profile_picture: Optional[str | UploadFile]

#   class Config:
#     from_attributes = True
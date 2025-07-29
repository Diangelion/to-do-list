from pydantic import BaseModel, EmailStr
from typing import Optional

class SchemaUserCreate(BaseModel):
  name: str
  email: EmailStr
  profile_picture: Optional[str]
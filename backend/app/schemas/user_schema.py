from pydantic import BaseModel, EmailStr
from typing import Optional
from uuid import UUID

class SchemaUserCreate(BaseModel):
  name: str
  email: EmailStr
  profile_picture: Optional[str]

class SchemaUser(SchemaUserCreate):
  id: UUID
  model_config = {"from_attributes": True}
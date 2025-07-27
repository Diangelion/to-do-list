from datetime import date
from pydantic import BaseModel

# Date
class SchemaActivityDateCreate(BaseModel):
  date: date

class SchemaActivityDateGetAll(BaseModel):
  user_id: str
  model_config = {"from_attributes": True}

class SchemaActivityDateDelete(BaseModel):
  id: str

class SchemaActivityDate(BaseModel):
  id: str
  date: date

  model_config = {"from_attributes": True}

# Activity
class SchemaActivityCreate(BaseModel):
  date_id: str
  title: str
  description: str
  status: int

class SchemaActivityGetAll(BaseModel):
  date_id: str
  model_config = {"from_attributes": True}

class SchemaActivityDelete(BaseModel):
  id: str

class SchemaActivity(BaseModel):
  id: str
  title: str
  description: str
  status: int

  model_config = {"from_attributes": True}
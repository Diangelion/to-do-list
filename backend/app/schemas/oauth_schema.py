from pydantic import BaseModel

class SchemaOAuth(BaseModel):
  token: str
  provider: str
from pydantic import BaseModel

class OAuth(BaseModel):
  token: str
  provider: str
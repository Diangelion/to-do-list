from pydantic import BaseModel

class TokenData(BaseModel):
  user_id: str
  token_type: str
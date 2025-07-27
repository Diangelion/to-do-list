from pydantic import BaseModel

class SchemaTokenData(BaseModel):
  user_id: str
  token_type: str
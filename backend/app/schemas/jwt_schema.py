from pydantic import BaseModel

class SchemaTokenPayload(BaseModel):
  sub: str
  email: str
  iat: int
  exp: int
  jti: str
  type: str

class SchemaTokenData(BaseModel):
  user_id: str
  user_email: str
  token_type: str
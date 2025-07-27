import uuid
from sqlalchemy import Column, String, DateTime, func
from sqlalchemy.dialects.postgresql import UUID
from app.database import Base

class ModelUser(Base):
  __tablename__ = 'users'

  id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
  name = Column(String(100), nullable=False)
  email = Column(String(100), unique=True, nullable=False, index=True)
  profile_picture = Column(String(255), nullable=False)
  created_at = Column(
    DateTime(timezone=True),
    server_default=func.now(),
    nullable=False
  )
  updated_at = Column(
    DateTime(timezone=True),
    server_default=func.now(),
    onupdate=func.now(),
    nullable=False
  )
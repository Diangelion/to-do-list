from sqlalchemy import Column, String, DateTime, func
from sqlalchemy.dialects.postgresql import UUID
from app.database import Base

class User(Base):
  __tablename__ = 'users'

  id = Column(UUID(as_uuid=True), primary_key=True, index=True)
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

  # credential = relationship(
  #   "UserCredential",
  #   back_populates="user",
  #   uselist=False, # Makes this a scalar attribute (one-to-one)
  #   cascade="all, delete-orphan" #If a User is deleted, their credential is also deleted.
  # )

# class UserCredential(Base):
#   __tablename__ = 'user_credentials'

#   id = Column(UUID(as_uuid=True), primary_key=True)
#   user_id = Column(String(100), nullable=False, index=True)
#   refresh_token = Column(String(255), ForeignKey('users.id'), unique=True, nullable=False)

#   user = relationship("user", back_populates="credential")
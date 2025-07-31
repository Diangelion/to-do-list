from uuid import uuid4
from sqlalchemy import Column, String, DateTime, func, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.database import Base

class ModelActivityDate(Base):
  __tablename__ = 'activity_date'

  id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4, index=True)
  date = Column(DateTime(timezone=True), unique=True, nullable=False, index=True)
  created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
  updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)

  activities = relationship('ModelActivities', back_populates='activity_date', cascade='all, delete-orphan')


class ModelActivities(Base):
  __tablename__ = 'activities'

  id = Column(UUID(as_uuid=True), primary_key=True, default=uuid4, index=True)
  activity_date_id = Column(UUID(as_uuid=True), ForeignKey('activity_date.id', ondelete='CASCADE'), unique=True, nullable=False)
  title = Column(String(100), nullable=False)
  description = Column(String(255), nullable=False)
  created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
  updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)

  activity_date = relationship('ModelActivityDate', back_populates='activities', passive_deletes=True)

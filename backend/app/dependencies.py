from app.database import SessionLocal
from typing import Generator
from sqlalchemy.orm import Session
from fastapi import  Depends

def get_db() -> Generator[Session, None, None]:
  db = SessionLocal()
  try:
    yield db
  finally:
    db.close()

db_dependencies: Session = Depends(get_db)
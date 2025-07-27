from sqlalchemy.orm import Session
from app.models.todo_model import ModelActivityDate, ModelActivities
from app.schemas.todo_schema import (
  SchemaActivityDateCreate,
  SchemaActivityDateGetAll,
  SchemaActivityDateDelete,
  SchemaActivityDate,
  SchemaActivityCreate,
  SchemaActivityGetAll,
  SchemaActivityDelete,
  SchemaActivity
)

# Date
def service_create_date(req_data_schema: SchemaActivityDateCreate, db: Session):
  activity_date = ModelActivityDate(**req_data_schema.model_dump())
  db.add(activity_date)
  db.commit()
  db.refresh(activity_date)

def service_get_all_dates(req_data_schema: SchemaActivityDateGetAll, db: Session) -> list[SchemaActivityDate]:
  dates = db.query(ModelActivityDate).filter(ModelActivityDate.user_id == req_data_schema.user_id).all()
  return [SchemaActivityDate.model_validate(date) for date in dates]

def service_update_date(req_data_schema: SchemaActivityDate, db: Session) -> bool:
  updated = db.query(ModelActivityDate)\
               .filter(ModelActivityDate.id == req_data_schema.id)\
               .update(req_data_schema.model_dump(exclude_unset=True))
  db.commit()
  return updated > 0

def service_delete_date(req_data_schema: SchemaActivityDateDelete, db: Session) -> bool:
  deleted = db.query(ModelActivityDate)\
              .filter(ModelActivityDate.id == req_data_schema.id)\
              .delete()
  db.commit()
  return deleted > 0

# Activity
def service_create_activity(req_data_schema: SchemaActivityCreate, db: Session):
  activity = ModelActivities(
    activity_date_id=req_data_schema.date_id,
    title=req_data_schema.title,
    description=req_data_schema.description
  )
  db.add(activity)
  db.commit()
  db.refresh(activity)

def service_get_all_activities(req_data_schema: SchemaActivityGetAll, db: Session) -> list[SchemaActivity]:
  activities = db.query(ModelActivities).filter(ModelActivities.activity_date_id == req_data_schema.date_id).all()
  return [SchemaActivity.model_validate(activity) for activity in activities]

def service_update_activity(req_data_schema: SchemaActivity, db: Session) -> bool:
  updated = db.query(ModelActivities)\
            .filter(ModelActivities.id == req_data_schema.id)\
            .update(req_data_schema.model_dump(exclude_unset=True))
  db.commit()
  return updated > 0

def service_delete_activity(req_data_schema: SchemaActivityDelete, db: Session):
  deleted = db.query(ModelActivities)\
            .filter(ModelActivities.id == req_data_schema.id)\
            .delete()
  db.commit()
  return deleted > 0

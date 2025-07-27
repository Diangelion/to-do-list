from fastapi import APIRouter, status, Depends, Request
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
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
from app.services.todo_service import (
  service_create_date,
  service_get_all_dates,
  service_update_date,
  service_delete_date,
  service_create_activity,
  service_get_all_activities,
  service_update_activity,
  service_delete_activity
)
from app.utils.response_utils import json_response
from app.dependencies import get_db

router = APIRouter()

# Date
@router.post("/create-date", response_model=dict[str, str], status_code=status.HTTP_201_CREATED)
async def api_create_date(request: Request, db: Session = Depends(get_db)) -> JSONResponse:
  req_data = await request.json()
  req_data_schema = SchemaActivityDateCreate(**req_data)
  service_create_date(req_data_schema, db)
  return json_response(status.HTTP_201_CREATED, True, 'Date created')

@router.get("/get-all-dates", response_model=dict[str, str], status_code=status.HTTP_200_OK)
async def api_get_all_dates(request: Request, db: Session = Depends(get_db)) -> JSONResponse:
  req_data = await request.json()
  req_data_schema = SchemaActivityDateGetAll(**req_data)
  all_dates: list[SchemaActivityDate] = service_get_all_dates(req_data_schema, db)
  return json_response(status.HTTP_200_OK, True, 'Dates fetched', all_dates)

@router.post("/update-date", response_model=dict[str, str], status_code=status.HTTP_200_OK)
async def api_update_date(request: Request, db: Session = Depends(get_db)) -> JSONResponse:
  req_data = await request.json()
  req_data_schema = SchemaActivityDate(**req_data)
  service_update_date(req_data_schema, db)
  return json_response(status.HTTP_200_OK, True, 'Date updated')

@router.post("/delete-date", response_model=dict[str, str], status_code=status.HTTP_200_OK)
async def api_delete_date(request: Request, db: Session = Depends(get_db)) -> JSONResponse:
  req_data = await request.json()
  req_data_schema = SchemaActivityDateDelete(**req_data)
  service_delete_date(req_data_schema, db)
  return json_response(status.HTTP_200_OK, True, 'Date deleted')

# Activity
@router.post("/create-activity", response_model=dict[str, str], status_code=status.HTTP_201_CREATED)
async def api_create_activity(request: Request, db: Session = Depends(get_db)) -> JSONResponse:
  req_data = await request.json()
  req_data_schema = SchemaActivityCreate(**req_data)
  service_create_activity(req_data_schema, db)
  return json_response(status.HTTP_201_CREATED, True, 'Activity created')

@router.get("/get-all-activity", response_model=dict[str, str], status_code=status.HTTP_200_OK)
async def api_get_all_activities(request: Request, db: Session = Depends(get_db)) -> JSONResponse:
  req_data = await request.json()
  req_data_schema = SchemaActivityGetAll(**req_data)
  all_activities: list[SchemaActivity] = service_get_all_activities(req_data_schema, db)
  return json_response(status.HTTP_200_OK, True, 'Activities fetched', all_activities)

@router.post("/update-activity", response_model=dict[str, str], status_code=status.HTTP_200_OK)
async def api_update_activity(request: Request, db: Session = Depends(get_db)) -> JSONResponse:
  req_data = await request.json()
  req_data_schema = SchemaActivity(**req_data)
  service_update_activity(req_data_schema, db)
  return json_response(status.HTTP_200_OK, True, 'Activity updated')

@router.post("/delete-activity", response_model=dict[str, str], status_code=status.HTTP_200_OK)
async def api_delete_activity(request: Request, db: Session = Depends(get_db)) -> JSONResponse:
  req_data = await request.json()
  req_data_schema = SchemaActivityDelete(**req_data)
  service_delete_activity(req_data_schema, db)
  return json_response(status.HTTP_200_OK, True, 'Activity deleted')
import uvicorn
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.database import engine, Base
from app.routers import users

@asynccontextmanager
async def lifespan(app: FastAPI):
  Base.metadata.create_all(bind=engine)
  yield

def create_app() -> FastAPI:
  app = FastAPI(
    title="My FastAPI App",
    description="FastAPI application with environment-based configuration",
    version="1.0.0",
    debug=settings.debug,
    lifespan=lifespan
  )

  if settings.cors_origins:
    app.add_middleware(
      CORSMiddleware,
      allow_origins=settings.cors_origins,
      allow_credentials=True,
      allow_methods=["*"],
      allow_headers=["*"],
    )

  return app

app = create_app()

# Routers
app.include_router(users.router, prefix="/users", tags=["users"])

if __name__ == "__main__":
  uvicorn.run(
    "main:app",
    host=settings.api_host,
    port=settings.api_port,
    reload=settings.debug,
    log_level=settings.log_level.lower(),
  )
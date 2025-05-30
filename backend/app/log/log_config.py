import logging.config
from typing import Any
from app.settings import settings

LOGGING_CONFIG: dict[str, Any] = {
  "version": 1,
  "disable_existing_loggers": False,  # Preserve existing loggers (like Uvicorn's)
  "formatters": {
    "default_formatter": {
      "()": "uvicorn.logging.DefaultFormatter", # Uvicorn's formatter for console
      "fmt": "%(levelprefix)s %(asctime)s [%(name)s] :: %(message)s",
      "use_colors": None, # Will be True if console supports colors
    },
    "file_formatter": {
      "format": "%(asctime)s - %(levelname)s - [%(name)s:%(module)s:%(funcName)s:%(lineno)d] - %(message)s",
      "datefmt": "%Y-%m-%d %H:%M:%S",
    },
  },
  "handlers": {
    "console": {
      "class": "logging.StreamHandler",
      "formatter": "default_formatter",
      "level": "INFO",  # Log INFO and above to console
      "stream": "ext://sys.stdout", # Default is stderr
    },
    "rotating_file_handler": {
      "class": "logging.handlers.RotatingFileHandler",
      "formatter": "file_formatter",
      "filename": settings.log_path,
      "maxBytes": 10 * 1024 * 1024,  # 10 MB before rotating
      "backupCount": 3,  # Keep 3 backup log files
      "level": "DEBUG",  # Log DEBUG and above to file
    },
  },
  "loggers": {
    "root": { # Base logger, catches everything if specific loggers don't handle it
      "handlers": ["console", "rotating_file_handler"],
      "level": "DEBUG", # Lowest level for root, handlers can filter
      "propagate": False, # Avoid duplicate logs if children have handlers
    },
    "uvicorn": { # Configure Uvicorn's own loggers
      "handlers": ["console", "rotating_file_handler"],
      "level": "INFO",
      "propagate": False,
    },
    "uvicorn.error": {
      "handlers": ["console", "rotating_file_handler"],
      "level": "INFO", # Or DEBUG if you need more Uvicorn error details
      "propagate": False,
    },
    "uvicorn.access": {
      "handlers": ["console", "rotating_file_handler"], # You might want a simpler formatter for access logs in files
      "level": "INFO",
      "propagate": False,
    },
    "app": {  # Your application-specific logger
      "handlers": ["console", "rotating_file_handler"],
      "level": "DEBUG", # Control your app's log verbosity here
      "propagate": False, # Don't pass to root logger if handled here
    },
    # You can add more specific loggers for different parts of your app
    # "app.services.user_service": {
    #     "handlers": ["console", "rotating_file_handler"],
    #     "level": "DEBUG",
    #     "propagate": False,
    # },
    },
}

def setup_logging():
  logging.config.dictConfig(LOGGING_CONFIG)
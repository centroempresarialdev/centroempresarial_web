import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded

from app.core.config import settings
from app.core.middlewares import OWASPSecurityHeadersMiddleware, limiter
from app.api.v1.api import api_router

# Inicialización de la aplicación FastAPI
app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Backend API de Centro Empresarial con FastAPI, SQLModel y Neon PostgreSQL",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json"
)

# Integración del limitador de tasa SlowAPI
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# Middlewares de seguridad OWASP
app.add_middleware(OWASPSecurityHeadersMiddleware)

# CORS Middleware restrictivo para desarrollo y producción
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# Montar directorio local de archivos estáticos para fallback de medios
os.makedirs("static/uploads", exist_ok=True)
app.mount("/static", StaticFiles(directory="static"), name="static")

# Enrutador principal v1
app.include_router(api_router, prefix="/api/v1")


@app.get("/health", tags=["Estado del Sistema"])
async def health_check():
    """Endpoint de comprobación de salud del servicio."""
    return {
        "status": "healthy",
        "project": settings.PROJECT_NAME,
        "environment": settings.ENVIRONMENT
    }

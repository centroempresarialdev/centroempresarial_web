from typing import List, Union
from pydantic import AnyHttpUrl, validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore"
    )

    ENVIRONMENT: str = "development"
    PROJECT_NAME: str = "Centro Empresarial API"
    BACKEND_CORS_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:8080",
        "http://127.0.0.1:8080"
    ]

    # Neon Database URLs
    DATABASE_URL: str
    DATABASE_DIRECT_URL: str

    # JWT Security
    SECRET_KEY: str = "default_secret_key_needs_change_in_production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7

    # Cloudinary Credentials
    CLOUDINARY_CLOUD_NAME: str = ""
    CLOUDINARY_API_KEY: str = ""
    CLOUDINARY_API_SECRET: str = ""

    # AI Agent Hook
    ENABLE_AI_AGENT_INTEGRATION: bool = False
    AI_AGENT_API_KEY: str = ""

    # Microservice WhatsApp
    WHATSAPP_SERVICE_URL: str = "http://127.0.0.1:3001"
    INTERNAL_WHATSAPP_TOKEN: str = "ce_internal_secret_token_wa_9981"

    # SMTP Mail
    SMTP_HOST: str = "smtp.gmail.com"
    SMTP_PORT: int = 587
    SMTP_USER: str = ""
    SMTP_PASSWORD: str = ""
    EMAILS_FROM_EMAIL: str = "centroempresarialsac@gmail.com"
    EMAILS_FROM_NAME: str = "Centro Empresarial Ica"

    MAX_UPLOAD_SIZE_MB: int = 5


settings = Settings()

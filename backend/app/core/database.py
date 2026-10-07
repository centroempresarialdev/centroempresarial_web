import urllib.parse
from typing import AsyncGenerator
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker
from app.core.config import settings

# Ajustar y sanitizar URL y connect_args según el motor de base de datos
db_url = settings.DATABASE_URL
connect_args = {}

if "postgresql+asyncpg" in db_url:
    # asyncpg no admite sslmode ni channel_binding como parámetros de query en la URL
    parsed = urllib.parse.urlparse(db_url)
    query_params = urllib.parse.parse_qs(parsed.query)
    query_params.pop("sslmode", None)
    query_params.pop("channel_binding", None)
    query_params.pop("ssl", None) # se inyecta limpiamente en connect_args
    clean_query = urllib.parse.urlencode(query_params, doseq=True)
    db_url = urllib.parse.urlunparse(parsed._replace(query=clean_query))
    connect_args["ssl"] = "require"

engine = create_async_engine(
    db_url,
    echo=settings.ENVIRONMENT == "development",
    future=True,
    pool_pre_ping=True,
    pool_size=10,
    max_overflow=20,
    connect_args=connect_args
)

async_session_factory = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autocommit=False,
    autoflush=False
)

async def get_session() -> AsyncGenerator[AsyncSession, None]:
    """Inyector de dependencias para sesiones de base de datos asíncronas."""
    async with async_session_factory() as session:
        try:
            yield session
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()

import pytest_asyncio
from httpx import AsyncClient, ASGITransport
from sqlmodel import SQLModel
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker

from app.main import app
from app.core.database import get_session
from app.core.security import get_password_hash
from app.core.middlewares import limiter
from app.models.entities import User, MembershipPlan
import pytest

from app.core.config import settings

@pytest.fixture(autouse=True)
def disable_rate_limiter_and_set_testing():
    """Deshabilita SlowAPI rate limiter y fija entorno en testing durante los tests."""
    limiter.enabled = False
    old_env = settings.ENVIRONMENT
    settings.ENVIRONMENT = "testing"
    yield
    limiter.enabled = True
    settings.ENVIRONMENT = old_env

# Base de datos SQLite en memoria para pruebas unitarias rápidas y aisladas
TEST_DATABASE_URL = "sqlite+aiosqlite:///:memory:"

test_engine = create_async_engine(TEST_DATABASE_URL, echo=False)
test_session_factory = async_sessionmaker(
    bind=test_engine,
    class_=AsyncSession,
    expire_on_commit=False
)


@pytest_asyncio.fixture(scope="function")
async def db_session():
    async with test_engine.begin() as conn:
        await conn.run_sync(SQLModel.metadata.create_all)

    async with test_session_factory() as session:
        yield session

    async with test_engine.begin() as conn:
        await conn.run_sync(SQLModel.metadata.drop_all)


@pytest_asyncio.fixture(scope="function")
async def client(db_session: AsyncSession):
    async def override_get_session():
        yield db_session

    app.dependency_overrides[get_session] = override_get_session

    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        yield ac

    app.dependency_overrides.clear()


@pytest_asyncio.fixture(scope="function")
async def test_admin_user(db_session: AsyncSession) -> User:
    admin = User(
        email="admin@test.pe",
        hashed_password=get_password_hash("AdminPass123!"),
        full_name="Admin Test",
        role="admin",
        is_active=True
    )
    db_session.add(admin)
    await db_session.commit()
    await db_session.refresh(admin)
    return admin

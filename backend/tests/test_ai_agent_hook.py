import pytest
from httpx import AsyncClient
from sqlmodel.ext.asyncio.session import AsyncSession
from app.core.config import settings
from app.core.security import get_password_hash
from app.models.entities import User


@pytest.mark.asyncio
async def test_ai_agent_disabled_by_default(client: AsyncClient):
    """Verifica que el header X-API-Key sea rechazado con 403 si la integración está deshabilitada."""
    settings.ENABLE_AI_AGENT_INTEGRATION = False
    headers = {"X-API-Key": "any_key"}
    response = await client.get("/api/v1/leads", headers=headers)
    assert response.status_code == 403
    assert "deshabilitada" in response.json()["detail"]


@pytest.mark.asyncio
async def test_ai_agent_invalid_key_when_enabled(client: AsyncClient):
    """Verifica que con integración habilitada, una clave errónea reciba 401."""
    settings.ENABLE_AI_AGENT_INTEGRATION = True
    settings.AI_AGENT_API_KEY = "super_agent_secret_key_999"
    headers = {"X-API-Key": "wrong_key"}
    response = await client.get("/api/v1/leads", headers=headers)
    assert response.status_code == 401
    assert "inválida" in response.json()["detail"]
    # Restaurar
    settings.ENABLE_AI_AGENT_INTEGRATION = False


@pytest.mark.asyncio
async def test_ai_agent_rbac_restrictions(client: AsyncClient, db_session: AsyncSession):
    """
    Auditoría de Seguridad:
    Verifica que un agente con X-API-Key válida opere bajo rol 'ai_agent'
    y NO pueda ejecutar acciones destructivas de 'admin' (ej. borrar noticias).
    """
    settings.ENABLE_AI_AGENT_INTEGRATION = True
    settings.AI_AGENT_API_KEY = "test_agent_key_valid"

    # Crear entidad de agente
    agent_user = User(
        email="agent@system.local",
        hashed_password=get_password_hash("AgentSystemPass!"),
        full_name="Autonomous Content Agent",
        role="ai_agent",
        is_active=True
    )
    db_session.add(agent_user)
    await db_session.commit()

    headers = {"X-API-Key": "test_agent_key_valid"}

    # Intentar borrar noticia (requiere rol admin)
    del_resp = await client.delete("/api/v1/news/1", headers=headers)
    assert del_resp.status_code == 403
    assert "Permisos insuficientes" in del_resp.json()["detail"] or "No tienes los permisos" in del_resp.json()["detail"]

    # Restaurar
    settings.ENABLE_AI_AGENT_INTEGRATION = False

import pytest
from httpx import AsyncClient
from sqlmodel.ext.asyncio.session import AsyncSession
from app.core.security import get_password_hash
from app.models.entities import User


@pytest.mark.asyncio
async def test_auth_invalid_credentials(client: AsyncClient, test_admin_user):
    """Verifica que contraseñas erróneas sean rechazadas con 401 sin revelar existencia."""
    resp = await client.post(
        "/api/v1/auth/login",
        data={"username": "admin@test.pe", "password": "WrongPassword!"}
    )
    assert resp.status_code == 401
    assert "Credenciales de acceso incorrectas" in resp.json()["detail"]


@pytest.mark.asyncio
async def test_auth_inactive_user(client: AsyncClient, db_session: AsyncSession):
    """Verifica que usuarios inactivos no puedan iniciar sesión."""
    inactive = User(
        email="inactive@test.pe",
        hashed_password=get_password_hash("Pass12345!"),
        full_name="Usuario Inactivo",
        role="multifuncional",
        is_active=False
    )
    db_session.add(inactive)
    await db_session.commit()

    resp = await client.post(
        "/api/v1/auth/login",
        data={"username": "inactive@test.pe", "password": "Pass12345!"}
    )
    assert resp.status_code == 403
    assert "inactiva" in resp.json()["detail"]


@pytest.mark.asyncio
async def test_rbac_admin_vs_multifuncional(client: AsyncClient, db_session: AsyncSession):
    """Verifica que un usuario multifuncional no pueda ejecutar acciones exclusivas de admin."""
    # 1. Crear usuario multifuncional
    seller = User(
        email="vendedor@test.pe",
        hashed_password=get_password_hash("VendedorPass1!"),
        full_name="Vendedor Test",
        role="multifuncional",
        is_active=True
    )
    db_session.add(seller)
    await db_session.commit()

    # 2. Login de vendedor
    login_resp = await client.post(
        "/api/v1/auth/login",
        data={"username": "vendedor@test.pe", "password": "VendedorPass1!"}
    )
    token = login_resp.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    # 3. Intentar borrar una noticia (operación exclusiva de admin)
    del_resp = await client.delete("/api/v1/news/999", headers=headers)
    assert del_resp.status_code == 403
    assert "Permisos insuficientes" in del_resp.json()["detail"] or "No tienes los permisos" in del_resp.json()["detail"]

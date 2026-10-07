import pytest
from httpx import AsyncClient
from datetime import date, timedelta
from app.models.entities import MembershipPlan


@pytest.mark.asyncio
async def test_health_check(client: AsyncClient):
    """Comprueba el endpoint de salud /health."""
    response = await client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"


@pytest.mark.asyncio
async def test_auth_login_and_me(client: AsyncClient, test_admin_user):
    """Prueba de login por OAuth2 Password Request Form y lectura de /me."""
    login_data = {
        "username": "admin@test.pe",
        "password": "AdminPass123!"
    }
    response = await client.post("/api/v1/auth/login", data=login_data)
    assert response.status_code == 200
    token_data = response.json()
    assert "access_token" in token_data

    # Consultar /me con el Bearer token
    headers = {"Authorization": f"Bearer {token_data['access_token']}"}
    me_resp = await client.get("/api/v1/auth/me", headers=headers)
    assert me_resp.status_code == 200
    me_data = me_resp.json()
    assert me_data["email"] == "admin@test.pe"
    assert me_data["role"] == "admin"


@pytest.mark.asyncio
async def test_lead_creation_and_conversion(client: AsyncClient, test_admin_user, db_session):
    """Prueba completa del ciclo de vida de un Lead y su conversión a Cliente."""
    # 1. Crear plan base
    plan = MembershipPlan(name="Profesionales Test", price=480.00, billing_period="anual", is_active=True)
    db_session.add(plan)
    await db_session.commit()
    await db_session.refresh(plan)

    # 2. Login para obtener token
    login_resp = await client.post(
        "/api/v1/auth/login",
        data={"username": "admin@test.pe", "password": "AdminPass123!"}
    )
    token = login_resp.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    # 3. Registrar Lead público
    lead_payload = {
        "full_name": "Empresa Agrícola Ica SAC",
        "phone": "956987654",
        "email": "contacto@agricolaica.pe",
        "interested_type": "Empresa",
        "target_plan": "Empresarial",
        "message": "Solicitud de información corporativa"
    }
    lead_resp = await client.post("/api/v1/leads", json=lead_payload)
    assert lead_resp.status_code == 201
    lead_data = lead_resp.json()
    lead_id = lead_data["id"]
    assert lead_data["is_converted"] is False

    # 4. Convertir Lead a Cliente
    convert_payload = {
        "document_type": "RUC",
        "document_number": "20601234567",
        "plan_id": plan.id,
        "start_date": str(date.today()),
        "end_date": str(date.today() + timedelta(days=365)),
        "company_name": "Empresa Agrícola Ica SAC"
    }
    conv_resp = await client.post(f"/api/v1/leads/{lead_id}/convert", json=convert_payload, headers=headers)
    assert conv_resp.status_code == 200
    client_data = conv_resp.json()
    assert client_data["document_number"] == "20601234567"

    # 5. Idempotencia: intentar convertir de nuevo debe fallar
    second_conv = await client.post(f"/api/v1/leads/{lead_id}/convert", json=convert_payload, headers=headers)
    assert second_conv.status_code == 400
    assert "ya fue convertido" in second_conv.json()["detail"]

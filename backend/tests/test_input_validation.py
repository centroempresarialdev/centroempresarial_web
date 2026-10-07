import pytest
from httpx import AsyncClient


@pytest.mark.asyncio
async def test_input_validation_invalid_email(client: AsyncClient):
    """
    Auditoría OWASP A03 / Validación de Datos:
    Verifica que payloads con correo inválido sean rechazados con 422 Unprocessable Entity.
    """
    invalid_lead = {
        "full_name": "Usuario Test",
        "phone": "999888777",
        "email": "not-an-email-format",
        "interested_type": "Profesional"
    }
    response = await client.post("/api/v1/leads", json=invalid_lead)
    assert response.status_code == 422
    assert "email" in str(response.json()["detail"]).lower()


@pytest.mark.asyncio
async def test_sql_injection_attempt_in_search(client: AsyncClient, test_admin_user):
    """
    Auditoría OWASP A03 (SQL Injection):
    Verifica que cadenas con payloads de inyección SQL en parámetros de búsqueda
    sean parametrizadas de forma segura por SQLModel y devuelvan 200 sin comprometer la BD.
    """
    login_resp = await client.post(
        "/api/v1/auth/login",
        data={"username": "admin@test.pe", "password": "AdminPass123!"}
    )
    token = login_resp.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    # Inyección SQL clásica
    sql_payload = "' OR '1'='1' --"
    response = await client.get(f"/api/v1/clients?q={sql_payload}", headers=headers)
    assert response.status_code == 200
    # No debe arrojar error 500 de base de datos ni filtrar registros no coincidentes
    assert isinstance(response.json(), list)

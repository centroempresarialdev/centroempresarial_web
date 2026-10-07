import pytest
from httpx import AsyncClient
from sqlmodel.ext.asyncio.session import AsyncSession
from app.core.security import get_password_hash
from app.models.entities import User, Lead


@pytest.mark.asyncio
async def test_round_robin_lead_alternation(client: AsyncClient, db_session: AsyncSession):
    """
    Verifica que la asignación de leads se intercala de forma Round-Robin
    entre los usuarios con rol 'multifuncional', excluyendo al 'admin'.
    """
    # 1. Crear Admin (no debe recibir leads)
    admin = User(
        email="superadmin@test.pe",
        hashed_password=get_password_hash("AdminPass1!"),
        full_name="Admin Principal",
        role="admin",
        is_active=True
    )
    # 2. Crear Vendedor A y Vendedor B
    seller_a = User(
        email="seller_a@test.pe",
        hashed_password=get_password_hash("Pass123!"),
        full_name="Vendedor A",
        role="multifuncional",
        is_active=True
    )
    seller_b = User(
        email="seller_b@test.pe",
        hashed_password=get_password_hash("Pass123!"),
        full_name="Vendedor B",
        role="multifuncional",
        is_active=True
    )
    db_session.add_all([admin, seller_a, seller_b])
    await db_session.commit()
    await db_session.refresh(seller_a)
    await db_session.refresh(seller_b)

    # 3. Enviar primer lead
    lead1_data = {
        "full_name": "Lead Uno",
        "phone": "999111222",
        "email": "lead1@test.pe",
        "interested_type": "Profesional",
        "target_plan": "Profesionales"
    }
    resp1 = await client.post("/api/v1/leads", json=lead1_data)
    assert resp1.status_code == 201
    assigned_user_1 = resp1.json()["assigned_to_user_id"]
    assert assigned_user_1 in (seller_a.id, seller_b.id)

    # 4. Enviar segundo lead -> debe asignarse al OTRO vendedor
    lead2_data = {
        "full_name": "Lead Dos",
        "phone": "999333444",
        "email": "lead2@test.pe",
        "interested_type": "Empresa",
        "target_plan": "Empresarial"
    }
    resp2 = await client.post("/api/v1/leads", json=lead2_data)
    assert resp2.status_code == 201
    assigned_user_2 = resp2.json()["assigned_to_user_id"]
    assert assigned_user_2 in (seller_a.id, seller_b.id)
    assert assigned_user_2 != assigned_user_1, "El algoritmo Round-Robin debe alternar el vendedor"

    # 5. Enviar tercer lead -> debe rotar de vuelta al primer vendedor
    lead3_data = {
        "full_name": "Lead Tres",
        "phone": "999555666",
        "email": "lead3@test.pe",
        "interested_type": "Estudiante",
        "target_plan": "Estudiante"
    }
    resp3 = await client.post("/api/v1/leads", json=lead3_data)
    assert resp3.status_code == 201
    assigned_user_3 = resp3.json()["assigned_to_user_id"]
    assert assigned_user_3 == assigned_user_1, "El algoritmo Round-Robin debe rotar circularmente"

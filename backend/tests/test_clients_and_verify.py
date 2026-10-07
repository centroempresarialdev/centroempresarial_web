import pytest
from httpx import AsyncClient
from datetime import date, timedelta
from sqlmodel.ext.asyncio.session import AsyncSession
from app.models.entities import Client, Membership, MembershipPlan


@pytest.mark.asyncio
async def test_verify_membership_public_cases(client: AsyncClient, db_session: AsyncSession):
    """
    Verifica los tres casos del endpoint público de verificación de membresías:
    1. Documento inexistente -> is_valid: False
    2. Membresía activa vigente -> is_valid: True
    3. Membresía vencida -> is_valid: False
    """
    # 1. Documento que no existe
    resp_none = await client.get("/api/v1/clients/verify/00000000")
    assert resp_none.status_code == 200
    assert resp_none.json()["is_valid"] is False

    # Crear plan base
    plan = MembershipPlan(name="Plan Empresarial", price=1500.00, billing_period="anual", is_active=True)
    db_session.add(plan)
    await db_session.commit()
    await db_session.refresh(plan)

    # 2. Cliente con membresía ACTIVA vigente
    active_client = Client(
        full_name="Asociado Activo",
        document_type="DNI",
        document_number="71234567",
        email="activo@test.pe",
        phone="987123456",
        client_type="Profesional"
    )
    db_session.add(active_client)
    await db_session.commit()
    await db_session.refresh(active_client)

    active_mem = Membership(
        client_id=active_client.id,
        plan_id=plan.id,
        start_date=date.today() - timedelta(days=30),
        end_date=date.today() + timedelta(days=335),
        status="Activa",
        certificate_code="CE-2026-ACTIVE"
    )
    db_session.add(active_mem)
    await db_session.commit()

    resp_active = await client.get(f"/api/v1/clients/verify/{active_client.document_number}")
    assert resp_active.status_code == 200
    data_active = resp_active.json()
    assert data_active["is_valid"] is True
    assert data_active["client_name"] == "Asociado Activo"
    assert data_active["status"] == "Activa"

    # 3. Cliente con membresía VENCIDA
    expired_client = Client(
        full_name="Asociado Vencido",
        document_type="DNI",
        document_number="78999888",
        email="vencido@test.pe",
        phone="987654321",
        client_type="Estudiante"
    )
    db_session.add(expired_client)
    await db_session.commit()
    await db_session.refresh(expired_client)

    expired_mem = Membership(
        client_id=expired_client.id,
        plan_id=plan.id,
        start_date=date.today() - timedelta(days=400),
        end_date=date.today() - timedelta(days=35),
        status="Activa", # La fecha ya pasó
        certificate_code="CE-2025-EXPIRED"
    )
    db_session.add(expired_mem)
    await db_session.commit()

    resp_expired = await client.get(f"/api/v1/clients/verify/{expired_client.document_number}")
    assert resp_expired.status_code == 200
    data_expired = resp_expired.json()
    assert data_expired["is_valid"] is False
    assert "Vencida" in data_expired["status"]

from datetime import date
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import select
from sqlalchemy.orm import selectinload
from app.core.database import get_session
from app.api.deps import require_role
from app.models.entities import Client, Membership, MembershipPlan, User
from app.schemas.dtos import (
    ClientCreate,
    ClientUpdate,
    ClientOut,
    MembershipCreate,
    MembershipOut,
    MembershipVerifyResponse
)

router = APIRouter()


@router.get("", response_model=List[ClientOut])
async def list_clients(
    q: Optional[str] = Query(None, description="Búsqueda por nombre o documento"),
    client_type: Optional[str] = None,
    session: AsyncSession = Depends(get_session),
    current_user: User = Depends(require_role(["admin", "multifuncional"]))
):
    """Directorio de clientes registrados con sus membresías activas."""
    query = select(Client).options(selectinload(Client.memberships))

    if q:
        search_pattern = f"%{q.strip()}%"
        query = query.where(
            (Client.full_name.ilike(search_pattern)) | 
            (Client.document_number.ilike(search_pattern)) |
            (Client.email.ilike(search_pattern))
        )

    if client_type:
        query = query.where(Client.client_type == client_type)

    query = query.order_by(Client.created_at.desc())
    result = await session.exec(query)
    return result.all()


@router.get("/{client_id}", response_model=ClientOut)
async def get_client(
    client_id: int,
    session: AsyncSession = Depends(get_session),
    current_user: User = Depends(require_role(["admin", "multifuncional"]))
):
    """Detalle completo del cliente con contratos de membresía."""
    query = select(Client).where(Client.id == client_id).options(selectinload(Client.memberships))
    result = await session.exec(query)
    client = result.first()
    if not client:
        raise HTTPException(status_code=404, detail="Cliente no encontrado")
    return client


@router.put("/{client_id}", response_model=ClientOut)
async def update_client(
    client_id: int,
    payload: ClientUpdate,
    session: AsyncSession = Depends(get_session),
    current_user: User = Depends(require_role(["admin", "multifuncional"]))
):
    """Actualiza datos de contacto o consentimiento del cliente."""
    query = select(Client).where(Client.id == client_id).options(selectinload(Client.memberships))
    result = await session.exec(query)
    client = result.first()
    if not client:
        raise HTTPException(status_code=404, detail="Cliente no encontrado")

    update_dict = payload.model_dump(exclude_unset=True)
    for key, value in update_dict.items():
        setattr(client, key, value)

    session.add(client)
    await session.commit()
    
    # Recargar con relaciones
    refreshed = await session.exec(query)
    return refreshed.first()


@router.post("/{client_id}/memberships", response_model=MembershipOut)
async def add_membership_to_client(
    client_id: int,
    payload: MembershipCreate,
    session: AsyncSession = Depends(get_session),
    current_user: User = Depends(require_role(["admin", "multifuncional"]))
):
    """Registra una renovación o nueva membresía para el cliente."""
    client = await session.get(Client, client_id)
    if not client:
        raise HTTPException(status_code=404, detail="Cliente no encontrado")

    plan = await session.get(MembershipPlan, payload.plan_id)
    if not plan or not plan.is_active:
        raise HTTPException(status_code=400, detail="Plan de membresía inexistente o inactivo")

    if payload.end_date <= payload.start_date:
        raise HTTPException(status_code=400, detail="La fecha de fin debe ser posterior a la de inicio")

    cert_code = payload.certificate_code or f"CE-{payload.start_date.year}-{client.id:04d}-R"

    membership = Membership(
        client_id=client.id,
        plan_id=plan.id,
        start_date=payload.start_date,
        end_date=payload.end_date,
        status="Activa",
        certificate_code=cert_code
    )
    session.add(membership)
    await session.commit()
    await session.refresh(membership)
    return membership


@router.get("/verify/{document_number}", response_model=MembershipVerifyResponse)
async def verify_membership_public(
    document_number: str,
    session: AsyncSession = Depends(get_session)
):
    """
    Endpoint público para aliados (Piskus, Intedya, Portón, etc.).
    Permite validar si un DNI/RUC tiene membresía activa vigente sin exponer datos sensibles.
    """
    clean_doc = document_number.strip()
    query = (
        select(Client)
        .where(Client.document_number == clean_doc)
        .options(selectinload(Client.memberships))
    )
    result = await session.exec(query)
    client = result.first()

    if not client:
        return MembershipVerifyResponse(is_valid=False)

    today = date.today()
    # Buscar membresía vigente
    active_membership = next(
        (m for m in client.memberships if m.start_date <= today <= m.end_date and m.status == "Activa"),
        None
    )

    if not active_membership:
        return MembershipVerifyResponse(
            is_valid=False,
            client_name=client.full_name,
            document_number=client.document_number,
            status="Inactiva / Vencida"
        )

    plan = await session.get(MembershipPlan, active_membership.plan_id)

    return MembershipVerifyResponse(
        is_valid=True,
        client_name=client.full_name,
        document_number=client.document_number,
        plan_name=plan.name if plan else "Membresía Activa",
        status="Activa",
        valid_until=active_membership.end_date
    )

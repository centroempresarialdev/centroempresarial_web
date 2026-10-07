from datetime import datetime, timezone
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Request, BackgroundTasks
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import select
from sqlalchemy.orm import selectinload
from app.core.database import get_session
from app.core.middlewares import limiter
from app.api.deps import get_current_user, require_role
from app.models.entities import Lead, Client, Membership, MembershipPlan, User
from app.schemas.dtos import LeadCreate, LeadOut, LeadConvertRequest, ClientOut
from app.services.round_robin import assign_lead_round_robin
from app.services.email_service import send_lead_assigned_email

router = APIRouter()


@router.post("", response_model=LeadOut, status_code=status.HTTP_201_CREATED)
@limiter.limit("3/minute")
async def create_public_lead(
    request: Request,
    payload: LeadCreate,
    background_tasks: BackgroundTasks,
    session: AsyncSession = Depends(get_session)
):
    """
    Endpoint público consumido por el formulario de la página web (Contact.tsx).
    Protegido contra SPAM con Rate Limiter de 3 peticiones por minuto por IP.
    Aplica Round-Robin para asignar un vendedor y le despacha un correo.
    """
    # 1. Asignar vendedor por Round-Robin (excluyendo a administradores)
    assigned_seller = await assign_lead_round_robin(session)

    # 2. Crear lead
    new_lead = Lead(
        full_name=payload.full_name.strip(),
        phone=payload.phone.strip(),
        email=payload.email.strip().lower(),
        interested_type=payload.interested_type,
        target_plan=payload.target_plan,
        message=payload.message.strip() if payload.message else None,
        assigned_to_user_id=assigned_seller.id if assigned_seller else None
    )
    session.add(new_lead)
    await session.commit()
    await session.refresh(new_lead)

    # 3. Despachar correo en segundo plano al vendedor si existe
    if assigned_seller:
        background_tasks.add_task(send_lead_assigned_email, assigned_seller, new_lead)

    return new_lead


@router.get("", response_model=List[LeadOut])
async def list_leads(
    is_converted: Optional[bool] = False,
    only_assigned: Optional[bool] = False,
    session: AsyncSession = Depends(get_session),
    current_user: User = Depends(require_role(["admin", "multifuncional"]))
):
    """
    Listado de prospectos para el Dashboard.
    - Con permisos totales, admin y multifuncional visualizan todos los leads.
    - Opcionalmente se puede filtrar solo los asignados con `only_assigned=true`.
    """
    query = select(Lead)
    if is_converted is not None:
        query = query.where(Lead.is_converted == is_converted)

    if only_assigned:
        query = query.where(Lead.assigned_to_user_id == current_user.id)

    query = query.order_by(Lead.created_at.desc())
    result = await session.exec(query)
    return result.all()


@router.post("/{lead_id}/resend")
async def resend_lead_notification(
    lead_id: int,
    background_tasks: BackgroundTasks,
    session: AsyncSession = Depends(get_session),
    current_user: User = Depends(require_role(["admin", "multifuncional"]))
):
    """Reenvía la ficha del lead por correo al vendedor asignado."""
    lead = await session.get(Lead, lead_id)
    if not lead:
        raise HTTPException(status_code=404, detail="Lead no encontrado")

    if not lead.assigned_to_user_id:
        raise HTTPException(status_code=400, detail="Este lead no tiene vendedor asignado actualmente")

    seller = await session.get(User, lead.assigned_to_user_id)
    if not seller:
        raise HTTPException(status_code=404, detail="Vendedor asignado no encontrado")

    background_tasks.add_task(send_lead_assigned_email, seller, lead)
    return {"message": f"Notificación reenviada a {seller.email} con éxito"}


@router.post("/{lead_id}/convert", response_model=ClientOut)
async def convert_lead_to_client(
    lead_id: int,
    payload: LeadConvertRequest,
    session: AsyncSession = Depends(get_session),
    current_user: User = Depends(require_role(["admin", "multifuncional"]))
):
    """
    Convierte de forma atómica un prospecto a Cliente oficial con su Membresía.
    Preserva el registro de Lead con fines de auditoría histórica.
    """
    lead = await session.get(Lead, lead_id)
    if not lead:
        raise HTTPException(status_code=404, detail="Lead no encontrado")
    if lead.is_converted:
        raise HTTPException(status_code=400, detail="Este prospecto ya fue convertido a cliente previamente")

    # Validar fechas
    if payload.end_date <= payload.start_date:
        raise HTTPException(status_code=400, detail="La fecha de finalización debe ser posterior a la de inicio")

    # Validar existencia de plan
    plan = await session.get(MembershipPlan, payload.plan_id)
    if not plan or not plan.is_active:
        raise HTTPException(status_code=400, detail="El plan de membresía seleccionado no existe o está inactivo")

    # Validar documento único
    existing_doc = await session.exec(select(Client).where(Client.document_number == payload.document_number.strip()))
    if existing_doc.first():
        raise HTTPException(status_code=400, detail="Ya existe un cliente registrado con ese número de documento")

    # Crear cliente
    new_client = Client(
        full_name=lead.full_name,
        document_type=payload.document_type,
        document_number=payload.document_number.strip(),
        email=lead.email,
        phone=lead.phone,
        client_type=lead.interested_type,
        company_name=payload.company_name,
        notes=f"Convertido desde Lead #{lead.id} por {current_user.full_name}"
    )
    session.add(new_client)
    await session.flush()

    # Generar código de certificado
    cert_code = f"CE-{payload.start_date.year}-{new_client.id:04d}"

    membership = Membership(
        client_id=new_client.id,
        plan_id=plan.id,
        start_date=payload.start_date,
        end_date=payload.end_date,
        status="Activa",
        certificate_code=cert_code
    )
    session.add(membership)

    # Actualizar Lead para auditoría (no se borra)
    lead.is_converted = True
    lead.converted_to_client_id = new_client.id
    lead.converted_at = datetime.now(timezone.utc)
    session.add(lead)

    await session.commit()
    
    # Recargar con selectinload para serialización asíncrona segura de ClientOut
    res = await session.exec(
        select(Client).where(Client.id == new_client.id).options(selectinload(Client.memberships))
    )
    return res.first()

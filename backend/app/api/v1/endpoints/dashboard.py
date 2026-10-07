from datetime import date
from typing import Dict, Any
from fastapi import APIRouter, Depends
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import select, func
from sqlalchemy.orm import selectinload

from app.core.database import get_session
from app.api.deps import require_role
from app.models.entities import Lead, Client, Membership, News, Event, Partner, User

router = APIRouter()


@router.get("/stats")
async def get_dashboard_stats(
    session: AsyncSession = Depends(get_session),
    current_user: User = Depends(require_role(["admin", "multifuncional"]))
) -> Dict[str, Any]:
    """Estadísticas consolidadas para el Dashboard Administrativo."""
    # 1. Total leads y desglose
    total_leads = (await session.exec(select(func.count(Lead.id)))).one() or 0
    pending_leads = (await session.exec(
        select(func.count(Lead.id)).where(Lead.is_converted == False)
    )).one() or 0
    converted_leads = (await session.exec(
        select(func.count(Lead.id)).where(Lead.is_converted == True)
    )).one() or 0

    # 2. Total clientes y membresías activas
    total_clients = (await session.exec(select(func.count(Client.id)))).one() or 0
    today = date.today()
    active_memberships = (await session.exec(
        select(func.count(Membership.id))
        .where(Membership.status == "Activa")
        .where(Membership.end_date >= today)
    )).one() or 0

    # 3. Contenido
    total_news = (await session.exec(select(func.count(News.id)))).one() or 0
    total_events = (await session.exec(select(func.count(Event.id)))).one() or 0
    total_partners = (await session.exec(select(func.count(Partner.id)))).one() or 0

    # 4. Últimos leads
    recent_leads_query = select(Lead).order_by(Lead.created_at.desc()).limit(6)
    recent_leads = (await session.exec(recent_leads_query)).all()

    # 5. Últimos clientes con membresías
    recent_clients_query = (
        select(Client)
        .options(selectinload(Client.memberships))
        .order_by(Client.created_at.desc())
        .limit(5)
    )
    recent_clients = (await session.exec(recent_clients_query)).all()

    return {
        "kpis": {
            "pending_leads": pending_leads,
            "converted_leads": converted_leads,
            "total_leads": total_leads,
            "total_clients": total_clients,
            "active_memberships": active_memberships,
            "total_news": total_news,
            "total_events": total_events,
            "total_partners": total_partners,
        },
        "recent_leads": recent_leads,
        "recent_clients": recent_clients,
        "server_time": today.isoformat(),
    }

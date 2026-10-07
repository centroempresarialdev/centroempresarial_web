from typing import List
from fastapi import APIRouter, Depends, HTTPException, status, Query, BackgroundTasks
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import select
from app.core.database import get_session
from app.api.deps import require_role
from app.models.entities import Event, User
from app.schemas.dtos import EventCreate, EventUpdate, EventOut
from app.services.email_service import dispatch_broadcast

router = APIRouter()


@router.get("", response_model=List[EventOut])
async def list_events(
    limit: int = Query(20, le=100),
    offset: int = 0,
    session: AsyncSession = Depends(get_session)
):
    """
    Endpoint público con la cartelera de eventos futuros.
    (La web es informativa, sin registro de asistentes).
    """
    query = (
        select(Event)
        .where(Event.is_published == True)
        .order_by(Event.event_date.asc())
        .offset(offset)
        .limit(limit)
    )
    result = await session.exec(query)
    return result.all()


@router.get("/{slug}", response_model=EventOut)
async def get_event_by_slug(slug: str, session: AsyncSession = Depends(get_session)):
    """Detalle de un evento o webinar por su slug amigable."""
    result = await session.exec(select(Event).where(Event.slug == slug))
    event_item = result.first()
    if not event_item:
        raise HTTPException(status_code=404, detail="Evento no encontrado")
    return event_item


@router.post("", response_model=EventOut, status_code=status.HTTP_201_CREATED)
async def create_event(
    payload: EventCreate,
    background_tasks: BackgroundTasks,
    session: AsyncSession = Depends(get_session),
    current_user: User = Depends(require_role(["admin", "multifuncional"]))
):
    """
    Creación de evento o webinar corporativo.
    Despacha automáticamente difusión por correo a clientes y leads.
    """
    existing_slug = await session.exec(select(Event).where(Event.slug == payload.slug))
    if existing_slug.first():
        raise HTTPException(status_code=400, detail="Ya existe un evento con este slug")

    new_event = Event(
        title=payload.title,
        slug=payload.slug,
        event_type=payload.event_type,
        description=payload.description,
        banner_url=payload.banner_url,
        event_date=payload.event_date,
        location=payload.location,
        is_published=payload.is_published,
        organizer_id=current_user.id
    )
    session.add(new_event)
    await session.commit()
    await session.refresh(new_event)

    if new_event.is_published:
        background_tasks.add_task(
            dispatch_broadcast,
            entity_type="EVENT",
            entity_id=new_event.id,
            title=f"Nuevo Evento: {new_event.title}",
            summary=new_event.description[:200] + "...",
            media_url=new_event.banner_url,
            session=session
        )

    return new_event


@router.put("/{event_id}", response_model=EventOut)
async def update_event(
    event_id: int,
    payload: EventUpdate,
    session: AsyncSession = Depends(get_session),
    current_user: User = Depends(require_role(["admin", "multifuncional"]))
):
    """Actualiza la información de un evento existente."""
    event_item = await session.get(Event, event_id)
    if not event_item:
        raise HTTPException(status_code=404, detail="Evento no encontrado")

    update_dict = payload.model_dump(exclude_unset=True)
    for key, value in update_dict.items():
        setattr(event_item, key, value)

    session.add(event_item)
    await session.commit()
    await session.refresh(event_item)
    return event_item


@router.delete("/{event_id}")
async def delete_event(
    event_id: int,
    session: AsyncSession = Depends(get_session),
    current_user: User = Depends(require_role(["admin", "multifuncional"]))
):
    """Eliminación de un evento (admin y multifuncional)."""
    event_item = await session.get(Event, event_id)
    if not event_item:
        raise HTTPException(status_code=404, detail="Evento no encontrado")

    await session.delete(event_item)
    await session.commit()
    return {"message": "Evento eliminado correctamente"}

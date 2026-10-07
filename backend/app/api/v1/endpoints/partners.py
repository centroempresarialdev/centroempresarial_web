from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import select
from app.core.database import get_session
from app.api.deps import require_role
from app.models.entities import Partner, User
from app.schemas.dtos import PartnerCreate, PartnerUpdate, PartnerOut

router = APIRouter()


@router.get("", response_model=List[PartnerOut])
async def list_partners(session: AsyncSession = Depends(get_session)):
    """
    Directorio público de empresas y colegios profesionales aliados.
    Consumido por la página de Aliados Estratégicos (Partners.tsx).
    """
    query = (
        select(Partner)
        .where(Partner.is_active == True)
        .order_by(Partner.display_order.asc(), Partner.name.asc())
    )
    result = await session.exec(query)
    return result.all()


@router.post("", response_model=PartnerOut, status_code=status.HTTP_201_CREATED)
async def create_partner(
    payload: PartnerCreate,
    session: AsyncSession = Depends(get_session),
    current_user: User = Depends(require_role(["admin", "multifuncional"]))
):
    """Alta de nuevo aliado institucional (admin y multifuncional)."""
    new_partner = Partner(
        name=payload.name,
        logo_url=payload.logo_url,
        summary=payload.summary,
        benefits_json=payload.benefits_json,
        display_order=payload.display_order,
        is_active=payload.is_active
    )
    session.add(new_partner)
    await session.commit()
    await session.refresh(new_partner)
    return new_partner


@router.put("/{partner_id}", response_model=PartnerOut)
async def update_partner(
    partner_id: int,
    payload: PartnerUpdate,
    session: AsyncSession = Depends(get_session),
    current_user: User = Depends(require_role(["admin", "multifuncional"]))
):
    """Actualización de un convenio o logotipo aliado."""
    partner = await session.get(Partner, partner_id)
    if not partner:
        raise HTTPException(status_code=404, detail="Aliado no encontrado")

    update_dict = payload.model_dump(exclude_unset=True)
    for key, value in update_dict.items():
        setattr(partner, key, value)

    session.add(partner)
    await session.commit()
    await session.refresh(partner)
    return partner


@router.delete("/{partner_id}")
async def delete_partner(
    partner_id: int,
    session: AsyncSession = Depends(get_session),
    current_user: User = Depends(require_role(["admin", "multifuncional"]))
):
    """Eliminación de un aliado del catálogo."""
    partner = await session.get(Partner, partner_id)
    if not partner:
        raise HTTPException(status_code=404, detail="Aliado no encontrado")

    await session.delete(partner)
    await session.commit()
    return {"message": "Aliado eliminado correctamente"}

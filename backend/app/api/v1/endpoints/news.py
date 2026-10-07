from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query, BackgroundTasks
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import select
from app.core.database import get_session
from app.api.deps import require_role
from app.models.entities import News, User
from app.schemas.dtos import NewsCreate, NewsUpdate, NewsOut
from app.services.email_service import dispatch_broadcast

router = APIRouter()


@router.get("", response_model=List[NewsOut])
async def list_news(
    category: Optional[str] = None,
    limit: int = Query(20, le=100),
    offset: int = 0,
    session: AsyncSession = Depends(get_session)
):
    """
    Endpoint público para la sección Noticias de la web (News.tsx).
    Devuelve únicamente artículos marcados como publicados.
    """
    query = select(News).where(News.is_published == True)
    if category:
        query = query.where(News.category == category)
    query = query.order_by(News.published_at.desc()).offset(offset).limit(limit)
    result = await session.exec(query)
    return result.all()


@router.get("/{slug}", response_model=NewsOut)
async def get_news_by_slug(slug: str, session: AsyncSession = Depends(get_session)):
    """Detalle de una noticia por su slug amigable SEO."""
    result = await session.exec(select(News).where(News.slug == slug))
    news_item = result.first()
    if not news_item:
        raise HTTPException(status_code=404, detail="Noticia no encontrada")
    return news_item


@router.post("", response_model=NewsOut, status_code=status.HTTP_201_CREATED)
async def create_news(
    payload: NewsCreate,
    background_tasks: BackgroundTasks,
    session: AsyncSession = Depends(get_session),
    current_user: User = Depends(require_role(["admin", "multifuncional"]))
):
    """
    Publicación de noticia empresarial.
    Despacha automáticamente un correo de difusión masiva en segundo plano
    hacia todos los clientes y leads registrados con consentimiento.
    """
    # Validar slug único
    existing_slug = await session.exec(select(News).where(News.slug == payload.slug))
    if existing_slug.first():
        raise HTTPException(status_code=400, detail="Ya existe una noticia con este slug")

    new_article = News(
        title=payload.title,
        slug=payload.slug,
        category=payload.category,
        tag=payload.tag,
        summary=payload.summary,
        content=payload.content,
        flyer_url=payload.flyer_url,
        whatsapp_cta_message=payload.whatsapp_cta_message,
        is_published=payload.is_published,
        author_id=current_user.id
    )
    session.add(new_article)
    await session.commit()
    await session.refresh(new_article)

    # Disparar difusión masiva por correo si está publicado
    if new_article.is_published:
        background_tasks.add_task(
            dispatch_broadcast,
            entity_type="NEWS",
            entity_id=new_article.id,
            title=new_article.title,
            summary=new_article.summary,
            media_url=new_article.flyer_url,
            session=session
        )

    return new_article


@router.put("/{news_id}", response_model=NewsOut)
async def update_news(
    news_id: int,
    payload: NewsUpdate,
    session: AsyncSession = Depends(get_session),
    current_user: User = Depends(require_role(["admin", "multifuncional"]))
):
    """Actualiza una noticia existente."""
    article = await session.get(News, news_id)
    if not article:
        raise HTTPException(status_code=404, detail="Noticia no encontrada")

    update_dict = payload.model_dump(exclude_unset=True)
    for key, value in update_dict.items():
        setattr(article, key, value)

    session.add(article)
    await session.commit()
    await session.refresh(article)
    return article


@router.delete("/{news_id}")
async def delete_news(
    news_id: int,
    session: AsyncSession = Depends(get_session),
    current_user: User = Depends(require_role(["admin", "multifuncional"]))
):
    """Eliminación de una noticia (admin y multifuncional)."""
    article = await session.get(News, news_id)
    if not article:
        raise HTTPException(status_code=404, detail="Noticia no encontrada")

    await session.delete(article)
    await session.commit()
    return {"message": "Noticia eliminada correctamente"}

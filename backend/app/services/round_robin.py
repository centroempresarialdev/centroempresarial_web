from datetime import datetime, timezone
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import select
from app.models.entities import User


async def assign_lead_round_robin(session: AsyncSession) -> User | None:
    """
    Selecciona al vendedor con rol 'multifuncional' que lleva más tiempo sin recibir lead.
    Utiliza bloqueo a nivel de fila (FOR UPDATE) en PostgreSQL para evitar condiciones de carrera.
    """
    stmt = (
        select(User.id)
        .where(User.role == "multifuncional", User.is_active == True)
        .order_by(User.last_lead_assigned_at.asc().nulls_first())
        .limit(1)
    )

    # Solo aplicar FOR UPDATE en PostgreSQL (evita error de sintaxis en SQLite durante tests)
    bind = session.get_bind()
    if bind and getattr(bind, "dialect", None) and bind.dialect.name == "postgresql":
        stmt = stmt.with_for_update()

    result = await session.exec(stmt)
    user_id = result.first()

    if not user_id:
        return None

    vendedor = await session.get(User, user_id)
    if vendedor:
        vendedor.last_lead_assigned_at = datetime.now(timezone.utc)
        session.add(vendedor)
        await session.flush()

    return vendedor

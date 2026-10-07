from datetime import date, timedelta
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, status, Security, Query
from pydantic import BaseModel
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import select
from sqlalchemy.orm import selectinload

from app.core.config import settings
from app.core.database import get_session
from app.api.deps import require_role, get_current_user, oauth2_scheme, api_key_header
from app.models.entities import Client, Membership, MembershipPlan, WhatsAppLog, User
from app.services.whatsapp_client import send_whatsapp_message

router = APIRouter()


async def check_admin_or_dev(
    token: Optional[str] = Depends(oauth2_scheme),
    api_key: Optional[str] = Security(api_key_header),
    session: AsyncSession = Depends(get_session)
) -> Optional[User]:
    """Permite ejecución si el usuario es admin/multifuncional, o libremente en entorno development."""
    if token or api_key:
        user = await get_current_user(token=token, api_key=api_key, session=session)
        if user.role not in ["admin", "multifuncional", "ai_agent"]:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="No tienes los permisos requeridos para ejecutar esta operación"
            )
        return user
    if settings.ENVIRONMENT == "development":
        return None
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Credenciales de autenticación no proporcionadas"
    )


class WhatsAppDirectSend(BaseModel):
    phone: str
    message: str


@router.post("/send")
async def send_manual_message(
    payload: WhatsAppDirectSend,
    current_user: User = Depends(require_role(["admin", "multifuncional"]))
):
    """Envía un mensaje directo de WhatsApp a cualquier número."""
    ok = await send_whatsapp_message(payload.phone, payload.message)
    if not ok:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="No se pudo comunicar con el servicio de WhatsApp"
        )
    return {"status": "en_cola", "message": "Mensaje encolado en el microservicio de WhatsApp"}


@router.get(
    "/reminders/run",
    summary="Ejecutar escaneo de recordatorios de membresías (GET)",
    tags=["Clientes & Membresías"]
)
@router.post(
    "/reminders/run",
    summary="Ejecutar escaneo de recordatorios de membresías (POST)",
    tags=["Clientes & Membresías"]
)
async def run_membership_reminders(
    force: bool = Query(False, description="Forzar re-envío aunque ya se haya emitido recordatorio hoy"),
    session: AsyncSession = Depends(get_session),
    current_user: Optional[User] = Depends(check_admin_or_dev)
):
    """
    Escaneo de membresías próximas a vencer (30 días y 5 días antes).
    Genera mensajes personalizados y los encola con retardos anti-bloqueo.
    """
    today = date.today()
    target_30 = today + timedelta(days=30)
    target_5 = today + timedelta(days=5)

    # Buscar membresías activas que vencen en 30 o 5 días
    query = (
        select(Membership)
        .where(
            Membership.status == "Activa",
            (Membership.end_date == target_30) | (Membership.end_date == target_5)
        )
        .options(selectinload(Membership.client), selectinload(Membership.plan))
    )
    result = await session.exec(query)
    memberships = result.all()

    enqueued_count = 0

    for mem in memberships:
        client = mem.client
        if not client or not client.opt_in_whatsapp:
            continue

        # Evitar re-enviar si ya se le envió recordatorio hoy (a menos que se use force=True)
        if not force and mem.last_whatsapp_reminder_sent == today:
            continue

        days_remaining = (mem.end_date - today).days
        plan_name = mem.plan.name if mem.plan else "Membresía Centro Empresarial"

        if days_remaining <= 5:
            template_type = "REMINDER_5"
            msg = (
                f"👋 Hola {client.full_name}, le saludamos de Centro Empresarial.\n\n"
                f"⚠️ Le recordamos que su membresía *{plan_name}* vence en solo *{days_remaining} días* "
                f"({mem.end_date.strftime('%d/%m/%Y')}).\n\n"
                f"Para no perder sus descuentos en capacitaciones y beneficios con nuestros aliados, "
                f"puede renovar respondiendo a este mensaje. ¡Estamos a su servicio!"
            )
        else:
            template_type = "REMINDER_30"
            msg = (
                f"Estimado(a) {client.full_name}, reciba un cordial saludo de Centro Empresarial.\n\n"
                f"Le informamos que su membresía *{plan_name}* vencerá el próximo *{mem.end_date.strftime('%d/%m/%Y')}* "
                f"(en 30 días).\n\n"
                f"Le invitamos a continuar siendo parte de nuestra red de asociados. Si desea gestionar su renovación "
                f"o consultar nuevos convenios, por favor responda a esta conversación."
            )

        # Encolar en WhatsApp microservicio
        sent = await send_whatsapp_message(client.phone, msg)
        
        # Registrar en auditoría
        log = WhatsAppLog(
            client_id=client.id,
            phone=client.phone,
            template_type=template_type,
            message_content=msg,
            status="EN_COLA" if sent else "ERROR",
            attempts=1
        )
        session.add(log)

        if sent:
            mem.last_whatsapp_reminder_sent = today
            session.add(mem)
            enqueued_count += 1

    await session.commit()
    return {
        "status": "completado",
        "recordatorios_encolados": enqueued_count,
        "total_analizados": len(memberships)
    }


@router.get(
    "/welcome/{client_id}",
    summary="Enviar bienvenida por WhatsApp (GET)",
    tags=["Clientes & Membresías"]
)
@router.post(
    "/welcome/{client_id}",
    summary="Enviar bienvenida por WhatsApp (POST)",
    tags=["Clientes & Membresías"]
)
async def send_welcome_whatsapp(
    client_id: int,
    session: AsyncSession = Depends(get_session),
    current_user: Optional[User] = Depends(check_admin_or_dev)
):
    """Envía el mensaje de bienvenida y confirmación de membresía al asociado."""
    query = (
        select(Client)
        .where(Client.id == client_id)
        .options(selectinload(Client.memberships))
    )
    result = await session.exec(query)
    client = result.first()
    if not client:
        raise HTTPException(status_code=404, detail="Cliente no encontrado")

    active_mem = next((m for m in client.memberships if m.status == "Activa"), None)
    cert_code = active_mem.certificate_code if active_mem else f"CE-{client.id:04d}"

    msg = (
        f"🎉 ¡Bienvenido(a) a Centro Empresarial, *{client.full_name}*!\n\n"
        f"Su membresía institucional se encuentra activa con el código oficial: *#{cert_code}*.\n\n"
        f"Con este código y su documento ({client.document_type} {client.document_number}) puede acceder a:\n"
        f"✅ 50% de descuento en capacitaciones y webinars empresariales.\n"
        f"✅ Descuentos preferenciales con nuestros aliados estratégicos.\n"
        f"✅ Acceso al directorio y red de contactos.\n\n"
        f"¡Gracias por confiar en nosotros para el crecimiento de su desarrollo profesional y empresarial!"
    )

    sent = await send_whatsapp_message(client.phone, msg)

    log = WhatsAppLog(
        client_id=client.id,
        phone=client.phone,
        template_type="WELCOME",
        message_content=msg,
        status="EN_COLA" if sent else "ERROR",
        attempts=1
    )
    session.add(log)
    await session.commit()

    return {"status": "en_cola", "cliente": client.full_name, "telefono": client.phone}

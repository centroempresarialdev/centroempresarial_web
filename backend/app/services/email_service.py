import logging
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import select
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig, MessageType
from app.core.config import settings
from app.models.entities import Client, Lead, EmailBroadcastLog, User

logger = logging.getLogger("centroempresarial.email")

clean_smtp_password = settings.SMTP_PASSWORD.replace(" ", "") if settings.SMTP_PASSWORD else ""

mail_config = ConnectionConfig(
    MAIL_USERNAME=settings.SMTP_USER,
    MAIL_PASSWORD=clean_smtp_password,
    MAIL_FROM=settings.EMAILS_FROM_EMAIL,
    MAIL_PORT=settings.SMTP_PORT,
    MAIL_SERVER=settings.SMTP_HOST,
    MAIL_STARTTLS=True,
    MAIL_SSL_TLS=False,
    USE_CREDENTIALS=bool(settings.SMTP_USER and clean_smtp_password),
    MAIL_FROM_NAME=settings.EMAILS_FROM_NAME
)


async def send_lead_assigned_email(seller: User, lead: Lead) -> bool:
    """Envía un correo con la ficha del prospecto al vendedor asignado."""
    if not settings.SMTP_USER or not settings.SMTP_PASSWORD:
        logger.info(f"[EMAIL MOCK] Notificación de Lead #{lead.id} para vendedor {seller.email} ({seller.full_name})")
        return True

    html_content = f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
        <h2 style="color: #0f172a; margin-top: 0;">Nuevo Lead Asignado: {lead.full_name}</h2>
        <p style="color: #475569;">Hola <strong>{seller.full_name}</strong>, se te ha asignado un nuevo prospecto interesado desde la página web:</p>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;"><strong>Nombre / Razón Social:</strong></td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">{lead.full_name}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;"><strong>Teléfono / WhatsApp:</strong></td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">{lead.phone}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;"><strong>Correo Electrónico:</strong></td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">{lead.email}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;"><strong>Perfil:</strong></td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">{lead.interested_type}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;"><strong>Plan de Interés:</strong></td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">{lead.target_plan or 'No especificado'}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;"><strong>Mensaje adicional:</strong></td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">{lead.message or 'Sin consulta adicional'}</td></tr>
        </table>
        
        <p style="color: #64748b; font-size: 13px;">Contacta al prospecto lo antes posible para concretar su membresía.</p>
    </div>
    """

    try:
        fast_mail = FastMail(mail_config)
        message = MessageSchema(
            subject=f"Nuevo Lead Asignado: {lead.full_name} — Centro Empresarial",
            recipients=[seller.email],
            body=html_content,
            subtype=MessageType.html
        )
        await fast_mail.send_message(message)
        logger.info(f"[EMAIL] Notificación de lead enviada exitosamente a {seller.email}")
        return True
    except Exception as ex:
        logger.error(f"[EMAIL ERROR] Error enviando correo a {seller.email}: {ex}")
        return False


async def dispatch_broadcast(entity_type: str, entity_id: int, title: str, summary: str, media_url: str, session: AsyncSession):
    """
    Envía boletín por correo a clientes suscritos y leads activos.
    Registra cada envío en EmailBroadcastLog con control anti-duplicados.
    """
    clients_res = await session.exec(select(Client.email).where(Client.opt_in_newsletter == True))
    leads_res = await session.exec(select(Lead.email).where(Lead.is_converted == False))

    unique_recipients = set(clients_res.all()).union(set(leads_res.all()))
    if not unique_recipients:
        return

    html_content = f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
        <h2 style="color: #0f172a; margin-top: 0;">{title}</h2>
        <p style="color: #475569; font-size: 15px; line-height: 1.6;">{summary}</p>
        <div style="margin: 20px 0; text-align: center;">
            <img src="{media_url}" alt="Flyer" style="max-width: 100%; border-radius: 6px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);" />
        </div>
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 25px 0;" />
        <p style="font-size: 12px; color: #94a3b8; text-align: center;">
            Centro Empresarial — Ica, Perú | Para solicitar no recibir más novedades responda a este correo indicando 'BAJA'.
        </p>
    </div>
    """

    for email in unique_recipients:
        # Prevenir duplicados
        existing_log = await session.exec(
            select(EmailBroadcastLog).where(
                EmailBroadcastLog.recipient_email == email,
                EmailBroadcastLog.entity_type == entity_type,
                EmailBroadcastLog.entity_id == entity_id,
                EmailBroadcastLog.status == "ENVIADO"
            )
        )
        if existing_log.first():
            continue

        log_entry = EmailBroadcastLog(
            recipient_email=email,
            recipient_type="CONTACT",
            subject=f"Novedad: {title}",
            entity_type=entity_type,
            entity_id=entity_id,
            status="PENDIENTE"
        )
        session.add(log_entry)
        await session.flush()

        if settings.SMTP_USER and settings.SMTP_PASSWORD:
            try:
                fast_mail = FastMail(mail_config)
                message = MessageSchema(
                    subject=f"Novedad: {title} — Centro Empresarial",
                    recipients=[email],
                    body=html_content,
                    subtype=MessageType.html
                )
                await fast_mail.send_message(message)
                log_entry.status = "ENVIADO"
            except Exception as ex:
                log_entry.status = "FALLIDO"
                log_entry.error_message = str(ex)
        else:
            # Mock mode si no hay credenciales SMTP configuradas
            log_entry.status = "ENVIADO"

        session.add(log_entry)

    await session.commit()

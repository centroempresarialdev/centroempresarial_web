import logging
import httpx
from app.core.config import settings

logger = logging.getLogger("centroempresarial.whatsapp")


async def send_whatsapp_message(phone: str, message: str) -> bool:
    """
    Envía una petición al microservicio interno de WhatsApp (whatsapp-service)
    para encolar un mensaje con retardos humanos anti-bloqueo.
    """
    url = f"{settings.WHATSAPP_SERVICE_URL}/api/send-message"
    headers = {
        "x-internal-token": settings.INTERNAL_WHATSAPP_TOKEN,
        "Content-Type": "application/json"
    }
    payload = {
        "phone": phone,
        "message": message
    }

    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            resp = await client.post(url, json=payload, headers=headers)
            if resp.status_code in (200, 202):
                logger.info(f"[WhatsApp OK] Mensaje encolado exitosamente para {phone}")
                return True
            else:
                logger.error(f"[WhatsApp Error] Falló respuesta ({resp.status_code}): {resp.text}")
                return False
    except Exception as e:
        logger.error(f"[WhatsApp Error] No se pudo conectar con el microservicio en {url}: {e}")
        return False

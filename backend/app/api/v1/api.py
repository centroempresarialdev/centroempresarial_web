from fastapi import APIRouter
from app.api.v1.endpoints import (
    auth,
    leads,
    clients,
    news,
    events,
    partners,
    uploads,
    whatsapp,
)

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["Autenticación & Sesión"])
api_router.include_router(leads.router, prefix="/leads", tags=["Leads & Contacto"])
api_router.include_router(clients.router, prefix="/clients", tags=["Clientes & Membresías"])
api_router.include_router(news.router, prefix="/news", tags=["Noticias Empresariales"])
api_router.include_router(events.router, prefix="/events", tags=["Eventos & Webinars"])
api_router.include_router(partners.router, prefix="/partners", tags=["Aliados & Convenios"])
api_router.include_router(uploads.router, prefix="/uploads", tags=["Multimedia Cloudinary"])
api_router.include_router(whatsapp.router, prefix="/whatsapp", tags=["WhatsApp Automatizado"])

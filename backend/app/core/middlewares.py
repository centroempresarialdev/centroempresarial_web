from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import Response
from slowapi import Limiter
from slowapi.util import get_remote_address
from app.core.config import settings

# Rate Limiter por dirección IP en memoria (OWASP)
limiter = Limiter(key_func=get_remote_address)

class OWASPSecurityHeadersMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next) -> Response:
        response = await call_next(request)
        
        # Prevenir MIME-Sniffing
        response.headers["X-Content-Type-Options"] = "nosniff"
        
        # Prevenir Clickjacking
        response.headers["X-Frame-Options"] = "DENY"
        
        # Referrer Policy restrictiva
        response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
        
        # Content Security Policy (permite Swagger docs y llamadas API en local)
        response.headers["Content-Security-Policy"] = (
            "default-src 'self'; "
            "img-src 'self' data: https: res.cloudinary.com; "
            "style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; "
            "script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net;"
        )
        
        # HSTS exclusivo para producción HTTPS
        if settings.ENVIRONMENT == "production":
            response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
            
        return response

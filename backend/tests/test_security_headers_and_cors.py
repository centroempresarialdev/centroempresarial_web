import pytest
from httpx import AsyncClient


@pytest.mark.asyncio
async def test_owasp_security_headers_present(client: AsyncClient):
    """
    Auditoría OWASP A05 (Security Misconfiguration):
    Comprueba que cada respuesta HTTP incluya cabeceras de endurecimiento obligatorias.
    """
    response = await client.get("/health")
    assert response.status_code == 200

    headers = response.headers
    # Anti MIME-Sniffing
    assert headers.get("X-Content-Type-Options") == "nosniff"
    # Anti Clickjacking
    assert headers.get("X-Frame-Options") == "DENY"
    # Referrer Policy segura
    assert headers.get("Referrer-Policy") == "strict-origin-when-cross-origin"
    # Content Security Policy definida
    assert "Content-Security-Policy" in headers


@pytest.mark.asyncio
async def test_cors_headers_on_allowed_origin(client: AsyncClient):
    """
    Auditoría CORS:
    Verifica que orígenes autorizados (localhost:5173 de React Vite) reciban cabeceras CORS.
    """
    headers = {
        "Origin": "http://localhost:5173",
        "Access-Control-Request-Method": "POST",
        "Access-Control-Request-Headers": "content-type"
    }
    response = await client.options("/api/v1/leads", headers=headers)
    assert response.status_code == 200
    assert response.headers.get("access-control-allow-origin") == "http://localhost:5173"
    assert "POST" in response.headers.get("access-control-allow-methods", "")

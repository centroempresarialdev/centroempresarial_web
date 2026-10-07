import pytest
import io
from httpx import AsyncClient


@pytest.mark.asyncio
async def test_upload_image_rejects_fake_extension(client: AsyncClient, test_admin_user):
    """
    Auditoría OWASP A03 / RCE:
    Verifica que subir un archivo ejecutable/texto disfrazado con extensión .jpg o .png
    sea rechazado con 400 por no coincidir con los magic bytes de imagen permitidos.
    """
    login_resp = await client.post(
        "/api/v1/auth/login",
        data={"username": "admin@test.pe", "password": "AdminPass123!"}
    )
    token = login_resp.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    # Archivo falso: contenido de texto plano haciéndose pasar por PNG
    fake_png_content = b"<?php echo 'malicious script'; ?>"
    fake_file = io.BytesIO(fake_png_content)

    files = {"file": ("malicious.png", fake_file, "image/png")}
    response = await client.post("/api/v1/uploads", files=files, headers=headers)
    assert response.status_code == 400
    assert "Tipo de archivo no permitido" in response.json()["detail"]


@pytest.mark.asyncio
async def test_upload_valid_minimal_png(client: AsyncClient, test_admin_user):
    """Verifica que un archivo PNG con cabecera binaria real sea aceptado."""
    login_resp = await client.post(
        "/api/v1/auth/login",
        data={"username": "admin@test.pe", "password": "AdminPass123!"}
    )
    token = login_resp.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    # 1x1 PNG transparente válido con Magic Bytes: \x89PNG\r\n\x1a\n
    valid_png_bytes = (
        b'\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01\x08\x06'
        b'\x00\x00\x00\x1f\x15c4\x00\x00\x00\rIDATx\x9cc\xf8\xff\xff?\x00\x05\xfe\x02'
        b'\xfe\r\xef\x0f\n\x00\x00\x00\x00IEND\xaeB`\x82'
    )
    valid_file = io.BytesIO(valid_png_bytes)
    files = {"file": ("pixel.png", valid_file, "image/png")}

    response = await client.post("/api/v1/uploads", files=files, headers=headers)
    assert response.status_code == 200
    data = response.json()
    assert "url" in data
    assert data["format"] == "png"

import os
import uuid
import filetype
import cloudinary
import cloudinary.uploader
from fastapi import UploadFile, HTTPException, status
from app.core.config import settings

# Configurar Cloudinary si las credenciales están presentes
if settings.CLOUDINARY_CLOUD_NAME and settings.CLOUDINARY_API_KEY and settings.CLOUDINARY_API_SECRET:
    cloudinary.config(
        cloud_name=settings.CLOUDINARY_CLOUD_NAME,
        api_key=settings.CLOUDINARY_API_KEY,
        api_secret=settings.CLOUDINARY_API_SECRET,
        secure=True
    )

ALLOWED_EXTENSIONS = {"jpg", "jpeg", "png", "webp"}
MAX_FILE_BYTES = settings.MAX_UPLOAD_SIZE_MB * 1024 * 1024


async def save_verified_image(upload_file: UploadFile, folder: str = "centro_empresarial") -> dict:
    """
    Valida los magic bytes de la imagen y la sube a Cloudinary.
    Fallback a guardado local seguro si Cloudinary no está configurado.
    """
    content = await upload_file.read()
    
    # 1. Validación de tamaño
    if len(content) > MAX_FILE_BYTES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"El archivo excede el tamaño máximo permitido de {settings.MAX_UPLOAD_SIZE_MB}MB"
        )

    # 2. Validación de Magic Bytes reales (prevención RCE / XSS)
    kind = filetype.guess(content)
    if kind is None or kind.extension not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Tipo de archivo no permitido. Solo se aceptan: {', '.join(ALLOWED_EXTENSIONS)}"
        )

    # 3. Subida a Cloudinary si las credenciales están configuradas con valores reales
    has_real_cloudinary = (
        settings.CLOUDINARY_CLOUD_NAME
        and settings.CLOUDINARY_API_KEY
        and settings.CLOUDINARY_CLOUD_NAME not in ("tu_cloud_name", "change_me", "")
        and settings.ENVIRONMENT != "testing"
    )

    if has_real_cloudinary:
        try:
            upload_result = cloudinary.uploader.upload(
                content,
                folder=folder,
                resource_type="image",
                public_id=f"ce_{uuid.uuid4().hex[:12]}"
            )
            return {
                "url": upload_result["secure_url"],
                "public_id": upload_result.get("public_id"),
                "format": upload_result.get("format"),
                "bytes": upload_result.get("bytes", len(content))
            }
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Error al subir imagen a Cloudinary: {str(e)}"
            )

    # Fallback local seguro si aún no se configuran credenciales de Cloudinary
    safe_filename = f"{uuid.uuid4().hex}.{kind.extension}"
    target_dir = os.path.join("static", "uploads", folder)
    os.makedirs(target_dir, exist_ok=True)
    local_path = os.path.join(target_dir, safe_filename)

    with open(local_path, "wb") as f:
        f.write(content)

    return {
        "url": f"/static/uploads/{folder}/{safe_filename}",
        "public_id": safe_filename,
        "format": kind.extension,
        "bytes": len(content)
    }

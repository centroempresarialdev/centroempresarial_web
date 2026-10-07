from fastapi import APIRouter, Depends, UploadFile, File, Query
from app.api.deps import require_role
from app.models.entities import User
from app.schemas.dtos import UploadResponse
from app.services.storage_service import save_verified_image

router = APIRouter()


@router.post("", response_model=UploadResponse)
async def upload_image(
    file: UploadFile = File(...),
    folder: str = Query("flyers", description="Subcarpeta de destino en Cloudinary (flyers, logos)"),
    current_user: User = Depends(require_role(["admin", "multifuncional"]))
):
    """
    Sube y valida una imagen (flyer de noticia, banner de evento o logotipo de aliado) a Cloudinary.
    Inspecciona magic bytes (JPG, PNG, WEBP) para máxima seguridad (OWASP A03).
    """
    result = await save_verified_image(file, folder=folder)
    return result

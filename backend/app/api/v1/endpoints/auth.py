from fastapi import APIRouter, Depends, HTTPException, status, Request
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import select
from app.core.database import get_session
from app.core.security import verify_password, create_access_token, create_refresh_token
from app.core.middlewares import limiter
from app.models.entities import User
from app.schemas.dtos import Token, UserOut
from app.api.deps import get_current_user

router = APIRouter()


@router.post("/login", response_model=Token)
@limiter.limit("5/minute")
async def login_for_access_token(
    request: Request,
    form_data: OAuth2PasswordRequestForm = Depends(),
    session: AsyncSession = Depends(get_session)
):
    """
    Autenticación del Dashboard (Form URL-Encoded standard OAuth2).
    Protegido con Rate Limit de 5 intentos por minuto por IP contra ataques de fuerza bruta.
    """
    result = await session.exec(select(User).where(User.email == form_data.username))
    user = result.first()

    # Mensaje genérico para prevenir enumeración de usuarios (OWASP A07)
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenciales de acceso incorrectas",
            headers={"WWW-Authenticate": "Bearer"},
        )

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="La cuenta se encuentra inactiva. Contacte al administrador."
        )

    access_token = create_access_token(subject=user.id)
    refresh_token = create_refresh_token(subject=user.id)

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "refresh_token": refresh_token
    }


@router.get("/me", response_model=UserOut)
async def read_current_user(current_user: User = Depends(get_current_user)):
    """Retorna la información del usuario autenticado en el Dashboard."""
    return current_user

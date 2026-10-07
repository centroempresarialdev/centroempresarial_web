from typing import Optional, List
from fastapi import Depends, HTTPException, status, Security
from fastapi.security import OAuth2PasswordBearer, APIKeyHeader
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import select
import jwt

from app.core.config import settings
from app.core.database import get_session
from app.models.entities import User

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login", auto_error=False)
api_key_header = APIKeyHeader(name="X-API-Key", auto_error=False)


async def get_current_user(
    token: Optional[str] = Depends(oauth2_scheme),
    api_key: Optional[str] = Security(api_key_header),
    session: AsyncSession = Depends(get_session)
) -> User:
    """
    Autenticación desacoplada:
    1. Si se envía Bearer JWT -> Valida usuario del dashboard (admin o multifuncional).
    2. Si se envía X-API-Key -> Valida agente de IA si el flag está activo.
    """
    # 1. Validación de Token JWT (Dashboard)
    if token:
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
            user_id = payload.get("sub")
            if not user_id:
                raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token no contiene identificador")
            user_id_int = int(user_id)
        except (jwt.PyJWTError, ValueError):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token de autenticación inválido o expirado"
            )

        user = await session.get(User, user_id_int)
        if not user or not user.is_active:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Usuario inexistente o inactivo"
            )
        return user

    # 2. Validación de API Key para Agentes de IA
    if api_key:
        if not settings.ENABLE_AI_AGENT_INTEGRATION:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="La integración con Agentes de IA se encuentra deshabilitada"
            )
        if api_key != settings.AI_AGENT_API_KEY:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Clave X-API-Key de Agente inválida"
            )

        # Buscar usuario con rol ai_agent
        result = await session.exec(select(User).where(User.role == "ai_agent"))
        agent_user = result.first()
        if not agent_user:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Perfil de sistema 'ai_agent' no inicializado en la base de datos"
            )
        return agent_user

    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Credenciales de autenticación no proporcionadas"
    )


def require_role(allowed_roles: List[str]):
    """Guardia de control de acceso RBAC por roles."""
    async def role_checker(current_user: User = Depends(get_current_user)) -> User:
        user_roles = {current_user.role}
        # Multifuncional cuenta con permisos totales equivalentes a admin
        if current_user.role in ("admin", "multifuncional"):
            user_roles.update({"admin", "multifuncional"})

        if not user_roles.intersection(allowed_roles):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="No tienes los permisos requeridos para realizar esta operación"
            )
        return current_user
    return role_checker

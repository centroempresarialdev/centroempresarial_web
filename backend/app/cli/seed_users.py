import asyncio
from sqlmodel import select
from app.core.database import async_session_factory
from app.core.security import get_password_hash
from app.models.entities import User

USERS_TO_SEED = [
    {
        "email": "centroempresarialsac@gmail.com",
        "password": "AdminCentro2026!",
        "full_name": "Administrador General",
        "role": "admin",
    },
    {
        "email": "ventas1@centroempresarial.pe",
        "password": "VentasPass2026!",
        "full_name": "Asesor de Ventas 1",
        "role": "multifuncional",
    },
    {
        "email": "ventas2@centroempresarial.pe",
        "password": "VentasPass2026!",
        "full_name": "Asesor de Ventas 2",
        "role": "multifuncional",
    },
]


async def seed_users():
    async with async_session_factory() as session:
        for u in USERS_TO_SEED:
            result = await session.exec(select(User).where(User.email == u["email"]))
            user = result.first()
            if user:
                user.hashed_password = get_password_hash(u["password"])
                user.full_name = u["full_name"]
                user.role = u["role"]
                user.is_active = True
                session.add(user)
                print(f"[ACTUALIZADO] {u['email']} -> Rol: {u['role']}")
            else:
                new_user = User(
                    email=u["email"],
                    hashed_password=get_password_hash(u["password"]),
                    full_name=u["full_name"],
                    role=u["role"],
                    is_active=True
                )
                session.add(new_user)
                print(f"[CREADO] {u['email']} -> Rol: {u['role']}")

        await session.commit()
        print("[OK] Todos los usuarios han sido configurados correctamente en Neon.")


if __name__ == "__main__":
    asyncio.run(seed_users())

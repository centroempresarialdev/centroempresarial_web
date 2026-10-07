import asyncio
import sys
from decimal import Decimal
from sqlmodel import select
from app.core.database import async_session_factory
from app.core.security import get_password_hash
from app.models.entities import User, MembershipPlan


async def init_system_data(admin_email: str, admin_pass: str, admin_name: str):
    """Crea el superadministrador inicial y los planes de membresía base si no existen."""
    async with async_session_factory() as session:
        # 1. Crear Administrador Inicial
        user_res = await session.exec(select(User).where(User.email == admin_email))
        existing_admin = user_res.first()

        if existing_admin:
            print(f"[*] El usuario {admin_email} ya existe en el sistema.")
        else:
            admin_user = User(
                email=admin_email,
                hashed_password=get_password_hash(admin_pass),
                full_name=admin_name,
                role="admin",
                is_active=True
            )
            session.add(admin_user)
            print(f"[+] Administrador inicial creado: {admin_email} (Rol: admin)")

        # 2. Sembrar Planes de Membresía Iniciales
        default_plans = [
            {
                "name": "Estudiante",
                "price": Decimal("360.00"),
                "billing_period": "anual",
                "benefits_json": '["Capacitaciones con 50% de descuento","Videos empresariales gratuitos","Blog empresarial gratuito","Monografias y tesis con 20% de descuento"]'
            },
            {
                "name": "Profesionales",
                "price": Decimal("480.00"),
                "billing_period": "anual",
                "benefits_json": '["Capacitaciones con 50% de descuento","Acceso a videos y blogs","Postgrado con 20% de descuento","Eventos y webinars internacionales","Alianzas con colegios profesionales"]'
            },
            {
                "name": "Empresarial",
                "price": Decimal("1500.00"),
                "billing_period": "anual",
                "benefits_json": '["Capacitaciones de negocios con ponentes internacionales","Asesorias con instituciones publicas y privadas","Consultorias y auditorias","Asesoramiento en tecnologia y mejora continua","Asesoria en inteligencia artificial"]'
            }
        ]

        for p_data in default_plans:
            p_res = await session.exec(select(MembershipPlan).where(MembershipPlan.name == p_data["name"]))
            if not p_res.first():
                plan = MembershipPlan(**p_data)
                session.add(plan)
                print(f"[+] Plan inicial creado: {plan.name} ({plan.price} {plan.billing_period})")

        await session.commit()
        print("[OK] Inicializacion de datos completada exitosamente.")


if __name__ == "__main__":
    email = sys.argv[1] if len(sys.argv) > 1 else "admin@centroempresarial.pe"
    password = sys.argv[2] if len(sys.argv) > 2 else "AdminPass2026!"
    name = sys.argv[3] if len(sys.argv) > 3 else "Administrador General"

    print("Iniciando configuración base...")
    asyncio.run(init_system_data(email, password, name))

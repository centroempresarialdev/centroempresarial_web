import asyncio
import sys
from datetime import date, timedelta
from sqlmodel import select
from app.core.database import async_session_factory
from app.models.entities import Client, Membership, MembershipPlan


async def seed_demo_memberships(custom_phone: str = None):
    """
    Crea 3 clientes con sus respectivas membresias:
    1. Estudiante  -> Vence en 30 dias (dispara alerta preventivo WhatsApp REMINDER_30)
    2. Profesional -> Vence en 5 dias  (dispara alerta urgente WhatsApp REMINDER_5)
    3. Empresarial -> Recien iniciada  (para probar bienvenida WhatsApp WELCOME)
    """
    today = date.today()
    default_phone = custom_phone if custom_phone else "51987654321"

    demo_data = [
        {
            "client": {
                "full_name": "Carlos Mendoza Silva",
                "document_type": "DNI",
                "document_number": "72819201",
                "email": "carlos.mendoza@universidad.edu.pe",
                "phone": default_phone,
                "client_type": "Estudiante",
                "company_name": "Universidad Nacional",
                "opt_in_whatsapp": True,
            },
            "plan_name": "Estudiante",
            "start_offset_days": -335,
            "end_offset_days": 30,  # Vence exactamente en 30 días
            "certificate_code": "CE-EST-2026-001",
        },
        {
            "client": {
                "full_name": "Dra. Patricia Alva Morales",
                "document_type": "DNI",
                "document_number": "48291029",
                "email": "patricia.alva@consultores.pe",
                "phone": default_phone,
                "client_type": "Profesional",
                "company_name": "Alva & Asociados",
                "opt_in_whatsapp": True,
            },
            "plan_name": "Profesionales",
            "start_offset_days": -360,
            "end_offset_days": 5,  # Vence exactamente en 5 días
            "certificate_code": "CE-PRO-2026-002",
        },
        {
            "client": {
                "full_name": "Innovaciones Digitales S.A.C.",
                "document_type": "RUC",
                "document_number": "20601928374",
                "email": "contacto@innovacionesdigitales.pe",
                "phone": default_phone,
                "client_type": "Empresa",
                "company_name": "Innovaciones Digitales S.A.C.",
                "opt_in_whatsapp": True,
            },
            "plan_name": "Empresarial",
            "start_offset_days": 0,
            "end_offset_days": 365,  # Nueva membresía anual
            "certificate_code": "CE-EMP-2026-003",
        },
    ]

    async with async_session_factory() as session:
        # Recuperar planes existentes
        plans_res = await session.exec(select(MembershipPlan))
        plans = {p.name: p.id for p in plans_res.all()}

        print(f"[*] Planes disponibles en BD: {list(plans.keys())}")

        created_count = 0
        for item in demo_data:
            c_info = item["client"]
            plan_id = plans.get(item["plan_name"])

            if not plan_id:
                print(f"[!] Plan '{item['plan_name']}' no encontrado, saltando...")
                continue

            # Verificar si el cliente ya existe por documento
            res = await session.exec(
                select(Client).where(Client.document_number == c_info["document_number"])
            )
            client = res.first()

            if not client:
                client = Client(**c_info)
                session.add(client)
                await session.flush()
                print(f"[+] Cliente creado: {client.full_name} ({client.document_number})")
            else:
                client.phone = default_phone
                client.opt_in_whatsapp = True
                session.add(client)
                print(f"[*] Cliente existente actualizado: {client.full_name}")

            # Verificar o crear membresía
            mem_res = await session.exec(
                select(Membership).where(Membership.certificate_code == item["certificate_code"])
            )
            mem = mem_res.first()

            start_d = today + timedelta(days=item["start_offset_days"])
            end_d = today + timedelta(days=item["end_offset_days"])

            if not mem:
                mem = Membership(
                    client_id=client.id,
                    plan_id=plan_id,
                    start_date=start_d,
                    end_date=end_d,
                    status="Activa",
                    certificate_code=item["certificate_code"],
                    last_whatsapp_reminder_sent=None,
                )
                session.add(mem)
                print(f"[+] Membresia creada: Plan={item['plan_name']} | Vence={end_d} (en {item['end_offset_days']} dias) | Cert={mem.certificate_code}")
                created_count += 1
            else:
                mem.end_date = end_d
                mem.status = "Activa"
                mem.last_whatsapp_reminder_sent = None
                session.add(mem)
                print(f"[*] Membresia actualizada: Plan={item['plan_name']} | Nueva fecha vencimiento={end_d}")
                created_count += 1

        await session.commit()
        print(f"\n[OK] {created_count} membresias preparadas exitosamente para pruebas de WhatsApp.")


if __name__ == "__main__":
    phone = sys.argv[1] if len(sys.argv) > 1 else None
    asyncio.run(seed_demo_memberships(phone))

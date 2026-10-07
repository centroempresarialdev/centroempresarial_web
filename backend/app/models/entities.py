from datetime import datetime, timezone, date
from typing import Optional, List
from decimal import Decimal
from sqlmodel import SQLModel, Field, Relationship

def get_utc_now() -> datetime:
    """Devuelve la fecha actual en UTC explícito."""
    return datetime.now(timezone.utc)

# -------------------------------------------------------------
# USUARIOS INTERNOS Y AGENTES
# -------------------------------------------------------------
class User(SQLModel, table=True):
    __tablename__ = "users"

    id: Optional[int] = Field(default=None, primary_key=True)
    email: str = Field(unique=True, index=True, nullable=False)
    hashed_password: str = Field(nullable=False)
    full_name: str = Field(nullable=False)
    role: str = Field(default="multifuncional", index=True) # "admin", "multifuncional", "ai_agent"
    is_active: bool = Field(default=True)
    last_lead_assigned_at: Optional[datetime] = Field(default=None)
    created_at: datetime = Field(default_factory=get_utc_now)

    leads: List["Lead"] = Relationship(back_populates="assigned_to")
    authored_news: List["News"] = Relationship(back_populates="author")
    organized_events: List["Event"] = Relationship(back_populates="organizer")

# -------------------------------------------------------------
# LEADS (PROSPECTOS WEB)
# -------------------------------------------------------------
class Lead(SQLModel, table=True):
    __tablename__ = "leads"

    id: Optional[int] = Field(default=None, primary_key=True)
    full_name: str = Field(nullable=False, index=True)
    phone: str = Field(nullable=False)
    email: str = Field(nullable=False, index=True)
    interested_type: str = Field(nullable=False) # Estudiante, Profesional, Empresa
    target_plan: Optional[str] = Field(default=None)
    message: Optional[str] = Field(default=None)

    # Asignación Round-Robin
    assigned_to_user_id: Optional[int] = Field(default=None, foreign_key="users.id")
    assigned_to: Optional[User] = Relationship(back_populates="leads")

    # Auditoría de conversión
    is_converted: bool = Field(default=False, index=True)
    converted_to_client_id: Optional[int] = Field(default=None, foreign_key="clients.id")
    converted_at: Optional[datetime] = Field(default=None)

    created_at: datetime = Field(default_factory=get_utc_now)

# -------------------------------------------------------------
# CLIENTES ASOCIADOS
# -------------------------------------------------------------
class Client(SQLModel, table=True):
    __tablename__ = "clients"

    id: Optional[int] = Field(default=None, primary_key=True)
    full_name: str = Field(nullable=False, index=True)
    document_type: str = Field(default="DNI") # DNI, RUC, CE
    document_number: str = Field(unique=True, index=True, nullable=False)
    email: str = Field(nullable=False, index=True)
    phone: str = Field(nullable=False)
    client_type: str = Field(default="Profesional") # Estudiante, Profesional, Empresa
    company_name: Optional[str] = Field(default=None)
    
    # Preferencias y consentimiento
    opt_in_newsletter: bool = Field(default=True)
    opt_in_whatsapp: bool = Field(default=True)
    
    notes: Optional[str] = Field(default=None)
    created_at: datetime = Field(default_factory=get_utc_now)

    memberships: List["Membership"] = Relationship(back_populates="client")
    whatsapp_logs: List["WhatsAppLog"] = Relationship(back_populates="client")

# -------------------------------------------------------------
# PLANES Y CONTRATOS DE MEMBRESÍA
# -------------------------------------------------------------
class MembershipPlan(SQLModel, table=True):
    __tablename__ = "membership_plans"

    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(nullable=False) # Estudiante, Profesionales, Empresarial
    price: Decimal = Field(default=Decimal("0.00"), max_digits=10, decimal_places=2)
    billing_period: str = Field(default="anual") # anual, mensual
    benefits_json: Optional[str] = Field(default="[]")
    is_active: bool = Field(default=True)

    memberships: List["Membership"] = Relationship(back_populates="plan")

class Membership(SQLModel, table=True):
    __tablename__ = "memberships"

    id: Optional[int] = Field(default=None, primary_key=True)
    client_id: int = Field(foreign_key="clients.id", nullable=False)
    plan_id: int = Field(foreign_key="membership_plans.id", nullable=False)
    start_date: date = Field(nullable=False)
    end_date: date = Field(nullable=False, index=True)
    status: str = Field(default="Activa", index=True) # Activa, Vencida, Suspendida
    certificate_code: Optional[str] = Field(default=None, unique=True)
    last_whatsapp_reminder_sent: Optional[date] = Field(default=None)

    client: Optional[Client] = Relationship(back_populates="memberships")
    plan: Optional[MembershipPlan] = Relationship(back_populates="memberships")

# -------------------------------------------------------------
# CONTENIDO: NOTICIAS, EVENTOS Y ALIADOS
# -------------------------------------------------------------
class News(SQLModel, table=True):
    __tablename__ = "news"

    id: Optional[int] = Field(default=None, primary_key=True)
    title: str = Field(nullable=False)
    slug: str = Field(unique=True, index=True, nullable=False)
    category: str = Field(default="Noticia Empresarial")
    tag: Optional[str] = Field(default=None)
    summary: str = Field(nullable=False)
    content: Optional[str] = Field(default=None)
    flyer_url: str = Field(nullable=False)
    whatsapp_cta_message: Optional[str] = Field(default=None)
    is_published: bool = Field(default=True, index=True)
    
    author_id: Optional[int] = Field(default=None, foreign_key="users.id")
    author: Optional[User] = Relationship(back_populates="authored_news")

    published_at: datetime = Field(default_factory=get_utc_now)

class Event(SQLModel, table=True):
    __tablename__ = "events"

    id: Optional[int] = Field(default=None, primary_key=True)
    title: str = Field(nullable=False)
    slug: str = Field(unique=True, index=True, nullable=False)
    event_type: str = Field(default="Webinar") # Webinar, Taller, Presencial
    description: str = Field(nullable=False)
    banner_url: str = Field(nullable=False)
    event_date: datetime = Field(nullable=False)
    location: Optional[str] = Field(default="Online / Zoom")
    is_published: bool = Field(default=True, index=True)

    organizer_id: Optional[int] = Field(default=None, foreign_key="users.id")
    organizer: Optional[User] = Relationship(back_populates="organized_events")

    published_at: datetime = Field(default_factory=get_utc_now)

class Partner(SQLModel, table=True):
    __tablename__ = "partners"

    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(nullable=False)
    logo_url: str = Field(nullable=False)
    summary: str = Field(nullable=False)
    benefits_json: Optional[str] = Field(default="[]")
    display_order: int = Field(default=0)
    is_active: bool = Field(default=True)

# -------------------------------------------------------------
# AUDITORÍA DE ENVÍOS: EMAIL Y WHATSAPP
# -------------------------------------------------------------
class EmailBroadcastLog(SQLModel, table=True):
    __tablename__ = "email_broadcast_logs"

    id: Optional[int] = Field(default=None, primary_key=True)
    recipient_email: str = Field(nullable=False, index=True)
    recipient_type: str = Field(default="CLIENT") # CLIENT, LEAD
    subject: str = Field(nullable=False)
    entity_type: str = Field(nullable=False) # NEWS, EVENT
    entity_id: int = Field(nullable=False)
    status: str = Field(default="PENDIENTE", index=True) # PENDIENTE, ENVIADO, FALLIDO
    error_message: Optional[str] = Field(default=None)
    sent_at: datetime = Field(default_factory=get_utc_now)

class WhatsAppLog(SQLModel, table=True):
    __tablename__ = "whatsapp_logs"

    id: Optional[int] = Field(default=None, primary_key=True)
    client_id: int = Field(foreign_key="clients.id", nullable=False)
    phone: str = Field(nullable=False)
    template_type: str = Field(nullable=False) # REMINDER_30, REMINDER_5, WELCOME
    message_content: str = Field(nullable=False)
    status: str = Field(default="EN_COLA", index=True) # EN_COLA, ENVIADO, ERROR
    attempts: int = Field(default=0)
    error_log: Optional[str] = Field(default=None)
    processed_at: datetime = Field(default_factory=get_utc_now)

    client: Optional[Client] = Relationship(back_populates="whatsapp_logs")

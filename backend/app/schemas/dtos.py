from datetime import datetime, date
from typing import Optional, List
from decimal import Decimal
from pydantic import BaseModel, EmailStr, Field, ConfigDict


# -------------------------------------------------------------
# TOKENS & AUTENTICACIÓN
# -------------------------------------------------------------
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    refresh_token: Optional[str] = None


class TokenPayload(BaseModel):
    sub: Optional[str] = None
    exp: Optional[int] = None
    type: Optional[str] = None


class LoginRequest(BaseModel):
    username: EmailStr # Standard OAuth2 form usa username como email
    password: str


# -------------------------------------------------------------
# USUARIOS
# -------------------------------------------------------------
class UserCreate(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8)
    full_name: str
    role: str = "multifuncional" # "admin", "multifuncional"


class UserOut(BaseModel):
    id: int
    email: EmailStr
    full_name: str
    role: str
    is_active: bool
    last_lead_assigned_at: Optional[datetime] = None
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


# -------------------------------------------------------------
# LEADS
# -------------------------------------------------------------
class LeadCreate(BaseModel):
    full_name: str = Field(min_length=3)
    phone: str = Field(min_length=7)
    email: EmailStr
    interested_type: str = "Profesional"
    target_plan: Optional[str] = None
    message: Optional[str] = None


class LeadConvertRequest(BaseModel):
    document_type: str = "DNI" # DNI, RUC, CE
    document_number: str = Field(min_length=8, max_length=20)
    plan_id: int
    start_date: date
    end_date: date
    company_name: Optional[str] = None


class LeadOut(BaseModel):
    id: int
    full_name: str
    phone: str
    email: str
    interested_type: str
    target_plan: Optional[str] = None
    message: Optional[str] = None
    assigned_to_user_id: Optional[int] = None
    is_converted: bool
    converted_to_client_id: Optional[int] = None
    converted_at: Optional[datetime] = None
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


# -------------------------------------------------------------
# MEMBRESÍAS & PLANES
# -------------------------------------------------------------
class MembershipPlanCreate(BaseModel):
    name: str
    price: Decimal
    billing_period: str = "anual"
    benefits_json: Optional[str] = "[]"
    is_active: bool = True


class MembershipPlanOut(BaseModel):
    id: int
    name: str
    price: Decimal
    billing_period: str
    benefits_json: Optional[str]
    is_active: bool

    model_config = ConfigDict(from_attributes=True)


class MembershipCreate(BaseModel):
    plan_id: int
    start_date: date
    end_date: date
    certificate_code: Optional[str] = None


class MembershipOut(BaseModel):
    id: int
    client_id: int
    plan_id: int
    start_date: date
    end_date: date
    status: str
    certificate_code: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)


class MembershipVerifyResponse(BaseModel):
    is_valid: bool
    client_name: Optional[str] = None
    document_number: Optional[str] = None
    plan_name: Optional[str] = None
    status: Optional[str] = None
    valid_until: Optional[date] = None


# -------------------------------------------------------------
# CLIENTES
# -------------------------------------------------------------
class ClientCreate(BaseModel):
    full_name: str
    document_type: str = "DNI"
    document_number: str
    email: EmailStr
    phone: str
    client_type: str = "Profesional"
    company_name: Optional[str] = None
    opt_in_newsletter: bool = True
    opt_in_whatsapp: bool = True
    notes: Optional[str] = None


class ClientUpdate(BaseModel):
    full_name: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[EmailStr] = None
    client_type: Optional[str] = None
    company_name: Optional[str] = None
    opt_in_newsletter: Optional[bool] = None
    opt_in_whatsapp: Optional[bool] = None
    notes: Optional[str] = None


class ClientOut(BaseModel):
    id: int
    full_name: str
    document_type: str
    document_number: str
    email: str
    phone: str
    client_type: str
    company_name: Optional[str] = None
    opt_in_newsletter: bool
    opt_in_whatsapp: bool
    notes: Optional[str] = None
    created_at: datetime
    memberships: List[MembershipOut] = []

    model_config = ConfigDict(from_attributes=True)


# -------------------------------------------------------------
# NOTICIAS
# -------------------------------------------------------------
class NewsCreate(BaseModel):
    title: str
    slug: str
    category: str = "Noticia Empresarial"
    tag: Optional[str] = None
    summary: str
    content: Optional[str] = None
    flyer_url: str
    whatsapp_cta_message: Optional[str] = None
    is_published: bool = True


class NewsUpdate(BaseModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    category: Optional[str] = None
    tag: Optional[str] = None
    summary: Optional[str] = None
    content: Optional[str] = None
    flyer_url: Optional[str] = None
    whatsapp_cta_message: Optional[str] = None
    is_published: Optional[bool] = None


class NewsOut(BaseModel):
    id: int
    title: str
    slug: str
    category: str
    tag: Optional[str] = None
    summary: str
    content: Optional[str] = None
    flyer_url: str
    whatsapp_cta_message: Optional[str] = None
    is_published: bool
    author_id: Optional[int] = None
    published_at: datetime

    model_config = ConfigDict(from_attributes=True)


# -------------------------------------------------------------
# EVENTOS
# -------------------------------------------------------------
class EventCreate(BaseModel):
    title: str
    slug: str
    event_type: str = "Webinar"
    description: str
    banner_url: str
    event_date: datetime
    location: Optional[str] = "Online / Zoom"
    is_published: bool = True


class EventUpdate(BaseModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    event_type: Optional[str] = None
    description: Optional[str] = None
    banner_url: Optional[str] = None
    event_date: Optional[datetime] = None
    location: Optional[str] = None
    is_published: Optional[bool] = None


class EventOut(BaseModel):
    id: int
    title: str
    slug: str
    event_type: str
    description: str
    banner_url: str
    event_date: datetime
    location: Optional[str] = None
    is_published: bool
    organizer_id: Optional[int] = None
    published_at: datetime

    model_config = ConfigDict(from_attributes=True)


# -------------------------------------------------------------
# ALIADOS (PARTNERS)
# -------------------------------------------------------------
class PartnerCreate(BaseModel):
    name: str
    logo_url: str
    summary: str
    benefits_json: Optional[str] = "[]"
    display_order: int = 0
    is_active: bool = True


class PartnerUpdate(BaseModel):
    name: Optional[str] = None
    logo_url: Optional[str] = None
    summary: Optional[str] = None
    benefits_json: Optional[str] = None
    display_order: Optional[int] = None
    is_active: Optional[bool] = None


class PartnerOut(BaseModel):
    id: int
    name: str
    logo_url: str
    summary: str
    benefits_json: Optional[str] = None
    display_order: int
    is_active: bool

    model_config = ConfigDict(from_attributes=True)


# -------------------------------------------------------------
# UPLOADS
# -------------------------------------------------------------
class UploadResponse(BaseModel):
    url: str
    public_id: Optional[str] = None
    format: Optional[str] = None
    bytes: int

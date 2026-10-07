// ─────────────────────────────────────────────
// DTOs espejo del backend FastAPI (schemas/dtos.py)
// ─────────────────────────────────────────────

// Auth & Tokens
export interface Token {
  access_token: string;
  token_type: "bearer";
  refresh_token?: string;
}

export interface UserOut {
  id: number;
  email: string;
  full_name: string;
  role: "admin" | "multifuncional" | "ai_agent";
  is_active: boolean;
  last_lead_assigned_at?: string;
  created_at: string;
}

// Leads
export interface LeadCreate {
  full_name: string;
  phone: string;
  email: string;
  interested_type: "Estudiante" | "Profesional" | "Empresa";
  target_plan?: string;
  message?: string;
}

export interface LeadOut {
  id: number;
  full_name: string;
  phone: string;
  email: string;
  interested_type: string;
  target_plan?: string;
  message?: string;
  assigned_to_user_id?: number;
  is_converted: boolean;
  converted_to_client_id?: number;
  converted_at?: string;
  created_at: string;
}

export interface LeadConvertRequest {
  document_type: "DNI" | "RUC" | "CE";
  document_number: string;
  plan_id: number;
  start_date: string;
  end_date: string;
  company_name?: string;
}

// Clients
export interface ClientCreate {
  full_name: string;
  document_type: "DNI" | "RUC" | "CE";
  document_number: string;
  email: string;
  phone: string;
  client_type: "Estudiante" | "Profesional" | "Empresa";
  company_name?: string;
  opt_in_newsletter?: boolean;
  opt_in_whatsapp?: boolean;
  notes?: string;
}

export interface ClientUpdate {
  full_name?: string;
  document_type?: string;
  document_number?: string;
  phone?: string;
  email?: string;
  client_type?: string;
  company_name?: string | null;
  opt_in_newsletter?: boolean;
  opt_in_whatsapp?: boolean;
  notes?: string | null;
}

export interface ClientOut {
  id: number;
  full_name: string;
  document_type: string;
  document_number: string;
  email: string;
  phone: string;
  client_type: string;
  company_name?: string;
  opt_in_newsletter: boolean;
  opt_in_whatsapp: boolean;
  notes?: string;
  created_at: string;
  memberships: MembershipOut[];
}

// Memberships
export interface MembershipCreate {
  plan_id: number;
  start_date: string;
  end_date: string;
  certificate_code?: string;
}

export interface MembershipOut {
  id: number;
  client_id: number;
  plan_id: number;
  start_date: string;
  end_date: string;
  status: "Activa" | "Vencida" | "Suspendida";
  certificate_code?: string;
}

export interface MembershipVerifyResponse {
  is_valid: boolean;
  client_name?: string;
  document_number?: string;
  plan_name?: string;
  status?: string;
  valid_until?: string;
}

// News
export interface NewsCreate {
  title: string;
  slug: string;
  category?: string;
  tag?: string;
  summary: string;
  content?: string;
  flyer_url: string;
  whatsapp_cta_message?: string;
  is_published?: boolean;
}

export interface NewsUpdate {
  title?: string;
  slug?: string;
  category?: string;
  tag?: string;
  summary?: string;
  content?: string;
  flyer_url?: string;
  whatsapp_cta_message?: string;
  is_published?: boolean;
}

export interface NewsOut {
  id: number;
  title: string;
  slug: string;
  category: string;
  tag?: string;
  summary: string;
  content?: string;
  flyer_url: string;
  whatsapp_cta_message?: string;
  is_published: boolean;
  author_id?: number;
  published_at: string;
}

// Events
export interface EventCreate {
  title: string;
  slug: string;
  event_type?: string;
  description: string;
  banner_url: string;
  event_date: string;
  location?: string;
  is_published?: boolean;
}

export interface EventUpdate {
  title?: string;
  slug?: string;
  event_type?: string;
  description?: string;
  banner_url?: string;
  event_date?: string;
  location?: string;
  is_published?: boolean;
}

export interface EventOut {
  id: number;
  title: string;
  slug: string;
  event_type: string;
  description: string;
  banner_url: string;
  event_date: string;
  location?: string;
  is_published: boolean;
  organizer_id?: number;
  published_at: string;
}

// Partners
export interface PartnerCreate {
  name: string;
  logo_url: string;
  summary: string;
  benefits_json?: string;
  display_order?: number;
  is_active?: boolean;
}

export interface PartnerUpdate {
  name?: string;
  logo_url?: string;
  summary?: string;
  benefits_json?: string;
  display_order?: number;
  is_active?: boolean;
}

export interface PartnerOut {
  id: number;
  name: string;
  logo_url: string;
  summary: string;
  benefits_json?: string;
  display_order: number;
  is_active: boolean;
}

// Uploads
export interface UploadResponse {
  url: string;
  public_id?: string;
  format?: string;
  bytes: number;
}

// WhatsApp
export interface WhatsAppDirectSend {
  phone: string;
  message: string;
}

// Generic API error
export interface ApiError {
  detail: string;
}

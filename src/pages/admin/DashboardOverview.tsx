import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import {
  dashboardService,
  leadsService,
  clientsService,
  newsService,
  eventsService,
} from "@/services";
import type { DashboardStats } from "@/services/dashboard.service";
import type { LeadOut, ClientOut } from "@/lib/api-types";
import {
  UserPlus,
  Users,
  Newspaper,
  Calendar,
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  Phone,
  MessageCircle,
  Loader2,
  RefreshCw,
  Sparkles,
  AlertCircle,
  ShieldCheck,
  Building2,
  BadgeCheck,
} from "lucide-react";

export const DashboardOverview: React.FC = () => {
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [leads, setLeads] = useState<LeadOut[]>([]);
  const [recentClients, setRecentClients] = useState<ClientOut[]>([]);

  const fetchStats = async () => {
    setLoading(true);
    setError(null);
    try {
      // 1. Intentar endpoint unificado del backend
      const data = await dashboardService.getStats();
      setStats(data);
      setLeads(data.recent_leads || []);
      setRecentClients(data.recent_clients || []);
    } catch (err: any) {
      console.warn("Fallo endpoint unificado de dashboard, recurriendo a fallback:", err);
      // 2. Fallback a servicios individuales
      try {
        const [leadsData, clientsData, newsData, eventsData] = await Promise.allSettled([
          leadsService.list(),
          clientsService.list(),
          newsService.list(),
          eventsService.list(),
        ]);

        const fetchedLeads = leadsData.status === "fulfilled" ? leadsData.value : [];
        const fetchedClients = clientsData.status === "fulfilled" ? clientsData.value : [];
        const newsCount = newsData.status === "fulfilled" ? newsData.value.length : 0;
        const eventsCount = eventsData.status === "fulfilled" ? eventsData.value.length : 0;

        const pending = fetchedLeads.filter((l) => !l.is_converted).length;
        const converted = fetchedLeads.filter((l) => l.is_converted).length;

        setStats({
          kpis: {
            pending_leads: pending,
            converted_leads: converted,
            total_leads: fetchedLeads.length,
            total_clients: fetchedClients.length,
            active_memberships: fetchedClients.filter((c) =>
              c.memberships?.some((m) => m.status === "Activa")
            ).length,
            total_news: newsCount,
            total_events: eventsCount,
            total_partners: 0,
          },
          recent_leads: fetchedLeads.slice(0, 6),
          recent_clients: fetchedClients.slice(0, 5),
          server_time: new Date().toISOString().split("T")[0],
        });
        setLeads(fetchedLeads.slice(0, 6));
        setRecentClients(fetchedClients.slice(0, 5));
      } catch (fallbackErr: any) {
        setError(fallbackErr?.message || "No se pudo conectar con el servidor backend.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const kpis = stats?.kpis || {
    pending_leads: 0,
    converted_leads: 0,
    total_leads: 0,
    total_clients: 0,
    active_memberships: 0,
    total_news: 0,
    total_events: 0,
    total_partners: 0,
  };

  return (
    <div className="space-y-6">
      {/* ─── BANNER DE BIENVENIDA ─── */}
      <div className="flex flex-col gap-3 rounded-2xl bg-gradient-to-r from-[#1a4a38] to-[#11382a] p-6 text-white shadow-md sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            <span>Sistema Operativo Centro Empresarial</span>
          </div>
          <h1 className="mt-2 text-xl font-extrabold sm:text-2xl">
            ¡Hola, {user?.full_name || "Equipo"}!
          </h1>
          <p className="mt-1 text-xs text-white/80">
            Rol: <span className="font-semibold uppercase text-accent-light">{user?.role}</span> · Panel de supervisión y gestión en tiempo real.
          </p>
        </div>

        <button
          onClick={fetchStats}
          disabled={loading}
          className="inline-flex items-center gap-2 self-start rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur transition-all hover:bg-white/20 disabled:opacity-50 sm:self-center"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>Actualizar datos</span>
        </button>
      </div>

      {/* ─── ALERTA DE ERROR SI FALLA CONEXIÓN ─── */}
      {error && (
        <div className="flex items-center justify-between rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs font-semibold text-rose-800">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
            <span>{error}</span>
          </div>
          <button
            onClick={fetchStats}
            className="rounded-lg bg-rose-600 px-3 py-1 text-white hover:bg-rose-700"
          >
            Reintentar
          </button>
        </div>
      )}

      {/* ─── TARJETAS DE KPIS ─── */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* KPI 1: Leads Pendientes */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Prospectos Nuevos
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <UserPlus className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold text-slate-900">
              {loading ? "..." : kpis.pending_leads}
            </span>
            <span className="ml-2 text-xs text-slate-500">por atender</span>
          </div>
          <p className="mt-2 text-[11px] font-semibold text-slate-500">
            Total histórico: {kpis.total_leads} prospectos
          </p>
        </div>

        {/* KPI 2: Clientes Activos */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Clientes Registrados
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <Users className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold text-slate-900">
              {loading ? "..." : kpis.total_clients}
            </span>
            <span className="ml-2 text-xs text-slate-500">en cartera</span>
          </div>
          <p className="mt-2 text-[11px] font-semibold text-slate-500">
            Membresías activas: {kpis.active_memberships} · Convertidos: {kpis.converted_leads}
          </p>
        </div>

        {/* KPI 3: Noticias */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Noticias & Afiches
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Newspaper className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold text-slate-900">
              {loading ? "..." : kpis.total_news}
            </span>
            <span className="ml-2 text-xs text-slate-500">publicadas</span>
          </div>
          <p className="mt-2 text-[11px] font-semibold text-slate-500">
            Difusión masiva habilitada
          </p>
        </div>

        {/* KPI 4: Eventos */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Eventos & Webinars
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
              <Calendar className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold text-slate-900">
              {loading ? "..." : kpis.total_events}
            </span>
            <span className="ml-2 text-xs text-slate-500">cartelera</span>
          </div>
          <p className="mt-2 text-[11px] font-semibold text-slate-500">
            Convocatorias abiertas
          </p>
        </div>
      </div>

      {/* ─── TABLA DE ÚLTIMOS PROSPECTOS ─── */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 p-5">
          <div>
            <h2 className="text-sm font-extrabold text-slate-900 sm:text-base">
              Últimos Prospectos Registrados
            </h2>
            <p className="text-xs text-slate-500">
              Leads captados en tiempo real desde la web oficial
            </p>
          </div>
          <Link
            to="/admin/leads"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1a4a38] hover:underline"
          >
            <span>Ver todos los leads</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-[#1a4a38]" />
            </div>
          ) : leads.length === 0 ? (
            <div className="py-12 text-center">
              <UserPlus className="mx-auto h-8 w-8 text-slate-300" />
              <p className="mt-2 text-xs font-semibold text-slate-500">
                Aún no hay prospectos registrados en el sistema.
              </p>
            </div>
          ) : (
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-100 bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="px-5 py-3">Nombre / Razón Social</th>
                  <th className="px-5 py-3">Teléfono / WhatsApp</th>
                  <th className="px-5 py-3">Interés / Plan</th>
                  <th className="px-5 py-3">Fecha de Ingreso</th>
                  <th className="px-5 py-3">Estado</th>
                  <th className="px-5 py-3 text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {leads.slice(0, 6).map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-5 py-3.5 font-bold text-slate-900">
                      {lead.full_name}
                      <span className="block text-[11px] font-normal text-slate-400">
                        {lead.email}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <a
                        href={`https://wa.me/${lead.phone.replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[#25D366] font-semibold hover:underline"
                      >
                        <MessageCircle className="h-3.5 w-3.5" />
                        {lead.phone}
                      </a>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-700">
                        {lead.target_plan || lead.interested_type}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-slate-500">
                      {new Date(lead.created_at).toLocaleDateString("es-PE", {
                        day: "2-digit",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-5 py-3.5">
                      {lead.is_converted ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200">
                          <CheckCircle2 className="h-3 w-3" />
                          Convertido a Cliente
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-[10px] font-bold text-amber-700 border border-amber-200">
                          <Clock className="h-3 w-3" />
                          Pendiente
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <Link
                        to="/admin/leads"
                        className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#1a4a38]"
                      >
                        Gestionar
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* ─── TABLA DE ÚLTIMOS CLIENTES EN CARTERA ─── */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 p-5">
          <div>
            <h2 className="text-sm font-extrabold text-slate-900 sm:text-base">
              Últimos Clientes & Asociados Oficiales
            </h2>
            <p className="text-xs text-slate-500">
              Directorio de asociados registrados en la base de datos
            </p>
          </div>
          <Link
            to="/admin/clientes"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1a4a38] hover:underline"
          >
            <span>Ver todos los clientes</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-[#1a4a38]" />
            </div>
          ) : recentClients.length === 0 ? (
            <div className="py-12 text-center">
              <Users className="mx-auto h-8 w-8 text-slate-300" />
              <p className="mt-2 text-xs font-semibold text-slate-500">
                Aún no hay clientes registrados en cartera.
              </p>
            </div>
          ) : (
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-100 bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="px-5 py-3">ID</th>
                  <th className="px-5 py-3">Asociado / Documento</th>
                  <th className="px-5 py-3">Perfil</th>
                  <th className="px-5 py-3">Contacto</th>
                  <th className="px-5 py-3">Membresía</th>
                  <th className="px-5 py-3 text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {recentClients.map((client) => {
                  const activeMem = client.memberships?.find((m) => m.status === "Activa");
                  return (
                    <tr key={client.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-5 py-3.5 font-mono font-bold text-slate-400">
                        #{client.id}
                      </td>
                      <td className="px-5 py-3.5 font-bold text-slate-900">
                        {client.full_name}
                        <span className="block text-[11px] font-normal text-slate-400">
                          {client.document_type}: {client.document_number}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-700">
                          {client.client_type}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-slate-500">
                        <div>{client.email}</div>
                        <div className="text-[11px]">{client.phone}</div>
                      </td>
                      <td className="px-5 py-3.5">
                        {activeMem ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200">
                            <BadgeCheck className="h-3 w-3" />
                            Vigente ({activeMem.end_date})
                          </span>
                        ) : (
                          <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-500">
                            Sin membresía activa
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <Link
                          to="/admin/clientes"
                          className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#1a4a38]"
                        >
                          Ver perfil
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;


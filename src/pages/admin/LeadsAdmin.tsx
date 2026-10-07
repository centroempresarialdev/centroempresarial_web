import React, { useState, useEffect } from "react";
import { leadsService } from "@/services";
import type { LeadOut, LeadConvertRequest } from "@/lib/api-types";
import {
  UserPlus,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  MessageCircle,
  Mail,
  Send,
  UserCheck,
  RefreshCw,
  Loader2,
  X,
  Calendar,
} from "lucide-react";

export const LeadsAdmin: React.FC = () => {
  const [leads, setLeads] = useState<LeadOut[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterConverted, setFilterConverted] = useState<string>("all");
  const [search, setSearch] = useState("");

  // Modal de conversión
  const [convertModalLead, setConvertModalLead] = useState<LeadOut | null>(null);
  const [convertDocType, setConvertDocType] = useState<"DNI" | "RUC" | "CE">("DNI");
  const [convertDocNum, setConvertDocNum] = useState("");
  const [convertPlanId, setConvertPlanId] = useState<number>(2); // 1: Estudiante, 2: Profesional, 3: Empresa
  const [convertStartDate, setConvertStartDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [convertEndDate, setConvertEndDate] = useState(
    new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
  );
  const [convertCompany, setConvertCompany] = useState("");
  const [isConverting, setIsConverting] = useState(false);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const data = await leadsService.list();
      setLeads(data);
    } catch (err: any) {
      console.warn("Error obteniendo leads:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleResend = async (leadId: number) => {
    try {
      const res = await leadsService.resend(leadId);
      setActionFeedback(`✓ ${res.message}`);
      setTimeout(() => setActionFeedback(null), 4000);
    } catch (err: any) {
      alert(err?.message || "Error reenviando notificación");
    }
  };

  const handleConvertSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!convertModalLead) return;

    setIsConverting(true);
    try {
      const payload: LeadConvertRequest = {
        document_type: convertDocType,
        document_number: convertDocNum.trim(),
        plan_id: Number(convertPlanId),
        start_date: convertStartDate,
        end_date: convertEndDate,
        company_name: convertCompany.trim() || undefined,
      };

      await leadsService.convert(convertModalLead.id, payload);
      setConvertModalLead(null);
      setActionFeedback("✓ Prospecto convertido exitosamente a Cliente oficial con Membresía.");
      setTimeout(() => setActionFeedback(null), 5000);
      fetchLeads();
    } catch (err: any) {
      alert(err?.message || "Error al convertir prospecto");
    } finally {
      setIsConverting(false);
    }
  };

  const filteredLeads = leads.filter((lead) => {
    if (filterConverted === "pending" && lead.is_converted) return false;
    if (filterConverted === "converted" && !lead.is_converted) return false;
    if (search.trim()) {
      const term = search.toLowerCase();
      const matchName = lead.full_name.toLowerCase().includes(term);
      const matchEmail = lead.email.toLowerCase().includes(term);
      const matchPhone = lead.phone.includes(term);
      return matchName || matchEmail || matchPhone;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 sm:text-2xl">
            Gestión de Prospectos (Leads)
          </h1>
          <p className="text-xs text-slate-500">
            Prospectos captados en la web, asignados por Round-Robin a asesores
          </p>
        </div>

        <button
          onClick={fetchLeads}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 disabled:opacity-50"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>Refrescar</span>
        </button>
      </div>

      {/* Banner de feedback */}
      {actionFeedback && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3.5 text-xs font-semibold text-emerald-800">
          {actionFeedback}
        </div>
      )}

      {/* Barra de Filtros y Búsqueda */}
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por nombre, correo o teléfono..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-xs text-slate-800 placeholder:text-slate-400 focus:border-[#1a4a38] focus:bg-white focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-slate-400" />
          <select
            value={filterConverted}
            onChange={(e) => setFilterConverted(e.target.value)}
            className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 focus:border-[#1a4a38] focus:bg-white focus:outline-none"
          >
            <option value="all">Todos ({leads.length})</option>
            <option value="pending">
              Solo Pendientes ({leads.filter((l) => !l.is_converted).length})
            </option>
            <option value="converted">
              Solo Convertidos ({leads.filter((l) => l.is_converted).length})
            </option>
          </select>
        </div>
      </div>

      {/* Tabla de Leads */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-[#1a4a38]" />
            </div>
          ) : filteredLeads.length === 0 ? (
            <div className="py-16 text-center">
              <UserPlus className="mx-auto h-8 w-8 text-slate-300" />
              <p className="mt-2 text-xs font-semibold text-slate-500">
                No se encontraron prospectos con los filtros actuales.
              </p>
            </div>
          ) : (
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-100 bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="px-5 py-3.5">ID</th>
                  <th className="px-5 py-3.5">Prospecto</th>
                  <th className="px-5 py-3.5">Contacto</th>
                  <th className="px-5 py-3.5">Interés</th>
                  <th className="px-5 py-3.5">Mensaje</th>
                  <th className="px-5 py-3.5">Estado</th>
                  <th className="px-5 py-3.5 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-5 py-4 font-mono font-bold text-slate-400">
                      #{lead.id}
                    </td>
                    <td className="px-5 py-4">
                      <p className="font-bold text-slate-900">{lead.full_name}</p>
                      <span className="text-[11px] text-slate-400">
                        {new Date(lead.created_at).toLocaleDateString("es-PE", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <p className="flex items-center gap-1.5 font-medium text-slate-800">
                        <Mail className="h-3.5 w-3.5 text-slate-400" />
                        {lead.email}
                      </p>
                      <a
                        href={`https://wa.me/${lead.phone.replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-0.5 inline-flex items-center gap-1 font-semibold text-[#25D366] hover:underline"
                      >
                        <MessageCircle className="h-3.5 w-3.5" />
                        {lead.phone}
                      </a>
                    </td>
                    <td className="px-5 py-4">
                      <span className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-700">
                        {lead.target_plan || lead.interested_type}
                      </span>
                    </td>
                    <td className="px-5 py-4 max-w-xs truncate text-slate-500" title={lead.message || ""}>
                      {lead.message || "—"}
                    </td>
                    <td className="px-5 py-4">
                      {lead.is_converted ? (
                        <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700">
                          <CheckCircle2 className="h-3 w-3" />
                          Convertido #{lead.converted_to_client_id}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-[10px] font-bold text-amber-700">
                          <Clock className="h-3 w-3" />
                          Pendiente
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleResend(lead.id)}
                          title="Reenviar ficha por correo al vendedor"
                          className="rounded-lg border border-slate-200 bg-white p-1.5 text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                        >
                          <Send className="h-3.5 w-3.5" />
                        </button>

                        {!lead.is_converted && (
                          <button
                            onClick={() => {
                              setConvertModalLead(lead);
                              setConvertDocNum("");
                              setConvertCompany("");
                            }}
                            className="inline-flex items-center gap-1 rounded-lg bg-[#1a4a38] px-2.5 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-[#13372a]"
                          >
                            <UserCheck className="h-3.5 w-3.5" />
                            <span>Convertir</span>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Modal de Conversión a Cliente */}
      {convertModalLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-extrabold text-slate-900">
                  Convertir Prospecto a Cliente Oficial
                </h3>
                <p className="text-xs text-slate-500">
                  {convertModalLead.full_name} ({convertModalLead.email})
                </p>
              </div>
              <button
                onClick={() => setConvertModalLead(null)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleConvertSubmit} className="mt-4 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-bold text-slate-700">
                    Tipo de Documento *
                  </label>
                  <select
                    value={convertDocType}
                    onChange={(e) => setConvertDocType(e.target.value as any)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 focus:border-[#1a4a38] focus:outline-none"
                  >
                    <option value="DNI">DNI (8 dígitos)</option>
                    <option value="RUC">RUC (11 dígitos)</option>
                    <option value="CE">Carnet de Extranjería</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-bold text-slate-700">
                    Número de Documento *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="12345678"
                    value={convertDocNum}
                    onChange={(e) => setConvertDocNum(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:border-[#1a4a38] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold text-slate-700">
                  Plan de Membresía *
                </label>
                <select
                  value={convertPlanId}
                  onChange={(e) => setConvertPlanId(Number(e.target.value))}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 focus:border-[#1a4a38] focus:outline-none"
                >
                  <option value={1}>Plan Estudiantes (S/ 150/año)</option>
                  <option value={2}>Plan Profesionales (S/ 350/año)</option>
                  <option value={3}>Plan Empresarial / Corporativo (S/ 750/año)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-bold text-slate-700">
                    Fecha de Inicio *
                  </label>
                  <input
                    type="date"
                    required
                    value={convertStartDate}
                    onChange={(e) => setConvertStartDate(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 focus:border-[#1a4a38] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-bold text-slate-700">
                    Fecha de Vencimiento *
                  </label>
                  <input
                    type="date"
                    required
                    value={convertEndDate}
                    onChange={(e) => setConvertEndDate(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 focus:border-[#1a4a38] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold text-slate-700">
                  Empresa / Razón Social (Opcional)
                </label>
                <input
                  type="text"
                  placeholder="Ej. Distribuidora del Sur S.A.C."
                  value={convertCompany}
                  onChange={(e) => setConvertCompany(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:border-[#1a4a38] focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setConvertModalLead(null)}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isConverting}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[#1a4a38] px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-[#13372a] disabled:opacity-50"
                >
                  {isConverting && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                  <span>Confirmar y Crear Cliente</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadsAdmin;

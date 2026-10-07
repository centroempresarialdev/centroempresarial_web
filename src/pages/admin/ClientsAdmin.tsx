import React, { useState, useEffect } from "react";
import { clientsService } from "@/services";
import type { ClientOut, ClientUpdate, MembershipCreate } from "@/lib/api-types";
import {
  Users,
  Search,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Calendar,
  PlusCircle,
  Loader2,
  RefreshCw,
  X,
  CreditCard,
  FileCheck,
  Phone,
  Mail,
  Edit2,
  Building2,
  Save,
} from "lucide-react";

export const ClientsAdmin: React.FC = () => {
  const [clients, setClients] = useState<ClientOut[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [clientTypeFilter, setClientTypeFilter] = useState("all");

  // Verificación rápida por DNI
  const [verifyDoc, setVerifyDoc] = useState("");
  const [verifyResult, setVerifyResult] = useState<any | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  // Modal para agregar membresía
  const [selectedClient, setSelectedClient] = useState<ClientOut | null>(null);
  const [newPlanId, setNewPlanId] = useState<number>(2);
  const [newStartDate, setNewStartDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [newEndDate, setNewEndDate] = useState(
    new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
  );
  const [certCode, setCertCode] = useState("");
  const [isSubmittingMem, setIsSubmittingMem] = useState(false);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  // Modal para editar cliente
  const [editingClient, setEditingClient] = useState<ClientOut | null>(null);
  const [editFormData, setEditFormData] = useState<ClientUpdate>({
    full_name: "",
    document_type: "DNI",
    document_number: "",
    email: "",
    phone: "",
    client_type: "Profesional",
    company_name: "",
    opt_in_newsletter: true,
    opt_in_whatsapp: true,
    notes: "",
  });
  const [isSavingClient, setIsSavingClient] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);

  const fetchClients = async () => {
    setLoading(true);
    try {
      const data = await clientsService.list();
      setClients(data);
    } catch (err: any) {
      console.warn("Error cargando clientes:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  // Cerrar modales con tecla Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (editingClient) setEditingClient(null);
        if (selectedClient) setSelectedClient(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [editingClient, selectedClient]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!verifyDoc.trim()) return;

    setIsVerifying(true);
    setVerifyResult(null);
    try {
      const res = await clientsService.verifyMembership(verifyDoc.trim());
      setVerifyResult(res);
    } catch (err: any) {
      setVerifyResult({
        is_valid: false,
        detail: err?.message || "Documento no encontrado o membresía inactiva.",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleAddMembership = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClient) return;

    setIsSubmittingMem(true);
    try {
      const payload: MembershipCreate = {
        plan_id: newPlanId,
        start_date: newStartDate,
        end_date: newEndDate,
        certificate_code: certCode.trim() || undefined,
      };

      await clientsService.addMembership(selectedClient.id, payload);
      setActionFeedback("✓ Membresía / renovación agregada con éxito.");
      setTimeout(() => setActionFeedback(null), 4000);
      setSelectedClient(null);
      fetchClients();
    } catch (err: any) {
      alert(err?.message || "Error al agregar membresía");
    } finally {
      setIsSubmittingMem(false);
    }
  };

  const handleOpenEdit = (client: ClientOut) => {
    setEditingClient(client);
    setEditError(null);
    setEditFormData({
      full_name: client.full_name || "",
      document_type: client.document_type || "DNI",
      document_number: client.document_number || "",
      email: client.email || "",
      phone: client.phone || "",
      client_type: client.client_type || "Profesional",
      company_name: client.company_name || "",
      opt_in_newsletter: client.opt_in_newsletter ?? true,
      opt_in_whatsapp: client.opt_in_whatsapp ?? true,
      notes: client.notes || "",
    });
  };

  const handleCloseEdit = () => {
    setEditingClient(null);
    setEditError(null);
  };

  const handleUpdateClient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingClient) return;

    const trimmedName = editFormData.full_name?.trim();
    const trimmedDoc = editFormData.document_number?.trim();
    const trimmedEmail = editFormData.email?.trim();
    const trimmedPhone = editFormData.phone?.trim();

    if (!trimmedName) {
      setEditError("El nombre completo es obligatorio.");
      return;
    }
    if (!trimmedDoc) {
      setEditError("El número de documento es obligatorio.");
      return;
    }
    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setEditError("Ingresa un correo electrónico con formato válido.");
      return;
    }
    if (!trimmedPhone) {
      setEditError("El teléfono o número de contacto es obligatorio.");
      return;
    }

    setIsSavingClient(true);
    setEditError(null);

    try {
      const payload: ClientUpdate = {
        full_name: trimmedName,
        document_type: editFormData.document_type,
        document_number: trimmedDoc,
        email: trimmedEmail,
        phone: trimmedPhone,
        client_type: editFormData.client_type,
        company_name: editFormData.company_name?.trim() ? editFormData.company_name.trim() : null,
        opt_in_newsletter: Boolean(editFormData.opt_in_newsletter),
        opt_in_whatsapp: Boolean(editFormData.opt_in_whatsapp),
        notes: editFormData.notes?.trim() ? editFormData.notes.trim() : null,
      };

      const updated = await clientsService.update(editingClient.id, payload);

      // Actualizar estado local inmediatamente
      setClients((prev) =>
        prev.map((c) => (c.id === updated.id ? { ...c, ...updated } : c))
      );

      setActionFeedback(`✓ Datos de "${updated.full_name}" actualizados correctamente.`);
      setTimeout(() => setActionFeedback(null), 4000);
      setEditingClient(null);
    } catch (err: any) {
      setEditError(err?.message || "Error al actualizar los datos del cliente.");
    } finally {
      setIsSavingClient(false);
    }
  };

  const filteredClients = clients.filter((client) => {
    if (clientTypeFilter !== "all" && client.client_type !== clientTypeFilter) {
      return false;
    }
    if (search.trim()) {
      const term = search.toLowerCase();
      const matchName = client.full_name.toLowerCase().includes(term);
      const matchDoc = client.document_number.includes(term);
      const matchEmail = client.email.toLowerCase().includes(term);
      return matchName || matchDoc || matchEmail;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 sm:text-2xl">
            Clientes & Membresías
          </h1>
          <p className="text-xs text-slate-500">
            Directorio de asociados oficiales, vigencia de carnets y renovaciones
          </p>
        </div>

        <button
          onClick={fetchClients}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 disabled:opacity-50"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>Refrescar</span>
        </button>
      </div>

      {actionFeedback && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3.5 text-xs font-semibold text-emerald-800">
          {actionFeedback}
        </div>
      )}

      {/* Widget de Verificación Instantánea de Carnet / DNI */}
      <div className="rounded-2xl border border-slate-200 bg-gradient-to-r from-slate-900 to-slate-800 p-5 text-white shadow-md">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent">
          <ShieldCheck className="h-4 w-4" />
          <span>Verificador Público de Membresía (Aliados & Convenios)</span>
        </div>
        <p className="mt-1 text-xs text-slate-300">
          Valida el estado de un asociado por DNI o RUC en tiempo real para aplicar convenios.
        </p>

        <form onSubmit={handleVerify} className="mt-3 flex flex-col gap-2 sm:flex-row">
          <input
            type="text"
            required
            placeholder="Ingresa DNI o RUC del asociado..."
            value={verifyDoc}
            onChange={(e) => setVerifyDoc(e.target.value)}
            className="flex-1 rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-xs text-white placeholder:text-slate-400 focus:bg-white focus:text-slate-900 focus:outline-none"
          />
          <button
            type="submit"
            disabled={isVerifying}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1a4a38] px-5 py-2 text-xs font-bold text-white shadow hover:bg-[#13372a] disabled:opacity-50"
          >
            {isVerifying ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <FileCheck className="h-4 w-4" />
            )}
            <span>Verificar Membresía</span>
          </button>
        </form>

        {verifyResult && (
          <div className="mt-3 rounded-xl border border-white/15 bg-white/10 p-3 text-xs">
            {verifyResult.is_valid ? (
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-emerald-400">
                    ✓ Membresía VIGENTE — {verifyResult.client_name}
                  </p>
                  <p className="text-[11px] text-slate-300">
                    Plan: {verifyResult.plan_name} · Válida hasta: {verifyResult.valid_until}
                  </p>
                </div>
                <span className="rounded bg-emerald-500/20 px-2.5 py-1 text-[11px] font-bold text-emerald-300">
                  ACTIVA
                </span>
              </div>
            ) : (
              <p className="font-semibold text-rose-300">
                ✗ {verifyResult.detail || "No se encontró membresía activa para este documento."}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Buscador de Directorio */}
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar asociado por nombre, DNI o email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-xs text-slate-800 placeholder:text-slate-400 focus:border-[#1a4a38] focus:bg-white focus:outline-none"
          />
        </div>

        <select
          value={clientTypeFilter}
          onChange={(e) => setClientTypeFilter(e.target.value)}
          className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 focus:border-[#1a4a38] focus:bg-white focus:outline-none"
        >
          <option value="all">Todos los Perfiles</option>
          <option value="Estudiante">Estudiantes</option>
          <option value="Profesional">Profesionales</option>
          <option value="Empresa">Empresas</option>
        </select>
      </div>

      {/* Tabla de Clientes */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-[#1a4a38]" />
            </div>
          ) : filteredClients.length === 0 ? (
            <div className="py-16 text-center">
              <Users className="mx-auto h-8 w-8 text-slate-300" />
              <p className="mt-2 text-xs font-semibold text-slate-500">
                No hay clientes registrados o que coincidan con la búsqueda.
              </p>
            </div>
          ) : (
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-100 bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="px-5 py-3.5">ID</th>
                  <th className="px-5 py-3.5">Asociado / Documento</th>
                  <th className="px-5 py-3.5">Contacto</th>
                  <th className="px-5 py-3.5">Tipo</th>
                  <th className="px-5 py-3.5">Membresía Activa</th>
                  <th className="px-5 py-3.5 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredClients.map((client) => {
                  const activeMem = client.memberships?.find((m) => m.status === "Activa");

                  return (
                    <tr key={client.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-5 py-4 font-mono font-bold text-slate-400">
                        #{client.id}
                      </td>
                      <td className="px-5 py-4">
                        <p className="font-bold text-slate-900">{client.full_name}</p>
                        <div className="flex flex-wrap items-center gap-1.5 font-mono text-[11px] text-slate-500">
                          <span>{client.document_type}: {client.document_number}</span>
                          {client.company_name && (
                            <>
                              <span className="text-slate-300">·</span>
                              <span
                                className="font-sans font-medium text-slate-600 truncate max-w-[150px]"
                                title={client.company_name}
                              >
                                {client.company_name}
                              </span>
                            </>
                          )}
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <p className="flex items-center gap-1 text-slate-700">
                          <Mail className="h-3 w-3 text-slate-400" />
                          {client.email}
                        </p>
                        <p className="mt-0.5 flex items-center gap-1 text-slate-700">
                          <Phone className="h-3 w-3 text-slate-400" />
                          {client.phone}
                        </p>
                      </td>
                      <td className="px-5 py-4">
                        <span className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-700">
                          {client.client_type}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        {activeMem ? (
                          <div className="space-y-0.5">
                            <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                              <CheckCircle2 className="h-2.5 w-2.5" />
                              Vigente
                            </span>
                            <p className="text-[10px] text-slate-500">
                              Vence: {activeMem.end_date}
                            </p>
                          </div>
                        ) : (
                          <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-500">
                            Sin membresía activa
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenEdit(client)}
                            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:border-[#1a4a38] hover:text-[#1a4a38] hover:bg-slate-50 transition-colors shadow-sm"
                            title="Editar datos del cliente"
                          >
                            <Edit2 className="h-3.5 w-3.5 text-[#1a4a38]" />
                            <span>Editar</span>
                          </button>
                          <button
                            onClick={() => {
                              setSelectedClient(client);
                              setCertCode(`CE-${new Date().getFullYear()}-${client.id}-R`);
                            }}
                            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-sm transition-colors"
                            title="Renovar o agregar membresía"
                          >
                            <PlusCircle className="h-3.5 w-3.5 text-[#1a4a38]" />
                            <span>Membresía</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Modal para Agregar Membresía / Renovación */}
      {selectedClient && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedClient(null);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm"
        >
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-extrabold text-slate-900">
                  Nueva Membresía / Renovación
                </h3>
                <p className="text-xs text-slate-500">
                  {selectedClient.full_name} ({selectedClient.document_number})
                </p>
              </div>
              <button
                onClick={() => setSelectedClient(null)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddMembership} className="mt-4 space-y-4">
              <div>
                <label className="mb-1 block text-xs font-bold text-slate-700">
                  Plan de Membresía *
                </label>
                <select
                  value={newPlanId}
                  onChange={(e) => setNewPlanId(Number(e.target.value))}
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
                    value={newStartDate}
                    onChange={(e) => setNewStartDate(e.target.value)}
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
                    value={newEndDate}
                    onChange={(e) => setNewEndDate(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 focus:border-[#1a4a38] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold text-slate-700">
                  Código de Certificado / Carnet
                </label>
                <input
                  type="text"
                  placeholder="CE-2026-0042"
                  value={certCode}
                  onChange={(e) => setCertCode(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:border-[#1a4a38] focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedClient(null)}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingMem}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[#1a4a38] px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-[#13372a] disabled:opacity-50"
                >
                  {isSubmittingMem && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                  <span>Guardar Membresía</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal para Editar Datos del Cliente */}
      {editingClient && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) handleCloseEdit();
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm overflow-y-auto"
        >
          <div className="w-full max-w-xl my-8 rounded-2xl bg-white shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 bg-slate-50/50">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#1a4a38]/10 text-[#1a4a38]">
                    ID #{editingClient.id}
                  </span>
                  <h3 className="text-base font-extrabold text-slate-900">
                    Editar Datos del Asociado
                  </h3>
                </div>
                <p className="mt-0.5 text-xs text-slate-500">
                  Modifica la información personal, de contacto y tipo de cuenta
                </p>
              </div>
              <button
                type="button"
                onClick={handleCloseEdit}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-200/60 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleUpdateClient} className="p-6 space-y-4 overflow-y-auto max-h-[calc(85vh-120px)]">
              {editError && (
                <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs font-semibold text-rose-800 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
                  <span>{editError}</span>
                </div>
              )}

              {/* Nombre Completo */}
              <div>
                <label className="mb-1 block text-xs font-bold text-slate-700">
                  Nombre Completo / Razón Social *
                </label>
                <input
                  type="text"
                  required
                  value={editFormData.full_name || ""}
                  onChange={(e) =>
                    setEditFormData((prev) => ({ ...prev, full_name: e.target.value }))
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs text-slate-800 focus:border-[#1a4a38] focus:ring-1 focus:ring-[#1a4a38] focus:outline-none"
                  placeholder="Ej: Juan Pérez o Inversiones S.A.C."
                />
              </div>

              {/* Documento tipo y número */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-bold text-slate-700">
                    Tipo de Documento *
                  </label>
                  <select
                    value={editFormData.document_type || "DNI"}
                    onChange={(e) =>
                      setEditFormData((prev) => ({ ...prev, document_type: e.target.value }))
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 focus:border-[#1a4a38] focus:ring-1 focus:ring-[#1a4a38] focus:outline-none"
                  >
                    <option value="DNI">DNI (Documento Nacional)</option>
                    <option value="RUC">RUC (Registro Único de Contribuyente)</option>
                    <option value="CE">CE (Carnet de Extranjería)</option>
                    <option value="Pasaporte">Pasaporte</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-bold text-slate-700">
                    Número de Documento *
                  </label>
                  <input
                    type="text"
                    required
                    value={editFormData.document_number || ""}
                    onChange={(e) =>
                      setEditFormData((prev) => ({ ...prev, document_number: e.target.value }))
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-mono text-slate-800 focus:border-[#1a4a38] focus:ring-1 focus:ring-[#1a4a38] focus:outline-none"
                    placeholder="Ej: 72918293 o 20601234567"
                  />
                </div>
              </div>

              {/* Email y Teléfono */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-bold text-slate-700">
                    Correo Electrónico *
                  </label>
                  <input
                    type="email"
                    required
                    value={editFormData.email || ""}
                    onChange={(e) =>
                      setEditFormData((prev) => ({ ...prev, email: e.target.value }))
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs text-slate-800 focus:border-[#1a4a38] focus:ring-1 focus:ring-[#1a4a38] focus:outline-none"
                    placeholder="correo@ejemplo.com"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-bold text-slate-700">
                    Teléfono / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={editFormData.phone || ""}
                    onChange={(e) =>
                      setEditFormData((prev) => ({ ...prev, phone: e.target.value }))
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs text-slate-800 focus:border-[#1a4a38] focus:ring-1 focus:ring-[#1a4a38] focus:outline-none"
                    placeholder="+51 987 654 321"
                  />
                </div>
              </div>

              {/* Perfil y Empresa */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-bold text-slate-700">
                    Tipo de Perfil *
                  </label>
                  <select
                    value={editFormData.client_type || "Profesional"}
                    onChange={(e) =>
                      setEditFormData((prev) => ({ ...prev, client_type: e.target.value }))
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 focus:border-[#1a4a38] focus:ring-1 focus:ring-[#1a4a38] focus:outline-none"
                  >
                    <option value="Estudiante">Estudiante</option>
                    <option value="Profesional">Profesional</option>
                    <option value="Empresa">Empresa</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-bold text-slate-700">
                    Empresa / Institución (Opcional)
                  </label>
                  <input
                    type="text"
                    value={editFormData.company_name || ""}
                    onChange={(e) =>
                      setEditFormData((prev) => ({ ...prev, company_name: e.target.value }))
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs text-slate-800 focus:border-[#1a4a38] focus:ring-1 focus:ring-[#1a4a38] focus:outline-none"
                    placeholder="Nombre de la empresa o universidad"
                  />
                </div>
              </div>

              {/* Notas */}
              <div>
                <label className="mb-1 block text-xs font-bold text-slate-700">
                  Notas u Observaciones Internas (Opcional)
                </label>
                <textarea
                  rows={2}
                  value={editFormData.notes || ""}
                  onChange={(e) =>
                    setEditFormData((prev) => ({ ...prev, notes: e.target.value }))
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs text-slate-800 focus:border-[#1a4a38] focus:ring-1 focus:ring-[#1a4a38] focus:outline-none resize-none"
                  placeholder="Detalles administrativos, convenios o intereses..."
                />
              </div>

              {/* Consentimientos */}
              <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 space-y-2">
                <span className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                  Preferencias de Comunicación
                </span>
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700 select-none">
                  <input
                    type="checkbox"
                    checked={Boolean(editFormData.opt_in_newsletter)}
                    onChange={(e) =>
                      setEditFormData((prev) => ({
                        ...prev,
                        opt_in_newsletter: e.target.checked,
                      }))
                    }
                    className="rounded border-slate-300 text-[#1a4a38] focus:ring-[#1a4a38]"
                  />
                  <span>Desea recibir boletines informativos por correo</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700 select-none">
                  <input
                    type="checkbox"
                    checked={Boolean(editFormData.opt_in_whatsapp)}
                    onChange={(e) =>
                      setEditFormData((prev) => ({
                        ...prev,
                        opt_in_whatsapp: e.target.checked,
                      }))
                    }
                    className="rounded border-slate-300 text-[#1a4a38] focus:ring-[#1a4a38]"
                  />
                  <span>Desea recibir notificaciones y recordatorios por WhatsApp</span>
                </label>
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleCloseEdit}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSavingClient}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[#1a4a38] px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-[#13372a] disabled:opacity-50 transition-colors"
                >
                  {isSavingClient ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Save className="h-3.5 w-3.5" />
                  )}
                  <span>Guardar Cambios</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientsAdmin;

import React, { useState, useEffect } from "react";
import { partnersService, uploadsService } from "@/services";
import type { PartnerOut, PartnerCreate } from "@/lib/api-types";
import {
  Handshake,
  Plus,
  Trash2,
  Edit2,
  Upload,
  RefreshCw,
  Loader2,
  X,
  ExternalLink,
  CheckCircle2,
} from "lucide-react";

export const PartnersAdmin: React.FC = () => {
  const [partners, setPartners] = useState<PartnerOut[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPartnerId, setEditingPartnerId] = useState<number | null>(null);
  const [formData, setFormData] = useState<PartnerCreate>({
    name: "",
    logo_url: "",
    summary: "",
    benefits_json: "[]",
    display_order: 1,
    is_active: true,
  });

  const [benefitsList, setBenefitsList] = useState<string[]>([]);
  const [newBenefit, setNewBenefit] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const fetchPartners = async () => {
    setLoading(true);
    try {
      const data = await partnersService.list();
      setPartners(data);
    } catch (err: any) {
      console.warn("Error cargando aliados:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  const openCreateModal = () => {
    setEditingPartnerId(null);
    setFormData({
      name: "",
      logo_url: "",
      summary: "",
      benefits_json: "[]",
      display_order: partners.length + 1,
      is_active: true,
    });
    setBenefitsList([]);
    setNewBenefit("");
    setIsModalOpen(true);
  };

  const openEditModal = (partner: PartnerOut) => {
    setEditingPartnerId(partner.id);
    let parsed: string[] = [];
    try {
      parsed = partner.benefits_json ? JSON.parse(partner.benefits_json) : [];
    } catch {
      parsed = [];
    }
    setBenefitsList(parsed);
    setFormData({
      name: partner.name,
      logo_url: partner.logo_url,
      summary: partner.summary,
      benefits_json: partner.benefits_json || "[]",
      display_order: partner.display_order,
      is_active: partner.is_active,
    });
    setIsModalOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const res = await uploadsService.uploadImage(file, "logos");
      setFormData((prev) => ({ ...prev, logo_url: res.url }));
      setFeedback("✓ Logo subido correctamente.");
      setTimeout(() => setFeedback(null), 3000);
    } catch (err: any) {
      alert(err?.message || "Error al subir logo");
    } finally {
      setIsUploading(false);
    }
  };

  const addBenefitItem = () => {
    if (!newBenefit.trim()) return;
    const updated = [...benefitsList, newBenefit.trim()];
    setBenefitsList(updated);
    setFormData((prev) => ({ ...prev, benefits_json: JSON.stringify(updated) }));
    setNewBenefit("");
  };

  const removeBenefitItem = (index: number) => {
    const updated = benefitsList.filter((_, i) => i !== index);
    setBenefitsList(updated);
    setFormData((prev) => ({ ...prev, benefits_json: JSON.stringify(updated) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.logo_url.trim() || !formData.summary.trim()) {
      alert("Por favor completa el nombre, logo y descripción del aliado.");
      return;
    }

    setIsSaving(true);
    try {
      const payload: PartnerCreate = {
        ...formData,
        benefits_json: JSON.stringify(benefitsList),
      };

      if (editingPartnerId) {
        await partnersService.update(editingPartnerId, payload);
        setFeedback("✓ Aliado actualizado con éxito.");
      } else {
        await partnersService.create(payload);
        setFeedback("✓ Aliado institucional creado con éxito.");
      }
      setIsModalOpen(false);
      setTimeout(() => setFeedback(null), 4000);
      fetchPartners();
    } catch (err: any) {
      alert(err?.message || "Error al guardar aliado");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("¿Seguro que deseas eliminar este aliado?")) return;
    try {
      await partnersService.delete(id);
      setFeedback("✓ Aliado eliminado correctamente.");
      setTimeout(() => setFeedback(null), 3000);
      fetchPartners();
    } catch (err: any) {
      alert(err?.message || "Error al eliminar aliado");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 sm:text-2xl">
            Aliados & Convenios Institucionales
          </h1>
          <p className="text-xs text-slate-500">
            Convenios con colegios profesionales, empresas y descuentos para asociados
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchPartners}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 disabled:opacity-50"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Refrescar</span>
          </button>
          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 rounded-xl bg-[#1a4a38] px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-[#13372a]"
          >
            <Plus className="h-4 w-4" />
            <span>Nuevo Aliado</span>
          </button>
        </div>
      </div>

      {feedback && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3.5 text-xs font-semibold text-emerald-800">
          {feedback}
        </div>
      )}

      {/* Grid de Aliados */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-[#1a4a38]" />
        </div>
      ) : partners.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center">
          <Handshake className="mx-auto h-10 w-10 text-slate-300" />
          <h3 className="mt-2 text-sm font-bold text-slate-700">Sin convenios registrados</h3>
          <p className="mt-1 text-xs text-slate-400">
            Agrega el primer convenio o empresa aliada al directorio.
          </p>
          <button
            onClick={openCreateModal}
            className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-[#1a4a38] px-4 py-2 text-xs font-bold text-white shadow hover:bg-[#13372a]"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Crear Aliado</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {partners.map((partner) => {
            let benefits: string[] = [];
            try {
              benefits = partner.benefits_json ? JSON.parse(partner.benefits_json) : [];
            } catch {
              benefits = [];
            }

            return (
              <div
                key={partner.id}
                className="flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md"
              >
                <div>
                  <div className="flex h-36 w-full items-center justify-center border-b border-slate-100 bg-slate-50 p-6">
                    <img
                      src={partner.logo_url}
                      alt={partner.name}
                      className="max-h-20 max-w-[85%] object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://placehold.co/300x120?text=Logo+Aliado";
                      }}
                    />
                  </div>

                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-slate-900">{partner.name}</h3>
                      <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600">
                        Orden #{partner.display_order}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-500">{partner.summary}</p>

                    {benefits.length > 0 && (
                      <div className="mt-3 space-y-1">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Beneficios del convenio:
                        </p>
                        {benefits.slice(0, 3).map((b, i) => (
                          <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-700">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#1a4a38]" />
                            <span className="truncate">{b}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/50 p-3">
                  <span
                    className={`inline-flex items-center gap-1 text-[11px] font-bold ${
                      partner.is_active ? "text-emerald-600" : "text-slate-400"
                    }`}
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${
                        partner.is_active ? "bg-emerald-500" : "bg-slate-300"
                      }`}
                    />
                    {partner.is_active ? "Activo en Web" : "Inactivo"}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => openEditModal(partner)}
                      className="rounded-lg border border-slate-200 bg-white p-1.5 text-slate-600 hover:bg-slate-100"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(partner.id)}
                      className="rounded-lg border border-red-200 bg-white p-1.5 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-extrabold text-slate-900">
                {editingPartnerId ? "Editar Aliado Institucional" : "Crear Nuevo Aliado"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div>
                <label className="mb-1 block text-xs font-bold text-slate-700">
                  Nombre de la Organización / Empresa *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Colegio de Ingenieros del Perú - CD Ica"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs text-slate-900 focus:border-[#1a4a38] focus:outline-none"
                />
              </div>

              {/* Logo */}
              <div>
                <label className="mb-1 block text-xs font-bold text-slate-700">
                  Logotipo Oficial *
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    placeholder="https://res.cloudinary.com/.../logo.png"
                    value={formData.logo_url}
                    onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
                    className="flex-1 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs text-slate-800 focus:border-[#1a4a38] focus:outline-none"
                  />
                  <label className="inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100">
                    {isUploading ? (
                      <Loader2 className="h-4 w-4 animate-spin text-[#1a4a38]" />
                    ) : (
                      <Upload className="h-4 w-4 text-slate-500" />
                    )}
                    <span>{isUploading ? "Subiendo..." : "Subir"}</span>
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      onChange={handleFileUpload}
                      className="hidden"
                      disabled={isUploading}
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold text-slate-700">
                  Resumen del Convenio *
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Resumen del valor y alcance de la alianza institucional..."
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs text-slate-800 focus:border-[#1a4a38] focus:outline-none"
                />
              </div>

              {/* Beneficios dinámicos */}
              <div>
                <label className="mb-1 block text-xs font-bold text-slate-700">
                  Beneficios Exclusivos para Asociados
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Ej. 25% de descuento en colegiatura y certificaciones"
                    value={newBenefit}
                    onChange={(e) => setNewBenefit(e.target.value)}
                    className="flex-1 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs text-slate-800 focus:border-[#1a4a38] focus:outline-none"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addBenefitItem();
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={addBenefitItem}
                    className="rounded-xl bg-slate-100 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-200"
                  >
                    Agregar
                  </button>
                </div>

                {benefitsList.length > 0 && (
                  <div className="mt-2 space-y-1.5">
                    {benefitsList.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-1.5 text-xs text-slate-700 border border-slate-100"
                      >
                        <span>• {item}</span>
                        <button
                          type="button"
                          onClick={() => removeBenefitItem(idx)}
                          className="text-slate-400 hover:text-red-500"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-bold text-slate-700">
                    Orden de Visualización
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={formData.display_order}
                    onChange={(e) =>
                      setFormData({ ...formData, display_order: Number(e.target.value) })
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs text-slate-800 focus:border-[#1a4a38] focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-2 pt-5">
                  <input
                    type="checkbox"
                    id="is_active"
                    checked={formData.is_active}
                    onChange={(e) =>
                      setFormData({ ...formData, is_active: e.target.checked })
                    }
                    className="h-4 w-4 rounded border-slate-300 text-[#1a4a38] focus:ring-[#1a4a38]"
                  />
                  <label htmlFor="is_active" className="text-xs font-semibold text-slate-700">
                    Visible en la web pública
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 border-t border-slate-100 pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[#1a4a38] px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-[#13372a] disabled:opacity-50"
                >
                  {isSaving && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                  <span>{editingPartnerId ? "Actualizar" : "Crear Aliado"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PartnersAdmin;

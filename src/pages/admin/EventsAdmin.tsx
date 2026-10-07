import React, { useState, useEffect } from "react";
import { eventsService, uploadsService } from "@/services";
import type { EventOut, EventCreate } from "@/lib/api-types";
import {
  Calendar,
  Plus,
  Trash2,
  Edit2,
  Upload,
  RefreshCw,
  Loader2,
  X,
  MapPin,
  Clock,
} from "lucide-react";

export const EventsAdmin: React.FC = () => {
  const [events, setEvents] = useState<EventOut[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEventId, setEditingEventId] = useState<number | null>(null);
  const [formData, setFormData] = useState<EventCreate>({
    title: "",
    slug: "",
    event_type: "Webinar",
    description: "",
    banner_url: "",
    event_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    location: "Online / Zoom",
    is_published: true,
  });

  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const data = await eventsService.list();
      setEvents(data);
    } catch (err: any) {
      console.warn("Error cargando eventos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const openCreateModal = () => {
    setEditingEventId(null);
    setFormData({
      title: "",
      slug: "",
      event_type: "Webinar",
      description: "",
      banner_url: "",
      event_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16),
      location: "Online / Zoom",
      is_published: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (evt: EventOut) => {
    setEditingEventId(evt.id);
    setFormData({
      title: evt.title,
      slug: evt.slug,
      event_type: evt.event_type,
      description: evt.description,
      banner_url: evt.banner_url,
      event_date: new Date(evt.event_date).toISOString().slice(0, 16),
      location: evt.location || "Online / Zoom",
      is_published: evt.is_published,
    });
    setIsModalOpen(true);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    if (!editingEventId) {
      const slug = title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
      setFormData((prev) => ({ ...prev, title, slug }));
    } else {
      setFormData((prev) => ({ ...prev, title }));
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const res = await uploadsService.uploadImage(file, "banners");
      setFormData((prev) => ({ ...prev, banner_url: res.url }));
      setFeedback("✓ Banner subido correctamente.");
      setTimeout(() => setFeedback(null), 3000);
    } catch (err: any) {
      alert(err?.message || "Error al subir banner");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.banner_url.trim() || !formData.description.trim()) {
      alert("Por favor completa el título, banner y descripción.");
      return;
    }

    setIsSaving(true);
    try {
      const payload: EventCreate = {
        ...formData,
        event_date: new Date(formData.event_date).toISOString(),
      };

      if (editingEventId) {
        await eventsService.update(editingEventId, payload);
        setFeedback("✓ Evento actualizado con éxito.");
      } else {
        await eventsService.create(payload);
        setFeedback("✓ Evento creado con éxito.");
      }
      setIsModalOpen(false);
      setTimeout(() => setFeedback(null), 4000);
      fetchEvents();
    } catch (err: any) {
      alert(err?.message || "Error al guardar evento");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("¿Seguro que deseas eliminar este evento?")) return;
    try {
      await eventsService.delete(id);
      setFeedback("✓ Evento eliminado.");
      setTimeout(() => setFeedback(null), 3000);
      fetchEvents();
    } catch (err: any) {
      alert(err?.message || "Error al eliminar evento");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 sm:text-2xl">
            Eventos & Webinars
          </h1>
          <p className="text-xs text-slate-500">
            Agenda de conferencias, talleres y capacitaciones corporativas
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchEvents}
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
            <span>Nuevo Evento</span>
          </button>
        </div>
      </div>

      {feedback && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3.5 text-xs font-semibold text-emerald-800">
          {feedback}
        </div>
      )}

      {/* Grid de Eventos */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-[#1a4a38]" />
        </div>
      ) : events.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center">
          <Calendar className="mx-auto h-10 w-10 text-slate-300" />
          <h3 className="mt-2 text-sm font-bold text-slate-700">Sin eventos en cartelera</h3>
          <p className="mt-1 text-xs text-slate-400">
            Crea el próximo webinar o seminario del Centro Empresarial.
          </p>
          <button
            onClick={openCreateModal}
            className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-[#1a4a38] px-4 py-2 text-xs font-bold text-white shadow hover:bg-[#13372a]"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Crear Evento</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((evt) => (
            <div
              key={evt.id}
              className="flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md"
            >
              <div>
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
                  <img
                    src={evt.banner_url}
                    alt={evt.title}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://placehold.co/600x350?text=Evento+CE";
                    }}
                  />
                  <div className="absolute left-3 top-3">
                    <span className="rounded-full bg-slate-900/80 px-2.5 py-0.5 text-[10px] font-bold text-white backdrop-blur">
                      {evt.event_type}
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-center gap-2 text-[11px] font-semibold text-[#1a4a38]">
                    <Clock className="h-3.5 w-3.5" />
                    <span>
                      {new Date(evt.event_date).toLocaleString("es-PE", {
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <h3 className="mt-1 line-clamp-2 text-sm font-bold text-slate-900">
                    {evt.title}
                  </h3>
                  <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                    <span className="truncate">{evt.location}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/50 p-3">
                <span
                  className={`inline-flex items-center gap-1 text-[11px] font-bold ${
                    evt.is_published ? "text-emerald-600" : "text-slate-400"
                  }`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${
                      evt.is_published ? "bg-emerald-500" : "bg-slate-300"
                    }`}
                  />
                  {evt.is_published ? "Publicado" : "Borrador"}
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => openEditModal(evt)}
                    className="rounded-lg border border-slate-200 bg-white p-1.5 text-slate-600 hover:bg-slate-100"
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(evt.id)}
                    className="rounded-lg border border-red-200 bg-white p-1.5 text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-extrabold text-slate-900">
                {editingEventId ? "Editar Evento" : "Crear Nuevo Evento"}
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
                  Título del Evento *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Foro GNV Ica 2026: Movilidad Sostenible"
                  value={formData.title}
                  onChange={handleTitleChange}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs text-slate-900 focus:border-[#1a4a38] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-bold text-slate-700">
                    Tipo de Evento
                  </label>
                  <select
                    value={formData.event_type}
                    onChange={(e) =>
                      setFormData({ ...formData, event_type: e.target.value })
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-800 focus:border-[#1a4a38] focus:outline-none"
                  >
                    <option value="Webinar">Webinar Online</option>
                    <option value="Conferencia">Conferencia Presencial</option>
                    <option value="Taller">Taller / Workshop</option>
                    <option value="Networking">Networking</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-bold text-slate-700">
                    Fecha y Hora *
                  </label>
                  <input
                    type="datetime-local"
                    required
                    value={formData.event_date}
                    onChange={(e) =>
                      setFormData({ ...formData, event_date: e.target.value })
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs text-slate-800 focus:border-[#1a4a38] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold text-slate-700">
                  Ubicación / Plataforma
                </label>
                <input
                  type="text"
                  placeholder="Online / Zoom o Auditorio CIP Ica"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs text-slate-800 focus:border-[#1a4a38] focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold text-slate-700">
                  Descripción *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Temario, ponente y detalles para los asistentes..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs text-slate-800 focus:border-[#1a4a38] focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold text-slate-700">
                  Banner / Portada *
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    placeholder="https://res.cloudinary.com/.../banner.webp"
                    value={formData.banner_url}
                    onChange={(e) =>
                      setFormData({ ...formData, banner_url: e.target.value })
                    }
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
                  <span>{editingEventId ? "Actualizar" : "Guardar Evento"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsAdmin;

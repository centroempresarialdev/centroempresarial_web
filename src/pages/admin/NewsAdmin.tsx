import React, { useState, useEffect } from "react";
import { newsService, uploadsService } from "@/services";
import type { NewsOut, NewsCreate } from "@/lib/api-types";
import {
  Newspaper,
  Plus,
  Trash2,
  Edit2,
  ExternalLink,
  Upload,
  RefreshCw,
  Loader2,
  X,
  CheckCircle2,
  Image as ImageIcon,
  Send,
} from "lucide-react";

export const NewsAdmin: React.FC = () => {
  const [newsList, setNewsList] = useState<NewsOut[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal Crear / Editar
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNewsId, setEditingNewsId] = useState<number | null>(null);
  const [formData, setFormData] = useState<NewsCreate>({
    title: "",
    slug: "",
    category: "Noticia Empresarial",
    tag: "Oficial",
    summary: "",
    content: "",
    flyer_url: "",
    whatsapp_cta_message: "",
    is_published: true,
  });

  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const data = await newsService.list({ limit: 50 });
      setNewsList(data);
    } catch (err: any) {
      console.warn("Error cargando noticias:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const openCreateModal = () => {
    setEditingNewsId(null);
    setFormData({
      title: "",
      slug: "",
      category: "Noticia Empresarial",
      tag: "Oficial",
      summary: "",
      content: "",
      flyer_url: "",
      whatsapp_cta_message: "Hola, deseo más información sobre esta noticia.",
      is_published: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (news: NewsOut) => {
    setEditingNewsId(news.id);
    setFormData({
      title: news.title,
      slug: news.slug,
      category: news.category,
      tag: news.tag || "",
      summary: news.summary,
      content: news.content || "",
      flyer_url: news.flyer_url,
      whatsapp_cta_message: news.whatsapp_cta_message || "",
      is_published: news.is_published,
    });
    setIsModalOpen(true);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    // Auto generar slug si es creación
    if (!editingNewsId) {
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
      const res = await uploadsService.uploadImage(file, "flyers");
      setFormData((prev) => ({ ...prev, flyer_url: res.url }));
      setFeedback("✓ Imagen subida a Cloudinary correctamente.");
      setTimeout(() => setFeedback(null), 3000);
    } catch (err: any) {
      alert(err?.message || "Error al subir la imagen");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.flyer_url.trim() || !formData.summary.trim()) {
      alert("Por favor completa el título, resumen y afiche/imagen.");
      return;
    }

    setIsSaving(true);
    try {
      if (editingNewsId) {
        await newsService.update(editingNewsId, formData);
        setFeedback("✓ Noticia actualizada con éxito.");
      } else {
        await newsService.create(formData);
        setFeedback("✓ Noticia publicada con éxito (difusión por correo iniciada).");
      }
      setIsModalOpen(false);
      setTimeout(() => setFeedback(null), 4000);
      fetchNews();
    } catch (err: any) {
      alert(err?.message || "Error al guardar la noticia");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("¿Seguro que deseas eliminar esta noticia?")) return;

    try {
      await newsService.delete(id);
      setFeedback("✓ Noticia eliminada correctamente.");
      setTimeout(() => setFeedback(null), 3000);
      fetchNews();
    } catch (err: any) {
      alert(err?.message || "Error al eliminar la noticia");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 sm:text-2xl">
            Noticias & Comunicados Oficiales
          </h1>
          <p className="text-xs text-slate-500">
            Publicación de afiches informativos, convocatorias y difusión a asociados
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchNews}
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
            <span>Nueva Noticia</span>
          </button>
        </div>
      </div>

      {feedback && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3.5 text-xs font-semibold text-emerald-800">
          {feedback}
        </div>
      )}

      {/* Grid de Noticias */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-[#1a4a38]" />
        </div>
      ) : newsList.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center">
          <Newspaper className="mx-auto h-10 w-10 text-slate-300" />
          <h3 className="mt-2 text-sm font-bold text-slate-700">Sin noticias creadas</h3>
          <p className="mt-1 text-xs text-slate-400">
            Comienza publicando la primera noticia o afiche del Centro Empresarial.
          </p>
          <button
            onClick={openCreateModal}
            className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-[#1a4a38] px-4 py-2 text-xs font-bold text-white shadow hover:bg-[#13372a]"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Crear Noticia</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {newsList.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md"
            >
              <div>
                {/* Imagen Preview */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                  <img
                    src={item.flyer_url}
                    alt={item.title}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://placehold.co/600x400?text=Afiche+CE";
                    }}
                  />
                  <div className="absolute left-3 top-3">
                    <span className="rounded-full bg-slate-900/80 px-2.5 py-0.5 text-[10px] font-bold text-white backdrop-blur">
                      {item.category}
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {item.tag || "Noticia"} ·{" "}
                    {new Date(item.published_at).toLocaleDateString("es-PE")}
                  </span>
                  <h3 className="mt-1 line-clamp-2 text-sm font-bold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-xs text-slate-500">
                    {item.summary}
                  </p>
                </div>
              </div>

              {/* Acciones */}
              <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/50 p-3">
                <span
                  className={`inline-flex items-center gap-1 text-[11px] font-bold ${
                    item.is_published ? "text-emerald-600" : "text-slate-400"
                  }`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${
                      item.is_published ? "bg-emerald-500" : "bg-slate-300"
                    }`}
                  />
                  {item.is_published ? "Publicada" : "Borrador"}
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => openEditModal(item)}
                    className="rounded-lg border border-slate-200 bg-white p-1.5 text-slate-600 hover:bg-slate-100"
                    title="Editar noticia"
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="rounded-lg border border-red-200 bg-white p-1.5 text-red-600 hover:bg-red-50"
                    title="Eliminar noticia"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Crear / Editar */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-extrabold text-slate-900">
                {editingNewsId ? "Editar Noticia" : "Publicar Nueva Noticia"}
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
                  Título de la Noticia *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Convenio Especial con Colegio de Ingenieros"
                  value={formData.title}
                  onChange={handleTitleChange}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs text-slate-900 focus:border-[#1a4a38] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-bold text-slate-700">
                    Slug SEO *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData({ ...formData, slug: e.target.value })
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-mono text-slate-800 focus:border-[#1a4a38] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-bold text-slate-700">
                    Categoría
                  </label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs text-slate-800 focus:border-[#1a4a38] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold text-slate-700">
                  Resumen Corto *
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Breve resumen visible en el catálogo de noticias..."
                  value={formData.summary}
                  onChange={(e) =>
                    setFormData({ ...formData, summary: e.target.value })
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs text-slate-800 focus:border-[#1a4a38] focus:outline-none"
                />
              </div>

              {/* Subida o URL de Imagen Flyer */}
              <div>
                <label className="mb-1 block text-xs font-bold text-slate-700">
                  Afiche / Imagen (Cloudinary o URL) *
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    placeholder="https://res.cloudinary.com/.../imagen.webp"
                    value={formData.flyer_url}
                    onChange={(e) =>
                      setFormData({ ...formData, flyer_url: e.target.value })
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

              <div>
                <label className="mb-1 block text-xs font-bold text-slate-700">
                  Mensaje CTA para WhatsApp (Opcional)
                </label>
                <input
                  type="text"
                  placeholder="Hola, deseo inscribirme en esta convocatoria..."
                  value={formData.whatsapp_cta_message}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      whatsapp_cta_message: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs text-slate-800 focus:border-[#1a4a38] focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="is_published"
                  checked={formData.is_published}
                  onChange={(e) =>
                    setFormData({ ...formData, is_published: e.target.checked })
                  }
                  className="h-4 w-4 rounded border-slate-300 text-[#1a4a38] focus:ring-[#1a4a38]"
                />
                <label
                  htmlFor="is_published"
                  className="text-xs font-semibold text-slate-700"
                >
                  Publicar inmediatamente (dispara difusión masiva por email)
                </label>
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
                  <span>{editingNewsId ? "Actualizar" : "Publicar"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsAdmin;

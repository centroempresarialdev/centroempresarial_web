import React, { useState, useEffect, useRef, FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import advisorImg from "@/assets/flayers-Noticias empresariales/image-Photoroom.png";
import {
  Sparkles,
  ArrowRight,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Building2,
  FileText,
  UserCheck,
  Send,
  Headphones,
  Users,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface FormDataState {
  name: string;
  phone: string;
  email: string;
  profileType: string;
  serviceInterest: string;
  message: string;
}

const initialFormData: FormDataState = {
  name: "",
  phone: "",
  email: "",
  profileType: "Profesional",
  serviceInterest: "Membresía Profesional",
  message: "",
};

export const ContactSection: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState<FormDataState>(initialFormData);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const bottomGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const planParam = searchParams.get("plan")?.toLowerCase();
    const serviceParam = searchParams.get("servicio")?.toLowerCase();

    if (planParam) {
      if (planParam.includes("estudiante")) {
        setFormData((prev) => ({ ...prev, profileType: "Estudiante", serviceInterest: "Membresía Estudiante" }));
      } else if (planParam.includes("profesional")) {
        setFormData((prev) => ({ ...prev, profileType: "Profesional", serviceInterest: "Membresía Profesional" }));
      } else if (
        planParam.includes("empresa") ||
        planParam.includes("corporaci")
      ) {
        setFormData((prev) => ({
          ...prev,
          profileType: "Empresa",
          serviceInterest: "Membresía Empresarial",
        }));
      }
    }

    if (serviceParam) {
      if (serviceParam.includes("tesis") || serviceParam.includes("asesoria")) {
        setFormData((prev) => ({
          ...prev,
          serviceInterest: "Asesoría de Tesis",
        }));
      } else if (
        serviceParam.includes("curso") ||
        serviceParam.includes("capacitacion")
      ) {
        setFormData((prev) => ({
          ...prev,
          serviceInterest: "Cursos de Capacitación",
        }));
      } else if (
        serviceParam.includes("empresa") ||
        serviceParam.includes("solucion")
      ) {
        setFormData((prev) => ({
          ...prev,
          serviceInterest: "Soluciones Empresariales",
        }));
      }
    }
  }, [searchParams]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Bloque izquierdo entrando desde la izquierda
      if (leftColRef.current) {
        gsap.fromTo(
          leftColRef.current,
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, duration: 0.9, ease: "power2.out" },
        );
      }

      // Imagen de asesora con fade-in suave
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 1, delay: 0.15, ease: "power2.out" },
        );
      }

      // Tarjeta del formulario entrando desde la derecha
      if (formCardRef.current) {
        gsap.fromTo(
          formCardRef.current,
          { opacity: 0, x: 30 },
          { opacity: 1, x: 0, duration: 0.9, delay: 0.1, ease: "power2.out" },
        );
      }

      // Tarjetas inferiores con ScrollTrigger y stagger 0.15s
      if (bottomGridRef.current) {
        gsap.fromTo(
          bottomGridRef.current.children,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: bottomGridRef.current,
              start: "top 85%",
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      alert("Por favor completa tu nombre y número de WhatsApp.");
      return;
    }

    setFormSubmitted(true);

    const messageLines = [
      "¡Hola Centro Empresarial! Deseo solicitar orientación personalizada:",
      `• Nombre / Razón Social: ${formData.name}`,
      `• Teléfono / WhatsApp: ${formData.phone}`,
      formData.email ? `• Correo electrónico: ${formData.email}` : null,
      formData.profileType ? `• Tipo de interesado: ${formData.profileType}` : null,
      formData.serviceInterest ? `• Membresía / Servicio de interés: ${formData.serviceInterest}` : null,
      formData.message ? `• Mensaje / Consulta: ${formData.message}` : null,
    ].filter(Boolean);

    const fullMessage = messageLines.join("\n");
    const waUrl = `https://wa.me/51906491859?text=${encodeURIComponent(fullMessage)}`;

    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  const scrollToForm = () => {
    formCardRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#f8f9fa] pt-32 pb-16 md:pt-40 md:pb-24"
    >
      {/* Elementos decorativos sutiles de fondo */}
      <div className="pointer-events-none absolute -left-20 top-1/4 h-96 w-96 rounded-full bg-[#1a4a38]/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-1/2 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />

      <div className="container relative mx-auto px-6 lg:px-12">
        {/* ═════════════════════════════════════════════════════════════
            SECCIÓN SUPERIOR (Hero Contacto: Texto + Asesora + Formulario)
           ═════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-4 xl:gap-8">
          {/* Bloque Izquierdo (Texto y llamada a la acción) */}
          <div ref={leftColRef} className="lg:col-span-4 xl:col-span-4 z-10">
            {/* Badge superior */}
            <div className="inline-flex items-center gap-2 rounded-full border border-gray-200/80 bg-gray-100/90 px-3.5 py-1 text-xs font-semibold text-gray-700">
              <UserCheck className="h-3.5 w-3.5 text-gray-600" />
              <span>Tu aliado en el crecimiento empresarial</span>
            </div>

            {/* Título grande y en negrita verde oscuro */}
            <h1 className="mt-4 text-3xl font-extrabold leading-[1.12] text-[#1a4a38] sm:text-4xl md:text-5xl">
              Solicita orientación y recibe una respuesta directa
            </h1>

            {/* Párrafo descriptivo */}
            <p className="mt-4 text-base leading-relaxed text-gray-600">
              Completa los datos principales y la web preparará un mensaje
              profesional para continuar por WhatsApp con el asesor.
            </p>

            {/* Botón verde oscuro con icono de WhatsApp */}
            <div className="mt-7">
              <button
                type="button"
                onClick={scrollToForm}
                className="group inline-flex items-center gap-2.5 rounded-xl bg-[#1a4a38] px-6 py-3.5 text-sm font-bold text-white shadow-md transition-all duration-300 hover:bg-[#13372a] hover:shadow-lg hover:-translate-y-0.5"
              >
                <MessageCircle className="h-4 w-4 text-[#25D366]" />
                <span>Enviar por WhatsApp</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Bloque Central (Imagen transparente de asesora MUCHO más grande) */}
          <div
            ref={imageRef}
            className="relative hidden items-end justify-center lg:col-span-4 xl:col-span-4 lg:flex self-end -mb-16 xl:-mb-24"
          >
            {/* Círculo suave de fondo estilo reference mockup */}
            <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 h-[340px] w-[340px] xl:h-[420px] xl:w-[420px] rounded-full bg-[#ecf2ea] -z-10" />

            {/* Rayos / destellos amarillos dinámicos */}
            <div className="pointer-events-none absolute top-4 right-4 xl:top-6 xl:right-8 flex flex-col items-center z-20">
              <svg
                className="h-8 w-8 text-[#f59e0b]"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10 24L3 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M18 10L16 2" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M24 16L30 11" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>

            {/* Imagen grande de la asesora señalando al formulario */}
            <img
              src={advisorImg}
              alt="Asesora Centro Empresarial señalando formulario"
              className="relative z-10 h-[520px] sm:h-[560px] lg:h-[580px] xl:h-[640px] w-auto max-w-none object-contain drop-shadow-2xl transition-transform duration-300 hover:scale-[1.02]"
            />
          </div>

          {/* Bloque Derecho (La Tarjeta del Formulario) */}
          <div ref={formCardRef} className="lg:col-span-4 xl:col-span-4 z-10">
            <div className="relative rounded-2xl border border-gray-200/80 bg-white p-6 shadow-xl sm:p-7">
              {/* Cabecera del formulario */}
              <div className="mb-5 flex items-center gap-3 border-b border-gray-100 pb-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-[#1a4a38]">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-gray-900">
                    Solicitud de membresía
                  </h2>
                </div>
              </div>

              {/* Formulario */}
              <form onSubmit={handleSubmit} className="space-y-3.5">
                {/* Nombre y apellidos / razón social * (full width) */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs font-semibold text-gray-700 mb-1.5"
                  >
                    Nombre y apellidos / razón social <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Ej. Juan Pérez / Empresa SAC"
                    className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-800 transition-colors placeholder:text-gray-400 focus:border-[#1a4a38] focus:outline-none focus:ring-2 focus:ring-[#1a4a38]/20"
                  />
                </div>

                {/* Grid 2 Columnas: Teléfono y Correo */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-xs font-semibold text-gray-700 mb-1.5"
                    >
                      Teléfono o WhatsApp <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+51 999 999 999"
                      className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-800 transition-colors placeholder:text-gray-400 focus:border-[#1a4a38] focus:outline-none focus:ring-2 focus:ring-[#1a4a38]/20"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-semibold text-gray-700 mb-1.5"
                    >
                      Correo electrónico <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="tu@email.com"
                      className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-800 transition-colors placeholder:text-gray-400 focus:border-[#1a4a38] focus:outline-none focus:ring-2 focus:ring-[#1a4a38]/20"
                    />
                  </div>
                </div>

                {/* Grid 2 Columnas: Tipo de interesado y Membresía de interés */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="profileType"
                      className="block text-xs font-semibold text-gray-700 mb-1.5"
                    >
                      Tipo de interesado <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="profileType"
                      name="profileType"
                      value={formData.profileType}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 transition-colors focus:border-[#1a4a38] focus:outline-none focus:ring-2 focus:ring-[#1a4a38]/20"
                    >
                      <option value="">Seleccionar</option>
                      <option value="Estudiante">Estudiante</option>
                      <option value="Profesional">Profesional</option>
                      <option value="Empresa">Empresa</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="serviceInterest"
                      className="block text-xs font-semibold text-gray-700 mb-1.5"
                    >
                      Membresía de interés <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="serviceInterest"
                      name="serviceInterest"
                      value={formData.serviceInterest}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 transition-colors focus:border-[#1a4a38] focus:outline-none focus:ring-2 focus:ring-[#1a4a38]/20"
                    >
                      <option value="">Seleccionar</option>
                      <option value="Membresía Estudiante">Membresía Estudiante</option>
                      <option value="Membresía Profesional">Membresía Profesional</option>
                      <option value="Membresía Empresarial">Membresía Empresarial</option>
                      <option value="Asesoría de Tesis">Asesoría de Tesis</option>
                      <option value="Cursos de Capacitación">Cursos de Capacitación</option>
                      <option value="Soluciones Empresariales">Soluciones Empresariales</option>
                    </select>
                  </div>
                </div>

                {/* Mensaje o consulta adicional */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-semibold text-gray-700 mb-1.5"
                  >
                    Mensaje o consulta adicional
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Cuéntanos qué necesitas o qué beneficio te interesa..."
                    className="w-full resize-none rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-800 transition-colors placeholder:text-gray-400 focus:border-[#1a4a38] focus:outline-none focus:ring-2 focus:ring-[#1a4a38]/20"
                  />
                </div>

                {/* Botón de envío ancho completo en verde oscuro corporativo */}
                <button
                  type="submit"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#1a4a38] px-6 py-3.5 text-sm font-bold text-white shadow-md transition-all duration-300 hover:bg-[#13372a] hover:shadow-lg hover:-translate-y-0.5"
                >
                  <MessageCircle className="h-4 w-4 text-[#25D366]" />
                  <span>Enviar por WhatsApp</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </button>

                {formSubmitted && (
                  <p className="text-center text-xs font-semibold text-emerald-600">
                    ✓ Abriendo conversación en WhatsApp...
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* ═════════════════════════════════════════════════════════════
            SECCIÓN INFERIOR (Beneficios y Contacto: Grid 5 Columnas)
           ═════════════════════════════════════════════════════════════ */}
        <div className="mt-20 border-t border-gray-200/80 pt-12 md:mt-24 md:pt-16">
          {/* Subtítulo superior */}
          <div className="mb-8">
            <span className="text-sm font-bold tracking-wider text-gray-500">
              — ¿Cómo podemos ayudarte?
            </span>
            <h2 className="mt-1 text-2xl font-extrabold text-[#1a4a38] sm:text-3xl">
              Proceso transparente y atención dedicada
            </h2>
          </div>

          {/* Grid de 5 Columnas (1 a 4 beneficios + 5 contacto dark) */}
          <div
            ref={bottomGridRef}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5"
          >
            {/* Tarjeta 1 */}
            <div className="flex flex-col justify-between rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#1a4a38]/40 hover:shadow-md">
              <div>
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#1a4a38]/10 text-[#1a4a38]">
                  <UserCheck className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-gray-900">
                  Datos claros
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-gray-600">
                  Nombre, teléfono y correo.
                </p>
              </div>
            </div>

            {/* Tarjeta 2 */}
            <div className="flex flex-col justify-between rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#1a4a38]/40 hover:shadow-md">
              <div>
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#1a4a38]/10 text-[#1a4a38]">
                  <Building2 className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-gray-900">
                  Perfil correcto
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-gray-600">
                  Estudiante, profesional o empresa.
                </p>
              </div>
            </div>

            {/* Tarjeta 3 */}
            <div className="flex flex-col justify-between rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#1a4a38]/40 hover:shadow-md">
              <div>
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#1a4a38]/10 text-[#1a4a38]">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-gray-900">
                  Cierre directo
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-gray-600">
                  Mensaje listo para WhatsApp.
                </p>
              </div>
            </div>

            {/* Tarjeta 4 */}
            <div className="flex flex-col justify-between rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#1a4a38]/40 hover:shadow-md">
              <div>
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#1a4a38]/10 text-[#1a4a38]">
                  <Users className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-gray-900">
                  Acompañamiento
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-gray-600">
                  Nuestro equipo te brinda el soporte que necesitas.
                </p>
              </div>
            </div>

            {/* Columna 5: Tarjeta de Contacto Dark */}
            <div className="relative overflow-hidden rounded-2xl bg-[#1a4a38] p-5 text-white shadow-lg transition-all duration-300 hover:-translate-y-1 sm:col-span-2 lg:col-span-1">
              {/* Marca de agua sutil del isotipo 'e' de Centro Empresarial */}
              <div className="pointer-events-none absolute -bottom-10 -right-6 select-none font-sans text-[150px] font-extrabold leading-none text-white/[0.08]">
                e
              </div>

              <div className="relative z-10 flex h-full flex-col justify-between">
                <div>
                  <h3 className="text-lg font-extrabold text-white">
                    Contáctanos
                  </h3>

                  <div className="mt-4 space-y-3">
                    <a
                      href="https://wa.me/51906491859"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 text-xs font-semibold text-white/90 hover:text-white transition-colors"
                    >
                      <Phone className="h-3.5 w-3.5 shrink-0 text-accent" />
                      <span>+51 906 491 859</span>
                    </a>

                    <a
                      href="mailto:centroempresarialsac@gmail.com"
                      className="flex items-start gap-2.5 text-xs font-semibold text-white/90 hover:text-white transition-colors break-all"
                    >
                      <Mail className="h-3.5 w-3.5 shrink-0 text-accent mt-0.5" />
                      <span>centroempresarialsac@gmail.com</span>
                    </a>

                    <div className="flex items-start gap-2.5 text-xs text-white/80">
                      <MapPin className="h-3.5 w-3.5 shrink-0 text-accent mt-0.5" />
                      <span>
                        Calle Castrovirreyna 323, tercer piso, Ica, Perú
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 border-t border-white/15 pt-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-accent">
                    Atención personalizada
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

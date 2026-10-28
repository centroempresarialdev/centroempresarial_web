import React, { useState, useEffect, useRef, FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import advisorImg from "@/assets/hero/asesora-contacto.png";
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
  Loader2,
  CheckCircle2,
  ExternalLink,
  Clock,
} from "lucide-react";
import { leadsService } from "@/services";
import { contactInfo } from "@/data/site";

const processSteps = [
  {
    icon: UserCheck,
    title: "Datos claros",
    text: "Nombre, teléfono y correo.",
  },
  {
    icon: Building2,
    title: "Perfil correcto",
    text: "Estudiante, profesional, institución pública o empresa privada.",
  },
  {
    icon: MessageCircle,
    title: "Cierre directo",
    text: "Mensaje listo para WhatsApp.",
  },
  {
    icon: Users,
    title: "Acompañamiento",
    text: "Nuestro equipo te brinda el soporte que necesitas.",
  },
];

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
  serviceInterest: "Asesoría de Tesis",
  message: "",
};

const Contact: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState<FormDataState>(initialFormData);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "fallback">("idle");

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
        setFormData((prev) => ({ ...prev, profileType: "Estudiante" }));
      } else if (planParam.includes("profesional")) {
        setFormData((prev) => ({ ...prev, profileType: "Profesional" }));
      } else if (
        planParam.includes("public") ||
        planParam.includes("institucion")
      ) {
        setFormData((prev) => ({
          ...prev,
          profileType: "Institución Pública",
          serviceInterest: "Soluciones Empresariales",
        }));
      } else if (
        planParam.includes("empresa") ||
        planParam.includes("privada") ||
        planParam.includes("corporaci")
      ) {
        setFormData((prev) => ({
          ...prev,
          profileType: "Empresa Privada",
          serviceInterest: "Soluciones Empresariales",
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

      // Imagen de asesora entrando en el centro con fade y suave lift
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.95, delay: 0.1, ease: "power2.out" },
        );
      }

      // Tarjeta del formulario entrando desde la derecha
      if (formCardRef.current) {
        gsap.fromTo(
          formCardRef.current,
          { opacity: 0, x: 30 },
          { opacity: 1, x: 0, duration: 0.9, delay: 0.18, ease: "power2.out" },
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim()) {
      alert("Por favor completa nombre, teléfono y correo electrónico.");
      return;
    }

    setIsSubmitting(true);

    // 1. Guardar prospecto en la base de datos a través del backend FastAPI
    try {
      const validTypes: Array<
        "Estudiante" | "Profesional" | "Empresa" | "Institución Pública" | "Empresa Privada"
      > = [
        "Estudiante",
        "Profesional",
        "Institución Pública",
        "Empresa Privada",
      ];
      const interested_type = validTypes.includes(formData.profileType as any)
        ? (formData.profileType as
            | "Estudiante"
            | "Profesional"
            | "Empresa"
            | "Institución Pública"
            | "Empresa Privada")
        : "Profesional";

      await leadsService.create({
        full_name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        interested_type,
        target_plan: formData.serviceInterest || undefined,
        message: formData.message || undefined,
      });
      setSubmitStatus("success");
    } catch (err) {
      // Si el backend no está corriendo aún en local, no bloqueamos al usuario
      console.warn(
        "Aviso: Backend no respondió o no disponible. Procediendo con WhatsApp directo.",
        err
      );
      setSubmitStatus("fallback");
    } finally {
      setIsSubmitting(false);
      setFormSubmitted(true);
    }

    // 2. Abrir WhatsApp para atención directa y personalizada
    const messageLines = [
      "¡Hola Centro Empresarial! Deseo solicitar orientación personalizada:",
      `• Nombre / Razón Social: ${formData.name}`,
      `• Teléfono / WhatsApp: ${formData.phone}`,
      formData.email ? `• Correo electrónico: ${formData.email}` : null,
      `• Tipo de perfil: ${formData.profileType}`,
      `• Servicio de interés: ${formData.serviceInterest}`,
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
    <div ref={sectionRef} className="relative w-full bg-[#f8f9fa]">
      {/* ─── PROCESO TRANSPARENTE (antes del formulario para generar confianza) ─── */}
      <section className="relative w-full bg-white pt-28 pb-10 sm:pt-32 md:pb-12 lg:pt-36">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
                ¿Cómo podemos ayudarte?
              </span>
              <h2 className="mt-2 text-2xl font-extrabold text-[#1a4a38] sm:text-3xl md:text-4xl">
                Proceso transparente y atención dedicada
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-gray-600">
              Cuatro pasos simples para que tu solicitud llegue completa y
              recibas una respuesta directa de nuestro equipo.
            </p>
          </div>

          <div
            ref={bottomGridRef}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {processSteps.map((step, index) => (
              <div
                key={step.title}
                className="group relative flex flex-col rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
              >
                <span className="absolute right-5 top-5 text-xs font-extrabold text-primary/30">
                  0{index + 1}
                </span>
                <div className="icon-badge icon-badge-md mb-3 group-hover:bg-primary group-hover:text-primary-foreground">
                  <step.icon />
                </div>
                <h3 className="text-base font-bold text-gray-900 md:text-base lg:text-base">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-gray-600">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FORMULARIO DE MEMBRESÍA ─── */}
      <section className="relative w-full flex flex-col justify-center overflow-hidden bg-[#f8f9fa] py-12 sm:py-14 lg:py-12">
        {/* Elementos decorativos sutiles de fondo */}
        <div className="pointer-events-none absolute -left-20 top-1/4 h-96 w-96 rounded-full bg-[#1a4a38]/5 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 top-1/2 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />

        <div className="container relative z-10 mx-auto px-6 lg:px-12 my-auto">
          {/* ═════════════════════════════════════════════════════════════
              COMPOSICIÓN DE 3 COLUMNAS:
              IZQUIERDA (Contenido ~33%) | CENTRO (Persona Grande ~33%) | DERECHA (Formulario ~33%)
             ═════════════════════════════════════════════════════════════ */}
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-6 xl:gap-8">
            {/* 1. Bloque Izquierdo: Contenido y CTA */}
            <div
              ref={leftColRef}
              className="lg:col-span-4 flex flex-col justify-center"
            >
              {/* Badge superior */}
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#1a4a38]/15 bg-[#1a4a38]/5 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#1a4a38]">
                <span>Tu aliado en el crecimiento empresarial</span>
              </div>

              {/* Título grande y en negrita verde oscuro */}
              <h1 className="mt-4 text-2xl sm:text-3xl lg:text-3xl xl:text-4xl font-extrabold leading-tight text-[#1a4a38] lg:leading-[1.18]">
                Solicita orientación y recibe una respuesta directa
              </h1>

              {/* Párrafo descriptivo con tarjeta visual integrada */}
              <div className="mt-4 rounded-2xl border border-[#1a4a38]/15 bg-white/85 p-4 shadow-sm backdrop-blur-md transition-all duration-300 hover:bg-white/95 hover:shadow-md">
                <div className="flex items-start gap-3">
                  <div className="icon-badge icon-badge-sm">
                    <Sparkles />
                  </div>
                  <p className="text-xs sm:text-sm font-medium leading-relaxed text-[#1a4a38]/90">
                    Completa los datos principales y la web preparará un mensaje
                    profesional para continuar por WhatsApp con el asesor.
                  </p>
                </div>
              </div>

              {/* Botón primario verde oscuro con icono de WhatsApp */}
              <div className="mt-6">
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

            {/* 2. Bloque Central: Persona Visible y con Gran Tamaño */}
            <div
              ref={imageRef}
              className="relative z-10 flex flex-col items-center justify-end lg:col-span-4 w-full self-center lg:self-end overflow-visible pt-4 lg:pt-0"
            >
              {/* Círculo suave de fondo */}
              <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-[320px] w-[320px] sm:h-[380px] sm:w-[380px] lg:h-[420px] lg:w-[420px] xl:h-[480px] xl:w-[480px] rounded-full bg-gradient-to-t from-[#105340]/15 via-[#ecf2ea] to-transparent -z-10" />

              {/* Imagen de la asesora de gran presencia con degradado suave en la parte inferior */}
              <img
                src={advisorImg}
                alt="Asesora Centro Empresarial"
                style={{
                  maskImage:
                    "linear-gradient(to bottom, black 0%, black 72%, transparent 98%)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, black 0%, black 72%, transparent 87%)",
                }}
                className="relative z-10 h-[400px] sm:h-[520px] md:h-[520px] lg:h-[540px] xl:h-[600px] 2xl:h-[640px] w-auto max-w-full object-contain drop-shadow-2xl transition-transform duration-300 hover:scale-[1.02]"
              />

              {/* Puesto / Rol de la asesora */}
              <div className="relative z-20 -mt-12 sm:-mt-16 lg:-mt-20 -translate-x-5 sm:-translate-x-8 mb-3 flex flex-col items-center text-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#1a4a38]/20 bg-white/95 px-4 py-1.5 shadow-md backdrop-blur-md">
                  <span className="h-2 w-2 rounded-full bg-[#1a4a38]" />
                  <span className="text-xs sm:text-sm font-bold text-[#1a4a38]">
                    Líder de Gestión Empresarial y TI
                  </span>
                </div>
              </div>
            </div>

            {/* 3. Bloque Derecho: Formulario a la Derecha */}
            <div ref={formCardRef} className="lg:col-span-4 z-20">
              <div className="relative rounded-2xl border border-gray-200/80 bg-white p-5 sm:p-6 lg:p-5 xl:p-6 shadow-xl">
                {/* Cabecera del formulario */}
                <div className="mb-4 flex items-center gap-3 border-b border-gray-100 pb-3">
                  <div className="icon-badge icon-badge-md">
                    <MessageCircle />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-extrabold text-gray-900">
                      Solicitud de membresía
                    </h2>
                  </div>
                </div>

                {/* Formulario */}
                <form onSubmit={handleSubmit} className="space-y-3">
                  {/* Nombre y apellidos / razón social * (full width) */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs font-semibold text-gray-700 mb-1"
                    >
                      Nombre y apellidos / razón social{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Ej. Juan Pérez / Empresa SAC"
                      className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-sm text-gray-800 transition-colors placeholder:text-gray-400 focus:border-[#1a4a38] focus:outline-none focus:ring-2 focus:ring-[#1a4a38]/20"
                    />
                  </div>

                  {/* Grid 2 Columnas: Teléfono y Correo */}
                  <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-xs font-semibold text-gray-700 mb-1"
                      >
                        Teléfono o WhatsApp{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+51 999 999 999"
                        className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-sm text-gray-800 transition-colors placeholder:text-gray-400 focus:border-[#1a4a38] focus:outline-none focus:ring-2 focus:ring-[#1a4a38]/20"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs font-semibold text-gray-700 mb-1"
                      >
                        Correo electrónico{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="tu@email.com"
                        className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-sm text-gray-800 transition-colors placeholder:text-gray-400 focus:border-[#1a4a38] focus:outline-none focus:ring-2 focus:ring-[#1a4a38]/20"
                      />
                    </div>
                  </div>

                  {/* Grid 2 Columnas: Tipo de interesado y Membresía de interés */}
                  <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                    <div>
                      <label
                        htmlFor="profileType"
                        className="block text-xs font-semibold text-gray-700 mb-1"
                      >
                        Tipo de interesado{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="profileType"
                        name="profileType"
                        value={formData.profileType}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 transition-colors focus:border-[#1a4a38] focus:outline-none focus:ring-2 focus:ring-[#1a4a38]/20"
                      >
                        <option value="">Seleccionar</option>
                        <option value="Estudiante">Estudiante</option>
                        <option value="Profesional">Profesional</option>
                        <option value="Institución Pública">Institución Pública</option>
                        <option value="Empresa Privada">Empresa Privada</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="serviceInterest"
                        className="block text-xs font-semibold text-gray-700 mb-1"
                      >
                        Membresía de interés{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="serviceInterest"
                        name="serviceInterest"
                        value={formData.serviceInterest}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 transition-colors focus:border-[#1a4a38] focus:outline-none focus:ring-2 focus:ring-[#1a4a38]/20"
                      >
                        <option value="">Seleccionar</option>
                        <option value="Membresía Estudiante">
                          Membresía Estudiante
                        </option>
                        <option value="Membresía Profesional">
                          Membresía Profesional
                        </option>
                        <option value="Membresía Empresarial">
                          Membresía Empresarial
                        </option>
                        <option value="Asesoría de Tesis">
                          Asesoría de Tesis
                        </option>
                        <option value="Cursos de Capacitación">
                          Cursos de Capacitación
                        </option>
                        <option value="Soluciones Empresariales">
                          Soluciones Empresariales
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* Mensaje o consulta adicional */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs font-semibold text-gray-700 mb-1"
                    >
                      Mensaje o consulta adicional
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={2}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Cuéntanos qué necesitas o qué beneficio te interesa..."
                      className="w-full resize-none rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-sm text-gray-800 transition-colors placeholder:text-gray-400 focus:border-[#1a4a38] focus:outline-none focus:ring-2 focus:ring-[#1a4a38]/20"
                    />
                  </div>

                  {/* Botón de envío ancho completo en verde oscuro corporativo */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#1a4a38] px-6 py-3 text-sm font-bold text-white shadow-md transition-all duration-300 hover:bg-[#13372a] hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-75 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin text-white" />
                        <span>Registrando solicitud...</span>
                      </>
                    ) : (
                      <>
                        <MessageCircle className="h-4 w-4 text-[#25D366]" />
                        <span>Enviar por WhatsApp</span>
                        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                      </>
                    )}
                  </button>

                  {formSubmitted && (
                    <div className="flex items-center justify-center gap-1.5 text-center text-xs font-semibold text-emerald-600">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                      <span>
                        {submitStatus === "success"
                          ? "Solicitud registrada en el sistema y abriendo WhatsApp..."
                          : "Abriendo conversación directa en WhatsApp..."}
                      </span>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── UBICACIÓN Y CANALES DE CONTACTO ─── */}
      <section className="relative w-full border-t border-gray-200/80 bg-white py-14 md:py-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="mb-8">
            <span className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
              Visítanos o escríbenos
            </span>
            <h2 className="mt-2 text-2xl font-extrabold text-[#1a4a38] sm:text-3xl md:text-4xl">
              Ubicación y canales oficiales
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            {/* Columna izquierda: canales apilados en 1 columna */}
            <div className="flex flex-col gap-4">
              <a
                href={`https://wa.me/${contactInfo.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
              >
                <div className="icon-badge icon-badge-lg">
                  <MessageCircle />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
                    WhatsApp
                  </p>
                  <p className="text-base font-bold text-gray-900">
                    {contactInfo.phone}
                  </p>
                </div>
                <ArrowRight className="ml-auto h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href={`mailto:${contactInfo.email}`}
                className="group flex items-center gap-4 rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
              >
                <div className="icon-badge icon-badge-lg">
                  <Mail />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
                    Correo electrónico
                  </p>
                  <p className="break-all text-sm font-bold text-gray-900 sm:text-base">
                    {contactInfo.email}
                  </p>
                </div>
              </a>

              <div className="relative flex-1 overflow-hidden rounded-2xl bg-[#1a4a38] p-5 text-white shadow-lg">
                <div className="pointer-events-none absolute -bottom-10 -right-6 select-none font-sans text-[150px] font-extrabold leading-none text-white/[0.08]">
                  e
                </div>
                <div className="relative z-10 space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="icon-badge icon-badge-inverse icon-badge-lg">
                      <MapPin />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-accent">
                        Dirección
                      </p>
                      <p className="text-sm font-semibold leading-relaxed text-white/90">
                        Calle Castrovirreyna 323, tercer piso, Ica, Perú
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="icon-badge icon-badge-inverse icon-badge-lg">
                      <Clock />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-accent">
                        Atención
                      </p>
                      <p className="text-sm font-semibold leading-relaxed text-white/90">
                        Atención personalizada
                      </p>
                    </div>
                  </div>
                  <a
                    href={contactInfo.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-xs font-bold text-accent-foreground transition-all hover:brightness-110"
                  >
                    Cómo llegar
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Columna derecha: mapa grande */}
            <div className="relative min-h-[360px] overflow-hidden rounded-2xl border border-gray-200/80 bg-gray-100 shadow-md sm:min-h-[420px] lg:col-span-2 lg:min-h-[480px]">
              <iframe
                title="Ubicación Centro Empresarial - Calle Castrovirreyna 323, Ica"
                src={contactInfo.mapEmbedUrl}
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Contact;

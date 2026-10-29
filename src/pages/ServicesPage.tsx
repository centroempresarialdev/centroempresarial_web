import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { contactInfo } from "@/data/site";
import {
  Users,
  ShieldCheck,
  BarChart3,
  Target,
  ArrowRight,
  MessageCircle,
  Phone,
  Mail,
  CheckCircle2,
  Award,
  Lightbulb,
  Handshake,
  Compass,
  Check,
  Newspaper,
} from "lucide-react";
import sol1Img from "@/assets/hero/inner-hero-office.jpg";
import sol2Img from "@/assets/hero/identidad-objetivos.jpg";
import sol3Img from "@/assets/hero/finanzas-analytics.jpg";
import sol4Img from "@/assets/hero/ventas-estrategia.jpg";
import course1Img from "@/assets/hero/identidad-vision.jpg";
import course2Img from "@/assets/hero/identidad-valores.jpg";
import course3Img from "@/assets/hero/services-header.jpg";
import course4Img from "@/assets/hero/cursos-especializados.jpg";

gsap.registerPlugin(ScrollTrigger);

const ServicesPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);
  const ctaBtnRef = useRef<HTMLAnchorElement>(null);

  // Teléfono oficial unificado del Centro Empresarial
  const phoneFormatted = contactInfo.phone; // +51 906 491 859
  const whatsappNumber = contactInfo.whatsapp; // 51906491859

  // ═════════════════════════════════════════════════════════════
  // DATA: SECCIÓN 2 - SOLUCIONES EMPRESARIALES (4 TARJETAS)
  // ═════════════════════════════════════════════════════════════
  const solutions = [
    {
      num: "01",
      title: "Desarrollo de habilidades gerenciales",
      category: "Liderazgo y Gestión",
      description:
        "Fortalece el liderazgo de tus equipos y mejora la toma de decisiones dentro de la organización.",
      icon: Users,
      image: sol1Img,
      areas: [
        "Resolución de conflictos",
        "Gestión de equipos",
        "Gestión del cambio",
      ],
    },
    {
      num: "02",
      title: "Gestión de Calidad",
      category: "Normas ISO & Procesos",
      description:
        "Estandariza tus operaciones bajo normas de calidad para optimizar procesos y elevar la satisfacción de tus clientes.",
      icon: ShieldCheck,
      image: sol2Img,
      areas: [
        "Mapeo y optimización de procesos",
        "Preparación para certificaciones ISO",
        "Auditorías y mejora continua",
      ],
    },
    {
      num: "03",
      title: "Análisis de información financiera",
      category: "Finanzas Estratégicas",
      description:
        "Convierte datos contables en información estratégica para proteger tu liquidez y maximizar la rentabilidad del negocio.",
      icon: BarChart3,
      image: sol3Img,
      areas: [
        "Diagnóstico de salud financiera",
        "Planificación presupuestal y costos",
        "Indicadores clave de rentabilidad (KPIs)",
      ],
    },
    {
      num: "04",
      title: "Técnicas de venta",
      category: "Estrategia Comercial",
      description:
        "Capacita a tu fuerza comercial con metodologías consultivas para captar clientes y cerrar acuerdos de alto valor.",
      icon: Target,
      image: sol4Img,
      areas: [
        "Venta consultiva B2B",
        "Manejo efectivo de objeciones",
        "Fidelización y cierre comercial",
      ],
    },
  ];

  // ═════════════════════════════════════════════════════════════
  // DATA: SECCIÓN 3 - CURSOS DE CAPACITACIÓN
  // ═════════════════════════════════════════════════════════════
  const courses = [
    {
      title: "Emprendimiento de Negocios Sostenibles",
      category: "Innovación & Emprendimiento",
      image: course1Img,
      description:
        "Metodologías prácticas para formular y validar modelos de negocio rentables con impacto social y ambiental, estrategias de mercado y escalabilidad.",
      duration: "40 horas académicas",
      icon: Lightbulb,
      topics: [
        "Validación comercial y propuesta de valor",
        "Modelos de negocio de triple impacto",
        "Estructura financiera y escalabilidad",
      ],
    },
    {
      title: "Responsabilidad Social Empresarial",
      category: "Gobierno Corporativo",
      image: course2Img,
      description:
        "Estrategias de sostenibilidad aplicadas a la empresa moderna, diálogo con stakeholders, ética en la cadena de valor e inversión social verificable.",
      duration: "35 horas académicas",
      icon: Handshake,
      topics: [
        "Gestión de relaciones con la comunidad",
        "Políticas de sostenibilidad y ética",
        "Medición de impacto y valor compartido",
      ],
    },
    {
      title: "Gestión de la Calidad",
      category: "Operaciones & Mejora Continua",
      image: course3Img,
      description:
        "Herramientas estadísticas de control, diseño de manuales de procedimientos, auditoría interna y aseguramiento de la calidad según normas internacionales.",
      duration: "45 horas académicas",
      icon: Award,
      topics: [
        "Control estadístico de procesos",
        "Metodología de auditorías internas",
        "Estandarización y trazabilidad",
      ],
    },
    {
      title: "Liderazgo y Habilidades Gerenciales",
      category: "Desarrollo Directivo",
      image: course4Img,
      description:
        "Competencias directivas de influencia positiva, inteligencia emocional, gestión del tiempo, delegación efectiva y motivación de equipos.",
      duration: "40 horas académicas",
      icon: Compass,
      topics: [
        "Inteligencia emocional y liderazgo",
        "Delegación efectiva y empoderamiento",
        "Comunicación ejecutiva de alto impacto",
      ],
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (heroBgRef.current) {
        gsap.fromTo(
          heroBgRef.current,
          { opacity: 0, scale: 1.05 },
          { opacity: 1, scale: 1, duration: 1.4, ease: "sine.out" },
        );
      }

      if (ctaBtnRef.current) {
        gsap.to(ctaBtnRef.current, {
          scale: 1.02,
          duration: 3.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-x-hidden bg-background text-foreground"
    >
      {/* ══════════════════════════════════════════════════════════
          SECCIÓN 1: CABECERA CORPORATIVA (Mobile-First)
         ══════════════════════════════════════════════════════════ */}
      <section className="relative flex min-h-screen min-h-[100dvh] flex-col justify-center overflow-hidden bg-gradient-to-br from-[#0c3f30] via-[#105340] to-[#093527] pb-14 pt-28 text-white sm:pt-32 md:pb-16 md:pt-[110px]">
        {/* Background photography with smooth gradient mask */}
        <div
          ref={heroBgRef}
          className="pointer-events-none absolute inset-0 overflow-hidden will-change-transform"
        >
          <img
            src={course3Img}
            alt="Servicios y Consultoría Centro Empresarial"
            className="h-full w-full object-cover object-center opacity-25 lg:opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0c3f30] via-[#0c3f30]/75 to-transparent lg:w-2/3" />
        </div>

        {/* Decorative ambient glowing lines */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full opacity-20"
          viewBox="0 0 1440 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M-100 480 C 300 400, 600 580, 1000 320 C 1200 200, 1400 250, 1600 120"
            stroke="#F59E0B"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <path
            d="M-50 560 C 400 480, 700 620, 1100 360 C 1300 220, 1450 280, 1650 180"
            stroke="#10B981"
            strokeWidth="1.5"
          />
        </svg>

        {/* Ambient glow halos */}
        <div className="pointer-events-none absolute -left-20 top-1/4 h-80 w-80 rounded-full bg-primary/20 blur-[100px]" />
        <div className="pointer-events-none absolute right-10 bottom-10 h-72 w-72 rounded-full bg-accent/15 blur-[90px]" />

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            {/* Columna Izquierda: Información Corporativa */}
            <div ref={heroRef} className="space-y-6">
              {/* Badge Institucional */}
              <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-accent backdrop-blur-md">
                <Newspaper className="h-4 w-4 shrink-0" />
                <span>Servicios</span>
              </div>

              {/* Título Principal */}
              <h1 className="text-3xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-5xl md:text-6xl">
                Innovación y Soluciones <br className="hidden sm:inline" />
                <span className="relative inline-block pb-1 text-accent after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:rounded-full after:bg-gradient-to-r after:from-accent after:via-accent-light after:to-transparent">
                  Empresariales
                </span>
              </h1>

              <p className="max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
                Acompañamos a directivos, empresas e instituciones con programas
                de capacitación práctica y consultoría técnica orientada a
                resultados reales de productividad, calidad y competitividad
                regional.
              </p>

              {/* Botones de Acción Inmediata */}
              <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-4 pt-2">
                <Button
                  asChild
                  size="lg"
                  variant="accent"
                  className="min-h-[44px] h-12 w-full sm:w-auto px-7 text-sm font-bold shadow-lg shadow-accent/20 transition-all duration-300 hover:scale-105"
                >
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hola, deseo solicitar información sobre los servicios empresariales y capacitaciones.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center justify-center gap-2"
                  >
                    <MessageCircle className="h-4 w-4 shrink-0" />
                    <span>Consultar por WhatsApp</span>
                    <ArrowRight className="h-4 w-4 shrink-0" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECCIÓN 2: SOLUCIONES EMPRESARIALES (Tarjetas Mobile-First)
         ══════════════════════════════════════════════════════════ */}
      <section className="solutions-section border-t border-border/80 bg-gray-50/60 py-16 sm:py-20 md:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          {/* Encabezado de Sección */}
          <div className="mb-12 text-center sm:mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-primary">
              Consultoría Estratégica
            </div>
            <h2 className="mt-3 text-2xl font-extrabold text-corporate sm:text-3xl md:text-4xl lg:text-5xl">
              Soluciones especializadas para tu organización
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
              Convertimos los desafíos de tu empresa en oportunidades de mejora,
              crecimiento y toma de decisiones.
            </p>
          </div>

          {/* Grid Mobile-First: estrictamente 1 col en móvil (grid-cols-1 gap-6), 2 cols en tablet (md:grid-cols-2), 4 cols en desktop (lg:grid-cols-4) */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {solutions.map((item) => (
              <div
                key={item.num}
                className="solution-card group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-xl focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20"
              >
                {/* Imagen de Cabecera con Overlay */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-900 sm:h-44">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10" />
                </div>

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  {/* Título del servicio */}
                  <h3 className="text-lg font-bold leading-snug text-corporate transition-colors group-hover:text-primary">
                    {item.title}
                  </h3>

                  {/* Descripción breve orientada al beneficio */}
                  <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>

                  {/* Sección ÁREAS DE TRABAJO con 3 puntos clave */}
                  <div className="mt-5 border-t border-border/60 pt-4">
                    <div className="mb-2.5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground/90">
                      Áreas de trabajo
                    </div>
                    <ul className="space-y-2">
                      {item.areas.map((area) => (
                        <li
                          key={area}
                          className="flex items-start gap-2 text-xs leading-snug text-corporate sm:text-sm"
                        >
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                          <span>{area}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA inferior con área táctil mínima de 44px */}
                  <div className="mt-auto pt-5">
                    <div className="border-t border-border/60 pt-3">
                      <a
                        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hola, deseo solicitar asesoría sobre el servicio de: ${item.title}.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/cta inline-flex min-h-[44px] w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-bold text-primary transition-colors hover:bg-primary/5 hover:text-primary-dark sm:w-auto sm:justify-start sm:px-0 sm:hover:bg-transparent"
                      >
                        <span>Solicitar asesoría</span>
                        <ArrowRight className="ml-1.5 h-4 w-4 shrink-0 transition-transform duration-200 group-hover/cta:translate-x-1" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA General al pie del Grid */}
          <div className="solution-general-cta mt-12 rounded-2xl border border-border/80 bg-white p-6 text-center shadow-sm sm:mt-16 sm:p-10">
            <div className="mx-auto max-w-2xl">
              <h3 className="text-xl font-bold text-corporate sm:text-2xl">
                ¿No sabes qué solución necesita tu organización?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                Cuéntanos tu situación y diseñamos una propuesta acorde a tus
                objetivos.
              </p>
              <div className="mt-6 flex justify-center">
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hola, me gustaría conversar con un especialista para evaluar qué solución necesita mi organización.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex min-h-[44px] w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-corporate transition-all duration-300 hover:bg-primary-dark hover:-translate-y-0.5"
                >
                  <MessageCircle className="h-4 w-4 shrink-0" />
                  <span>Conversar con un especialista</span>
                  <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECCIÓN 3: CURSOS DE CAPACITACIÓN (Grid Mobile-First)
         ══════════════════════════════════════════════════════════ */}
      <section className="courses-section border-t border-border/80 bg-white py-16 sm:py-20 md:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          {/* Encabezado de Cursos */}
          <div className="mb-12 text-center sm:mb-14">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-primary">
              Programas Especializados
            </div>
            <h2 className="mt-3 text-2xl font-extrabold text-corporate sm:text-3xl md:text-4xl lg:text-5xl">
              Cursos de Capacitación
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
              Programas modulares diseñados para actualizar competencias
              laborales, con metodología aplicada y certificación institucional
              respaldada.
            </p>
          </div>

          {/* Grid estrictamente 1 columna en móvil (grid-cols-1 gap-6) y 2 columnas desde tablet (md:grid-cols-2) */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {courses.map((course) => (
              <div
                key={course.title}
                className="course-card group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-gray-50/40 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-white hover:shadow-lg"
              >
                {/* Portada visual con badges */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />

                  {/* Icono flotante */}
                  <div className="absolute -bottom-3 left-5 icon-badge icon-badge-lg bg-white shadow-md ring-2 ring-white/70 transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                    <course.icon className="h-6 w-6" />
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5 pt-6 sm:p-7 sm:pt-6">
                  {/* Badges de Garantía */}
                  <div className="mb-3 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-[11px] font-bold text-primary">
                      <Check className="h-3 w-3 stroke-[3]" />
                      100% Práctico
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full border border-accent/30 bg-accent/15 px-2.5 py-0.5 text-[11px] font-bold text-accent">
                      <Award className="h-3 w-3" />
                      Certificación oficial
                    </span>
                  </div>

                  <h3 className="mt-1 text-xl font-extrabold text-corporate transition-colors group-hover:text-primary sm:text-2xl">
                    {course.title}
                  </h3>

                  <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                    {course.description}
                  </p>

                  <div className="mt-5 border-t border-border/60 pt-4">
                    <div className="mb-2 text-xs font-bold uppercase tracking-wider text-corporate">
                      Módulos de formación:
                    </div>
                    <ul className="space-y-1.5">
                      {course.topics.map((topic) => (
                        <li
                          key={topic}
                          className="flex items-start gap-2 text-xs text-muted-foreground sm:text-sm"
                        >
                          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-auto pt-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-border/60 pt-4">
                      <span className="text-xs font-bold uppercase tracking-wider text-primary">
                        Modalidad Presencial y Virtual
                      </span>

                      <Button
                        asChild
                        variant="outline"
                        className="min-h-[44px] w-full sm:w-auto border-border/80 text-corporate hover:border-primary hover:bg-primary hover:text-white"
                      >
                        <a
                          href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hola, deseo solicitar temario y costos del curso: ${course.title}.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-[44px] items-center justify-center gap-1.5"
                        >
                          <span>Inscribirme / Consultar</span>
                          <ArrowRight className="h-4 w-4 shrink-0" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECCIÓN 4: LLAMADO A LA ACCIÓN (CTA) CONFIABLE
         ══════════════════════════════════════════════════════════ */}
      <section className="cta-section border-t border-border/80 bg-gray-50/70 py-16 sm:py-20 md:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          {/* Contenedor ancho sólido con acento corporativo */}
          <div className="cta-container mx-auto max-w-4xl overflow-hidden rounded-3xl bg-gradient-primary p-6 sm:p-8 text-center text-primary-foreground shadow-elevated md:p-14">
            {/* Badge de Sección */}
            <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-accent">
              Inscripciones &amp; Consultoría
            </span>

            {/* Cita Destacada Requerida */}
            <blockquote className="mx-auto mt-4 max-w-3xl text-xl font-extrabold leading-snug text-white sm:text-3xl md:text-4xl">
              “Impulsamos el potencial de tu empresa con asesoría personalizada
              y soluciones que marcan la diferencia.”
            </blockquote>

            <p className="mx-auto mt-4 max-w-xl text-sm text-white/80 sm:text-base">
              Contáctanos hoy mismo para coordinar una reunión de diagnóstico o
              asegurar tu vacante en nuestros programas certificados.
            </p>

            {/* Botones con área táctil >= 44px */}
            <div className="mt-8 flex flex-col items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                variant="accent"
                className="min-h-[44px] h-auto w-full sm:w-auto py-3.5 px-6 sm:px-8 text-sm sm:text-base font-extrabold shadow-corporate whitespace-normal text-center"
              >
                <a
                  ref={ctaBtnRef}
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("¡Hola! Deseo inscribirme y transformar mi carrera con Centro Empresarial.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center justify-center gap-2.5"
                >
                  <MessageCircle className="h-5 w-5 shrink-0" />
                  <span>¡Inscríbete hoy y transforma tu carrera!</span>
                  <ArrowRight className="h-4 w-4 shrink-0" />
                </a>
              </Button>

              <Button
                asChild
                variant="outline"
                className="min-h-[44px] w-full sm:w-auto border-white/30 bg-white/10 text-white hover:bg-white hover:text-primary"
              >
                <Link
                  to="/contacto"
                  className="inline-flex min-h-[44px] items-center justify-center gap-2"
                >
                  <span>Formulario de Contacto</span>
                  <ArrowRight className="h-4 w-4 shrink-0" />
                </Link>
              </Button>
            </div>

            {/* Datos de Contacto Directo */}
            <div className="mt-10 grid grid-cols-1 gap-4 border-t border-white/15 pt-8 text-left sm:mt-12 sm:grid-cols-2 sm:gap-6">
              <a
                href={`tel:${whatsappNumber}`}
                className="flex min-h-[44px] items-center gap-3.5 rounded-xl border border-white/10 bg-white/5 p-4 text-white/90 backdrop-blur-sm transition-colors hover:bg-white/15"
              >
                <div className="icon-badge icon-badge-md icon-badge-inverse shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] font-semibold uppercase text-white/70">
                    Teléfono directo / WhatsApp
                  </div>
                  <div className="text-sm font-bold text-white">
                    {phoneFormatted}
                  </div>
                </div>
              </a>

              <a
                href={`mailto:${contactInfo.email}`}
                className="flex min-h-[44px] items-center gap-3.5 rounded-xl border border-white/10 bg-white/5 p-4 text-white/90 backdrop-blur-sm transition-colors hover:bg-white/15"
              >
                <div className="icon-badge icon-badge-md icon-badge-inverse shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] font-semibold uppercase text-white/70">
                    Correo oficial
                  </div>
                  <div className="break-all text-sm font-bold text-white">
                    {contactInfo.email}
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;

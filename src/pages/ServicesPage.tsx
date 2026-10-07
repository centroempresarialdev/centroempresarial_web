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
  Sparkles,
  ArrowRight,
  MessageCircle,
  Phone,
  Mail,
  CheckCircle2,
  Award,
  Lightbulb,
  Handshake,
  Clock,
  Compass,
  Check,
  Briefcase,
  Newspaper,
} from "lucide-react";
import consultingImg from "@/assets/hero/cursos-especializados.jpg";
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
      // ═════════════════════════════════════════════════════════════
      // SECCIÓN 1: CABECERA CORPORATIVA EN DOS COLUMNAS (Opción 1)
      // ═════════════════════════════════════════════════════════════
      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" },
        );
      }

      gsap.fromTo(
        ".hero-img-wrap",
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 1, delay: 0.2, ease: "power3.out" },
      );

      // ═════════════════════════════════════════════════════════════
      // SECCIÓN 2: SOLUCIONES EMPRESARIALES (Stagger sutil desde abajo)
      // ═════════════════════════════════════════════════════════════
      gsap.fromTo(
        ".solution-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".solutions-section",
            start: "top 82%",
          },
        },
      );

      gsap.fromTo(
        ".solution-general-cta",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".solution-general-cta",
            start: "top 90%",
          },
        },
      );

      // ═════════════════════════════════════════════════════════════
      // SECCIÓN 3: CURSOS DE CAPACITACIÓN (Deslizamiento sutil)
      // ═════════════════════════════════════════════════════════════
      gsap.fromTo(
        ".course-card",
        { opacity: 0, x: 20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".courses-section",
            start: "top 82%",
          },
        },
      );

      // ═════════════════════════════════════════════════════════════
      // SECCIÓN 4: CTA CONFIABLE (Fade-in suave + Pulsación muy sutil)
      // ═════════════════════════════════════════════════════════════
      gsap.fromTo(
        ".cta-container",
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".cta-section",
            start: "top 85%",
          },
        },
      );

      // Pulsación muy suave y elegante en loop lento (scale: 1.02, ciclo total ~7s)
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
      className="relative w-full overflow-hidden bg-background text-foreground"
    >
      {/* ══════════════════════════════════════════════════════════
          SECCIÓN 1: CABECERA CORPORATIVA EN DOS COLUMNAS (Opción 1)
         ══════════════════════════════════════════════════════════ */}
      <section className="relative flex min-h-screen min-h-[100dvh] flex-col justify-center overflow-hidden bg-gradient-to-b from-gray-50/80 via-background to-background pb-14 pt-28 sm:pt-32 md:pb-16 md:pt-[110px]">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            {/* Columna Izquierda: Información Corporativa */}
            <div ref={heroRef} className="space-y-6">
              {/* Badge Institucional */}
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-primary shadow-sm">
                <Newspaper className="h-4 w-4" />
                Servicios
              </div>

              {/* Título Principal */}
              <h1 className="text-4xl font-extrabold tracking-tight text-corporate sm:text-5xl md:text-6xl leading-[1.08]">
                Innovación y Soluciones <br className="hidden sm:inline" />
                <span className="text-primary">Empresariales</span>
              </h1>

              {/* Subtítulo */}
              <p className="text-lg font-semibold text-corporate/90 sm:text-xl">
                ¡Potencia tu futuro profesional con nosotros!
              </p>

              <p className="text-base leading-relaxed text-muted-foreground">
                Acompañamos a directivos, empresas e instituciones con programas
                de capacitación práctica y consultoría técnica orientada a
                resultados reales de productividad, calidad y competitividad
                regional.
              </p>

              {/* Micro-beneficios con checkmarks */}
              <div className="grid gap-2.5 pt-2 sm:grid-cols-2">
                {[
                  "Consultoría técnica a medida",
                  "Capacitación 100% práctica",
                  "Metodología con respaldo ISO",
                  "Diagnóstico sin costo inicial",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2.5 text-sm font-semibold text-corporate"
                  >
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check className="h-3.5 w-3.5 stroke-[3]" />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Botones de Acción Inmediata */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Button
                  asChild
                  size="lg"
                  variant="accent"
                  className="h-12 px-7 text-sm font-bold shadow-corporate"
                >
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hola, deseo solicitar información sobre los servicios empresariales y capacitaciones.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gap-2"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>Consultar por WhatsApp</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-12 border-border/80 bg-background text-corporate hover:bg-muted"
                >
                  <a href={`tel:${whatsappNumber}`} className="gap-2">
                    <Phone className="h-4 w-4 text-primary" />
                    {phoneFormatted}
                  </a>
                </Button>
              </div>
            </div>

            {/* Columna Derecha: Fotografía Profesional con Tarjetas Flotantes */}
            <div className="hero-img-wrap relative">
              {/* Marco fotográfico principal */}
              <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-card shadow-elevated">
                <img
                  src={consultingImg}
                  alt="Equipo consultor de Centro Empresarial en reunión directiva"
                  className="h-[380px] w-full object-cover sm:h-[460px] lg:h-[500px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>

              {/* Tarjeta Flotante 1: Años de Experiencia */}
              <div className="absolute -bottom-6 -left-4 sm:-left-6 rounded-2xl border border-border/80 bg-white/95 p-4 shadow-elevated backdrop-blur-md transition-transform hover:-translate-y-1">
                <div className="flex items-center gap-3.5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-xl font-extrabold text-corporate">
                      +12 Años
                    </div>
                    <div className="text-xs font-semibold text-muted-foreground">
                      Trayectoria y respaldo
                    </div>
                  </div>
                </div>
              </div>

              {/* Tarjeta Flotante 2: Certificación Aplicada */}
              <div className="absolute -top-6 -right-4 sm:-right-6 hidden sm:block rounded-2xl border border-border/80 bg-white/95 p-4 shadow-elevated backdrop-blur-md transition-transform hover:-translate-y-1">
                <div className="flex items-center gap-3.5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/20 text-accent shadow-sm">
                    <Award className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <div className="text-sm font-extrabold text-corporate">
                      100% Aplicado
                    </div>
                    <div className="text-xs font-semibold text-muted-foreground">
                      Certificación verificable
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECCIÓN 2: SOLUCIONES EMPRESARIALES
         ══════════════════════════════════════════════════════════ */}
      <section className="solutions-section border-t border-border/80 bg-gray-50/60 py-20 md:py-28">
        <div className="container mx-auto px-6 lg:px-12">
          {/* Encabezado de Sección */}
          <div className="mb-14 text-center sm:mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-primary">
              Consultoría Estratégica
            </div>
            <h2 className="mt-3 text-3xl font-extrabold text-corporate md:text-4xl lg:text-5xl">
              Soluciones especializadas para tu organización
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
              Convertimos los desafíos de tu empresa en oportunidades de mejora,
              crecimiento y toma de decisiones.
            </p>
          </div>

          {/* Grid de 4 tarjetas: 1 col móvil, 2 cols tablet, 4 cols desktop */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {solutions.map((item) => (
              <div
                key={item.num}
                className="solution-card group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-xl focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20"
              >
                {/* Imagen de Cabecera con Overlay y Badges */}
                <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10" />

                  {/* Top bar flotante */}
                  <div className="absolute inset-x-3.5 top-3.5 flex items-center justify-between">
                    <span className="rounded-md bg-black/60 px-2 py-0.5 font-mono text-xs font-bold tracking-wider text-white backdrop-blur-sm">
                      {item.num}
                    </span>
                    <span className="inline-block rounded-full border border-white/20 bg-black/55 px-2.5 py-0.5 text-[11px] font-semibold text-white backdrop-blur-md">
                      {item.category}
                    </span>
                  </div>

                  {/* Icono corporativo en la esquina inferior */}
                  <div className="absolute -bottom-3 left-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white text-primary shadow-md ring-2 ring-white/60 transition-all duration-300 group-hover:scale-105 group-hover:bg-primary group-hover:text-white">
                    <item.icon className="h-5 w-5" />
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6 pt-6">
                  {/* Título del servicio */}
                  <h3 className="text-base font-bold leading-snug text-corporate transition-colors group-hover:text-primary sm:text-lg">
                    {item.title}
                  </h3>

                  {/* Descripción breve orientada al beneficio */}
                  <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                    {item.description}
                  </p>

                  {/* Sección ÁREAS DE TRABAJO con 3 puntos clave */}
                  <div className="mt-5 border-t border-border/60 pt-3.5">
                    <div className="mb-2.5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground/90">
                      Áreas de trabajo
                    </div>
                    <ul className="space-y-1.5">
                      {item.areas.map((area) => (
                        <li
                          key={area}
                          className="flex items-start gap-2 text-xs leading-snug text-corporate"
                        >
                          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                          <span>{area}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA inferior: Solicitar asesoría → */}
                  <div className="mt-auto pt-5">
                    <div className="border-t border-border/60 pt-3.5">
                      <a
                        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hola, deseo solicitar asesoría sobre el servicio de: ${item.title}.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/cta inline-flex items-center gap-1.5 text-xs font-bold text-primary transition-colors hover:text-primary-dark"
                      >
                        <span>Solicitar asesoría</span>
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/cta:translate-x-1" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA General al pie del Grid */}
          <div className="solution-general-cta mt-12 rounded-2xl border border-border/80 bg-white p-7 text-center shadow-sm sm:mt-16 sm:p-10">
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
                  className="group inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-corporate transition-all duration-300 hover:bg-primary-dark hover:-translate-y-0.5"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Conversar con un especialista</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECCIÓN 3: CURSOS DE CAPACITACIÓN (Grid Limpio con Badges)
         ══════════════════════════════════════════════════════════ */}
      <section className="courses-section border-t border-border/80 bg-white py-20 md:py-28">
        <div className="container mx-auto px-6 lg:px-12">
          {/* Encabezado de Cursos */}
          <div className="mb-14 text-center">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-primary">
              Programas Especializados
            </div>
            <h2 className="mt-3 text-3xl font-extrabold text-corporate md:text-4xl lg:text-5xl">
              Cursos de Capacitación
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
              Programas modulares diseñados para actualizar competencias
              laborales, con metodología aplicada y certificación institucional
              respaldada.
            </p>
          </div>

          {/* Grid de 2 columnas con tarjetas rectangulares ordenadas */}
          <div className="grid gap-6 md:grid-cols-2">
            {courses.map((course) => (
              <div
                key={course.title}
                className="course-card group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-gray-50/40 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-white hover:shadow-lg"
              >
                {/* Portada visual con badges */}
                <div className="relative h-44 w-full overflow-hidden bg-slate-900 sm:h-48">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />

                  {/* Badges superiores */}
                  <div className="absolute inset-x-4 top-4 flex flex-wrap items-center justify-between gap-2">
                    <span className="rounded-full border border-white/20 bg-black/60 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
                      {course.category}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
                      <Clock className="h-3.5 w-3.5 text-accent" />
                      <span>{course.duration}</span>
                    </span>
                  </div>

                  {/* Icono flotante */}
                  <div className="absolute -bottom-3 left-5 flex h-12 w-12 items-center justify-center rounded-xl bg-white text-primary shadow-md ring-2 ring-white/70 transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                    <course.icon className="h-6 w-6" />
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6 pt-6 sm:p-7 sm:pt-6">
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
                          className="flex items-center gap-2 text-xs text-muted-foreground"
                        >
                          <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-accent" />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-auto pt-6">
                    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/60 pt-4">
                      <span className="text-xs font-bold uppercase tracking-wider text-primary">
                        Modalidad Presencial y Virtual
                      </span>

                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="border-border/80 text-corporate hover:border-primary hover:bg-primary hover:text-white"
                      >
                        <a
                          href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hola, deseo solicitar temario y costos del curso: ${course.title}.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="gap-1.5"
                        >
                          <span>Inscribirme / Consultar</span>
                          <ArrowRight className="h-3.5 w-3.5" />
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
      <section className="cta-section border-t border-border/80 bg-gray-50/70 py-20 md:py-28">
        <div className="container mx-auto px-6 lg:px-12">
          {/* Contenedor ancho sólido con acento corporativo */}
          <div className="cta-container mx-auto max-w-4xl overflow-hidden rounded-3xl bg-gradient-primary p-8 text-primary-foreground shadow-elevated md:p-14 text-center">
            {/* Badge de Sección */}
            <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-accent">
              Inscripciones &amp; Consultoría
            </span>

            {/* Cita Destacada Requerida */}
            <blockquote className="mx-auto mt-4 max-w-3xl text-2xl font-extrabold leading-snug text-white sm:text-3xl md:text-4xl">
              “Impulsamos el potencial de tu empresa con asesoría personalizada
              y soluciones que marcan la diferencia.”
            </blockquote>

            <p className="mx-auto mt-4 max-w-xl text-base text-white/80">
              Contáctanos hoy mismo para coordinar una reunión de diagnóstico o
              asegurar tu vacante en nuestros programas certificados.
            </p>

            {/* Botón Principal con leve pulsación sutil */}
            <div className="mt-8 flex flex-col items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                variant="accent"
                className="h-14 px-8 text-base font-extrabold shadow-corporate"
              >
                <a
                  ref={ctaBtnRef}
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("¡Hola! Deseo inscribirme y transformar mi carrera con Centro Empresarial.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gap-2.5"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>¡Inscríbete hoy y transforma tu carrera!</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>

              <Button
                asChild
                variant="outline"
                className="border-white/30 bg-white/10 text-white hover:bg-white hover:text-primary"
              >
                <Link to="/contacto" className="gap-2">
                  Formulario de Contacto
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Datos de Contacto Directo */}
            <div className="mt-12 grid gap-6 border-t border-white/15 pt-8 sm:grid-cols-2 text-left">
              <a
                href={`tel:${whatsappNumber}`}
                className="flex items-center gap-3.5 rounded-xl border border-white/10 bg-white/5 p-4 text-white/90 backdrop-blur-sm transition-colors hover:bg-white/15"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
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
                className="flex items-center gap-3.5 rounded-xl border border-white/10 bg-white/5 p-4 text-white/90 backdrop-blur-sm transition-colors hover:bg-white/15"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20 text-white">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-[11px] font-semibold uppercase text-white/70">
                    Correo oficial
                  </div>
                  <div className="text-sm font-bold text-white break-all">
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

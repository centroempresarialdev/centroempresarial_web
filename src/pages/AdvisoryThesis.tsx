import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { contactInfo } from "@/data/site";
import {
  GraduationCap,
  BookOpen,
  Award,
  Users,
  PenTool,
  ShieldCheck,
  TrendingUp,
  Mail,
  MapPin,
  MessageCircle,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Clock,
  ExternalLink,
} from "lucide-react";
import thesisHeroBg from "@/assets/hero/thesis-hero-bg.jpg";
import thesisCard1Img from "@/assets/hero/tesis.jpg";
import thesisCard2Img from "@/assets/hero/tesis2.jpg";

gsap.registerPlugin(ScrollTrigger);

const AdvisoryThesis = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);
  const revealWordsRef = useRef<HTMLSpanElement[]>([]);

  // Teléfono oficial unificado: 906 491 859
  const phoneFormatted = contactInfo.phone; // +51 906 491 859
  const whatsappNumber = contactInfo.whatsapp; // 51906491859

  // Beneficios de la Sección 4
  const benefits = [
    {
      title: "8 años de experiencia",
      description:
        "Trayectoria comprobada guiando con éxito a cientos de egresados y profesionales hacia su titulación.",
      icon: Award,
      badge: "+500 Asesorados",
    },
    {
      title: "Asesoría personalizada",
      description:
        "Sesiones uno a uno adaptadas a tu carrera, universidad, ritmo de trabajo y nivel de avance.",
      icon: Users,
      badge: "100% Individual",
    },
    {
      title: "Redacción y análisis",
      description:
        "Rigor científico en marco teórico, metodología, diseño muestral y análisis estadístico especializado.",
      icon: PenTool,
      badge: "Rigor Académico",
    },
    {
      title: "Correcciones garantizadas",
      description:
        "Acompañamiento continuo y levantamiento oportuno de cada observación de tus jurados o asesores.",
      icon: ShieldCheck,
      badge: "Soporte Total",
    },
    {
      title: "Resultados que marcan la diferencia",
      description:
        "Aprobación sustentada con solvencia técnica, excelencia metodológica y seguridad al defender tu grado.",
      icon: TrendingUp,
      badge: "Éxito Seguro",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ═════════════════════════════════════════════════════════════
      // SECCIÓN 1: HERO TIMELINE (Efecto de levantamiento y aparición)
      // ═════════════════════════════════════════════════════════════
      const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Fondo imagen con suave scale-down y fade-in
      if (heroBgRef.current) {
        gsap.fromTo(
          heroBgRef.current,
          { opacity: 0, scale: 1.08 },
          { opacity: 1, scale: 1, duration: 1.6, ease: "sine.out" },
        );
      }

      // Elementos columna izquierda: levantamiento escalonado (fade-in + translateY)
      heroTl.fromTo(
        ".hero-lift-item",
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.1,
          ease: "power3.out",
        },
        0.1,
      );

      // ═════════════════════════════════════════════════════════════
      // SECCIÓN 2: PINNED TRANSITION (Texto fijado + Lectura scrub)
      // ═════════════════════════════════════════════════════════════
      if (revealWordsRef.current.length > 0) {
        gsap.fromTo(
          revealWordsRef.current,
          { opacity: 0.2, y: 6 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            scrollTrigger: {
              trigger: ".pinned-section-wrapper",
              start: "top top",
              end: "+=120%",
              pin: ".pinned-section-content",
              scrub: 0.6,
            },
          },
        );
      }

      // ═════════════════════════════════════════════════════════════
      // SECCIÓN 5: CURTAIN REVEAL CONTACTO (Parallax Footer Effect)
      // ═════════════════════════════════════════════════════════════
      gsap.fromTo(
        ".curtain-content",
        { yPercent: 16, opacity: 0.85 },
        {
          yPercent: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".curtain-section",
            start: "top bottom",
            end: "bottom bottom",
            scrub: 0.5,
          },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden bg-background"
    >
      {/* ─── HERO SECTION ─── */}
      <section className="relative w-full min-h-screen min-h-[100dvh] flex flex-col justify-center overflow-hidden bg-gradient-to-br from-[#0c3f30] via-[#105340] to-[#093527] text-white pt-28 pb-12 sm:pt-32 sm:pb-14 md:pt-36 md:pb-16">
        {/* Background photography on right with smooth gradient mask */}
        <div
          ref={heroBgRef}
          className="pointer-events-none absolute inset-0 overflow-hidden will-change-transform"
        >
          <img
            src={thesisHeroBg}
            alt="Asesoría y Tesis Centro Empresarial"
            className="h-full w-full object-cover object-center lg:object-right opacity-25 lg:opacity-40 [mask-image:linear-gradient(to_right,transparent_0%,transparent_30%,black_80%)] [-webkit-mask-image:linear-gradient(to_right,transparent_0%,transparent_30%,black_80%)]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0c3f30] via-transparent to-transparent lg:w-1/2" />
        </div>

        {/* Decorative ambient glowing lines matching brand identity */}
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

        <div className="container relative z-10 mx-auto px-6 lg:px-12">
          <div className="max-w-3xl lg:max-w-4xl">
            {/* Pill Badge */}
            <div className="hero-lift-item inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-accent backdrop-blur-md">
              <GraduationCap className="h-4 w-4" />
              <span>Asesoría Especializada &amp; Tesis</span>
            </div>

            {/* Main Headline with Accent Highlight */}
            <h1 className="hero-lift-item mt-5 text-3xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
              Tu éxito académico y titulación{" "}
              <span className="relative inline-block text-accent pb-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:rounded-full after:bg-gradient-to-r after:from-accent after:via-accent-light after:to-transparent">
                empieza aquí
              </span>
            </h1>

            {/* Direct, high-impact description */}
            <p className="hero-lift-item mt-5 text-base leading-relaxed text-white/85 sm:text-lg sm:leading-8 max-w-2xl">
              La tesis no se hace sola,{" "}
              <strong className="text-white font-bold">
                la tesis la creas tú
              </strong>
              . Te guiamos con metodología rigurosa, análisis de datos y
              acompañamiento integral para asegurar tu aprobación con solvencia
              académica.
            </p>

            {/* Action Buttons */}
            <div className="hero-lift-item mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
              <Button
                asChild
                size="lg"
                variant="accent"
                className="h-12 px-7 text-sm font-bold shadow-lg shadow-accent/20 transition-all duration-300 hover:scale-105"
              >
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hola, deseo cotizar mi asesoría de tesis con Centro Empresarial.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gap-2.5"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>Cotiza tu asesoría</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 border-white/25 bg-white/10 px-6 text-sm font-semibold text-white backdrop-blur transition-all duration-300 hover:bg-white hover:text-primary-dark"
              >
                <a href="#servicios" className="gap-2">
                  <span>Explorar servicios</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECCIÓN 3: SERVICIOS (Fondo Blanco Limpio, Sin Movimiento Brusco)
         ══════════════════════════════════════════════════════════ */}
      <section
        id="servicios"
        className="relative z-10 bg-background py-20 md:py-28"
      >
        {/* Acentos de luz sutil en esquinas */}
        <div className="pointer-events-none absolute left-0 top-1/4 h-96 w-96 rounded-full bg-primary/[0.03] blur-3xl" />
        <div className="pointer-events-none absolute right-0 bottom-1/4 h-96 w-96 rounded-full bg-accent/[0.04] blur-3xl" />

        <div className="container relative z-10 mx-auto px-6 lg:px-12">
          <div className="mb-14 text-center">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-primary">
              <Sparkles className="h-4 w-4" />
              Nuestras Modalidades
            </div>
            <h2 className="mt-3 text-3xl font-extrabold text-corporate md:text-5xl">
              Servicios Académicos de Alto Nivel
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
              Metodología estructurada y asesoría orientada al cumplimiento de
              los estándares de tu universidad.
            </p>
          </div>

          <div className="services-container grid gap-8 md:grid-cols-2">
            {/* Tarjeta 1: Tesis de pregrado y postgrado - Imagen completa al borde del marco */}
            <div className="service-card group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border/80 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-corporate">
              <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-slate-900">
                <img
                  src={thesisCard1Img}
                  alt="Tesis de pregrado y postgrado"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              </div>

              <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
                <div>
                  <h3 className="text-2xl font-extrabold text-corporate md:text-3xl">
                    Tesis de pregrado y postgrado
                  </h3>

                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                    Acompañamiento metodológico integral para licenciaturas,
                    maestrías y doctorados. Desde la formulación del problema,
                    matriz de consistencia y marco teórico, hasta el análisis
                    estadístico (SPSS, R, Atlas.ti) y la preparación para la
                    sustentación.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {[
                      "Pregrado & Postgrado",
                      "Maestrías y Doctorados",
                      "Análisis Estadístico",
                      "Simulación de Sustentación",
                    ].map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-semibold text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between border-t border-border/70 pt-6 text-sm font-bold text-primary">
                  <span>Asesoría personalizada</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                </div>
              </div>
            </div>

            {/* Tarjeta 2: Monografías y tesinas - Imagen completa al borde del marco */}
            <div className="service-card group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border/80 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/60 hover:shadow-corporate">
              <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-slate-900">
                <img
                  src={thesisCard2Img}
                  alt="Monografías y tesinas escolares y/o universitarios"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              </div>

              <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
                <div>
                  <h3 className="text-2xl font-extrabold text-corporate md:text-3xl">
                    Monografías y tesinas escolares y/o universitarios
                  </h3>

                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                    Estructuración rigurosa de trabajos de investigación,
                    monografías temáticas, tesinas de grado y proyectos de
                    suficiencia profesional. Aplicación estricta de normas de citado
                    (APA 7ma edición, Vancouver, IEEE) y redacción científica.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {[
                      "Monografías Temáticas",
                      "Tesinas Escolares / Universitarias",
                      "Normas APA / Vancouver",
                      "Control Antiplagio",
                    ].map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-semibold text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between border-t border-border/70 pt-6 text-sm font-bold text-accent">
                  <span>Asesoría personalizada</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECCIÓN 4: BENEFICIOS (Fondo Menta Suave con Patrón Diagonal)
         ══════════════════════════════════════════════════════════ */}
      <section className="relative z-10 border-y border-primary/15 bg-gradient-to-b from-emerald-50/80 via-primary/[0.06] to-emerald-50/70 py-20 md:py-28">
        {/* Patrón diagonal sutil */}
        <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(45deg,#10594908_0px,#10594908_1px,transparent_0px,transparent_20px)] opacity-70" />

        <div className="container relative z-10 mx-auto px-6 lg:px-12">
          <div className="mb-14 text-center">
            <div className="text-xs font-bold uppercase tracking-[0.25em] text-primary">
              ¿Por qué elegirnos?
            </div>
            <h2 className="mt-3 text-3xl font-extrabold text-corporate md:text-5xl">
              Garantías y Beneficios Exclusivos
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
              Metodología probada para culminar tu proyecto con tranquilidad y
              respaldo.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="benefit-item group relative flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-corporate"
              >
                <div>
                  <div className="mb-5 flex items-center justify-between">
                    <div className="benefit-icon icon-badge icon-badge-lg shadow-sm">
                      <benefit.icon className="h-7 w-7" />
                    </div>
                    <span className="rounded-full border border-accent/30 bg-accent/15 px-2.5 py-0.5 text-[11px] font-bold text-accent">
                      {benefit.badge}
                    </span>
                  </div>

                  <div className="benefit-content">
                    <h3 className="text-xl font-bold text-corporate transition-colors group-hover:text-primary">
                      {benefit.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                      {benefit.description}
                    </p>
                  </div>
                </div>

                <div className="mt-6 h-1 w-8 rounded-full bg-primary/30 transition-all duration-300 group-hover:w-full group-hover:bg-primary" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECCIÓN 5: UBICACIÓN Y CONTACTO DIRECTO DE TESIS
         ══════════════════════════════════════════════════════════ */}
      <section className="curtain-section relative w-full border-t border-gray-200/80 bg-white py-16 md:py-24">
        <div className="curtain-content container mx-auto px-6 lg:px-12 will-change-transform">
          <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="mt-2 text-3xl font-extrabold text-[#1a4a38] sm:text-4xl md:text-5xl">
                ¿Listo para titularte con éxito?
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            {/* Columna izquierda: Canales en 1 columna apilada */}
            <div className="flex flex-col gap-4">
              {/* WhatsApp */}
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hola, deseo cotizar mi asesoría de tesis con Centro Empresarial.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
              >
                <div className="icon-badge icon-badge-lg">
                  <MessageCircle />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
                    Teléfono directo / WhatsApp
                  </p>
                  <p className="text-base font-bold text-gray-900">
                    {phoneFormatted}
                  </p>
                </div>
                <ArrowRight className="ml-auto h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
              </a>

              {/* Correo */}
              <a
                href={`mailto:${contactInfo.email}?subject=${encodeURIComponent("Consulta sobre Asesoría de Tesis")}`}
                className="group flex items-center gap-4 rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
              >
                <div className="icon-badge icon-badge-lg">
                  <Mail />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
                    Correo oficial
                  </p>
                  <p className="break-all text-sm font-bold text-gray-900 sm:text-base">
                    {contactInfo.email}
                  </p>
                </div>
              </a>

              {/* Dirección / Sede Corporativa con acciones */}
              <div className="relative flex-1 overflow-hidden rounded-2xl bg-[#1a4a38] p-5 text-white shadow-lg">
                {/* Marca de agua sutil del isotipo 'e' de Centro Empresarial */}
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
                        Oficina y Atención Presencial
                      </p>
                      <p className="text-sm font-semibold leading-relaxed text-white/90">
                        {contactInfo.address}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="icon-badge icon-badge-inverse icon-badge-lg">
                      <Clock />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-accent">
                        Horario de Atención
                      </p>
                      <p className="text-sm font-semibold leading-relaxed text-white/90">
                        Lunes a Sábado • Previa coordinación y diagnóstico
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5 pt-2">
                    <a
                      href={contactInfo.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-xs font-bold text-accent-foreground transition-all hover:brightness-110"
                    >
                      <span>Cómo llegar</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>

                    <Link
                      to="/contacto?servicio=tesis"
                      className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-xs font-bold text-accent-foreground transition-all hover:brightness-110"
                    >
                      <span>Formulario de contacto</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Columna derecha: Mapa interactivo de Google Maps amplio */}
            <div className="relative min-h-[380px] overflow-hidden rounded-2xl border border-gray-200/80 bg-gray-100 shadow-md sm:min-h-[440px] lg:col-span-2 lg:min-h-[500px]">
              <iframe
                title="Ubicación Centro Empresarial - Asesoría de Tesis, Calle Castrovirreyna 323, Ica"
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

export default AdvisoryThesis;

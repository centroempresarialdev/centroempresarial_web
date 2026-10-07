import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";
import { associationSteps, contactInfo } from "@/data/site";
import consultingBenefitsImage from "@/assets/hero/consulting-benefits.png";
import membershipHeroBg from "@/assets/hero/inner-hero-office.jpg";
import {
  ArrowRight,
  Briefcase,
  CalendarDays,
  CheckCircle2,
  Clock,
  Crown,
  Globe,
  GraduationCap,
  Handshake,
  MessageCircle,
  Percent,
  ShieldCheck,
  Target,
  UserRound,
} from "lucide-react";

// ── Membership images ──────────────────────────────────────────────
import img1Default from "@/assets/hero/Membresia1.2.png";
import img1Hover from "@/assets/hero/Membresia1.3.png";
import img2Default from "@/assets/hero/Membresia2.2.png";
import img2Hover from "@/assets/hero/Membresia2.3.png";
import img3Default from "@/assets/hero/Membresia3.2.png";
import img3Hover from "@/assets/hero/Membresia3.3.png";

// ── TypeScript interfaces ──────────────────────────────────────────
interface MembershipPlan {
  name: string;
  price: string;
  period: string;
  audience: string;
  benefits: string[];
  featured: boolean;
  imgDefault: string;
  imgHover: string;
  accentColor: string; // Tailwind bg class for header strip
  badgeLabel?: string; // optional badge (e.g. "Más solicitado")
  haloGradient: string; // Tailwind gradient classes for backdrop halo
  ringBorder: string; // Tailwind border color class for rings
}

// ── Plan data ──────────────────────────────────────────────────────
const plans: MembershipPlan[] = [
  {
    name: "Estudiante",
    price: "S/ 360",
    period: "anual",
    audience:
      "Orientada a estudiantes que buscan capacitaciones, recursos empresariales y apoyo academico.",
    benefits: [
      "Capacitaciones con 50% dto.",
      "Videos y blog gratuitos.",
      "Tesis y proyectos con 20% dto.",
    ],
    featured: false,
    imgDefault: img1Default,
    imgHover: img1Hover,
    accentColor: "bg-primary",
    haloGradient: "from-primary/15 via-emerald-400/10 to-transparent",
    ringBorder: "border-primary/30",
  },
  {
    name: "Profesional",
    price: "S/ 480",
    period: "anual",
    audience:
      "Orientada a profesionales que buscan formacion continua, beneficios academicos y acceso a eventos especializados.",
    benefits: [
      "Capacitaciones con 50% dto.",
      "Postgrado con 20% dto.",
      "Webinars con ponentes internacionales.",
      "Alianzas con colegios profesionales.",
    ],
    featured: true,
    imgDefault: img2Default,
    imgHover: img2Hover,
    accentColor: "bg-accent",
    badgeLabel: "Más solicitado",
    haloGradient: "from-accent/25 via-amber-300/15 to-transparent",
    ringBorder: "border-accent/40",
  },
  {
    name: "Empresarial",
    price: "S/ 1,500",
    period: "anual",
    audience:
      "Orientada a empresas que requieren capacitaciones, asesorias, consultorias y acompanamiento en mejora continua.",
    benefits: [
      "Ponentes nacionales e internacionales.",
      "Asesorías públicas y privadas.",
      "Consultorías y auditorías.",
      "IA aplicada a negocios.",
    ],
    featured: false,
    imgDefault: img3Default,
    imgHover: img3Hover,
    accentColor: "bg-primary-dark",
    haloGradient: "from-primary-dark/15 via-slate-400/10 to-transparent",
    ringBorder: "border-corporate/25",
  },
];

// ── Value highlights (benefits section) ────────────────────────────
const valueHighlights = [
  {
    icon: Percent,
    title: "Descuentos en formación",
    text: "Capacitaciones, programas y recursos con condiciones preferenciales.",
  },
  {
    icon: CalendarDays,
    title: "Eventos especializados",
    text: "Espacios presenciales y webinars para actualizarte y conectar.",
  },
  {
    icon: Handshake,
    title: "Aliados estratégicos",
    text: "Convenios que suman oportunidades académicas, comerciales e institucionales.",
  },
];

// ── Enfoque Component ───────────────────────────────────────────────
function PlanEnfoque({ text }: { text: string }) {
  return (
    <div className="mt-2.5 rounded-xl border border-border/80 bg-muted/40 p-2.5 shadow-sm">
      <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-corporate">
        <Target className="h-3 w-3 text-accent" />
        <span>Enfoque</span>
      </div>
      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
        {text}
      </p>
    </div>
  );
}

// ── Component ──────────────────────────────────────────────────────
const Memberships = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);

  const scrollToPlans = () => {
    document
      .getElementById("planes-membresia")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (heroBgRef.current) {
        gsap.fromTo(
          heroBgRef.current,
          { opacity: 0, scale: 1.1 },
          { opacity: 1, scale: 1, duration: 1.8, ease: "sine.out" },
        );
      }

      heroTl.fromTo(
        ".memberships-hero-lift",
        { y: 38, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.0,
          stagger: 0.12,
          ease: "power3.out",
        },
        0.1,
      );

      heroTl.fromTo(
        ".memberships-hero-card",
        { y: 48, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.1,
          stagger: 0.14,
          ease: "power3.out",
        },
        0.25,
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden bg-background">
      {/* ─── HERO: MEMBRESÍAS CORPORATIVAS ─── */}
      <section className="relative w-full min-h-screen min-h-[100dvh] flex flex-col justify-center overflow-hidden bg-gradient-to-br from-[#0c3f30] via-[#105340] to-[#093527] text-white pt-28 pb-12 sm:pt-32 sm:pb-14 md:pt-36 md:pb-16">
        {/* Background photography on right with smooth fade */}
        <div
          ref={heroBgRef}
          className="pointer-events-none absolute inset-0 overflow-hidden will-change-transform"
        >
          <img
            src={membershipHeroBg}
            alt="Membresías Centro Empresarial"
            className="h-full w-full object-cover object-center lg:object-right opacity-25 lg:opacity-40 [mask-image:linear-gradient(to_right,transparent_0%,transparent_30%,black_80%)] [-webkit-mask-image:linear-gradient(to_right,transparent_0%,transparent_30%,black_80%)]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0c3f30] via-transparent to-transparent lg:w-1/2" />
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

        <div className="container relative z-10 mx-auto px-6 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            {/* Left Column: Core message and CTA */}
            <div className="max-w-2xl">
              {/* Pill Badge */}
              <div className="memberships-hero-lift inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-accent backdrop-blur-md">
                <CalendarDays className="h-4 w-4" />
                <span>Membresías &amp; Red Corporativa</span>
              </div>

              {/* Main Headline */}
              <h1 className="memberships-hero-lift mt-5 text-3xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
                Membresías anuales para{" "}
                <span className="relative inline-block text-accent pb-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:rounded-full after:bg-gradient-to-r after:from-accent after:via-accent-light after:to-transparent">
                  cada etapa y objetivo
                </span>
              </h1>

              {/* Description */}
              <p className="memberships-hero-lift mt-5 text-base leading-relaxed text-white/85 sm:text-lg sm:leading-8">
                Forma parte de la red empresarial más activa de Ica. Compara el enfoque,
                la inversión y los beneficios exclusivos de cada categoría para impulsar tu
                perfil profesional o potenciar tu empresa.
              </p>

              {/* Action Buttons */}
              <div className="memberships-hero-lift mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
                <Button
                  asChild
                  size="lg"
                  variant="accent"
                  className="h-12 px-7 text-sm font-bold shadow-lg shadow-accent/20 transition-all duration-300 hover:scale-105"
                >
                  <a
                    href={`https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent(
                      "Hola, deseo solicitar mi inscripción a una membresía del Centro Empresarial.",
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gap-2.5"
                  >
                    <MessageCircle className="h-5 w-5" />
                    <span>Solicitar por WhatsApp</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  onClick={scrollToPlans}
                  className="h-12 border-white/25 bg-white/10 px-6 text-sm font-semibold text-white backdrop-blur transition-all duration-300 hover:bg-white hover:text-primary-dark"
                >
                  <span>Comparar los 3 planes</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>

              {/* Bottom 3 Quick Highlights */}
              <div className="memberships-hero-lift relative mt-10 pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-white/30 via-white/15 to-transparent" />
                <div className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-white/90">
                  <Percent className="h-4 w-4 shrink-0 text-accent" />
                  <span>50% dto. en cursos</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-white/90">
                  <Globe className="h-4 w-4 shrink-0 text-accent" />
                  <span>Ponentes globales</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-white/90">
                  <Clock className="h-4 w-4 shrink-0 text-accent" />
                  <span>Activación en 24 horas</span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Membership Tier Snapshot Hub ("QUE NO SEA IGUAL") */}
            <div className="memberships-hero-card flex flex-col space-y-4 lg:max-w-md lg:ml-auto w-full">
              <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-5 sm:p-6 backdrop-blur-xl shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between gap-2 border-b border-white/15 pb-4">
                  <div className="flex items-center gap-2">
                    <Crown className="h-5 w-5 text-accent" />
                    <span className="text-xs font-extrabold uppercase tracking-wider text-accent">
                      Planes Anuales 2026
                    </span>
                  </div>
                  <span className="rounded-full bg-accent/20 border border-accent/40 px-2.5 py-0.5 text-[10px] font-bold text-accent">
                    Inscripción Abierta
                  </span>
                </div>

                <p className="mt-3 text-xs sm:text-sm font-medium text-white/80 leading-relaxed">
                  Elige tu plan y activa tu membresía con credencial y acceso inmediato.
                </p>

                {/* 3 Tier Snapshot Cards */}
                <div className="mt-4 space-y-2.5">
                  {/* Tier 1: Estudiante */}
                  <div
                    onClick={scrollToPlans}
                    className="group flex cursor-pointer items-center justify-between rounded-xl border border-white/10 bg-white/5 p-3 transition-all duration-300 hover:border-emerald-400/40 hover:bg-white/10"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-300">
                        <GraduationCap className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-sm font-bold text-white group-hover:text-accent transition-colors">
                            Estudiante
                          </h4>
                          <span className="rounded bg-white/10 px-1.5 py-0.5 text-[9px] font-semibold text-white/70">
                            Pregrado
                          </span>
                        </div>
                        <p className="text-[11px] text-white/65">
                          Capacitaciones 50% dto. + tesis 20%
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-extrabold text-white">S/ 360</span>
                      <p className="text-[10px] text-white/50">/anual</p>
                    </div>
                  </div>

                  {/* Tier 2: Profesionales (Featured with gold border glow) */}
                  <div
                    onClick={scrollToPlans}
                    className="group relative flex cursor-pointer items-center justify-between rounded-xl border border-accent/60 bg-accent/15 p-3 shadow-lg shadow-accent/10 transition-all duration-300 hover:border-accent hover:bg-accent/20"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground font-black">
                        <UserRound className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-sm font-bold text-white group-hover:text-accent transition-colors">
                            Profesionales
                          </h4>
                          <span className="rounded-full bg-accent/30 px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wide text-accent">
                            Más Popular
                          </span>
                        </div>
                        <p className="text-[11px] text-white/80">
                          Ponentes internacionales + diplomados
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-extrabold text-accent">S/ 480</span>
                      <p className="text-[10px] text-white/70">/anual</p>
                    </div>
                  </div>

                  {/* Tier 3: Empresarial */}
                  <div
                    onClick={scrollToPlans}
                    className="group flex cursor-pointer items-center justify-between rounded-xl border border-white/10 bg-white/5 p-3 transition-all duration-300 hover:border-emerald-400/40 hover:bg-white/10"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-300">
                        <Briefcase className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-sm font-bold text-white group-hover:text-accent transition-colors">
                            Empresarial
                          </h4>
                          <span className="rounded bg-white/10 px-1.5 py-0.5 text-[9px] font-semibold text-white/70">
                            Corporativo
                          </span>
                        </div>
                        <p className="text-[11px] text-white/65">
                          Consultoría, auditoría e IA aplicada
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-extrabold text-white">S/ 1,500</span>
                      <p className="text-[10px] text-white/50">/anual</p>
                    </div>
                  </div>
                </div>

                {/* Footer guarantee row */}
                <div className="mt-4 flex items-center justify-between rounded-xl bg-white/5 border border-white/10 px-4 py-2.5">
                  <div className="flex items-center gap-2 text-xs font-medium text-white/90">
                    <ShieldCheck className="h-4 w-4 text-accent shrink-0" />
                    <span>Activación y soporte personalizado</span>
                  </div>
                  <button
                    onClick={scrollToPlans}
                    className="flex items-center gap-1 text-xs font-bold text-accent hover:underline shrink-0"
                  >
                    <span>Ver detalle</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── MEMBERSHIP CARDS ─── */}
      <section id="planes-membresia" className="bg-background py-12 md:py-16">
        <div className="container mx-auto px-6 lg:px-12">
          <ScrollReveal className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-primary">
                Membresía anual
              </p>
              <h2 className="text-3xl font-extrabold leading-tight text-corporate md:text-5xl">
                Beneficios por tipo de asociado
              </h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-muted-foreground">
              Cada plan responde a una necesidad distinta: apoyo académico,
              desarrollo profesional o crecimiento empresarial.
            </p>
          </ScrollReveal>

          {/* Cards — 3-column grid */}
          <div className="grid gap-x-6 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
            {plans.map((plan, index) => (
              <ScrollReveal key={plan.name} delay={index * 0.08}>
                {/* ── Card wrapper: pl-[45%] pushes ALL content to the right ── */}
                <div
                  className={`group relative mt-24 flex min-h-[520px] flex-col justify-between overflow-visible rounded-2xl border bg-background py-6 pl-[45%] pr-5 shadow-sm
                    transition-all duration-300 ease-out
                    hover:scale-[1.05] hover:shadow-[0_20px_60px_-12px_rgba(0,0,0,0.25)]
                    ${plan.featured ? "border-accent ring-2 ring-accent/40" : "border-border"}`}
                >
                  {/* ── Color strip ── */}
                  <div
                    className={`absolute left-0 right-0 top-0 h-1.5 rounded-t-2xl ${plan.accentColor}`}
                  />

                  {/* ── Pop-out image — absolute, bottom-left, overflows TOP ── */}
                  <div className="pointer-events-none absolute bottom-0 left-0 z-10 h-[120%] w-[44%] overflow-hidden rounded-bl-2xl">
                    {/* Backdrop Halo & Rings */}
                    <div
                      className={`absolute left-1/2 top-[44%] h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr ${plan.haloGradient} blur-xl opacity-70 transition-transform duration-500 group-hover:scale-110`}
                    />
                    <div
                      className={`absolute left-1/2 top-[44%] h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed ${plan.ringBorder} opacity-60 transition-all duration-500 group-hover:scale-105 group-hover:opacity-90`}
                    />
                    <div
                      className={`absolute left-1/2 top-[44%] h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border ${plan.ringBorder} opacity-40 transition-all duration-500 group-hover:scale-110`}
                    />

                    {/* Base image — ALWAYS visible, fades out on hover */}
                    <img
                      src={plan.imgDefault}
                      alt={plan.name}
                      loading="lazy"
                      decoding="async"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 h-full w-[130%] object-cover object-top
                        transition-opacity duration-300 group-hover:opacity-0"
                    />
                    {/* Hover image — overlays base, fades in on card hover */}
                    <img
                      src={plan.imgHover}
                      alt={`${plan.name} — acción`}
                      loading="lazy"
                      decoding="async"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 h-full w-[130%] object-cover object-top
                        opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    />
                  </div>

                  {/* ── Text content (already on the right via pl-[45%]) ── */}
                  {/* Badge */}
                  {plan.badgeLabel && (
                    <span className="mb-2 w-fit rounded-full bg-accent/15 px-3 py-0.5 text-[11px] font-extrabold uppercase tracking-wide text-accent">
                      {plan.badgeLabel}
                    </span>
                  )}

                  {/* Name + price */}
                  <h3 className="text-2xl font-extrabold text-corporate lg:text-3xl">
                    {plan.name}
                  </h3>
                  <div className="mt-1 flex items-end gap-1">
                    <span className="text-3xl font-extrabold text-corporate lg:text-4xl">
                      {plan.price}
                    </span>
                    <span className="pb-0.5 text-xs text-muted-foreground">
                      /{plan.period}
                    </span>
                  </div>

                  {/* Audience / Enfoque */}
                  <PlanEnfoque text={plan.audience} />

                  {/* Divider */}
                  <hr className="my-2.5 border-border" />

                  {/* Benefits */}
                  <ul className="flex-1 space-y-2">
                    {plan.benefits.map((b) => (
                      <li
                        key={b}
                        className="flex gap-2 text-sm leading-snug text-muted-foreground"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Button
                    asChild
                    variant={plan.featured ? "accent" : "corporate"}
                    className="mt-5 w-full text-sm"
                  >
                    <Link
                      to={`/contacto?plan=${encodeURIComponent(plan.name.toLowerCase())}`}
                    >
                      Solicitar inscripción
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── VALUE / BENEFITS ─── */}
      <section className="bg-muted/30 py-14 md:py-20">
        <div className="container mx-auto px-6 lg:px-12">
          <ScrollReveal className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-primary">
                Beneficios de asociarte
              </p>
              <h2 className="max-w-3xl text-3xl font-extrabold leading-tight text-corporate md:text-5xl">
                Impulsa tu crecimiento con una red activa
              </h2>
            </div>
            <Button asChild variant="corporate">
              <Link to="/contacto">
                Quiero asociarme
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </ScrollReveal>

          <ScrollReveal className="grid overflow-hidden rounded-lg border border-border bg-background shadow-elevated lg:grid-cols-[1.08fr_0.92fr]">
            <div className="relative min-h-[430px]">
              <img
                src={consultingBenefitsImage}
                alt="Asesoría empresarial"
                className="absolute inset-0 h-full w-full object-cover"
                data-gsap-image
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-foreground/12" />
            </div>

            <div className="flex flex-col justify-center p-6 md:p-10">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
                Valor para asociados
              </p>
              <h3 className="mt-3 text-3xl font-extrabold leading-tight text-corporate md:text-4xl">
                Formación, eventos y aliados para avanzar con respaldo
              </h3>

              <div className="mt-8 grid gap-4">
                {valueHighlights.map((item) => (
                  <div
                    key={item.title}
                    className="flex items-center gap-4 rounded-md border border-border bg-background p-4 shadow-sm"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
                      <item.icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <h4 className="text-base font-extrabold text-corporate">
                        {item.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {item.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Button asChild variant="accent" size="lg" className="mt-8 w-fit">
                <Link to="/contacto">
                  Hablar con un asesor
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── ASSOCIATION STEPS ─── */}
      <section className="bg-primary-light py-14 text-primary-foreground md:py-20">
        <div className="container mx-auto px-6 lg:px-12">
          <ScrollReveal className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-accent">
                Como asociarse
              </p>
              <h2 className="text-3xl font-extrabold leading-tight text-white md:text-5xl">
                Un cierre simple para convertir interes en solicitud
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {associationSteps.map((step, index) => (
                <div
                  key={step}
                  className="rounded-lg border border-white/15 bg-white/10 p-5 backdrop-blur"
                >
                  <span className="mb-4 flex h-9 w-9 items-center justify-center rounded-md bg-accent text-sm font-bold text-accent-foreground">
                    {index + 1}
                  </span>
                  <p className="font-semibold leading-7 text-white">{step}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default Memberships;

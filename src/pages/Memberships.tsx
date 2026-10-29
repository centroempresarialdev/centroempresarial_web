import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";
import { contactInfo } from "@/data/site";
import consultingBenefitsImage from "@/assets/hero/consulting-benefits.png";
import membershipHeroBg from "@/assets/hero/memberships-hero-bg.jpg";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Crown,
  Handshake,
  MessageCircle,
  Percent,
  Target,
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
  accentColor: string;
  badgeLabel?: string;
  haloGradient: string;
  ringBorder: string;
}

// ── Plan data ──────────────────────────────────────────────────────
const plans: MembershipPlan[] = [
  {
    name: "Estudiante",
    price: "S/ 360",
    period: "anual",
    audience:
      "Orientada a estudiantes que buscan capacitaciones, recursos empresariales y apoyo académico.",
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
    price: "S/ 780",
    period: "anual",
    audience:
      "Orientada a profesionales que buscan formación continua, beneficios académicos y acceso a eventos especializados.",
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
      "Orientada a empresas que requieren capacitaciones, asesorías, consultorías y acompañamiento en mejora continua.",
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
        <Target className="h-3 w-3 shrink-0 text-accent" />
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
          { opacity: 0, scale: 1.06 },
          { opacity: 1, scale: 1, duration: 1.6, ease: "sine.out" },
        );
      }

      heroTl.fromTo(
        ".memberships-hero-lift",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.1,
          ease: "power3.out",
        },
        0.1,
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-x-hidden bg-background"
    >
      {/* ─── HERO: MEMBRESÍAS CORPORATIVAS (Layout Limpio y Equilibrado) ─── */}
      <section className="relative flex min-h-screen min-h-[100dvh] w-full flex-col justify-center overflow-hidden bg-gradient-to-br from-[#0c3f30] via-[#105340] to-[#093527] pb-14 pt-28 text-white sm:pb-16 sm:pt-32 md:pb-20 md:pt-36">
        {/* Fotografía de fondo con degradado equilibrado */}
        <div
          ref={heroBgRef}
          className="pointer-events-none absolute inset-0 overflow-hidden will-change-transform"
        >
          <img
            src={membershipHeroBg}
            alt="Membresías Centro Empresarial"
            className="h-full w-full object-cover object-center opacity-25 lg:opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0c3f30]/80 via-[#0c3f30]/65 to-[#093527]/90" />
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
        <div className="pointer-events-none absolute bottom-10 right-10 h-72 w-72 rounded-full bg-accent/15 blur-[90px]" />

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-12">
          {/* Contenedor único equilibrado con max-w-3xl mx-auto */}
          <div className="mx-auto max-w-3xl text-center">
            {/* Pill Badge */}
            <div className="memberships-hero-lift inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-accent backdrop-blur-md">
              <CalendarDays className="h-4 w-4 shrink-0" />
              <span>Membresías &amp; Red Corporativa</span>
            </div>

            {/* Main Headline */}
            <h1 className="memberships-hero-lift mt-5 text-3xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
              Membresías anuales para{" "}
              <span className="relative inline-block pb-1 text-accent after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:rounded-full after:bg-gradient-to-r after:from-accent after:via-accent-light after:to-transparent">
                cada etapa y objetivo
              </span>
            </h1>

            {/* Description */}
            <p className="memberships-hero-lift mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg sm:leading-8">
              Forma parte de la red empresarial más activa de Ica. Compara el
              enfoque, la inversión y los beneficios exclusivos de cada
              categoría para impulsar tu perfil profesional o potenciar tu
              empresa.
            </p>

            {/* Action Buttons con área táctil >= 44px */}
            <div className="memberships-hero-lift mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <Button
                asChild
                size="lg"
                variant="accent"
                className="min-h-[44px] h-12 w-full sm:w-auto px-7 text-sm font-bold shadow-lg shadow-accent/20 transition-all duration-300 hover:scale-105"
              >
                <a
                  href={`https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent(
                    "Hola, deseo solicitar mi inscripción a una membresía del Centro Empresarial.",
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center justify-center gap-2.5"
                >
                  <MessageCircle className="h-5 w-5 shrink-0" />
                  <span>Solicitar por WhatsApp</span>
                  <ArrowRight className="h-4 w-4 shrink-0" />
                </a>
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={scrollToPlans}
                className="min-h-[44px] h-12 w-full sm:w-auto border-white/25 bg-white/10 px-6 text-sm font-semibold text-white backdrop-blur transition-all duration-300 hover:bg-white hover:text-primary-dark"
              >
                <span>Comparar los 3 planes</span>
                <ArrowRight className="h-4 w-4 shrink-0" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── MEMBERSHIP CARDS (Mobile-First) ─── */}
      <section
        id="planes-membresia"
        className="relative overflow-hidden bg-gradient-to-b from-[#e6f0ea] via-[#edf4ef] to-[#e3eee7] py-14 sm:py-16 md:py-20"
      >
        {/* Patrón sutil + bordes para diferenciar la sección de planes */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:radial-gradient(hsl(var(--primary)/0.18)_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-accent to-primary" />
        <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />
        <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-12">
          <ScrollReveal className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="mb-2 inline-flex items-center gap-2 rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground">
                <Crown className="h-3.5 w-3.5 shrink-0 text-accent" />
                <span>Planes e inscripción anual</span>
              </p>
              <h2 className="text-2xl font-extrabold leading-tight text-corporate sm:text-3xl md:text-5xl">
                Beneficios por tipo de asociado
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-relaxed text-foreground/70 sm:text-base sm:leading-7">
              Cada plan responde a una necesidad distinta: apoyo académico,
              desarrollo profesional o crecimiento empresarial.
            </p>
          </ScrollReveal>

          {/* Cards — 1 col en móvil, 2 cols en tablet, 3 cols en desktop */}
          <div className="grid grid-cols-1 gap-x-6 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
            {plans.map((plan, index) => (
              <ScrollReveal key={plan.name} delay={index * 0.08}>
                <div
                  className={`group relative mt-20 sm:mt-24 flex min-h-[500px] sm:min-h-[520px] flex-col justify-between overflow-visible rounded-2xl border bg-white py-5 pl-[42%] pr-4 sm:py-6 sm:pl-[45%] sm:pr-5 shadow-md
                    transition-all duration-300 ease-out
                    hover:shadow-[0_20px_60px_-12px_rgba(0,0,0,0.25)]
                    ${plan.featured ? "border-accent ring-2 ring-accent/40" : "border-border"}`}
                >
                  {/* ── Color strip ── */}
                  <div
                    className={`absolute left-0 right-0 top-0 h-1.5 rounded-t-2xl ${plan.accentColor}`}
                  />

                  {/* ── Pop-out image — absolute, bottom-left, overflows TOP ── */}
                  <div className="pointer-events-none absolute bottom-0 left-0 z-10 h-[115%] sm:h-[120%] w-[41%] sm:w-[44%] overflow-hidden rounded-bl-2xl">
                    {/* Backdrop Halo & Rings */}
                    <div
                      className={`absolute left-1/2 top-[44%] h-36 w-36 sm:h-44 sm:w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr ${plan.haloGradient} blur-xl opacity-70`}
                    />
                    <div
                      className={`absolute left-1/2 top-[44%] h-32 w-32 sm:h-40 sm:w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed ${plan.ringBorder} opacity-60`}
                    />
                    <div
                      className={`absolute left-1/2 top-[44%] h-24 w-24 sm:h-28 sm:w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border ${plan.ringBorder} opacity-40`}
                    />

                    {/* Base image */}
                    <img
                      src={plan.imgDefault}
                      alt={plan.name}
                      loading="lazy"
                      decoding="async"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 h-full w-[130%] object-cover object-top
                        transition-opacity duration-300 group-hover:opacity-0"
                    />
                    {/* Hover image */}
                    <img
                      src={plan.imgHover}
                      alt={`${plan.name} — acción`}
                      loading="lazy"
                      decoding="async"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 h-full w-[130%] object-cover object-top
                        opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    />
                  </div>

                  {/* ── Text content ── */}
                  {plan.badgeLabel && (
                    <span className="mb-2 w-fit rounded-full bg-accent/15 px-2.5 py-0.5 text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wide text-accent">
                      {plan.badgeLabel}
                    </span>
                  )}

                  <h3 className="text-xl font-extrabold text-corporate sm:text-2xl lg:text-3xl">
                    {plan.name}
                  </h3>
                  <div className="mt-2 flex w-fit items-end gap-1 rounded-xl bg-primary/[0.07] px-2.5 py-1.5 sm:px-3 ring-1 ring-inset ring-primary/15">
                    <span className="text-2xl font-extrabold text-corporate sm:text-3xl lg:text-4xl">
                      {plan.price}
                    </span>
                    <span className="pb-0.5 text-xs text-muted-foreground">
                      /{plan.period}
                    </span>
                  </div>

                  <PlanEnfoque text={plan.audience} />

                  <hr className="my-2.5 border-border" />

                  <ul className="flex-1 space-y-2">
                    {plan.benefits.map((b) => (
                      <li
                        key={b}
                        className="flex gap-2 text-xs sm:text-sm leading-snug text-muted-foreground"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    asChild
                    variant={plan.featured ? "accent" : "corporate"}
                    className="mt-5 min-h-[44px] w-full text-xs sm:text-sm"
                  >
                    <Link
                      to={`/contacto?plan=${encodeURIComponent(plan.name.toLowerCase())}`}
                      className="inline-flex min-h-[44px] items-center justify-center gap-1"
                    >
                      <span>Solicitar inscripción</span>
                      <ArrowRight className="h-4 w-4 shrink-0" />
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
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <ScrollReveal className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-primary">
                Beneficios de asociarte
              </p>
              <h2 className="max-w-3xl text-2xl font-extrabold leading-tight text-corporate sm:text-3xl md:text-5xl">
                Impulsa tu crecimiento con una red activa
              </h2>
            </div>
            <Button
              asChild
              variant="corporate"
              className="min-h-[44px] w-full sm:w-auto"
            >
              <Link
                to="/contacto"
                className="inline-flex min-h-[44px] items-center justify-center gap-2"
              >
                <span>Quiero asociarme</span>
                <ArrowRight className="h-4 w-4 shrink-0" />
              </Link>
            </Button>
          </ScrollReveal>

          <ScrollReveal className="grid grid-cols-1 overflow-hidden rounded-2xl border border-border bg-background shadow-elevated lg:grid-cols-[1.08fr_0.92fr]">
            <div className="relative min-h-[280px] sm:min-h-[430px]">
              <img
                src={consultingBenefitsImage}
                alt="Asesoría empresarial"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-foreground/12" />
            </div>

            <div className="flex flex-col justify-center p-5 sm:p-6 md:p-10">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
                Valor para asociados
              </p>
              <h3 className="mt-3 text-2xl font-extrabold leading-tight text-corporate sm:text-3xl md:text-4xl">
                Formación, eventos y aliados para avanzar con respaldo
              </h3>

              <div className="mt-6 sm:mt-8 grid grid-cols-1 gap-4">
                {valueHighlights.map((item) => (
                  <div
                    key={item.title}
                    className="flex items-start sm:items-center gap-4 rounded-xl border border-border bg-background p-4 shadow-sm"
                  >
                    <div className="icon-badge icon-badge-md icon-badge-solid shrink-0">
                      <item.icon aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
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

              <Button
                asChild
                variant="accent"
                size="lg"
                className="mt-8 min-h-[44px] w-full sm:w-fit"
              >
                <Link
                  to="/contacto"
                  className="inline-flex min-h-[44px] items-center justify-center gap-2"
                >
                  <span>Hablar con un asesor</span>
                  <ArrowRight className="h-5 w-5 shrink-0" />
                </Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default Memberships;

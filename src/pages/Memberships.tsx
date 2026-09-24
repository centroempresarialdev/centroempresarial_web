import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";
import { associationSteps, contactInfo } from "@/data/site";
import consultingBenefitsImage from "@/assets/hero/consulting-benefits.png";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  Handshake,
  MessageCircle,
  Percent,
  ShieldCheck,
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
  accentColor: string;      // Tailwind bg class for header strip
  badgeLabel?: string;       // optional badge (e.g. "Más solicitado")
  haloGradient: string;      // Tailwind gradient classes for backdrop halo
  ringBorder: string;        // Tailwind border color class for rings
}

// ── Plan data ──────────────────────────────────────────────────────
const plans: MembershipPlan[] = [
  {
    name: "Estudiante",
    price: "S/ 360",
    period: "anual",
    audience: "Orientada a estudiantes que buscan capacitaciones, recursos empresariales y apoyo academico.",
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
    audience: "Orientada a profesionales que buscan formacion continua, beneficios academicos y acceso a eventos especializados.",
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
    audience: "Orientada a empresas que requieren capacitaciones, asesorias, consultorias y acompanamiento en mejora continua.",
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
  const scrollToPlans = () => {
    document.getElementById("planes-membresia")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-dark via-primary to-primary-dark pb-16 pt-36 text-white md:pb-24 md:pt-48">
        <div className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-accent/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-white/10 blur-3xl" />

        <div className="container relative z-10 mx-auto px-6 lg:px-12">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <ScrollReveal direction="left">
              <h1 className="text-4xl font-extrabold leading-tight text-white md:text-5xl lg:text-6xl">
                Membresías anuales para cada etapa
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-8 text-white/85">
                Compara el enfoque, la inversión y los beneficios reales de cada
                categoría antes de solicitar tu inscripción y formar parte de
                nuestra red.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button asChild size="lg" variant="accent">
                  <a
                    href={`https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent("Hola, deseo solicitar mi inscripción a una membresía.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gap-2"
                  >
                    <MessageCircle className="h-5 w-5" />
                    Solicitar por WhatsApp
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={scrollToPlans}
                  className="border-white/30 bg-white/10 text-white hover:bg-white hover:text-primary"
                >
                  Ver membresías
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="relative overflow-hidden rounded-2xl border-white/20 bg-white/10 p-7 shadow-2xl backdrop-blur-xl">
                <div className="flex items-center gap-3 text-accent">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/20 text-accent">
                    <ClipboardCheck className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-widest text-accent">
                      Inscripción rápida
                    </p>
                    <h3 className="text-lg font-bold text-white">
                      Proceso guiado directo
                    </h3>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-6 text-white/80">
                  Completa una ficha breve y recibe orientación personalizada de
                  un asesor para elegir la categoría perfecta y activar tus
                  beneficios de inmediato.
                </p>

                <div className="mt-6 space-y-3 border-t border-white/15 pt-5">
                  <div className="flex items-center gap-3 text-sm text-white/90">
                    <ShieldCheck className="h-5 w-5 shrink-0 text-accent" />
                    <span>Activación de beneficios en 24h</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-white/90">
                    <ShieldCheck className="h-5 w-5 shrink-0 text-accent" />
                    <span>Asesoría personalizada sin costo</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
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
                  <div className={`absolute left-0 right-0 top-0 h-1.5 rounded-t-2xl ${plan.accentColor}`} />

                  {/* ── Pop-out image — absolute, bottom-left, overflows TOP ── */}
                  <div className="pointer-events-none absolute bottom-0 left-0 z-10 h-[120%] w-[45%]">
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
                      className="absolute bottom-0 left-0 h-full w-full object-contain object-bottom
                        transition-opacity duration-300 group-hover:opacity-0"
                    />
                    {/* Hover image — overlays base, fades in on card hover */}
                    <img
                      src={plan.imgHover}
                      alt={`${plan.name} — acción`}
                      className="absolute bottom-0 left-0 h-full w-full object-contain object-bottom
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
                    <span className="text-3xl font-extrabold text-corporate lg:text-4xl">{plan.price}</span>
                    <span className="pb-0.5 text-xs text-muted-foreground">/{plan.period}</span>
                  </div>

                  {/* Audience / Enfoque */}
                  <PlanEnfoque text={plan.audience} />

                  {/* Divider */}
                  <hr className="my-2.5 border-border" />

                  {/* Benefits */}
                  <ul className="flex-1 space-y-2">
                    {plan.benefits.map((b) => (
                      <li key={b} className="flex gap-2 text-sm leading-snug text-muted-foreground">
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
                    <Link to={`/contacto?plan=${encodeURIComponent(plan.name.toLowerCase())}`}>
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
      <section className="bg-primary py-14 text-primary-foreground md:py-20">
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
    </>
  );
};

export default Memberships;

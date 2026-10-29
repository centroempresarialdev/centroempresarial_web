import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ScrollReveal from "@/components/ScrollReveal";
import heroTrainingImage from "@/assets/galeria/2025 (4).jpg";
import heroCommunityImage from "@/assets/galeria/2026.jpg";
import misionImage from "@/assets/hero/identidad-mision.jpg";
import visionImage from "@/assets/hero/identidad-vision.jpg";
import objetivosImage from "@/assets/hero/identidad-objetivos.jpg";
import valoresImage from "@/assets/hero/identidad-valores.jpg";
import {
  ArrowRight,
  Briefcase,
  Calendar,
  Check,
  ChevronRight,
  Eye,
  GraduationCap,
  Landmark,
  ListChecks,
  ShieldCheck,
  Target,
  Zap,
} from "lucide-react";

const heroSlides = [
  {
    image: heroTrainingImage,
    eyebrow: "Membresias empresariales",
    title: "Beneficios, eventos y aliados en una sola membresia",
    cta: "Quiero asociarme",
    href: "/contacto",
  },
  {
    image: heroCommunityImage,
    eyebrow: "Red de valor",
    title: "Activa oportunidades segun tu perfil",
    cta: "Comparar planes",
    href: "/membresias",
  },
];

const aboutFeatureCards = [
  {
    icon: GraduationCap,
    title: "Capacitaciones y cursos",
    description:
      "Programas diseñados para actualizar competencias de alto impacto en el mercado laboral y empresarial.",
    cta: "Explorar programas",
    href: "/servicios",
    featured: false,
  },
  {
    icon: Landmark,
    title: "Aliados estratégicos",
    description:
      "Convenios con organismos públicos, gremios y firmas privadas para potenciar beneficios mutuos.",
    cta: "Ver convenios",
    href: "/aliados",
    badge: "RED ACTIVA",
    featured: true,
  },
  {
    icon: Briefcase,
    title: "Asesoría empresarial",
    description:
      "Acompañamiento especializado en gestión, formalización, finanzas y tesis aplicadas para pymes.",
    cta: "Solicitar consultoría",
    href: "/asesoria-tesis",
    featured: false,
  },
  {
    icon: Calendar,
    title: "Eventos y webinars",
    description:
      "Espacios de networking presencial y virtual para conectar con líderes y tendencias de negocios.",
    cta: "Calendario de eventos",
    href: "/eventos",
    featured: false,
  },
];

const institutionalPillars = [
  {
    image: misionImage,
    icon: Target,
    title: "Misión",
    text: "Impulsar el crecimiento de estudiantes, profesionales, instituciones públicas y empresas privadas mediante capacitación, asesoría, alianzas estratégicas y espacios de conexión que generen oportunidades reales.",
  },
  {
    image: visionImage,
    icon: Eye,
    title: "Visión",
    text: "Ser el centro empresarial referente de Ica y del Perú, reconocido por articular una comunidad innovadora, colaborativa y competitiva.",
  },
  {
    image: objetivosImage,
    icon: ListChecks,
    title: "Objetivos",
    items: [
      "Fortalecer capacidades mediante formación y asesoría.",
      "Conectar a los miembros con aliados y oportunidades.",
      "Facilitar herramientas, tecnología y acompañamiento para su desarrollo.",
    ],
  },
  {
    image: valoresImage,
    icon: ShieldCheck,
    title: "Valores",
    items: [
      "Compromiso y responsabilidad con nuestros asociados.",
      "Integridad, ética y transparencia en cada acción.",
      "Innovación constante y excelencia profesional.",
      "Colaboración estratégica y vocación de servicio.",
    ],
  },
];

const Index = () => {
  const [heroApi, setHeroApi] = useState<CarouselApi>();
  const [currentHero, setCurrentHero] = useState(0);

  useEffect(() => {
    if (!heroApi) return;

    const updateCurrent = () => setCurrentHero(heroApi.selectedScrollSnap());
    updateCurrent();
    heroApi.on("select", updateCurrent);

    const timer = window.setInterval(() => {
      heroApi.scrollNext();
    }, 6200);

    return () => {
      window.clearInterval(timer);
      heroApi.off("select", updateCurrent);
    };
  }, [heroApi]);

  return (
    <>
      <section className="relative w-full overflow-hidden bg-foreground text-white">
        <Carousel
          setApi={setHeroApi}
          opts={{ align: "start", loop: true }}
          className="relative w-full overflow-hidden"
        >
          <CarouselContent className="ml-0">
            {heroSlides.map((slide) => (
              <CarouselItem key={slide.title} className="pl-0">
                <div className="relative min-h-screen min-h-[100dvh] overflow-hidden">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    fetchPriority="high"
                    decoding="async"
                    className="absolute inset-0 h-[108%] w-full object-cover"
                    data-gsap-parallax
                  />
                  <div className="absolute inset-0 bg-foreground/55 md:bg-gradient-to-r md:from-foreground md:via-foreground/88 md:to-primary/38" />

                  <div className="container relative z-10 mx-auto flex min-h-screen min-h-[100dvh] items-center px-5 pb-20 pt-24 sm:px-6 sm:pb-24 sm:pt-28 md:pt-32 lg:px-12">
                    <motion.div
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      className="max-w-3xl"
                    >
                      <p className="mb-4 text-xs font-bold uppercase leading-5 tracking-[0.18em] text-accent sm:mb-5 sm:text-sm sm:tracking-[0.24em]">
                        {slide.eyebrow}
                      </p>
                      <h1 className="text-[2.15rem] font-extrabold leading-[1.12] text-white sm:text-5xl md:text-6xl lg:text-7xl">
                        {slide.title}
                      </h1>
                      <Button
                        asChild
                        size="lg"
                        variant="accent"
                        className="mt-7 w-full text-base sm:mt-8 sm:w-auto"
                      >
                        <Link to={slide.href}>
                          {slide.cta}
                          <ArrowRight className="h-5 w-5" />
                        </Link>
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="pointer-events-none absolute inset-x-0 bottom-7 z-20 sm:bottom-10">
            <div className="container mx-auto flex items-center justify-between gap-4 px-5 sm:px-6 lg:px-12">
              <div className="pointer-events-auto flex gap-2">
                {heroSlides.map((slide, index) => (
                  <button
                    key={slide.title}
                    type="button"
                    onClick={() => heroApi?.scrollTo(index)}
                    className={`h-2.5 rounded-full transition-all ${currentHero === index ? "w-10 bg-accent" : "w-2.5 bg-white/45 hover:bg-white"}`}
                    aria-label={`Ir al slide ${index + 1}`}
                  />
                ))}
              </div>
              <div className="pointer-events-auto hidden gap-3 md:flex">
                <CarouselPrevious className="static translate-y-0 border-white/20 bg-white/15 text-white hover:bg-white hover:text-primary" />
                <CarouselNext className="static translate-y-0 border-white/20 bg-white/15 text-white hover:bg-white hover:text-primary" />
              </div>
            </div>
          </div>
        </Carousel>
      </section>

      <section className="relative overflow-hidden bg-[#f8fafb] py-16 md:py-24">
        <div className="pointer-events-none absolute -right-24 -top-24 h-[520px] w-[520px] rounded-full bg-emerald-200/35 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-[440px] w-[440px] rounded-full bg-amber-100/40 blur-3xl" />

        <div className="container relative z-10 mx-auto px-6 lg:px-12">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.08fr] lg:gap-16">
            {/* Left column: Pill, Headline, Paragraph, Stats & Buttons */}
            <ScrollReveal>
              <h2 className="mt-6 text-3xl font-extrabold leading-[1.22] tracking-normal text-[#0d261f] sm:text-4xl md:text-[3.1rem]">
                Conectamos personas y empresas con oportunidades reales
              </h2>

              <p className="mt-6 text-base leading-relaxed text-slate-600 sm:text-lg sm:leading-8">
                Centro Empresarial es una organización con más de 12 años en Ica
                articulando capacitación, asesoría, alianzas estratégicas y
                eventos para estudiantes, profesionales, instituciones públicas
                y empresas privadas que buscan crecer.
              </p>

              <div className="mt-8 grid max-w-lg grid-cols-2 gap-6 border-t border-slate-200/90 pt-7">
                <div>
                  <p className="text-3xl font-extrabold tracking-tight text-[#0d261f] sm:text-4xl">
                    12+{" "}
                    <span className="text-xl font-bold text-[#109c67] sm:text-2xl">
                      años
                    </span>
                  </p>
                  <p className="mt-1.5 text-xs leading-snug text-slate-500 sm:text-sm">
                    Impulsando la competitividad en la región de Ica
                  </p>
                </div>

                <div>
                  <p className="text-3xl font-extrabold tracking-tight text-[#0d261f] sm:text-4xl">
                    100%
                  </p>
                  <p className="mt-1.5 text-xs leading-snug text-slate-500 sm:text-sm">
                    Compromiso con el desarrollo institucional y profesional
                  </p>
                </div>
              </div>

              <div className="mt-9 flex flex-wrap items-center gap-3.5">
                <Link
                  to="/servicios"
                  className="inline-flex items-center gap-2.5 rounded-xl bg-[#0d3326] px-6 py-3.5 text-sm font-bold text-white shadow-md transition-all duration-300 hover:bg-[#134635] hover:shadow-lg"
                >
                  <span>Conocer más sobre nosotros</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  to="/aliados"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-200/90 bg-white px-6 py-3.5 text-sm font-bold text-[#0d261f] shadow-sm transition-all duration-300 hover:border-slate-300 hover:bg-slate-50"
                >
                  Ver red de aliados
                </Link>
              </div>
            </ScrollReveal>

            {/* Right column: 2x2 Feature Cards Grid */}
            <div className="grid gap-5 sm:grid-cols-2">
              {aboutFeatureCards.map((card, index) => (
                <ScrollReveal key={card.title} delay={index * 0.07}>
                  <Link
                    to={card.href}
                    className="group relative flex h-full flex-col justify-between rounded-2xl border border-slate-100 bg-white p-7 text-[#0d261f] shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#0d3326] hover:bg-[#0d3326] hover:text-white hover:shadow-xl"
                  >
                    <div>
                      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100/90 text-slate-700 transition-colors duration-300 group-hover:bg-white/10 group-hover:text-[#4ade80]">
                        <card.icon className="h-5 w-5" />
                      </div>

                      <h3 className="text-xl font-extrabold leading-snug text-[#0d261f] transition-colors duration-300 group-hover:text-white">
                        {card.title}
                      </h3>

                      <p className="mt-3 text-sm leading-relaxed text-slate-500 transition-colors duration-300 group-hover:text-white/75">
                        {card.description}
                      </p>
                    </div>

                    <div className="mt-7 flex items-center gap-1 border-t border-slate-100 pt-4 text-xs font-bold text-slate-600 transition-colors duration-300 group-hover:border-white/10 group-hover:text-[#4ade80]">
                      <span>{card.cta}</span>
                      <ChevronRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background py-14 md:py-20">
        <div className="container mx-auto px-6 lg:px-12">
          <ScrollReveal className="mb-10 max-w-3xl">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-primary">
              Identidad institucional
            </p>
            <h2 className="text-3xl font-extrabold leading-tight text-corporate md:text-5xl">
              Nuestro propósito orienta cada oportunidad
            </h2>
          </ScrollReveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {institutionalPillars.map((pillar, index) => (
              <ScrollReveal
                key={pillar.title}
                delay={index * 0.08}
                className="h-full"
              >
                <div className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-border/80 bg-card shadow-sm transition-all duration-300  hover:shadow-corporate">
                  <div className="relative h-44 w-full overflow-hidden bg-muted sm:h-48 md:h-52">
                    <img
                      src={pillar.image}
                      alt={pillar.title}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="relative z-10 -mt-7 ml-6 icon-badge icon-badge-lg icon-badge-solid shadow-md transition-transform duration-300">
                    <pillar.icon className="h-7 w-7" />
                  </div>

                  <div className="relative z-10 flex flex-1 flex-col justify-between p-6 pt-4">
                    <div>
                      <h3 className="text-2xl font-extrabold text-corporate">
                        {pillar.title}
                      </h3>
                      {pillar.text && (
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                          {pillar.text}
                        </p>
                      )}
                      {pillar.items && (
                        <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-muted-foreground">
                          {pillar.items.map((item) => (
                            <li key={item} className="flex items-start gap-2.5">
                              <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                <Check className="h-2.5 w-2.5 stroke-[3]" />
                              </div>
                              <span className="leading-snug">{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    <div className="mt-6 h-1.5 w-12 rounded-full bg-primary" />
                  </div>

                  <div className="pointer-events-none absolute -bottom-8 -right-8 h-32 w-32 rounded-tl-[80px] bg-gradient-to-tl from-primary/10 via-primary/5 to-transparent" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;

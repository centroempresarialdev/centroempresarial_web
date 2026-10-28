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
import { audiences, executiveServices, partners } from "@/data/site";
import aboutImage from "@/assets/hero/about-nosotros.jpg";
import heroTrainingImage from "@/assets/galeria/2025 (4).jpg";
import heroCommunityImage from "@/assets/galeria/2026.jpg";
import misionImage from "@/assets/hero/identidad-mision.jpg";
import visionImage from "@/assets/hero/identidad-vision.jpg";
import objetivosImage from "@/assets/hero/identidad-objetivos.jpg";
import valoresImage from "@/assets/hero/identidad-valores.jpg";
import internshipImage from "@/assets/hero/practicas-administracion.jpg";
import {
  ArrowRight,
  Briefcase,
  Check,
  Eye,
  Handshake,
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

const partnerLogoTrack = [...partners, ...partners];

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

      <section className="relative overflow-hidden bg-gradient-to-br from-muted via-background to-muted py-14 md:py-20">
        <div className="pointer-events-none absolute -right-24 -top-24 h-[600px] w-[600px] rounded-full bg-primary/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-[500px] w-[500px] rounded-full bg-accent/12 blur-3xl" />
        <div className="container relative z-10 mx-auto px-6 lg:px-12">
          <ScrollReveal className="mx-auto mb-12 max-w-3xl text-center">
            <div className="mx-auto mb-4 icon-badge icon-badge-lg icon-badge-accent">
              <Zap className="h-6 w-6" />
            </div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-primary">
              ¿Quiénes somos?
            </p>
            <h2 className="text-3xl font-extrabold leading-tight text-corporate md:text-5xl">
              Conectamos personas y empresas con oportunidades reales
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              Centro Empresarial es una organización con más de 12 años en Ica
              articulando capacitación, asesoría, alianzas estratégicas y
              eventos para estudiantes, profesionales, instituciones públicas y empresas privadas que buscan
              crecer.
            </p>
          </ScrollReveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {executiveServices.map((service, index) => (
              <ScrollReveal key={service.label} delay={index * 0.07}>
                <Link
                  to={service.href}
                  className="group relative flex flex-col items-center overflow-hidden rounded-xl border border-border bg-card p-8 text-center shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-corporate cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-dark to-primary opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative z-10 mb-5 icon-badge icon-badge-lg transition-all duration-500 group-hover:bg-white/20 group-hover:text-white group-hover:ring-white/20 group-hover:scale-110">
                    <service.icon className="h-7 w-7" />
                  </div>
                  <h3 className="relative z-10 text-lg font-bold text-corporate transition-colors duration-500 group-hover:text-white">
                    {service.label}
                  </h3>
                </Link>
              </ScrollReveal>
            ))}
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
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
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

      <section className="bg-primary py-14 text-primary-foreground md:py-20">
        <ScrollReveal className="container mx-auto px-6 text-center lg:px-12">
          <Handshake className="mx-auto mb-5 h-10 w-10 text-accent" />
          <h2 className="mx-auto max-w-3xl text-3xl font-extrabold text-white md:text-5xl">
            Aliados con beneficios concretos para asociados
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/78">
            Revisa que aporta cada convenio y solicita orientacion para elegir
            la membresia que mejor encaja con tu perfil.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild variant="accent" size="lg">
              <Link to="/contacto">Activar mi membresia</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white/30 bg-white/10 text-white hover:bg-white hover:text-primary"
            >
              <Link to="/aliados">
                <Handshake className="h-5 w-5" />
                Ver aliados
              </Link>
            </Button>
          </div>
          <div className="logo-marquee mt-12">
            <div className="logo-marquee-track">
              {partnerLogoTrack.map((partner, index) => (
                <div
                  key={`${partner.name}-${index}`}
                  className="flex h-28 w-56 sm:h-32 sm:w-64 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white p-3 sm:p-4 shadow-md border border-white/20 transition-all duration-300 hover:scale-105"
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full max-h-20 sm:max-h-24 max-w-[88%] object-contain"
                    style={{
                      transform: partner.logoScale
                        ? `scale(${partner.logoScale})`
                        : undefined,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      <section className="bg-background py-14 md:py-20">
        <div className="container mx-auto grid gap-12 px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:px-12">
          <ScrollReveal
            direction="left"
            className="overflow-hidden rounded-lg shadow-elevated"
          >
            <img
              src={aboutImage}
              alt="Equipo de Centro Empresarial"
              loading="lazy"
              decoding="async"
              className="h-72 w-full object-cover sm:h-96 lg:h-[440px]"
              data-gsap-image
            />
          </ScrollReveal>
          <ScrollReveal direction="right">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-primary">
              Experiencia por perfil
            </p>
            <h2 className="text-3xl font-extrabold leading-tight text-corporate md:text-5xl">
              Una comunidad pensada para decidir y actuar
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              La propuesta ordena los beneficios por tipo de interesado y
              convierte la navegacion en una ruta de decision clara: conocer,
              comparar, consultar y asociarse.
            </p>
            <div className="mt-8 grid gap-4">
              {audiences.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-4 rounded-lg border border-border bg-background p-5 shadow-sm"
                >
                  <div className="icon-badge icon-badge-lg icon-badge-accent">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-corporate">
                      {item.label}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Seccion de Llamado a la Accion (CTA) - Practicas Preprofesionales */}
      <section className="relative overflow-hidden border-t border-border/40 bg-gradient-to-b from-background via-muted/30 to-muted/60 py-16 md:py-24">
        <div className="container relative z-10 mx-auto px-6 lg:px-12">
          <ScrollReveal direction="up">
            <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-white/15 bg-gradient-hero p-8 text-white shadow-elevated md:p-12 lg:p-14">
              {/* Halos luminosos de ambientacion */}
              <div
                className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-accent/20 blur-3xl"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-primary-light/35 blur-3xl"
                aria-hidden="true"
              />

              <div className="relative z-10 grid items-center gap-10 lg:grid-cols-12">
                {/* Columna de Contenido */}
                <div className="flex flex-col items-center text-center lg:col-span-7 lg:items-start lg:text-left">
                  <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/15 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-accent backdrop-blur-sm">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                    </span>
                    <Briefcase className="h-3.5 w-3.5" />
                    Convocatoria Abierta
                  </div>

                  <h2 className="mt-5 text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl">
                    ¿Listo para iniciar tu carrera?
                  </h2>

                  <p className="mt-4 text-base font-medium leading-relaxed text-white/90 sm:text-lg md:text-xl">
                    Postula a nuestras prácticas preprofesionales de Administración
                  </p>

                  <ul className="mt-6 space-y-2.5 text-left text-sm text-white/85">
                    <li className="flex items-center gap-2.5">
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/25 text-accent">
                        <Check className="h-3.5 w-3.5 stroke-[3]" />
                      </div>
                      <span>Experiencia práctica en gestión corporativa y proyectos reales</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/25 text-accent">
                        <Check className="h-3.5 w-3.5 stroke-[3]" />
                      </div>
                      <span>Acompañamiento, mentoría continua y desarrollo profesional</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/25 text-accent">
                        <Check className="h-3.5 w-3.5 stroke-[3]" />
                      </div>
                      <span>Certificación institucional emitida por Centro Empresarial</span>
                    </li>
                  </ul>

                  <div className="mt-8 flex w-full flex-col items-center justify-center lg:items-start">
                    <Button
                      asChild
                      size="lg"
                      className="group relative h-14 rounded-full bg-accent px-9 text-base font-extrabold text-accent-foreground shadow-[0_10px_25px_-5px_rgba(234,179,8,0.5)] transition-all duration-300 hover:scale-105 hover:bg-accent-light hover:shadow-[0_14px_30px_-5px_rgba(234,179,8,0.65)] active:scale-95"
                    >
                      <a
                        href="https://forms.gle/MVS6qZ5w45SNSvca9"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3"
                      >
                        <span>Postular Aquí</span>
                        <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                      </a>
                    </Button>
                    <span className="mt-2.5 text-xs text-white/70">
                      Cupos limitados • Proceso de postulación activo
                    </span>
                  </div>
                </div>

                {/* Columna Visual / Imagen Corporativa */}
                <div className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
                  <div className="relative overflow-hidden rounded-2xl border-2 border-white/20 shadow-2xl transition-transform duration-500 hover:scale-[1.02]">
                    <img
                      src={internshipImage}
                      alt="Prácticas preprofesionales en Administración - Centro Empresarial"
                      loading="lazy"
                      decoding="async"
                      className="h-72 w-full object-cover sm:h-80 md:h-96 lg:h-[400px]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Badge flotante sobre la foto */}
                    <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/20 bg-black/45 p-3.5 backdrop-blur-md">
                      <div className="flex items-center justify-between text-xs font-semibold text-white">
                        <span className="flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-emerald-400" />
                          Área de Administración
                        </span>
                        <span className="font-bold text-accent">Ica, Perú</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
};

export default Index;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, type CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import ScrollReveal from "@/components/ScrollReveal";
import { audiences, eventHighlights, executiveServices, partners } from "@/data/site";
import aboutImage from "@/assets/hero/about-nosotros.jpg";
import heroTrainingImage from "@/assets/galeria/2025 (4).jpg";
import heroCommunityImage from "@/assets/galeria/2026.jpg";
import { ArrowRight, CalendarDays, Eye, Handshake, ListChecks, Target, Zap } from "lucide-react";

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
    icon: Target,
    title: "Misión",
    text: "Impulsar el crecimiento de estudiantes, profesionales y empresas mediante capacitación, asesoría, alianzas estratégicas y espacios de conexión que generen oportunidades reales.",
  },
  {
    icon: Eye,
    title: "Visión",
    text: "Ser el centro empresarial referente de Ica y del Perú, reconocido por articular una comunidad innovadora, colaborativa y competitiva.",
  },
  {
    icon: ListChecks,
    title: "Objetivos",
    items: [
      "Fortalecer capacidades mediante formación y asesoría.",
      "Conectar a los miembros con aliados y oportunidades.",
      "Facilitar herramientas, tecnología y acompañamiento para su desarrollo.",
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
        <Carousel setApi={setHeroApi} opts={{ align: "start", loop: true }} className="relative w-full overflow-hidden">
          <CarouselContent className="ml-0">
            {heroSlides.map((slide) => (
              <CarouselItem key={slide.title} className="pl-0">
                <div className="relative min-h-[660px] overflow-hidden sm:min-h-[720px] md:min-h-[800px]">
                  <img src={slide.image} alt={slide.title} className="absolute inset-0 h-[108%] w-full object-cover" data-gsap-parallax />
                  <div className="absolute inset-0 bg-foreground/55 md:bg-gradient-to-r md:from-foreground md:via-foreground/88 md:to-primary/38" />
                  <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-background to-transparent" />

                  <div className="container relative z-10 mx-auto flex min-h-[660px] items-center px-5 pb-16 pt-24 sm:min-h-[720px] sm:px-6 sm:pb-20 sm:pt-28 md:min-h-[800px] md:pt-32 lg:px-12">
                    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
                      <p className="mb-4 text-xs font-bold uppercase leading-5 tracking-[0.18em] text-accent sm:mb-5 sm:text-sm sm:tracking-[0.24em]">{slide.eyebrow}</p>
                      <h1 className="text-[2.15rem] font-extrabold leading-[1.12] text-white sm:text-5xl md:text-6xl lg:text-7xl">{slide.title}</h1>
                      <Button asChild size="lg" variant="accent" className="mt-7 w-full text-base sm:mt-8 sm:w-auto">
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
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 text-accent">
              <Zap className="h-6 w-6" />
            </div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-primary">¿Quiénes somos?</p>
            <h2 className="text-3xl font-extrabold leading-tight text-corporate md:text-5xl">Conectamos personas y empresas con oportunidades reales</h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              Centro Empresarial es una organización con más de 12 años en Ica articulando capacitación, asesoría, alianzas estratégicas y eventos para estudiantes, profesionales y empresas que buscan crecer.
            </p>
          </ScrollReveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {executiveServices.map((service, index) => (
              <ScrollReveal key={service.label} delay={index * 0.07}>
                <div className="group relative flex flex-col items-center overflow-hidden rounded-xl border border-border bg-card p-8 text-center shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-corporate">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-dark to-primary opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative z-10 mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-500 group-hover:bg-white/20 group-hover:text-white group-hover:scale-110">
                    <service.icon className="h-7 w-7" />
                  </div>
                  <h3 className="relative z-10 text-lg font-bold text-corporate transition-colors duration-500 group-hover:text-white">{service.label}</h3>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-14 md:py-20">
        <div className="container mx-auto px-6 lg:px-12">
          <ScrollReveal className="mb-10 max-w-3xl">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-primary">Identidad institucional</p>
            <h2 className="text-3xl font-extrabold leading-tight text-corporate md:text-5xl">Nuestro propósito orienta cada oportunidad</h2>
          </ScrollReveal>

          <div className="grid gap-6 lg:grid-cols-3">
            {institutionalPillars.map((pillar, index) => (
              <ScrollReveal key={pillar.title} delay={index * 0.08}>
                <Card className="h-full border-border/80 bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-corporate">
                  <CardContent className="p-6 md:p-7">
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-md bg-primary text-primary-foreground">
                      <pillar.icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <h3 className="text-2xl font-extrabold text-corporate">{pillar.title}</h3>
                    {pillar.text && <p className="mt-4 text-base leading-7 text-muted-foreground">{pillar.text}</p>}
                    {pillar.items && (
                      <ul className="mt-4 space-y-3 text-base leading-7 text-muted-foreground">
                        {pillar.items.map((item) => (
                          <li key={item} className="flex gap-3">
                            <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/35 py-14 md:py-20">
        <div className="container mx-auto px-6 lg:px-12">
          <ScrollReveal className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-primary">Eventos proximos</p>
              <h2 className="text-3xl font-extrabold leading-tight text-corporate md:text-5xl">Actividad real para ver la comunidad en movimiento</h2>
            </div>
            <Button asChild variant="corporate">
              <Link to="/eventos">
                Ver eventos
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </ScrollReveal>

          <div className="grid gap-6 lg:grid-cols-2">
            {eventHighlights.map((event, index) => (
              <ScrollReveal key={event.title} delay={index * 0.08}>
                <Card className="overflow-hidden border-border/80 bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-corporate">
                  <CardContent className="p-0">
                    <div className="bg-white p-3">
                      <img src={event.src} alt={event.title} className="mx-auto max-h-[520px] w-full object-contain" />
                    </div>
                    <div className="flex items-center justify-between gap-4 border-t border-border p-5">
                      <div>
                        <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-accent">{event.label}</p>
                        <h3 className="mt-2 text-xl font-extrabold text-corporate">{event.title}</h3>
                      </div>
                      <CalendarDays className="h-7 w-7 shrink-0 text-primary" />
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary py-14 text-primary-foreground md:py-20">
        <ScrollReveal className="container mx-auto px-6 text-center lg:px-12">
          <Handshake className="mx-auto mb-5 h-10 w-10 text-accent" />
          <h2 className="mx-auto max-w-3xl text-3xl font-extrabold text-white md:text-5xl">Aliados con beneficios concretos para asociados</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/78">
            Revisa que aporta cada convenio y solicita orientacion para elegir la membresia que mejor encaja con tu perfil.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild variant="accent" size="lg">
              <Link to="/contacto">Activar mi membresia</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white/30 bg-white/10 text-white hover:bg-white hover:text-primary">
              <Link to="/aliados">
                <Handshake className="h-5 w-5" />
                Ver aliados
              </Link>
            </Button>
          </div>
          <div className="logo-marquee mt-12">
            <div className="logo-marquee-track">
              {partnerLogoTrack.map((partner, index) => (
                <div key={`${partner.name}-${index}`} className="flex h-28 w-64 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-white/15 bg-white p-4 shadow-sm">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-20 w-full object-contain"
                    style={{ transform: `scale(${partner.logoScale})` }}
                  />
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      <section className="bg-background py-14 md:py-20">
        <div className="container mx-auto grid gap-12 px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:px-12">
          <ScrollReveal direction="left" className="overflow-hidden rounded-lg shadow-elevated">
            <img src={aboutImage} alt="Equipo de Centro Empresarial" className="h-72 w-full object-cover sm:h-96 lg:h-[440px]" data-gsap-image />
          </ScrollReveal>
          <ScrollReveal direction="right">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-primary">Experiencia por perfil</p>
            <h2 className="text-3xl font-extrabold leading-tight text-corporate md:text-5xl">Una comunidad pensada para decidir y actuar</h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              La propuesta ordena los beneficios por tipo de interesado y convierte la navegacion en una ruta de decision clara: conocer, comparar, consultar y asociarse.
            </p>
            <div className="mt-8 grid gap-4">
              {audiences.map((item) => (
                <div key={item.label} className="flex items-center gap-4 rounded-lg border border-border bg-background p-5 shadow-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-accent/15 text-accent">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-corporate">{item.label}</h3>
                    <p className="text-sm text-muted-foreground">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

    </>
  );
};

export default Index;

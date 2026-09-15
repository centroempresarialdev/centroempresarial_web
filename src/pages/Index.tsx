import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, type CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import ScrollReveal from "@/components/ScrollReveal";
import { audiences, eventHighlights, partners } from "@/data/site";
import aboutImage from "@/assets/hero/about-nosotros.jpg";
import heroTrainingImage from "@/assets/2025 (4).jpg";
import heroCommunityImage from "@/assets/2026.jpg";
import { ArrowRight, CalendarDays, Eye, Handshake, ListChecks, Target } from "lucide-react";

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
      <section className="relative overflow-hidden bg-foreground pt-24 text-white md:pt-36">
        <Carousel setApi={setHeroApi} opts={{ align: "start", loop: true }} className="relative">
          <CarouselContent className="ml-0">
            {heroSlides.map((slide) => (
              <CarouselItem key={slide.title} className="pl-0">
                <div className="relative min-h-[660px] overflow-hidden">
                  <img src={slide.image} alt={slide.title} className="absolute inset-0 h-[108%] w-full object-cover" data-gsap-parallax />
                  <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/88 to-primary/38" />
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background to-transparent" />

                  <div className="container relative z-10 mx-auto flex min-h-[660px] items-center px-6 py-16 lg:px-12">
                    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
                      <p className="mb-5 text-sm font-bold uppercase tracking-[0.24em] text-accent">{slide.eyebrow}</p>
                      <h1 className="text-4xl font-extrabold leading-tight text-white md:text-6xl lg:text-7xl">{slide.title}</h1>
                      <Button asChild size="lg" variant="accent" className="mt-8 text-base">
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

          <div className="pointer-events-none absolute inset-x-0 bottom-10 z-20">
            <div className="container mx-auto flex items-center justify-between gap-4 px-6 lg:px-12">
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

      <section className="bg-background py-20">
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

      <section className="bg-muted/35 py-20">
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

      <section className="bg-primary py-20 text-primary-foreground">
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

      <section className="bg-background py-20">
        <div className="container mx-auto grid gap-12 px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:px-12">
          <ScrollReveal direction="left" className="overflow-hidden rounded-lg shadow-elevated">
            <img src={aboutImage} alt="Equipo de Centro Empresarial" className="h-[440px] w-full object-cover" data-gsap-image />
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

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, type CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import ScrollReveal from "@/components/ScrollReveal";
import { audiences, eventHighlights, membershipPlans, partners } from "@/data/site";
import aboutImage from "@/assets/hero/about-nosotros.jpg";
import heroBusinessImage from "@/assets/hero/hero-business-network.png";
import consultingBenefitsImage from "@/assets/hero/consulting-benefits.png";
import { ArrowRight, CalendarDays, CheckCircle2, Handshake, Percent, Star } from "lucide-react";

const heroSlides = [
  {
    image: heroBusinessImage,
    eyebrow: "Membresias empresariales",
    title: "Beneficios, eventos y aliados en una sola membresia",
    cta: "Quiero asociarme",
    href: "/contacto",
  },
  {
    image: consultingBenefitsImage,
    eyebrow: "Red de valor",
    title: "Activa oportunidades segun tu perfil",
    cta: "Comparar planes",
    href: "/membresias",
  },
];

const valueHighlights = [
  { icon: Percent, title: "Descuentos en formacion", text: "Capacitaciones, programas y recursos con condiciones preferenciales." },
  { icon: CalendarDays, title: "Eventos especializados", text: "Espacios presenciales y webinars para actualizarte y conectar." },
  { icon: Handshake, title: "Aliados estrategicos", text: "Convenios que suman oportunidades academicas, comerciales e institucionales." },
];

const trustSignals = [
  {
    title: "Actividad visible",
    text: "Eventos, capacitaciones y encuentros que muestran una comunidad en movimiento.",
  },
  {
    title: "Red de aliados",
    text: "Convenios con beneficios concretos para quienes activan su membresia.",
  },
  {
    title: "Decision guiada",
    text: "Atencion directa para elegir el plan correcto y resolver dudas por WhatsApp.",
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
      <section className="relative overflow-hidden bg-foreground pt-24 text-white md:pt-32">
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
          <ScrollReveal className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-primary">Beneficios de asociarte</p>
              <h2 className="max-w-3xl text-3xl font-extrabold leading-tight text-corporate md:text-5xl">Impulsa tu crecimiento con una red activa</h2>
            </div>
            <Button asChild variant="corporate">
              <Link to="/contacto">
                Quiero asociarme
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </ScrollReveal>

          <ScrollReveal className="grid overflow-hidden rounded-lg border border-border bg-muted/30 shadow-elevated lg:grid-cols-[1.08fr_0.92fr]">
            <div className="relative min-h-[430px]">
              <img src={consultingBenefitsImage} alt="Asesoria empresarial" className="absolute inset-0 h-full w-full object-cover" data-gsap-image />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-foreground/12" />
            </div>

            <div className="flex flex-col justify-center p-6 md:p-10">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Valor para asociados</p>
              <h3 className="mt-3 text-3xl font-extrabold leading-tight text-corporate md:text-4xl">
                Formacion, eventos y aliados para avanzar con respaldo
              </h3>

              <div className="mt-8 grid gap-4">
                {valueHighlights.map((item) => (
                  <div key={item.title} className="flex items-center gap-4 rounded-md border border-border bg-background p-4 shadow-sm">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-extrabold text-corporate">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button asChild variant="accent" size="lg" className="mt-8 w-fit">
                <Link to="/contacto">
                  Hablar con asesor
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-muted/35 py-20">
        <div className="container mx-auto px-6 lg:px-12">
          <ScrollReveal className="mb-10 grid items-end gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-primary">Ruta comercial</p>
              <h2 className="text-3xl font-extrabold leading-tight text-corporate md:text-5xl">Elige tu membresia anual</h2>
            </div>
            <p className="text-lg leading-8 text-muted-foreground">
              Tres categorias claras para estudiantes, profesionales y empresas, con beneficios distintos segun cada necesidad.
            </p>
          </ScrollReveal>

          <div className="grid gap-6 lg:grid-cols-3">
            {membershipPlans.map((plan, index) => (
              <ScrollReveal key={plan.name} delay={index * 0.08}>
                <Card className={`group h-full overflow-hidden border-border bg-background shadow-sm transition-all hover:-translate-y-2 hover:shadow-elevated ${plan.featured ? "ring-2 ring-accent" : ""}`}>
                  <div className={`h-2 ${plan.featured ? "bg-accent" : "bg-primary"}`} />
                  <CardContent className="flex h-full flex-col p-6">
                    <div className="mb-6 flex items-center justify-between gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-corporate transition-colors group-hover:bg-accent">
                        <plan.icon className="h-7 w-7" />
                      </div>
                      <span className={`rounded-full px-3 py-1 text-xs font-extrabold uppercase tracking-wide ${plan.featured ? "bg-accent/15 text-accent" : "bg-muted text-muted-foreground"}`}>
                        {plan.featured ? "Mas solicitado" : "Anual"}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-2xl font-extrabold text-corporate">{plan.name}</h3>
                      <div className="mt-5 flex items-end gap-2">
                        <p className="text-5xl font-extrabold text-corporate">{plan.price}</p>
                        <p className="pb-2 text-sm text-muted-foreground">/{plan.period}</p>
                      </div>
                    </div>

                    <p className="mt-5 text-sm leading-6 text-muted-foreground">{plan.audience}</p>

                    <div className="mt-5 space-y-3">
                      {plan.benefits.slice(0, 2).map((benefit) => (
                        <div key={benefit} className="flex gap-3 text-sm leading-6">
                          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>

                    <Button asChild variant={plan.featured ? "accent" : "corporate"} className="mt-8 w-full">
                      <Link to="/membresias">
                        Ver detalle del plan
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
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

      <section className="bg-background py-20">
        <div className="container mx-auto px-6 lg:px-12">
          <ScrollReveal className="mx-auto mb-10 max-w-3xl text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-primary">Confianza para decidir</p>
            <h2 className="text-3xl font-extrabold leading-tight text-corporate md:text-5xl">Una propuesta respaldada por actividad real</h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              Antes de asociarse, el usuario necesita ver evidencia: eventos activos, aliados visibles y un camino claro para empezar.
            </p>
          </ScrollReveal>

          <div className="grid gap-5 md:grid-cols-3">
            {trustSignals.map((item, index) => (
              <ScrollReveal key={item.title} delay={index * 0.08}>
                <Card className="h-full border-border/80 bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-corporate">
                  <CardContent className="p-6">
                    <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-md bg-primary text-primary-foreground">
                      <Star className="h-5 w-5" />
                    </div>
                    <h3 className="text-xl font-extrabold text-corporate">{item.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.text}</p>
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
                <div key={`${partner.name}-${index}`} className="flex h-28 w-64 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-white p-4 shadow-sm">
                  <img src={partner.logo} alt={partner.name} className="max-h-20 max-w-full object-contain" />
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
};

export default Index;

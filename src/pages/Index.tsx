import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, type CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import ScrollReveal from "@/components/ScrollReveal";
import { audiences, membershipPlans, partners } from "@/data/site";
import aboutImage from "@/assets/hero/about-nosotros.jpg";
import heroBusinessImage from "@/assets/hero/hero-business-network.png";
import consultingBenefitsImage from "@/assets/hero/consulting-benefits.png";
import { ArrowRight, CheckCircle2, Handshake, MessageCircle } from "lucide-react";

const heroSlides = [
  {
    image: heroBusinessImage,
    eyebrow: "Centro Empresarial",
    title: "Crecimiento empresarial con respaldo y conexiones reales",
    cta: "Solicitar asesoria",
    href: "/contacto",
  },
  {
    image: consultingBenefitsImage,
    eyebrow: "Membresias",
    title: "Activa beneficios para tu perfil o empresa",
    cta: "Ver membresias",
    href: "/membresias",
  },
];

const valueHighlights = [
  { title: "Red de aliados", text: "Convenios y oportunidades." },
  { title: "Formacion continua", text: "Cursos y eventos utiles." },
  { title: "Asesoria directa", text: "Orientacion para decidir." },
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
      <section className="relative overflow-hidden bg-foreground pt-24 text-white md:pt-32">
        <Carousel setApi={setHeroApi} opts={{ align: "start", loop: true }} className="relative">
          <CarouselContent className="ml-0">
            {heroSlides.map((slide) => (
              <CarouselItem key={slide.title} className="pl-0">
                <div className="relative min-h-[720px] overflow-hidden">
                  <img src={slide.image} alt={slide.title} className="absolute inset-0 h-[112%] w-full object-cover" data-gsap-parallax />
                  <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/88 to-primary/48" />
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background to-transparent" />

                  <div className="container relative z-10 mx-auto flex min-h-[720px] items-center px-6 py-16 lg:px-12">
                    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-4xl">
                      <p className="mb-5 text-sm font-bold uppercase tracking-[0.24em] text-accent">{slide.eyebrow}</p>
                      <h1 className="text-4xl font-extrabold leading-tight text-white md:text-6xl lg:text-7xl">
                        {slide.title}
                      </h1>
                      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <Button asChild size="lg" variant="accent" className="text-base">
                          <Link to={slide.href}>
                            {slide.cta}
                            <ArrowRight className="h-5 w-5" />
                          </Link>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="border-white/30 bg-white/10 text-white hover:bg-white hover:text-primary">
                          <Link to="/membresias">Comparar planes</Link>
                        </Button>
                      </div>
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
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-primary">Por que asociarte</p>
              <h2 className="max-w-3xl text-3xl font-extrabold leading-tight text-corporate md:text-5xl">Beneficios claros, sin vueltas</h2>
            </div>
            <Button asChild variant="corporate">
              <Link to="/contacto">
                Hablar con asesor
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
                Una membresia que abre puertas, contactos y formacion
              </h3>

              <div className="mt-8 grid gap-4">
                {valueHighlights.map((item) => (
                  <div key={item.title} className="flex items-center gap-4 rounded-md border border-border bg-background p-4 shadow-sm">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
                      <CheckCircle2 className="h-5 w-5" />
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
              <h2 className="text-3xl font-extrabold leading-tight text-corporate md:text-5xl">Elige el nivel de relacion que necesita tu crecimiento</h2>
            </div>
            <p className="text-lg leading-8 text-muted-foreground">
              Cada plan muestra valor, inversion y siguiente paso sin obligar al usuario a leer una tabla larga.
            </p>
          </ScrollReveal>

          <div className="grid gap-6 lg:grid-cols-3">
            {membershipPlans.map((plan, index) => (
              <ScrollReveal key={plan.name} delay={index * 0.08}>
                <Card className={`group h-full overflow-hidden border-border bg-background shadow-sm transition-all hover:-translate-y-2 hover:shadow-elevated ${plan.featured ? "ring-2 ring-accent" : ""}`}>
                  <div className={`h-2 ${plan.featured ? "bg-accent" : "bg-primary"}`} />
                  <CardContent className="flex h-full flex-col p-6">
                    <div className="mb-6 flex items-start justify-between gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-corporate transition-colors group-hover:bg-accent">
                        <plan.icon className="h-7 w-7" />
                      </div>
                      {plan.featured && <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-accent">Mas solicitado</span>}
                    </div>

                    <h3 className="text-2xl font-extrabold text-corporate">{plan.name}</h3>
                    <p className="mt-3 min-h-16 text-sm leading-6 text-muted-foreground">{plan.audience}</p>

                    <div className="mt-6 rounded-lg bg-muted/70 p-4">
                      <p className="text-sm font-semibold text-muted-foreground">Inversion anual</p>
                      <div className="mt-1 flex items-end gap-2">
                        <p className="text-4xl font-extrabold text-corporate">{plan.price}</p>
                        <p className="pb-1 text-sm text-muted-foreground">/{plan.period}</p>
                      </div>
                    </div>

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

      <section className="bg-primary py-20 text-primary-foreground">
        <ScrollReveal className="container mx-auto px-6 text-center lg:px-12">
          <Handshake className="mx-auto mb-5 h-10 w-10 text-accent" />
          <h2 className="mx-auto max-w-3xl text-3xl font-extrabold text-white md:text-5xl">Aliados, beneficios y contacto directo en una experiencia mas ejecutiva</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/78">
            Navega por paginas independientes para revisar membresias, beneficios y convenios sin perder el acceso rapido a la solicitud.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild variant="accent" size="lg">
              <Link to="/aliados">Ver aliados</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white/30 bg-white/10 text-white hover:bg-white hover:text-primary">
              <Link to="/contacto">
                <MessageCircle className="h-5 w-5" />
                Iniciar contacto
              </Link>
            </Button>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {partners.map((partner) => (
              <div key={partner.name} className="flex h-28 items-center justify-center rounded-lg border border-white/15 bg-white p-4">
                <img src={partner.logo} alt={partner.name} className="max-h-20 max-w-full object-contain" />
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>
    </>
  );
};

export default Index;

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";
import { partners, contactInfo } from "@/data/site";
import partnerHeroBg from "@/assets/hero/hero-business-network.png";
import { partnersService } from "@/services";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Handshake,
  MessageCircle,
  Network,
  Sparkles,
} from "lucide-react";

const Partners = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);
  const [partnerList, setPartnerList] = useState(partners);

  useEffect(() => {
    partnersService
      .list()
      .then((remote) => {
        if (remote && remote.length > 0) {
          const formatted = remote.map((p) => {
            let benefits: string[] = [];
            try {
              benefits = p.benefits_json ? JSON.parse(p.benefits_json) : [];
            } catch {
              benefits = [];
            }
            return {
              name: p.name,
              logo: p.logo_url,
              logoScale: 1,
              summary: p.summary,
              benefits,
            };
          });
          setPartnerList(formatted);
        }
      })
      .catch((err) => {
        console.warn("Backend partners no disponible, usando locales:", err);
      });
  }, []);

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
        ".partners-hero-lift",
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
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden bg-background">
      {/* ─── HERO SECTION: ALIANZAS ESTRATÉGICAS ─── */}
      <section className="relative w-full min-h-screen min-h-[100dvh] flex flex-col justify-center overflow-hidden bg-gradient-to-br from-[#0c3f30] via-[#105340] to-[#093527] text-white pt-28 pb-12 sm:pt-32 sm:pb-14 md:pt-36 md:pb-16">
        {/* Background photography on right with smooth fade */}
        <div
          ref={heroBgRef}
          className="pointer-events-none absolute inset-0 overflow-hidden will-change-transform"
        >
          <img
            src={partnerHeroBg}
            alt="Red de Aliados Estratégicos"
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
          <div className="max-w-3xl lg:max-w-4xl">
            {/* Pill Badge */}
            <div className="partners-hero-lift inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-accent backdrop-blur-md">
              <Handshake className="h-4 w-4" />
              <span>Alianzas Estratégicas &amp; Convenios</span>
            </div>

            {/* Main Headline */}
            <h1 className="partners-hero-lift mt-5 text-3xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
              Convenios clave que multiplican{" "}
              <span className="relative inline-block text-accent pb-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:rounded-full after:bg-gradient-to-r after:from-accent after:via-accent-light after:to-transparent">
                el valor de pertenecer
              </span>
            </h1>

            {/* Description */}
            <p className="partners-hero-lift mt-5 text-base leading-relaxed text-white/85 sm:text-lg sm:leading-8 max-w-2xl">
              Articulamos con organismos internacionales, gremios, instituciones de salud
              y empresas líderes para ofrecer a nuestra red de asociados beneficios tangibles,
              respaldo institucional y nuevas oportunidades de crecimiento.
            </p>

            {/* Action Buttons */}
            <div className="partners-hero-lift mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
              <Button
                asChild
                size="lg"
                variant="accent"
                className="h-12 px-7 text-sm font-bold shadow-lg shadow-accent/20 transition-all duration-300 hover:scale-105"
              >
                <a
                  href={`https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent(
                    "Hola, deseo información para sumar a mi empresa o institución como aliado estratégico del Centro Empresarial.",
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gap-2.5"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>Sumar mi organización</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 border-white/25 bg-white/10 px-6 text-sm font-semibold text-white backdrop-blur transition-all duration-300 hover:bg-white hover:text-primary-dark"
              >
                <a href="#convenios" className="gap-2">
                  <span>Ver convenios activos</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>

            {/* Bottom 3 Quick Highlights */}
            <div className="partners-hero-lift relative mt-12 pt-6 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-white/30 via-white/15 to-transparent" />
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-white/90">
                <BadgeCheck className="h-4 w-4 shrink-0 text-accent" />
                <span>Respaldo institucional</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-white/90">
                <Network className="h-4 w-4 shrink-0 text-accent" />
                <span>Red multisectorial</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-white/90">
                <Sparkles className="h-4 w-4 shrink-0 text-accent" />
                <span>Beneficios exclusivos</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── LISTADO DE CONVENIOS ─── */}
      <section id="convenios" className="bg-background py-14 md:py-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {partnerList.map((partner, index) => (
              <ScrollReveal
                key={partner.name}
                delay={index * 0.06}
                className="h-full"
              >
                <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-corporate">
                  <div>
                    {/* Big prominent logo area */}
                    <div
                      className={`relative flex h-80 w-full items-center justify-center overflow-hidden  transition-colors ${
                        partner.darkLogo ? "bg-primary" : "bg-white"
                      }`}
                    >
                      <div
                        className="flex h-full w-full items-center justify-center transition-transform duration-300 group-hover:scale-105"
                        style={{
                          transform: `scale(${partner.logoScale || 1})`,
                        }}
                      >
                        <img
                          src={partner.logo}
                          alt={partner.name}
                          loading="lazy"
                          decoding="async"
                          className="max-h-70 max-w-[100%] object-contain"
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 sm:p-7">
                      <h3 className="text-2xl font-extrabold text-corporate">
                        {partner.name}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {partner.summary}
                      </p>

                      <div className="mt-6 border-t border-border/70 pt-5">
                        <p className="mb-3 text-xs font-bold uppercase tracking-wider text-primary">
                          Beneficios para asociados
                        </p>
                        <ul className="space-y-2.5">
                          {partner.benefits.map((benefit) => (
                            <li
                              key={benefit}
                              className="flex items-start gap-2.5 text-sm leading-snug text-muted-foreground"
                            >
                              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0 sm:p-7 sm:pt-0">
                    <Button asChild variant="accent" className="w-full">
                      <Link to="/contacto">
                        Consultar beneficio
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/30 py-14 md:py-20">
        <div className="container mx-auto px-6 lg:px-12">
          <ScrollReveal className="overflow-hidden rounded-lg bg-gradient-primary p-8 text-primary-foreground shadow-elevated md:p-12">
            <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <Sparkles className="mb-4 h-10 w-10 text-accent" />
                <h2 className="text-3xl font-bold text-white md:text-4xl">
                  Quieres aprovechar estos beneficios?
                </h2>
                <p className="mt-3 max-w-2xl text-white/80">
                  Activa tu membresia y recibe orientacion directa sobre los
                  beneficios disponibles con nuestra red de aliados.
                </p>
              </div>
              <Button asChild variant="accent" size="lg">
                <Link to="/contacto">
                  Iniciar inscripcion
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default Partners;

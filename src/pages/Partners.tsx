import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";
import { partners } from "@/data/site";
import { partnersService } from "@/services";
import partnersHeroBg from "@/assets/hero/partners-hero-alliance.jpg";
import { ArrowRight, CheckCircle2, Handshake, Sparkles } from "lucide-react";

const Partners = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);
  const [partnerList, setPartnerList] = useState(partners);
  const partnerLogoTrack = [...partnerList, ...partnerList];

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
      if (heroBgRef.current) {
        gsap.fromTo(
          heroBgRef.current,
          { opacity: 0, scale: 1.1 },
          { opacity: 1, scale: 1, duration: 1.8, ease: "sine.out" },
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden bg-background"
    >
      <section className="relative w-full min-h-screen min-h-[100dvh] flex flex-col justify-center overflow-hidden bg-gradient-to-br from-[#0c3f30] via-[#105340] to-[#093527] pt-28 pb-14 text-primary-foreground sm:pt-32 md:pt-36 md:pb-20">
        {/* Full-width background photography with uniform transparency */}
        <div
          ref={heroBgRef}
          className="pointer-events-none absolute inset-0 overflow-hidden will-change-transform"
        >
          <img
            src={partnersHeroBg}
            alt="Alianzas Estratégicas y Convenios"
            className="h-full w-full object-cover object-center opacity-15"
          />
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

        <ScrollReveal className="container relative z-10 mx-auto px-6 text-center lg:px-12">
          <Handshake className="mx-auto mb-5 h-10 w-10 text-accent" />
          <h2 className="mx-auto max-w-3xl text-3xl font-extrabold leading-[1.22] tracking-normal text-white md:text-5xl">
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
              <a href="#convenios">
                <Handshake className="h-5 w-5" />
                Ver convenios
              </a>
            </Button>
          </div>
          <div className="logo-marquee mt-12">
            <div className="logo-marquee-track">
              {partnerLogoTrack.map((partner, index) => (
                <div
                  key={`${partner.name}-${index}`}
                  className="flex h-28 w-56 sm:h-32 sm:w-64 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white p-3 sm:p-4 shadow-md border border-white/20"
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
                      className={`relative flex h-80 w-full items-center justify-center overflow-hidden transition-colors ${
                        partner.darkLogo ? "bg-primary" : "bg-white"
                      }`}
                    >
                      <div
                        className="flex h-full w-full items-center justify-center"
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

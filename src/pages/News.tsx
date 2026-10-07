import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { contactInfo } from "@/data/site";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  FileText,
  Lightbulb,
  Maximize2,
  MessageCircle,
  Newspaper,
  Sparkles,
  TrendingUp,
  X,
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import newsHeroBg from "@/assets/hero/news-hero-press.jpg";
import { newsService } from "@/services";

import flyer1 from "@/assets/flayers-Noticias empresariales/1.png";
import flyer2 from "@/assets/flayers-Noticias empresariales/2.png";
import flyer3 from "@/assets/flayers-Noticias empresariales/3.png";
import flyer4 from "@/assets/flayers-Noticias empresariales/4.png";
import flyerInnovation from "@/assets/flayers-Noticias empresariales/Corporate_flyer_for_business_inn…_2K_20260929112835.jpg";
import flyerGnv from "@/assets/flayers-Noticias empresariales/Invitación Foro GNV Ica 2026_page-0001.jpg";

interface NewsFlyer {
  id: number;
  image: string;
  category: string;
  tag: string;
  title: string;
  description: string;
  date: string;
  whatsappMessage: string;
}

const flyers: NewsFlyer[] = [
  {
    id: 1,
    image: flyerInnovation,
    category: "Innovación & Emprendimiento",
    tag: "Centro Empresarial",
    title: "Concursos Regionales de Innovación — Edición 2",
    description:
      "Sesión del Grupo Impulsor para coordinar y desplegar los Concursos Regionales de Innovación en su segunda edición vía Microsoft Teams.",
    date: "Lunes 28 de Septiembre | 4:00 p.m.",
    whatsappMessage:
      "Hola, deseo más información sobre los Concursos Regionales de Innovación Edición 2.",
  },
  {
    id: 2,
    image: flyerGnv,
    category: "Foro Empresarial & Sostenibilidad",
    tag: "Contugas & CIP Ica",
    title: "Foro GNV Ica 2026 — Movilidad Sostenible y Competitiva",
    description:
      "Encuentro especializado en movilidad a Gas Natural Vehicular para la industria y agroindustria de Ica. Jornada presencial con cupos limitados en el Colegio de Ingenieros del Perú - CD Ica.",
    date: "Miércoles 30 de Setiembre | Presencial",
    whatsappMessage:
      "Hola, deseo inscribirme en el Foro GNV Ica 2026 sobre movilidad a Gas Natural.",
  },
  {
    id: 3,
    image: flyer1,
    category: "Evento Académico",
    tag: "Cámara de Comercio de Ica",
    title: "II Encuentro Académico a otro nivel",
    description:
      "Panel destacado: CEO sin filtro. Incluye certificado gratuito y box estudiantil de regalo en Restaurante Lagunilla, Ica.",
    date: "25 de Septiembre | 3:00 p.m.",
    whatsappMessage:
      "Hola, deseo más información sobre el II Encuentro Académico a otro nivel.",
  },
  {
    id: 4,
    image: flyer2,
    category: "Networking & Gastronomía",
    tag: "La Caravedo & Portón",
    title: "Cena by Portón — IX Edición 2026",
    description:
      "Experiencia gastronómica exclusiva con el Chef Luciano Saco. Menú degustación de 5 tiempos en Hacienda La Caravedo.",
    date: "26 de Setiembre",
    whatsappMessage:
      "Hola, deseo información sobre la Cena by Portón IX Edición en La Caravedo.",
  },
  {
    id: 5,
    image: flyer3,
    category: "Publicación Institucional",
    tag: "Revista Asociados",
    title: "Revista Empresarial Asociados — N.° 004",
    description:
      "Edición Setiembre 2026: «Nada grande se logra solo». Aportes en la gestión ESG de la agroindustria de Ica y contenido exclusivo.",
    date: "Edición Setiembre 2026",
    whatsappMessage:
      "Hola, deseo acceder a la edición completa de la Revista Empresarial Asociados.",
  },
  {
    id: 6,
    image: flyer4,
    category: "Alianza Estratégica",
    tag: "Equifax & Infocorp",
    title: "Antes de hacer negocios, conoce con quién los haces",
    description:
      "Servicios corporativos de consultas Infocorp y reporte de clientes para toma de decisiones seguras y mitigación de riesgos crediticios.",
    date: "Servicio permanente",
    whatsappMessage:
      "Hola, deseo consultar sobre los servicios de Equifax e Infocorp para empresas.",
  },
];

const News = () => {
  const [selectedFlyer, setSelectedFlyer] = useState<NewsFlyer | null>(null);
  const [flyerList, setFlyerList] = useState<NewsFlyer[]>(flyers);

  useEffect(() => {
    newsService
      .list({ limit: 20 })
      .then((remoteNews) => {
        if (remoteNews && remoteNews.length > 0) {
          const formatted: NewsFlyer[] = remoteNews.map((item) => ({
            id: item.id,
            image: item.flyer_url,
            category: item.category || "Noticia Empresarial",
            tag: item.tag || "Oficial",
            title: item.title,
            description: item.summary,
            date: new Date(item.published_at).toLocaleDateString("es-PE", {
              day: "numeric",
              month: "short",
              year: "numeric",
            }),
            whatsappMessage:
              item.whatsapp_cta_message ||
              `Hola, deseo información sobre la noticia: ${item.title}`,
          }));
          setFlyerList([...formatted, ...flyers]);
        }
      })
      .catch((err) => {
        console.warn("Backend news no disponible, usando afiches locales:", err);
      });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedFlyer(null);
    };
    if (selectedFlyer) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedFlyer]);

  const containerRef = useRef<HTMLDivElement>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);

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
        ".news-hero-lift",
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
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden bg-background"
    >
      {/* ─── HERO: NOTICIAS & COMUNICADOS ─── */}
      <section className="relative w-full min-h-screen min-h-[100dvh] flex flex-col justify-center overflow-hidden bg-gradient-to-br from-[#0c3f30] via-[#105340] to-[#093527] text-white pt-28 pb-12 sm:pt-32 sm:pb-14 md:pt-36 md:pb-16">
        {/* Background photography on right with smooth gradient mask */}
        <div
          ref={heroBgRef}
          className="pointer-events-none absolute inset-0 overflow-hidden will-change-transform"
        >
          <img
            src={newsHeroBg}
            alt="Noticias y Comunicados Oficiales"
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
            <div className="news-hero-lift inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-accent backdrop-blur-md">
              <Newspaper className="h-4 w-4" />
              <span>Noticias &amp; Comunicados</span>
            </div>

            {/* Main Headline */}
            <h1 className="news-hero-lift mt-5 text-3xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
              Información estratégica y{" "}
              <span className="relative inline-block text-accent pb-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:rounded-full after:bg-gradient-to-r after:from-accent after:via-accent-light after:to-transparent">
                actualidad empresarial
              </span>
            </h1>

            {/* Description */}
            <p className="news-hero-lift mt-5 text-base leading-relaxed text-white/85 sm:text-lg sm:leading-8 max-w-2xl">
              Accede a comunicados oficiales, foros de desarrollo económico,
              alianzas y publicaciones clave del ecosistema corporativo en Ica
              y la región.
            </p>

            {/* Action Buttons */}
            <div className="news-hero-lift mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
              <Button
                asChild
                size="lg"
                variant="accent"
                className="h-12 px-7 text-sm font-bold shadow-lg shadow-accent/20 transition-all duration-300 hover:scale-105"
              >
                <a
                  href={`https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent(
                    "Hola, deseo recibir las noticias y comunicados oficiales del Centro Empresarial.",
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gap-2.5"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>Recibir boletín WhatsApp</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 border-white/25 bg-white/10 px-6 text-sm font-semibold text-white backdrop-blur transition-all duration-300 hover:bg-white hover:text-primary-dark"
              >
                <a href="#boletin-afiches" className="gap-2">
                  <span>Ver afiches y noticias</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>

            {/* Bottom 3 Quick Highlights */}
            <div className="news-hero-lift relative mt-12 pt-6 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-white/30 via-white/15 to-transparent" />
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-white/90">
                <FileText className="h-4 w-4 shrink-0 text-accent" />
                <span>Comunicados oficiales</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-white/90">
                <TrendingUp className="h-4 w-4 shrink-0 text-accent" />
                <span>Foros e innovación</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-white/90">
                <Sparkles className="h-4 w-4 shrink-0 text-accent" />
                <span>Publicaciones clave</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FLYERS GRID (2-COLUMN VERTICAL FEED) ─── */}
      <section id="boletin-afiches" className="bg-background py-14 md:py-20">
        <div className="container mx-auto px-6 lg:px-12">
          <ScrollReveal className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-primary">
                Boletín y Comunicados Oficiales
              </p>
              <h2 className="text-3xl font-extrabold text-corporate md:text-5xl">
                Afiches y convocatorias destacadas
              </h2>
            </div>
            <p className="max-w-xl text-muted-foreground">
              Haz clic en cualquier afiche para verlo en alta resolución o
              consultar directamente por WhatsApp con un asesor.
            </p>
          </ScrollReveal>

          {/* 2 per row, vertical stacking */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-10">
            {flyerList.map((flyer, index) => {
              const isLastOdd =
                index === flyerList.length - 1 && flyerList.length % 2 !== 0;

              return (
                <ScrollReveal
                  key={flyer.id}
                  delay={index * 0.07}
                  className={
                    isLastOdd
                      ? "md:col-span-2 md:mx-auto md:max-w-xl w-full"
                      : "w-full"
                  }
                >
                  <div className="group flex h-full flex-col justify-between overflow-hidden rounded-[1.75rem] border border-border/80 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-corporate">
                    {/* Flyer Image Container */}
                    <div
                      className="relative aspect-[4/5] w-full cursor-pointer overflow-hidden bg-muted"
                      onClick={() => setSelectedFlyer(flyer)}
                    >
                      <img
                        src={flyer.image}
                        alt={flyer.title}
                        className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                      />

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-primary-dark/25 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
                        <span className="flex items-center gap-2 rounded-full bg-white/95 px-5 py-2.5 text-xs font-extrabold uppercase tracking-wide text-corporate shadow-xl">
                          <Maximize2 className="h-4 w-4 text-accent" />
                          Ampliar afiche
                        </span>
                      </div>

                      {/* Tag floating badge */}
                      <div className="absolute left-4 top-4 z-10 flex flex-wrap gap-2">
                        <span className="rounded-full bg-primary/95 px-3.5 py-1 text-xs font-bold text-white shadow-md backdrop-blur">
                          {flyer.category}
                        </span>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
                      <div>
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent">
                          <CalendarDays className="h-3.5 w-3.5 text-accent" />
                          <span>{flyer.date}</span>
                        </div>

                        <h3 className="mt-2.5 text-2xl font-extrabold leading-tight text-corporate">
                          {flyer.title}
                        </h3>

                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                          {flyer.description}
                        </p>
                      </div>

                      {/* Buttons */}
                      <div className="mt-6 flex flex-col gap-3 border-t border-border/70 pt-5 sm:flex-row">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setSelectedFlyer(flyer)}
                          className="flex-1 gap-2 border-border/80 hover:bg-muted"
                        >
                          <Maximize2 className="h-4 w-4 text-primary" />
                          Ver completo
                        </Button>
                        <Button
                          asChild
                          variant="accent"
                          className="flex-1 gap-2"
                        >
                          <a
                            href={`https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent(
                              flyer.whatsappMessage,
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <MessageCircle className="h-4 w-4" />
                            Consultar
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section className="bg-muted/30 py-14 md:py-20">
        <div className="container mx-auto px-6 lg:px-12">
          <ScrollReveal className="overflow-hidden rounded-2xl bg-gradient-primary p-8 text-primary-foreground shadow-elevated md:p-12">
            <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <Sparkles className="mb-4 h-10 w-10 text-accent" />
                <h2 className="text-3xl font-extrabold text-white md:text-4xl">
                  ¿Tienes una noticia o evento empresarial para difundir?
                </h2>
                <p className="mt-3 max-w-2xl text-white/80">
                  Forma parte de la red de aliados y asociados del Centro
                  Empresarial y difunde tus actividades ante nuestra comunidad.
                </p>
              </div>
              <Button asChild variant="accent" size="lg">
                <Link to="/contacto">
                  Contactar al Centro
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── FULLSCREEN LIGHTBOX MODAL ─── */}
      {selectedFlyer && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm animate-in fade-in-0 duration-200"
          onClick={() => setSelectedFlyer(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative flex max-h-[94vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-card shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedFlyer(null)}
              className="absolute right-3.5 top-3.5 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur transition-colors hover:bg-black"
              aria-label="Cerrar vista previa"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Scrollable image + details */}
            <div className="overflow-y-auto">
              <div className="bg-muted/40 p-2 sm:p-4">
                <img
                  src={selectedFlyer.image}
                  alt={selectedFlyer.title}
                  className="mx-auto max-h-[68vh] w-auto rounded-lg object-contain shadow-md"
                />
              </div>

              <div className="border-t border-border/80 bg-card p-6">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent">
                  <CalendarDays className="h-3.5 w-3.5 text-accent" />
                  <span>{selectedFlyer.date}</span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground">
                    {selectedFlyer.category}
                  </span>
                </div>

                <h3 className="mt-2 text-2xl font-extrabold text-corporate">
                  {selectedFlyer.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {selectedFlyer.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <Button asChild variant="accent">
                    <a
                      href={`https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent(
                        selectedFlyer.whatsappMessage,
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="gap-2"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Consultar por WhatsApp
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setSelectedFlyer(null)}
                  >
                    Cerrar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default News;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";
import { contactInfo } from "@/data/site";
import {
  ArrowRight,
  CalendarDays,
  Maximize2,
  MessageCircle,
  Newspaper,
  Sparkles,
  X,
} from "lucide-react";

import flyer1 from "@/assets/flayers-Noticias empresariales/1.png";
import flyer2 from "@/assets/flayers-Noticias empresariales/2.png";
import flyer3 from "@/assets/flayers-Noticias empresariales/3.png";
import flyer4 from "@/assets/flayers-Noticias empresariales/4.png";

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
    id: 2,
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
    id: 3,
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
    id: 4,
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

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-dark via-primary to-primary-dark pb-16 pt-36 text-white md:pb-24 md:pt-48">
        <div className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-accent/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-white/10 blur-3xl" />

        <div className="container relative z-10 mx-auto px-6 lg:px-12">
          <ScrollReveal direction="left">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-accent backdrop-blur">
              <Newspaper className="h-4 w-4" />
              Noticias Empresariales
            </div>
            <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight text-white md:text-5xl lg:text-6xl">
              Comunicados, eventos y actualidad de nuestra red
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/85">
              Accede a los comunicados oficiales, convocatorias, convenios y
              actividades desarrolladas por el Centro Empresarial y nuestros
              aliados estratégicos.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button asChild size="lg" variant="accent">
                <a
                  href={`https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent(
                    "Hola, deseo recibir las noticias y comunicados del Centro Empresarial."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gap-2"
                >
                  <MessageCircle className="h-5 w-5" />
                  Recibir boletín por WhatsApp
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/30 bg-white/10 text-white hover:bg-white hover:text-primary"
              >
                <Link to="/contacto" className="gap-2">
                  Contactar
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── FLYERS GRID (2-COLUMN VERTICAL FEED) ─── */}
      <section className="bg-background py-14 md:py-20">
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
            {flyers.map((flyer, index) => {
              const isLastOdd =
                index === flyers.length - 1 && flyers.length % 2 !== 0;

              return (
                <ScrollReveal
                  key={flyer.id}
                  delay={index * 0.07}
                  className={isLastOdd ? "md:col-span-2 md:mx-auto md:max-w-xl w-full" : "w-full"}
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
                        <Button asChild variant="accent" className="flex-1 gap-2">
                          <a
                            href={`https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent(
                              flyer.whatsappMessage
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
                  <span className="text-muted-foreground">{selectedFlyer.category}</span>
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
                        selectedFlyer.whatsappMessage
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
    </>
  );
};

export default News;

import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";
import { contactInfo, eventHighlights } from "@/data/site";
import defaultHeroBg from "@/assets/hero/inner-hero-office.jpg";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  FileText,
  Handshake,
  Image as ImageIcon,
  MessageCircle,
} from "lucide-react";

const galleryModules = import.meta.glob<{ default: string }>(
  "/src/assets/galeria/*.{jpg,jpeg,png,webp}",
  { eager: true },
);

const featuredOrder = [
  "2025 (4).jpg",
  "2026.jpg",
  "16 de septiembre 2025.jpg",
  "2025.jpg",
  "5 de septiembre 2025.jpg",
];

const gallerySlotLabels = [
  "Actividad institucional",
  "Capacitacion aplicada",
  "Convenios y tecnologia",
  "Red de aliados",
];

const galleryImages = Object.entries(galleryModules)
  .filter(([path]) => {
    const filename = decodeURIComponent(path.split("/").pop() ?? "");
    return !filename.toLowerCase().includes("logo");
  })
  .sort(([a], [b]) => {
    const fileA = decodeURIComponent(a.split("/").pop() ?? "");
    const fileB = decodeURIComponent(b.split("/").pop() ?? "");
    const priorityA = featuredOrder.indexOf(fileA);
    const priorityB = featuredOrder.indexOf(fileB);

    if (priorityA !== -1 || priorityB !== -1) {
      return (
        (priorityA === -1 ? 999 : priorityA) -
        (priorityB === -1 ? 999 : priorityB)
      );
    }

    return fileB.localeCompare(fileA, "es", { numeric: true });
  })
  .map(([path, module]) => ({
    src: module.default,
    filename: decodeURIComponent(path.split("/").pop() ?? ""),
  }));

type GalleryCardImage = {
  src: string;
  title: string;
  filename: string;
};

const GalleryTile = ({
  image,
  className,
  delay = 0,
}: {
  image: GalleryCardImage;
  className: string;
  delay?: number;
}) => (
  <ScrollReveal
    delay={delay}
    className={`group relative overflow-hidden rounded-lg border border-border bg-card shadow-sm ${className}`}
  >
    <AnimatePresence initial={false} mode="sync">
      <motion.img
        key={image.src}
        src={image.src}
        alt={image.title}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.9, ease: "easeInOut" }}
        className="absolute inset-0 h-full w-full object-cover"
      />
    </AnimatePresence>
    <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/12 to-transparent opacity-90 transition-opacity group-hover:opacity-100" />
    <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
      <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-md bg-accent text-accent-foreground">
        <ImageIcon className="h-5 w-5" />
      </div>
      <h3 className="text-xl font-extrabold">{image.title}</h3>
      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-white/70">
        Centro Empresarial
      </p>
    </div>
  </ScrollReveal>
);

const Benefits = () => {
  const [galleryIndex, setGalleryIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setGalleryIndex((current) => (current + 1) % galleryImages.length);
    }, 6000);

    return () => window.clearInterval(timer);
  }, []);

  const visibleGalleryImages = useMemo(
    () =>
      gallerySlotLabels.map((title, index) => {
        const image =
          galleryImages[(galleryIndex + index) % galleryImages.length];
        return { ...image, title };
      }),
    [galleryIndex],
  );

  const goToPrevious = () =>
    setGalleryIndex(
      (current) => (current - 1 + galleryImages.length) % galleryImages.length,
    );
  const goToNext = () =>
    setGalleryIndex((current) => (current + 1) % galleryImages.length);

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
        ".events-hero-lift",
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
      {/* ─── HERO: EVENTOS & CONVOCATORIAS ─── */}
      <section className="relative w-full min-h-screen min-h-[100dvh] flex flex-col justify-center overflow-hidden bg-gradient-to-br from-[#0c3f30] via-[#105340] to-[#093527] text-white pt-28 pb-12 sm:pt-32 sm:pb-14 md:pt-36 md:pb-16">
        {/* Background photography on right with smooth gradient mask */}
        <div
          ref={heroBgRef}
          className="pointer-events-none absolute inset-0 overflow-hidden will-change-transform"
        >
          <img
            src={defaultHeroBg}
            alt="Eventos y Convocatorias"
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
            <div className="events-hero-lift inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-accent backdrop-blur-md">
              <CalendarDays className="h-4 w-4" />
              <span>Eventos &amp; Convocatorias</span>
            </div>

            {/* Main Headline */}
            <h1 className="events-hero-lift mt-5 text-3xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
              Comunicados, eventos y{" "}
              <span className="relative inline-block text-accent pb-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:rounded-full after:bg-gradient-to-r after:from-accent after:via-accent-light after:to-transparent">
                actualidad de nuestra red
              </span>
            </h1>

            {/* Description */}
            <p className="events-hero-lift mt-5 text-base leading-relaxed text-white/85 sm:text-lg sm:leading-8 max-w-2xl">
              Accede a convocatorias oficiales, foros especializados y
              alianzas estratégicas diseñadas para potenciar tu desarrollo
              empresarial y profesional.
            </p>

            {/* Action Buttons */}
            <div className="events-hero-lift mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
              <Button
                asChild
                size="lg"
                variant="accent"
                className="h-12 px-7 text-sm font-bold shadow-lg shadow-accent/20 transition-all duration-300 hover:scale-105"
              >
                <a
                  href={`https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent(
                    "Hola, deseo recibir información sobre los próximos eventos y convocatorias.",
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gap-2.5"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>Recibir avisos por WhatsApp</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 border-white/25 bg-white/10 px-6 text-sm font-semibold text-white backdrop-blur transition-all duration-300 hover:bg-white hover:text-primary-dark"
              >
                <a href="#agenda-eventos" className="gap-2">
                  <span>Ver próximos eventos</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>

            {/* Bottom 3 Quick Highlights */}
            <div className="events-hero-lift relative mt-12 pt-6 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-white/30 via-white/15 to-transparent" />
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-white/90">
                <FileText className="h-4 w-4 shrink-0 text-accent" />
                <span>Comunicados oficiales</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-white/90">
                <CalendarDays className="h-4 w-4 shrink-0 text-accent" />
                <span>Eventos &amp; capacitación</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-white/90">
                <Handshake className="h-4 w-4 shrink-0 text-accent" />
                <span>Alianzas &amp; convenios</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="agenda-eventos" className="bg-background py-14 md:py-20">
        <div className="container mx-auto px-6 lg:px-12">
          <ScrollReveal className="mb-10 text-center max-w-3xl mx-auto">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
              Agenda destacada
            </p>
            <h2 className="mt-2 text-3xl font-extrabold leading-tight text-corporate md:text-5xl">
              Próximos eventos
            </h2>
            <p className="mt-3 text-muted-foreground text-base sm:text-lg">
              Revisa los detalles y asegura tu participación en las próximas
              actividades oficiales.
            </p>
          </ScrollReveal>

          <div className="mx-auto grid max-w-3xl grid-cols-1 gap-8">
            {eventHighlights.map((event, index) => (
              <ScrollReveal
                key={event.title}
                delay={index * 0.08}
                className="overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-corporate"
              >
                <div className="bg-white p-3">
                  <img
                    src={event.src}
                    alt={event.title}
                    className="mx-auto max-h-[720px] w-full object-contain"
                  />
                </div>
                <div className="flex flex-col gap-3 border-t border-border bg-background p-5 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm font-bold uppercase tracking-[0.14em] text-primary">
                    {event.label}
                  </p>
                  <Button asChild variant="accent">
                    <Link to="/contacto">
                      Quiero participar
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/30 py-14 md:py-20">
        <div className="container mx-auto px-6 lg:px-12">
          <ScrollReveal className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-primary">
                Galeria institucional
              </p>
              <h2 className="text-3xl font-extrabold text-corporate md:text-5xl">
                Actividad real, comunidad visible
              </h2>
            </div>
            <div className="max-w-xl">
              <p className="text-muted-foreground">
                Registro visual de encuentros, capacitaciones y conexiones que
                fortalecen la experiencia de los asociados.
              </p>
              <div className="mt-5 flex items-center gap-3">
                <button
                  type="button"
                  onClick={goToPrevious}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border bg-background text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                  aria-label="Ver fotos anteriores"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={goToNext}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border bg-background text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                  aria-label="Ver siguientes fotos"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-accent">
                  {galleryImages.length} fotos en rotacion
                </p>
              </div>
            </div>
          </ScrollReveal>

          <div className="grid gap-5 lg:grid-cols-[1.08fr_1fr]">
            <GalleryTile
              image={visibleGalleryImages[0]}
              className="min-h-[430px] lg:min-h-[520px]"
            />
            <div className="grid gap-5 sm:grid-cols-2">
              {visibleGalleryImages.slice(1).map((image, index) => (
                <GalleryTile
                  key={index}
                  image={image}
                  delay={(index + 1) * 0.04}
                  className={`min-h-[230px] ${index === 2 ? "sm:col-span-2" : ""}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Benefits;

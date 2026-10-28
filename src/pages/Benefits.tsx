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
  Maximize2,
  MessageCircle,
  X,
} from "lucide-react";

const galleryModules = import.meta.glob<{ default: string }>(
  "/src/assets/galeria/*.{jpg,jpeg,png,webp}",
  { eager: true },
);

const featuredOrder = [
  "fila-1-columna-1.png",
  "fila-1-columna-2.png",
  "fila-1-columna-3.png",
  "fila-1-columna-4.png",
  "fila-1-columna-5.png",
  "fila-1-columna-6.png",
  "fila-1-columna-7.png",
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

const imageTitles: Record<string, string> = {
  "fila-1-columna-1.png": "Feria Laboral UTP - Stand Centro Empresarial",
  "fila-1-columna-2.png": "Orientación y Empleabilidad UTP",
  "fila-1-columna-3.png": "Networking con Empresas Aliadas",
  "fila-1-columna-4.png": "Presencia Institucional y Convocatorias",
  "fila-1-columna-5.png": "Comunidad Estudiantil y Talento Joven",
  "fila-1-columna-6.png": "Asesoría Profesional Personalizada",
  "fila-1-columna-7.png": "Vinculación y Oportunidades Laborales",
  "2025 (4).jpg": "Participación Institucional en Ferias",
  "2026.jpg": "Capacitación Aplicada y Dinámicas",
  "16 de septiembre 2025.jpg": "Convenios y Alianzas Educativas",
  "2025.jpg": "Talleres y Formación Empresarial",
  "5 de septiembre 2025.jpg": "Encuentros con Profesionales",
};

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
  .map(([path, module]) => {
    const filename = decodeURIComponent(path.split("/").pop() ?? "");
    return {
      src: module.default,
      filename,
      title: imageTitles[filename] || "Actividad institucional",
    };
  });

type GalleryCardImage = {
  src: string;
  title: string;
  filename: string;
};

const GalleryTile = ({
  image,
  className,
  delay = 0,
  onClick,
}: {
  image: GalleryCardImage;
  className: string;
  delay?: number;
  onClick?: () => void;
}) => (
  <ScrollReveal
    delay={delay}
    className={`group relative overflow-hidden rounded-lg border border-border bg-card shadow-sm cursor-pointer ${className}`}
  >
    <div className="h-full w-full" onClick={onClick}>
      <AnimatePresence initial={false} mode="sync">
        <motion.img
          key={image.src}
          src={image.src}
          alt={image.title}
          loading="lazy"
          decoding="async"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent opacity-90 transition-opacity group-hover:opacity-100" />
      <div className="absolute top-4 right-4 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm">
          <Maximize2 className="h-4 w-4" />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
        <div className="mb-3 icon-badge icon-badge-md icon-badge-solid bg-accent text-accent-foreground">
          <ImageIcon className="h-5 w-5" />
        </div>
        <h3 className="text-xl font-extrabold">{image.title}</h3>
        <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-white/70">
          Centro Empresarial
        </p>
      </div>
    </div>
  </ScrollReveal>
);

const Benefits = () => {
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedImage, setSelectedImage] = useState<GalleryCardImage | null>(null);

  useEffect(() => {
    if (isPaused || selectedImage) return;

    const timer = window.setInterval(() => {
      setGalleryIndex((current) => (current + 1) % galleryImages.length);
    }, 6000);

    return () => window.clearInterval(timer);
  }, [isPaused, selectedImage]);

  const visibleGalleryImages = useMemo(
    () =>
      gallerySlotLabels.map((defaultLabel, index) => {
        const image =
          galleryImages[(galleryIndex + index) % galleryImages.length];
        return {
          ...image,
          title: imageTitles[image.filename] || defaultLabel,
        };
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

      <section
        className="bg-muted/30 py-14 md:py-20"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
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
              onClick={() => setSelectedImage(visibleGalleryImages[0])}
            />
            <div className="grid gap-5 sm:grid-cols-2">
              {visibleGalleryImages.slice(1).map((image, index) => (
                <GalleryTile
                  key={index}
                  image={image}
                  delay={(index + 1) * 0.04}
                  className={`min-h-[230px] ${index === 2 ? "sm:col-span-2" : ""}`}
                  onClick={() => setSelectedImage(image)}
                />
              ))}
            </div>
          </div>

          {/* Carrusel de miniaturas para exploración rápida */}
          <div className="mt-8 border-t border-border/60 pt-6">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
                Explorar fotos destacadas ({featuredOrder.length})
              </p>
              <p className="text-xs text-muted-foreground">
                Haz clic en una foto para verla en grande
              </p>
            </div>
            <div className="flex items-center gap-3 overflow-x-auto pb-3 pt-1 scrollbar-thin">
              {galleryImages.slice(0, 14).map((img, idx) => {
                const isCurrentFirst =
                  visibleGalleryImages[0]?.filename === img.filename;
                return (
                  <button
                    key={img.filename}
                    type="button"
                    onClick={() => setGalleryIndex(idx)}
                    className={`group relative h-16 w-16 sm:h-20 sm:w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                      isCurrentFirst
                        ? "border-accent ring-2 ring-accent/60 scale-105 shadow-md"
                        : "border-border/70 opacity-60 hover:opacity-100 hover:border-accent/40"
                    }`}
                    title={img.title}
                  >
                    <img
                      src={img.src}
                      alt={img.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/15 group-hover:bg-transparent" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Modal Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 sm:p-6"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative max-h-[92vh] max-w-4xl w-full overflow-hidden rounded-2xl bg-card border border-border shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-white hover:bg-black transition-colors"
                aria-label="Cerrar imagen"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="flex items-center justify-center bg-black/50 max-h-[72vh] p-2">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  className="max-h-[68vh] w-auto max-w-full object-contain rounded-lg"
                />
              </div>
              <div className="p-4 sm:p-6 bg-card border-t border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h4 className="text-lg font-bold text-foreground">
                    {selectedImage.title}
                  </h4>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">
                    Galería Institucional • Centro Empresarial
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setSelectedImage(null)}
                >
                  Cerrar
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Benefits;

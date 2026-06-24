import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";
import { eventHighlights } from "@/data/site";
import { ArrowLeft, ArrowRight, Image as ImageIcon } from "lucide-react";

const galleryModules = import.meta.glob<{ default: string }>("/src/assets/*.{jpg,jpeg,png,webp}", { eager: true });

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
      return (priorityA === -1 ? 999 : priorityA) - (priorityB === -1 ? 999 : priorityB);
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

const GalleryTile = ({ image, className, delay = 0 }: { image: GalleryCardImage; className: string; delay?: number }) => (
  <ScrollReveal delay={delay} className={`group relative overflow-hidden rounded-lg border border-border bg-card shadow-sm ${className}`}>
    <AnimatePresence initial={false} mode="sync">
      <motion.img
        key={image.src}
        src={image.src}
        alt={image.title}
        initial={{ opacity: 0, scale: 1.035 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.985 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
    </AnimatePresence>
    <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/12 to-transparent opacity-90 transition-opacity group-hover:opacity-100" />
    <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
      <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-md bg-accent text-accent-foreground">
        <ImageIcon className="h-5 w-5" />
      </div>
      <h3 className="text-xl font-extrabold">{image.title}</h3>
      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-white/70">Centro Empresarial</p>
    </div>
  </ScrollReveal>
);

const Benefits = () => {
  const [galleryIndex, setGalleryIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setGalleryIndex((current) => (current + 1) % galleryImages.length);
    }, 3800);

    return () => window.clearInterval(timer);
  }, []);

  const visibleGalleryImages = useMemo(
    () =>
      gallerySlotLabels.map((title, index) => {
        const image = galleryImages[(galleryIndex + index) % galleryImages.length];
        return { ...image, title };
      }),
    [galleryIndex],
  );

  const goToPrevious = () => setGalleryIndex((current) => (current - 1 + galleryImages.length) % galleryImages.length);
  const goToNext = () => setGalleryIndex((current) => (current + 1) % galleryImages.length);

  return (
    <>
      <section className="bg-background pt-36 pb-20">
        <div className="container mx-auto px-6 lg:px-12">
          <ScrollReveal className="mb-8">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Eventos</p>
            <h1 className="mt-3 text-3xl font-extrabold leading-tight text-corporate md:text-5xl">Proximos eventos</h1>
          </ScrollReveal>

          <div className="grid gap-6 lg:grid-cols-2">
            {eventHighlights.map((event, index) => (
              <ScrollReveal key={event.title} delay={index * 0.08} className="overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-corporate">
                <div className="bg-white p-3">
                  <img src={event.src} alt={event.title} className="mx-auto max-h-[720px] w-full object-contain" />
                </div>
                <div className="flex flex-col gap-3 border-t border-border bg-background p-5 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm font-bold uppercase tracking-[0.14em] text-primary">{event.label}</p>
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

      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-6 lg:px-12">
          <ScrollReveal className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-primary">Galeria institucional</p>
              <h2 className="text-3xl font-extrabold text-corporate md:text-5xl">Actividad real, comunidad visible</h2>
            </div>
            <div className="max-w-xl">
              <p className="text-muted-foreground">
                Registro visual de encuentros, capacitaciones y conexiones que fortalecen la experiencia de los asociados.
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
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-accent">{galleryImages.length} fotos en rotacion</p>
              </div>
            </div>
          </ScrollReveal>

          <div className="grid gap-5 lg:grid-cols-[1.08fr_1fr]">
            <GalleryTile image={visibleGalleryImages[0]} className="min-h-[430px] lg:min-h-[520px]" />
            <div className="grid gap-5 sm:grid-cols-2">
              {visibleGalleryImages.slice(1).map((image, index) => (
                <GalleryTile
                  key={`${image.filename}-${index}`}
                  image={image}
                  delay={(index + 1) * 0.04}
                  className={`min-h-[230px] ${index === 2 ? "sm:col-span-2" : ""}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

    </>
  );
};

export default Benefits;

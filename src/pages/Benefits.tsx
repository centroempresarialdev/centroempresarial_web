import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";
import { eventHighlights, galleryImages } from "@/data/site";
import { ArrowRight, Image as ImageIcon } from "lucide-react";

const Benefits = () => {
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
              <h2 className="text-3xl font-extrabold text-corporate md:text-5xl">Momentos que respaldan nuestra actividad</h2>
            </div>
            <p className="max-w-xl text-muted-foreground">
              Registro visual de encuentros, capacitaciones y conexiones que fortalecen la experiencia de los asociados.
            </p>
          </ScrollReveal>

          <div className="grid gap-5 lg:grid-cols-4">
            {galleryImages.map((image, index) => (
              <ScrollReveal key={image.title} delay={index * 0.06} className={`relative overflow-hidden rounded-lg shadow-sm ${index === 0 ? "lg:col-span-2 lg:row-span-2" : ""}`}>
                <img src={image.src} alt={image.title} className={`${index === 0 ? "min-h-[420px]" : "h-56"} w-full object-cover transition-transform duration-500 hover:scale-105`} data-gsap-image />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-5 text-white">
                  <ImageIcon className="mb-2 h-6 w-6 text-accent" />
                  <h3 className="text-xl font-bold">{image.title}</h3>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

    </>
  );
};

export default Benefits;

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PageIntro from "@/components/PageIntro";
import ScrollReveal from "@/components/ScrollReveal";
import { courseCards, events, galleryImages } from "@/data/site";
import { ArrowRight, Image as ImageIcon } from "lucide-react";

const Benefits = () => {
  return (
    <>
      <section className="bg-background pt-36 pb-20">
        <div className="container mx-auto px-6 lg:px-12">
          <PageIntro
            eyebrow="Beneficios y formacion"
            title="Una agenda de valor para mantener activa la comunidad"
            description="La propuesta combina capacitaciones, recursos, webinars, eventos y contenidos visuales para reforzar confianza y mostrar actividad real."
            align="center"
          />
        </div>
      </section>

      <section className="bg-primary py-20 text-primary-foreground">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid gap-5 md:grid-cols-3">
            {events.map((event, index) => (
              <ScrollReveal key={event.title} delay={index * 0.08} className="rounded-lg border border-white/15 bg-white/10 p-6 backdrop-blur">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-md bg-accent text-accent-foreground">
                  <event.icon className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-bold text-white">{event.title}</h2>
                <p className="mt-3 text-sm leading-6 text-white/75">{event.description}</p>
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
              <h2 className="text-3xl font-extrabold text-corporate md:text-5xl">Evidencia visual de actividades y cursos</h2>
            </div>
            <p className="max-w-xl text-muted-foreground">
              Una seccion visual permite validar la actividad institucional sin saturar la pagina principal.
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

            {courseCards.map((course, index) => (
              <ScrollReveal key={course.title} delay={index * 0.06}>
                <Card className="overflow-hidden border-border bg-background shadow-sm transition-all hover:-translate-y-1 hover:shadow-corporate">
                  <img src={course.banner} alt={course.title} className="aspect-square w-full object-cover" data-gsap-image />
                  <CardContent className="p-4">
                    <p className="text-sm font-bold leading-6 text-foreground">{course.title}</p>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-20">
        <ScrollReveal className="container mx-auto grid gap-8 px-6 lg:grid-cols-[1fr_0.8fr] lg:items-center lg:px-12">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-primary">Conversion</p>
            <h2 className="text-3xl font-extrabold leading-tight text-corporate md:text-5xl">Convierte interes en una consulta concreta</h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              Luego de revisar beneficios y actividades, el usuario puede pasar directo a una ficha breve y conversar por WhatsApp.
            </p>
          </div>
          <Button asChild variant="accent" size="lg" className="justify-self-start lg:justify-self-end">
            <Link to="/contacto">
              Solicitar informacion
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </ScrollReveal>
      </section>
    </>
  );
};

export default Benefits;

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";
import { contactInfo } from "@/data/site";
import { ArrowRight, BookOpen, GraduationCap, MessageCircle, FileText } from "lucide-react";

const AdvisoryThesis = () => {
  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-dark via-primary to-primary-dark pb-16 pt-36 text-white md:pb-24 md:pt-48">
        <div className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-accent/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-white/10 blur-3xl" />

        <div className="container relative z-10 mx-auto px-6 lg:px-12">
          <ScrollReveal direction="left">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-accent">
              Asesoría &amp; Tesis
            </p>
            <h1 className="max-w-3xl text-4xl font-extrabold leading-tight text-white md:text-5xl lg:text-6xl">
              Acompañamiento académico y profesional
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-white/85">
              Asesoría especializada para el desarrollo de tesis, proyectos de
              investigación y trabajos académicos con respaldo profesional.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button asChild size="lg" variant="accent">
                <a
                  href={`https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent("Hola, deseo información sobre asesoría de tesis.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gap-2"
                >
                  <MessageCircle className="h-5 w-5" />
                  Consultar por WhatsApp
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

      {/* ─── SERVICES ─── */}
      <section className="bg-background py-16 md:py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <ScrollReveal className="mb-12 text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-primary">
              Nuestros servicios
            </p>
            <h2 className="text-3xl font-extrabold text-corporate md:text-5xl">
              ¿Cómo te ayudamos?
            </h2>
          </ScrollReveal>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: GraduationCap,
                title: "Asesoría de Tesis",
                text: "Acompañamiento integral desde la formulación del problema hasta la sustentación, con metodología rigurosa y enfoque práctico.",
              },
              {
                icon: BookOpen,
                title: "Proyectos de Investigación",
                text: "Soporte técnico y metodológico para proyectos académicos y de investigación aplicada en diversas áreas.",
              },
              {
                icon: FileText,
                title: "Revisión y Corrección",
                text: "Revisión de estilo, formato APA/Vancouver, corrección ortográfica y validación de estructura académica.",
              },
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.1}>
                <div className="flex h-full flex-col rounded-2xl border border-border bg-background p-8 shadow-sm transition-shadow hover:shadow-elevated">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                    <item.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="mb-3 text-xl font-extrabold text-corporate">
                    {item.title}
                  </h3>
                  <p className="flex-1 text-sm leading-7 text-muted-foreground">
                    {item.text}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal className="mt-12 text-center">
            <Button asChild variant="corporate" size="lg">
              <Link to="/contacto?plan=asesoria-tesis">
                Solicitar asesoría
                <ArrowRight className="ml-1 h-5 w-5" />
              </Link>
            </Button>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
};

export default AdvisoryThesis;

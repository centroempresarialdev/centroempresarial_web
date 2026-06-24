import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PageIntro from "@/components/PageIntro";
import ScrollReveal from "@/components/ScrollReveal";
import { partners } from "@/data/site";
import { ArrowRight, BadgeCheck, CheckCircle2, Handshake, Network, Sparkles } from "lucide-react";

const Partners = () => {
  return (
    <>
      <section className="bg-muted/35 pt-36 pb-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <PageIntro
              eyebrow="Aliados estrategicos"
              title="Convenios que amplian el valor de pertenecer"
              description="La red de aliados ayuda a reforzar confianza, visibilidad y beneficios concretos para estudiantes, profesionales y empresas asociadas."
            />
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { icon: Handshake, label: "Convenios", text: "Beneficios y colaboraciones de valor." },
                { icon: BadgeCheck, label: "Respaldo", text: "Marcas e instituciones visibles para el usuario." },
                { icon: Network, label: "Red", text: "Conexiones para nuevas oportunidades." },
              ].map((item, index) => (
                <ScrollReveal key={item.label} delay={index * 0.08} className="rounded-lg border border-border bg-background p-5 shadow-sm">
                  <item.icon className="mb-4 h-6 w-6 text-primary" />
                  <h2 className="text-lg font-bold text-corporate">{item.label}</h2>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.text}</p>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background py-20">
        <div className="container mx-auto px-6 lg:px-12">
          <ScrollReveal className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-primary">Beneficios por aliado</p>
              <h2 className="text-3xl font-extrabold text-corporate md:text-5xl">Cada aliado suma valor concreto</h2>
            </div>
            <p className="max-w-xl text-muted-foreground">
              Los asociados pueden revisar que aporta cada convenio antes de activar su membresia o solicitar informacion.
            </p>
          </ScrollReveal>

          <div className="space-y-6">
            {partners.map((partner, index) => (
              <ScrollReveal key={partner.name} delay={index * 0.05}>
                <Card className="overflow-hidden border-border/80 bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-corporate">
                  <CardContent className="grid gap-0 p-0 lg:grid-cols-[0.42fr_0.58fr]">
                    <div className="flex flex-col justify-center bg-muted/35 p-6 md:p-8">
                      <div className={`flex min-h-40 items-center justify-center rounded-lg border border-border bg-card p-6 shadow-sm ${partner.darkLogo ? "bg-primary" : ""}`}>
                        <img src={partner.logo} alt={partner.name} className="max-h-24 max-w-full object-contain" />
                      </div>
                      <h3 className="mt-5 text-2xl font-extrabold text-corporate">{partner.name}</h3>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">{partner.summary}</p>
                    </div>

                    <div className="p-6 md:p-8">
                      <p className="mb-5 text-sm font-bold uppercase tracking-[0.18em] text-primary">Beneficios para asociados</p>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {partner.benefits.map((benefit) => (
                          <div key={benefit} className="flex gap-3 rounded-md border border-border bg-card p-4 text-sm leading-6 text-muted-foreground shadow-sm">
                            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                            <span>{benefit}</span>
                          </div>
                        ))}
                      </div>
                      <Button asChild variant="accent" className="mt-6 w-full md:w-fit">
                        <Link to="/contacto">
                          Consultar beneficio
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-6 lg:px-12">
          <ScrollReveal className="overflow-hidden rounded-lg bg-gradient-primary p-8 text-primary-foreground shadow-elevated md:p-12">
            <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <Sparkles className="mb-4 h-10 w-10 text-accent" />
                <h2 className="text-3xl font-bold text-white md:text-4xl">Quieres aprovechar estos beneficios?</h2>
                <p className="mt-3 max-w-2xl text-white/80">
                  Activa tu membresia y recibe orientacion directa sobre los beneficios disponibles con nuestra red de aliados.
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
    </>
  );
};

export default Partners;

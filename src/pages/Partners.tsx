import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PageIntro from "@/components/PageIntro";
import ScrollReveal from "@/components/ScrollReveal";
import { partners } from "@/data/site";
import { ArrowRight, BadgeCheck, Handshake, Network } from "lucide-react";

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
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {partners.map((partner, index) => (
              <ScrollReveal key={partner.name} delay={index * 0.05}>
                <Card className="border-border/80 shadow-sm transition-all hover:-translate-y-1 hover:shadow-corporate">
                  <CardContent className="flex h-full flex-col items-center justify-center p-5 text-center">
                    <div className="flex h-28 w-full items-center justify-center">
                      <img src={partner.logo} alt={partner.name} className="max-h-24 max-w-full object-contain" />
                    </div>
                    <p className="mt-4 text-sm font-bold text-corporate">{partner.name}</p>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal className="mt-12 rounded-lg bg-gradient-primary p-8 text-center text-primary-foreground shadow-elevated md:p-12">
            <Handshake className="mx-auto mb-4 h-10 w-10 text-accent" />
            <h2 className="text-3xl font-bold text-white md:text-4xl">Quieres formar parte de la red?</h2>
            <p className="mx-auto mt-3 max-w-2xl text-white/80">
              Completa la ficha y recibe orientacion directa sobre la membresia ideal para ti o tu empresa.
            </p>
            <Button asChild variant="accent" size="lg" className="mt-7">
              <Link to="/contacto">
                Iniciar inscripcion
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
};

export default Partners;

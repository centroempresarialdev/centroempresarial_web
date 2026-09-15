import { Link } from "react-router-dom";
import { ArrowRight, BriefcaseBusiness } from "lucide-react";
import PageIntro from "@/components/PageIntro";
import ScrollReveal from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { serviceCatalog } from "@/data/site";

const ServicesPage = () => {
  return (
    <>
      <section className="bg-muted/35 pb-14 pt-28 md:pb-20 md:pt-36">
        <div className="container mx-auto px-6 lg:px-12">
          <PageIntro
            eyebrow="Servicios empresariales"
            title="Servicios"
            description="Soluciones pensadas para acompañar el desarrollo de profesionales y empresas."
          />
        </div>
      </section>

      <section className="bg-background py-14 md:py-20">
        <div className="container mx-auto px-6 lg:px-12">
          {serviceCatalog.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {serviceCatalog.map((service, index) => (
                <ScrollReveal key={service.title} delay={index * 0.08}>
                  <Card className="h-full border-border/80 bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-corporate">
                    <CardContent className="p-6">
                      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-md bg-primary text-primary-foreground">
                        <BriefcaseBusiness className="h-6 w-6" />
                      </div>
                      <h2 className="text-2xl font-extrabold text-corporate">{service.title}</h2>
                      <p className="mt-3 text-base leading-7 text-muted-foreground">{service.description}</p>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <ScrollReveal className="mx-auto max-w-4xl overflow-hidden rounded-lg border border-border bg-card shadow-elevated">
              <div className="grid gap-0 md:grid-cols-[auto_1fr] md:items-center">
                <div className="flex h-full min-h-48 items-center justify-center bg-primary p-8 text-primary-foreground md:w-56">
                  <BriefcaseBusiness className="h-16 w-16 text-accent" aria-hidden="true" />
                </div>
                <div className="p-7 md:p-10">
                  <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-primary">Catálogo en preparación</p>
                  <h2 className="mt-3 text-2xl font-extrabold leading-tight text-corporate md:text-3xl">
                    Muy pronto conocerás nuestros servicios
                  </h2>
                  <p className="mt-4 text-base leading-7 text-muted-foreground">
                    Estamos preparando nuestro catálogo de servicios empresariales. Muy pronto encontrarás aquí información detallada.
                  </p>
                  <Button asChild variant="accent" size="lg" className="mt-7">
                    <Link to="/contacto">
                      Solicitar información
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>
    </>
  );
};

export default ServicesPage;

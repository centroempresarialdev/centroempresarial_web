import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PageIntro from "@/components/PageIntro";
import ScrollReveal from "@/components/ScrollReveal";
import { associationSteps, benefitGroups, membershipPlans } from "@/data/site";
import { ArrowRight, CheckCircle2, ClipboardCheck } from "lucide-react";

const Memberships = () => {
  return (
    <>
      <section className="bg-muted/35 pt-36 pb-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid items-end gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <PageIntro
              eyebrow="Membresias"
              title="Planes claros para asociarte con criterio"
              description="Compara inversion, beneficios y enfoque por perfil. Cada membresia esta pensada para que el interesado vea rapido si encaja con su etapa actual."
            />
            <ScrollReveal direction="right" className="rounded-lg border border-border bg-background p-6 shadow-sm">
              <div className="flex items-center gap-3 text-primary">
                <ClipboardCheck className="h-6 w-6" />
                <p className="font-bold">Proceso guiado por WhatsApp</p>
              </div>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                El usuario completa una ficha breve y recibe orientacion directa para elegir categoria, resolver dudas y activar su membresia.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="bg-background py-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid gap-6 lg:grid-cols-3">
            {membershipPlans.map((plan, index) => (
              <ScrollReveal key={plan.name} delay={index * 0.08}>
                <Card className={`h-full overflow-hidden border-border bg-background shadow-sm transition-all hover:-translate-y-2 hover:shadow-elevated ${plan.featured ? "ring-2 ring-accent" : ""}`}>
                {plan.featured && <div className="bg-accent px-5 py-2 text-center text-sm font-bold text-accent-foreground">Mas solicitado</div>}
                <CardContent className="flex h-full flex-col p-6">
                  <div className="mb-5 flex items-start justify-between gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-md bg-primary/10 p-3 text-primary">
                      <plan.icon className="h-7 w-7" />
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-extrabold text-corporate">{plan.price}</p>
                      <p className="text-sm text-muted-foreground">{plan.period}</p>
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-corporate">{plan.name}</h2>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{plan.description}</p>
                  <div className="mt-6 space-y-3">
                    {plan.benefits.map((benefit) => (
                      <div key={benefit} className="flex gap-3 text-sm leading-6">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-6 rounded-md bg-muted px-4 py-3 text-sm font-semibold text-corporate">{plan.bestFor}</p>
                  <Button asChild variant={plan.featured ? "accent" : "corporate"} className="mt-8 w-full">
                    <Link to="/contacto">
                      Solicitar inscripcion
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/35 py-20">
        <div className="container mx-auto px-6 lg:px-12">
          <PageIntro
            eyebrow="Comparativo"
            title="Beneficios visibles por categoria"
            description="La informacion se presenta por perfil para reducir dudas y acelerar la decision de contacto."
            align="center"
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {benefitGroups.map((group, index) => (
              <ScrollReveal key={group.category} delay={index * 0.08}>
                <Card className="border-border/80 shadow-sm">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold text-corporate">{group.category}</h2>
                    <div className="mt-5 space-y-4">
                      {group.items.map((item) => (
                        <div key={item} className="flex gap-3 text-sm leading-6 text-muted-foreground">
                          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary py-20 text-primary-foreground">
        <div className="container mx-auto px-6 lg:px-12">
          <ScrollReveal className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-accent">Como asociarse</p>
              <h2 className="text-3xl font-extrabold leading-tight text-white md:text-5xl">Un cierre simple para convertir interes en solicitud</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {associationSteps.map((step, index) => (
                <div key={step} className="rounded-lg border border-white/15 bg-white/10 p-5 backdrop-blur">
                  <span className="mb-4 flex h-9 w-9 items-center justify-center rounded-md bg-accent text-sm font-bold text-accent-foreground">
                    {index + 1}
                  </span>
                  <p className="font-semibold leading-7 text-white">{step}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
};

export default Memberships;

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PageIntro from "@/components/PageIntro";
import ScrollReveal from "@/components/ScrollReveal";
import { associationSteps, membershipPlans } from "@/data/site";
import consultingBenefitsImage from "@/assets/hero/consulting-benefits.png";
import { ArrowRight, CalendarDays, CheckCircle2, ClipboardCheck, Handshake, Percent } from "lucide-react";

const valueHighlights = [
  { icon: Percent, title: "Descuentos en formación", text: "Capacitaciones, programas y recursos con condiciones preferenciales." },
  { icon: CalendarDays, title: "Eventos especializados", text: "Espacios presenciales y webinars para actualizarte y conectar." },
  { icon: Handshake, title: "Aliados estratégicos", text: "Convenios que suman oportunidades académicas, comerciales e institucionales." },
];

const Memberships = () => {
  return (
    <>
      <section className="bg-muted/35 pt-36 pb-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid items-end gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <PageIntro
              eyebrow="Membresias"
              title="Membresias anuales para cada etapa"
              description="Compara el enfoque, la inversion y los beneficios reales de cada categoria antes de solicitar tu inscripcion."
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
          <ScrollReveal className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-primary">Membresia anual</p>
              <h2 className="text-3xl font-extrabold leading-tight text-corporate md:text-5xl">Beneficios por tipo de asociado</h2>
            </div>
            <p className="max-w-xl text-lg leading-8 text-muted-foreground">
              Cada plan responde a una necesidad distinta: apoyo academico, desarrollo profesional o crecimiento empresarial.
            </p>
          </ScrollReveal>

          <div className="grid gap-6 lg:grid-cols-3">
            {membershipPlans.map((plan, index) => (
              <ScrollReveal key={plan.name} delay={index * 0.08}>
                <Card className={`h-full overflow-hidden border-border bg-background shadow-sm transition-all hover:-translate-y-2 hover:shadow-elevated ${plan.featured ? "ring-2 ring-accent" : ""}`}>
                  <div className={`h-2 ${plan.featured ? "bg-accent" : "bg-primary"}`} />
                  <CardContent className="flex h-full flex-col p-6">
                    <div className="mb-6 flex items-start justify-between gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-md bg-primary text-primary-foreground">
                        <plan.icon className="h-7 w-7" />
                      </div>
                      {plan.featured && <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-accent">Mas solicitado</span>}
                    </div>

                    <div>
                      <h2 className="text-2xl font-extrabold text-corporate">{plan.name}</h2>
                      <div className="mt-5 flex items-end gap-2 rounded-lg bg-muted/55 p-4">
                        <p className="text-4xl font-extrabold text-corporate">{plan.price}</p>
                        <p className="pb-1 text-sm text-muted-foreground">/{plan.period}</p>
                      </div>
                    </div>

                    <div className="mt-5 rounded-md border border-border bg-card p-4">
                      <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-primary">Enfoque</p>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">{plan.audience}</p>
                    </div>

                    <div className="mt-6 flex-1">
                      <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-primary">Beneficios</p>
                      <div className="mt-4 space-y-3">
                        {plan.benefits.map((benefit) => (
                          <div key={benefit} className="flex gap-3 text-sm leading-6 text-muted-foreground">
                            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                            <span>{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>

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

      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-6 lg:px-12">
          <ScrollReveal className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-primary">Beneficios de asociarte</p>
              <h2 className="max-w-3xl text-3xl font-extrabold leading-tight text-corporate md:text-5xl">Impulsa tu crecimiento con una red activa</h2>
            </div>
            <Button asChild variant="corporate">
              <Link to="/contacto">
                Quiero asociarme
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </ScrollReveal>

          <ScrollReveal className="grid overflow-hidden rounded-lg border border-border bg-background shadow-elevated lg:grid-cols-[1.08fr_0.92fr]">
            <div className="relative min-h-[430px]">
              <img src={consultingBenefitsImage} alt="Asesoría empresarial" className="absolute inset-0 h-full w-full object-cover" data-gsap-image />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-foreground/12" />
            </div>

            <div className="flex flex-col justify-center p-6 md:p-10">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Valor para asociados</p>
              <h3 className="mt-3 text-3xl font-extrabold leading-tight text-corporate md:text-4xl">
                Formación, eventos y aliados para avanzar con respaldo
              </h3>

              <div className="mt-8 grid gap-4">
                {valueHighlights.map((item) => (
                  <div key={item.title} className="flex items-center gap-4 rounded-md border border-border bg-background p-4 shadow-sm">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
                      <item.icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <h4 className="text-base font-extrabold text-corporate">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button asChild variant="accent" size="lg" className="mt-8 w-fit">
                <Link to="/contacto">
                  Hablar con un asesor
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </ScrollReveal>
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

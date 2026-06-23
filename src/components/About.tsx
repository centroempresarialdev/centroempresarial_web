import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Building2, CheckCircle2, GraduationCap, Lightbulb, Network, ShieldCheck, Users } from "lucide-react";
import aboutImage from "@/assets/hero/about-nosotros.jpg";

const strengths = [
  {
    icon: ShieldCheck,
    title: "Respaldo institucional",
    description: "Más de 12 años acompañando a empresas privadas, instituciones públicas y profesionales de la región.",
  },
  {
    icon: Network,
    title: "Conexión con aliados",
    description: "Convenios, alianzas y espacios de colaboración para abrir oportunidades comerciales y académicas.",
  },
  {
    icon: GraduationCap,
    title: "Formación continua",
    description: "Capacitaciones, webinars, recursos empresariales y programas especializados para distintos perfiles.",
  },
];

const steps = [
  "Elige tu categoría: estudiante, profesional o empresarial.",
  "Completa la ficha de inscripción con tus datos básicos.",
  "Envía tu solicitud por WhatsApp para recibir orientación personalizada.",
  "Accede a beneficios, eventos, aliados y descuentos disponibles.",
];

const About = () => {
  return (
    <section id="nosotros" className="bg-background py-20">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55 }}
            className="relative"
          >
            <div className="overflow-hidden rounded-2xl shadow-elevated">
              <img src={aboutImage} alt="Equipo de Centro Empresarial" className="h-[500px] w-full object-cover" />
            </div>
            <div className="absolute -bottom-8 left-6 right-6 rounded-2xl bg-primary p-6 text-primary-foreground shadow-elevated md:left-auto md:right-8 md:w-80">
              <p className="text-sm font-semibold uppercase text-accent">Propuesta de valor</p>
              <p className="mt-2 text-2xl font-bold leading-tight">Transformamos contactos, formación y asesoría en crecimiento real.</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55 }}
            className="pt-10 lg:pt-0"
          >
            <Badge variant="outline" className="mb-4 text-primary">Experiencia y comunidad</Badge>
            <h2 className="max-w-3xl text-3xl font-extrabold leading-tight text-corporate md:text-5xl">
              Una plataforma empresarial para asociarse, capacitarse y crear oportunidades
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              Centro Empresarial reúne servicios de asesoría, capacitación, alianzas estratégicas y membresías para conectar a estudiantes, profesionales y empresas con herramientas de crecimiento.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {strengths.map((item) => (
                <Card key={item.title} className="border-border/80 shadow-sm transition-all hover:-translate-y-1 hover:shadow-corporate">
                  <CardContent className="p-5">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-bold text-corporate">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>

        <div id="como-asociarse" className="mt-24 grid gap-8 rounded-2xl bg-muted/60 p-6 md:p-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <Badge variant="outline" className="mb-4 text-primary">Cómo asociarse</Badge>
            <h2 className="text-3xl font-bold text-corporate md:text-4xl">Un proceso simple para iniciar hoy</h2>
            <p className="mt-4 text-muted-foreground">
              La web orienta al interesado paso a paso y finaliza la solicitud con un mensaje listo para enviar por WhatsApp.
            </p>
            <div className="mt-6 flex items-center gap-3 text-sm font-semibold text-primary">
              Completa la ficha en menos de 2 minutos
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {steps.map((step, index) => (
              <div key={step} className="rounded-xl border border-border bg-background p-5 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-sm font-bold text-accent-foreground">
                    {index + 1}
                  </span>
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                </div>
                <p className="font-semibold leading-7 text-foreground">{step}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {[
            { icon: Users, label: "Estudiantes", value: "Capacitaciones, blog y apoyo académico" },
            { icon: Lightbulb, label: "Profesionales", value: "Formación continua y networking especializado" },
            { icon: Building2, label: "Empresas", value: "Consultorías, auditorías e innovación aplicada" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-4 rounded-xl border border-border bg-background p-5 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <item.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-corporate">{item.label}</h3>
                <p className="text-sm text-muted-foreground">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;

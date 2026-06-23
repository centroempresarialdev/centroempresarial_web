import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, CalendarDays, GraduationCap, Handshake, Sparkles, Users } from "lucide-react";
import heroImage from "@/assets/hero/hero-image.jpg";
import caruImage from "@/assets/hero/luren-manos.png";
import ruleImage from "@/assets/hero/papeles-image.png";

const stats = [
  { label: "años de experiencia", value: "+12" },
  { label: "tipos de membresía", value: "3" },
  { label: "beneficios activos", value: "+15" },
];

const highlights = [
  { icon: GraduationCap, label: "Capacitaciones con descuento" },
  { icon: CalendarDays, label: "Eventos y webinars" },
  { icon: Handshake, label: "Red de aliados estratégicos" },
];

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="inicio" className="relative overflow-hidden bg-background pt-28 md:pt-36">
      <div className="absolute inset-x-0 top-0 h-[620px] bg-gradient-to-br from-primary via-primary-dark to-foreground" />
      <div className="absolute inset-x-0 top-[520px] h-32 bg-gradient-to-b from-transparent to-background" />

      <div className="container relative z-10 mx-auto px-6 pb-16 pt-10 lg:px-12 lg:pb-24 lg:pt-16">
        <div className="grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="max-w-3xl text-primary-foreground"
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur">
              <Sparkles className="h-4 w-4 text-accent" />
              Centro Empresarial - Asesores y Consultores
            </div>

            <h1 className="max-w-4xl text-4xl font-extrabold leading-tight text-white md:text-6xl lg:text-7xl">
              Una red para aprender, asociarte y hacer crecer tu organización
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/84 md:text-xl">
              Membresías, capacitaciones, eventos, aliados estratégicos y acompañamiento empresarial para estudiantes, profesionales y empresas de Ica y el Perú.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" variant="accent" onClick={() => scrollToSection("inscripcion")} className="text-base">
                Quiero asociarme
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection("membresias")}
                className="border-white/30 bg-white/10 text-white hover:bg-white hover:text-primary"
              >
                Ver membresías
              </Button>
            </div>

            <div className="mt-10 grid max-w-2xl grid-cols-3 gap-3">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-lg border border-white/15 bg-white/10 p-4 backdrop-blur">
                  <p className="text-3xl font-bold text-accent md:text-4xl">{stat.value}</p>
                  <p className="mt-1 text-xs font-medium uppercase tracking-wide text-white/75">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-[28px] border border-white/20 bg-white/10 p-3 shadow-2xl backdrop-blur">
              <div className="grid h-[520px] grid-cols-5 grid-rows-5 gap-3 overflow-hidden rounded-[20px]">
                <img src={caruImage} alt="Asesoría empresarial" className="col-span-3 row-span-3 h-full w-full object-cover" />
                <img src={ruleImage} alt="Gestión institucional" className="col-span-2 row-span-2 h-full w-full object-cover" />
                <img src={heroImage} alt="Centro Empresarial" className="col-span-2 row-span-3 h-full w-full object-cover" />
                <div className="col-span-3 row-span-2 flex flex-col justify-between bg-white p-6 text-foreground">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Users className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase text-primary">Inscripción abierta</p>
                    <h2 className="mt-2 text-2xl font-bold text-corporate">Membresía anual desde S/ 360</h2>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-8 left-6 right-6 grid gap-3 rounded-2xl border border-border bg-background p-4 shadow-elevated md:grid-cols-3">
              {highlights.map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-semibold leading-snug text-foreground">{item.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

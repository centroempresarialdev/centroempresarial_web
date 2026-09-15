import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Clock,
  GraduationCap,
  Handshake,
  Image as ImageIcon,
  PlayCircle,
  Sparkles,
  UserRound,
} from "lucide-react";
import servicesImage from "@/assets/hero/services-header.jpg";

// Galería institucional
import gal01 from "@/assets/galeria/2013.jpg";
import gal02 from "@/assets/galeria/2014.jpg";
import gal03 from "@/assets/galeria/2017.jpg";
import gal04 from "@/assets/galeria/2020.jpg";
import gal05 from "@/assets/galeria/2023.jpg";
import gal06 from "@/assets/galeria/2023 (2).jpg";
import gal07 from "@/assets/galeria/2023...jpg";
import gal08 from "@/assets/galeria/2023cd.jpg";
import gal09 from "@/assets/galeria/2023v.jpg";
import gal10 from "@/assets/galeria/2023vc.jpg";
import gal11 from "@/assets/galeria/2023x.jpg";
import gal12 from "@/assets/galeria/2024.jpg";
import gal13 from "@/assets/galeria/2024 (2).jpg";
import gal14 from "@/assets/galeria/2024..jpg";
import gal15 from "@/assets/galeria/2024...jpg";
import gal16 from "@/assets/galeria/2024....jpg";
import gal17 from "@/assets/galeria/2025.jpg";
import gal18 from "@/assets/galeria/2025 (2).jpg";
import gal19 from "@/assets/galeria/2025 (3).jpg";
import gal20 from "@/assets/galeria/2025 (4).jpg";
import gal21 from "@/assets/galeria/2025...jpg";
import gal22 from "@/assets/galeria/2025.....jpg";
import gal23 from "@/assets/galeria/2026.jpg";
import gal24 from "@/assets/galeria/16 de septiembre 2025.jpg";
import gal25 from "@/assets/galeria/5 de septiembre 2025.jpg";
import gal26 from "@/assets/galeria/2026(1).jpg";
import gal27 from "@/assets/galeria/2026 (2).jpg";
import gal28 from "@/assets/galeria/2026 (3).jpg";
import gal29 from "@/assets/galeria/2026 (4).jpg";
import gal30 from "@/assets/galeria/2026 (5).jpg";
import gal31 from "@/assets/galeria/2026 (6).jpg";
import gal32 from "@/assets/galeria/2026 (7).jpg";
import gal33 from "@/assets/galeria/2026 (8).jpg";
import gal34 from "@/assets/galeria/2026 (9).jpg";
import gal35 from "@/assets/galeria/2026 (10).jpg";
import gal36 from "@/assets/galeria/2026 (11).jpg";
import gal37 from "@/assets/galeria/2026 (12).jpg";
import gal38 from "@/assets/galeria/2026 (13).jpg";
import gal39 from "@/assets/galeria/2026 (14).jpg";
import gal40 from "@/assets/galeria/2026 (15).jpg";

const galleryImages = [
  gal01,
  gal02,
  gal03,
  gal04,
  gal05,
  gal06,
  gal07,
  gal08,
  gal09,
  gal10,
  gal11,
  gal12,
  gal13,
  gal14,
  gal15,
  gal16,
  gal17,
  gal18,
  gal19,
  gal20,
  gal21,
  gal22,
  gal23,
  gal24,
  gal25,
  gal26,
  gal27,
  gal28,
  gal29,
  gal30,
  gal31,
  gal32,
  gal33,
  gal34,
  gal35,
  gal36,
  gal37,
  gal38,
  gal39,
  gal40,
];

const memberships = [
  {
    icon: GraduationCap,
    name: "Estudiante",
    price: "S/ 360",
    period: "anual",
    description:
      "Para estudiantes que buscan capacitaciones, recursos empresariales y apoyo académico.",
    benefits: [
      "50% de descuento en capacitaciones",
      "Videos y blog empresarial gratuitos",
      "20% de descuento en monografías, tesis y proyectos",
    ],
    featured: false,
  },
  {
    icon: UserRound,
    name: "Profesionales",
    price: "S/ 480",
    period: "anual",
    description:
      "Para profesionales que desean formación continua, eventos y networking especializado.",
    benefits: [
      "50% de descuento en capacitaciones",
      "Postgrado con 20% de descuento",
      "Eventos y webinars con ponentes internacionales",
    ],
    featured: true,
  },
  {
    icon: BriefcaseBusiness,
    name: "Empresarial",
    price: "S/ 1,500",
    period: "anual",
    description:
      "Para empresas que requieren asesoría, consultoría y acompañamiento en mejora continua.",
    benefits: [
      "Capacitaciones para equipos",
      "Consultorías, auditorías y orientación institucional",
      "IA aplicada a negocios y mejora continua",
    ],
    featured: false,
  },
];

const benefitGroups = [
  {
    category: "Estudiante",
    items: [
      "Capacitaciones empresariales con 50% de descuento",
      "Videos empresariales gratuitos",
      "Blog empresarial gratuito",
      "Monografías, proyectos de tesis y tesis con 20% de descuento",
    ],
  },
  {
    category: "Profesionales",
    items: [
      "Capacitaciones con 50% de descuento",
      "Acceso a videos y blogs",
      "Postgrado con 20% de descuento",
      "Eventos, webinars y alianzas con colegios profesionales",
    ],
  },
  {
    category: "Empresarial",
    items: [
      "Capacitaciones con ponentes nacionales e internacionales",
      "Asesoría con instituciones públicas y privadas",
      "Consultorías y auditorías",
      "Tecnología e inteligencia artificial aplicada a empresas",
    ],
  },
];

const events = [
  {
    title: "Webinars empresariales",
    description:
      "Charlas y sesiones online para actualizar conocimientos de gestión, tecnología, salud y negocios.",
    icon: PlayCircle,
  },
  {
    title: "Eventos institucionales",
    description:
      "Actividades presenciales y convocatorias para conectar asociados, aliados y especialistas.",
    icon: CalendarDays,
  },
  {
    title: "Cursos especializados",
    description:
      "Programas para fortalecer competencias profesionales y capacidades de equipos de trabajo.",
    icon: BookOpen,
  },
];

const courses = [
  {
    title: "Comunicación eficaz con pacientes y familiares",
    banner:
      "https://camaraica.org.pe/wp-content/uploads/2025/09/IMG-20250909-WA0017.avif",
  },
  {
    title: "Atención al paciente con enfermedades crónicas",
    banner:
      "https://camaraica.org.pe/wp-content/uploads/2025/09/IMG-20250909-WA0018.avif",
  },
  {
    title: "Habilidades blandas para personal de salud",
    banner:
      "https://camaraica.org.pe/wp-content/uploads/2025/09/IMG-20250909-WA0015.avif",
  },
  {
    title: "Detección temprana de crecimiento y desarrollo",
    banner:
      "https://camaraica.org.pe/wp-content/uploads/2025/09/IMG-20250909-WA0016.avif",
  },
];

const partners = [
  { name: "Piskus", logo: "https://centroempresarialica.com/media/piskus.jpg" },
  {
    name: "ESSALUD",
    logo: "https://centroempresarialica.com/media/Essalud.png",
  },
  {
    name: "Rumi Wasi",
    logo: "https://centroempresarialica.com/media/rumi-wasi.jpg",
  },
  {
    name: "El Sabor Milagroso",
    logo: "https://centroempresarialica.com/media/sabor-milagroso.jpg",
  },
  {
    name: "Cámara de Comercio de Ica",
    logo: "https://centroempresarialica.com/media/CamaraLogo.jpg",
  },
];

const Services = () => {
  const scrollToForm = () => {
    document
      .getElementById("inscripcion")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <section id="membresias" className="bg-muted/35 py-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="mb-12 grid items-end gap-8 lg:grid-cols-[1fr_0.72fr]">
            <div>
              <Badge variant="outline" className="mb-4 text-primary">
                Membresías
              </Badge>
              <h2 className="max-w-3xl text-3xl font-extrabold leading-tight text-corporate md:text-5xl">
                Planes claros para cada etapa de crecimiento
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
                Presenta precios anuales, beneficios y enfoque de cada categoría
                para que el usuario entienda rápido cuál membresía le
                corresponde.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-background p-6 shadow-sm">
              <div className="flex items-center gap-3 text-primary">
                <Clock className="h-5 w-5" />
                <p className="font-bold">Membresía mensual</p>
              </div>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Bloque preparado para mostrar montos mensuales cuando el cliente
                los defina. Por ahora se comunica disponibilidad bajo consulta.
              </p>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {memberships.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
              >
                <Card
                  className={`h-full overflow-hidden border-border bg-background shadow-sm transition-all hover:-translate-y-2 hover:shadow-elevated ${plan.featured ? "ring-2 ring-accent" : ""}`}
                >
                  {plan.featured && (
                    <div className="bg-accent px-5 py-2 text-center text-sm font-bold text-accent-foreground">
                      Más solicitado
                    </div>
                  )}
                  <CardContent className="flex h-full flex-col p-6">
                    <div className="mb-5 flex items-start justify-between gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 p-3 text-primary">
                        <plan.icon className="h-7 w-7" />
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-extrabold text-corporate">
                          {plan.price}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {plan.period}
                        </p>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-corporate">
                      {plan.name}
                    </h3>
                    <p className="mt-3 min-h-20 text-sm leading-6 text-muted-foreground">
                      {plan.description}
                    </p>
                    <div className="mt-6 space-y-3">
                      {plan.benefits.map((benefit) => (
                        <div
                          key={benefit}
                          className="flex gap-3 text-sm leading-6"
                        >
                          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                    <Button
                      variant={plan.featured ? "accent" : "corporate"}
                      className="mt-8 w-full"
                      onClick={scrollToForm}
                    >
                      Solicitar inscripción
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="beneficios" className="bg-background py-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="mb-12 text-center">
            <Badge variant="outline" className="mb-4 text-primary">
              Beneficios por categoría
            </Badge>
            <h2 className="mx-auto max-w-3xl text-3xl font-extrabold text-corporate md:text-5xl">
              Beneficios visibles, comparables y fáciles de decidir
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {benefitGroups.map((group) => (
              <Card key={group.category} className="border-border/80 shadow-sm">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-corporate">
                    {group.category}
                  </h3>
                  <div className="mt-5 space-y-4">
                    {group.items.map((item) => (
                      <div
                        key={item}
                        className="flex gap-3 text-sm leading-6 text-muted-foreground"
                      >
                        <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section
        id="eventos"
        className="bg-primary py-20 text-primary-foreground"
      >
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <Badge
                variant="outline"
                className="mb-4 border-white/30 text-white"
              >
                Eventos y formación
              </Badge>
              <h2 className="text-3xl font-extrabold leading-tight text-white md:text-5xl">
                Contenido activo para mantener conectada a la comunidad
              </h2>
              <p className="mt-5 text-lg leading-8 text-white/80">
                La web queda preparada para comunicar eventos, webinars, cursos
                y convocatorias relevantes con una lectura más comercial.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {events.map((event) => (
                <div
                  key={event.title}
                  className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground">
                    <event.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {event.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-white/75">
                    {event.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="galeria" className="bg-muted/30 py-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <Badge variant="outline" className="mb-4 text-primary">
                Galería
              </Badge>
              <h2 className="text-3xl font-extrabold text-corporate md:text-5xl">
                Fotos, videos y cursos destacados
              </h2>
            </div>
            <p className="max-w-xl text-muted-foreground">
              Espacio visual para mostrar evidencia institucional, material
              audiovisual y piezas de cursos entregadas por el cliente.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="group overflow-hidden rounded-2xl shadow-sm"
              >
                <img
                  src={image}
                  alt={`Galería ${index + 1}`}
                  className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            ))}

            {courses.map((course) => (
              <div
                key={course.title}
                className="overflow-hidden rounded-2xl border border-border bg-background shadow-sm transition-all hover:-translate-y-1 hover:shadow-corporate"
              >
                <img
                  src={course.banner}
                  alt={course.title}
                  className="aspect-square w-full object-cover"
                />
                <div className="p-4">
                  <p className="text-sm font-bold leading-6 text-foreground">
                    {course.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="aliados" className="bg-background py-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="mb-12 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <Badge variant="outline" className="mb-4 text-primary">
                Aliados estratégicos
              </Badge>
              <h2 className="text-3xl font-extrabold text-corporate md:text-5xl">
                Convenios que amplían el valor de la membresía
              </h2>
            </div>
            <p className="text-lg leading-8 text-muted-foreground">
              Este bloque presenta aliados, convenios y beneficios asociados,
              reforzando confianza y dando razones concretas para inscribirse.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {partners.map((partner) => (
              <Card
                key={partner.name}
                className="border-border/80 shadow-sm transition-all hover:-translate-y-1 hover:shadow-corporate"
              >
                <CardContent className="flex h-full flex-col items-center justify-center p-5 text-center">
                  <div className="flex h-28 w-full items-center justify-center">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="max-h-24 max-w-full object-contain"
                    />
                  </div>
                  <p className="mt-4 text-sm font-bold text-corporate">
                    {partner.name}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 rounded-2xl bg-gradient-primary p-8 text-center text-primary-foreground shadow-elevated md:p-12">
            <Handshake className="mx-auto mb-4 h-10 w-10 text-accent" />
            <h3 className="text-3xl font-bold text-white">
              ¿Listo para formar parte de la red?
            </h3>
            <p className="mx-auto mt-3 max-w-2xl text-white/80">
              Completa la ficha de inscripción y recibe orientación directa por
              WhatsApp sobre la membresía ideal para ti o tu empresa.
            </p>
            <Button
              variant="accent"
              size="lg"
              className="mt-7"
              onClick={scrollToForm}
            >
              Iniciar inscripción
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;

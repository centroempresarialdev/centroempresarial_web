import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  GraduationCap,
  Handshake,
  Lightbulb,
  Network,
  PlayCircle,
  ShieldCheck,
  UserRound,
  Users,
} from "lucide-react";
import galleryCourseGroup from "@/assets/16 de septiembre 2025.jpg";
import galleryTraining from "@/assets/2025.jpg";
import galleryInnovation from "@/assets/2026.jpg";
import galleryMeeting from "@/assets/5 de septiembre 2025.jpg";

export type IconItem = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const contactInfo = {
  phone: "+51 945 228 848",
  whatsapp: "51945228848",
  email: "centroempresarialsac@gmail.com",
  address: "Calle Castrovirreyna 323, tercer piso, Ica, Peru",
  mapUrl: "https://maps.google.com/?q=Calle+Castrovirreyna+323+Ica+Peru",
};

export const metrics = [
  { label: "anos de experiencia", value: "+12" },
  { label: "categorias de membresia", value: "3" },
  { label: "beneficios activos", value: "+15" },
  { label: "canal directo de atencion", value: "24h" },
];

export const strengths: IconItem[] = [
  {
    icon: ShieldCheck,
    title: "Respaldo institucional",
    description: "Experiencia acompanando a empresas privadas, instituciones publicas y profesionales de la region.",
  },
  {
    icon: Network,
    title: "Red de aliados",
    description: "Convenios y espacios de colaboracion para abrir oportunidades comerciales, academicas e institucionales.",
  },
  {
    icon: GraduationCap,
    title: "Formacion continua",
    description: "Capacitaciones, webinars, recursos empresariales y programas especializados para distintos perfiles.",
  },
];

export const audiences = [
  { icon: Users, label: "Estudiantes", value: "Capacitaciones, blog y apoyo academico" },
  { icon: Lightbulb, label: "Profesionales", value: "Formacion continua y networking especializado" },
  { icon: Building2, label: "Empresas", value: "Consultorias, auditorias e innovacion aplicada" },
];

export const membershipPlans = [
  {
    icon: GraduationCap,
    name: "Estudiante",
    price: "S/ 360",
    period: "anual",
    audience: "Para estudiantes que quieren acceder a formacion, recursos y acompanamiento academico.",
    description: "Una entrada accesible a la comunidad para aprender, construir criterio empresarial y avanzar con soporte.",
    benefits: ["50% de descuento en capacitaciones", "Videos y blog empresarial gratuitos", "20% de descuento en monografias, tesis y proyectos"],
    bestFor: "Estudiantes tecnicos, universitarios y egresados recientes.",
    featured: false,
  },
  {
    icon: UserRound,
    name: "Profesionales",
    price: "S/ 480",
    period: "anual",
    audience: "Para profesionales que buscan actualizacion, eventos y una red de contactos con valor.",
    description: "El plan mas equilibrado para mantenerse vigente, conectar con especialistas y acceder a beneficios.",
    benefits: ["50% de descuento en capacitaciones", "Postgrado con 20% de descuento", "Eventos y webinars con ponentes internacionales"],
    bestFor: "Profesionales independientes, consultores y lideres de area.",
    featured: true,
  },
  {
    icon: BriefcaseBusiness,
    name: "Empresarial",
    price: "S/ 1,500",
    period: "anual",
    audience: "Para empresas que necesitan capacitacion, consultoria y acompanamiento de mejora continua.",
    description: "Un acceso corporativo para equipos que requieren orientacion, alianzas y herramientas aplicadas.",
    benefits: ["Capacitaciones para equipos", "Consultorias, auditorias y orientacion institucional", "IA aplicada a negocios y mejora continua"],
    bestFor: "Empresas, instituciones y equipos en crecimiento.",
    featured: false,
  },
];

export const benefitGroups = [
  {
    category: "Estudiante",
    items: ["Capacitaciones empresariales con 50% de descuento", "Videos empresariales gratuitos", "Blog empresarial gratuito", "Monografias, proyectos de tesis y tesis con 20% de descuento"],
  },
  {
    category: "Profesionales",
    items: ["Capacitaciones con 50% de descuento", "Acceso a videos y blogs", "Postgrado con 20% de descuento", "Eventos, webinars y alianzas con colegios profesionales"],
  },
  {
    category: "Empresarial",
    items: ["Capacitaciones con ponentes nacionales e internacionales", "Asesoria con instituciones publicas y privadas", "Consultorias y auditorias", "Tecnologia e inteligencia artificial aplicada a empresas"],
  },
];

export const events: IconItem[] = [
  {
    title: "Webinars empresariales",
    description: "Sesiones online para actualizar conocimientos de gestion, tecnologia, salud y negocios.",
    icon: PlayCircle,
  },
  {
    title: "Eventos institucionales",
    description: "Actividades y convocatorias para conectar asociados, aliados y especialistas.",
    icon: CalendarDays,
  },
  {
    title: "Cursos especializados",
    description: "Programas para fortalecer competencias profesionales y capacidades de equipos de trabajo.",
    icon: BookOpen,
  },
];

export const courseCards = [
  {
    title: "Comunicacion eficaz con pacientes y familiares",
    banner: "https://camaraica.org.pe/wp-content/uploads/2025/09/IMG-20250909-WA0017.avif",
  },
  {
    title: "Atencion al paciente con enfermedades cronicas",
    banner: "https://camaraica.org.pe/wp-content/uploads/2025/09/IMG-20250909-WA0018.avif",
  },
  {
    title: "Habilidades blandas para personal de salud",
    banner: "https://camaraica.org.pe/wp-content/uploads/2025/09/IMG-20250909-WA0015.avif",
  },
  {
    title: "Deteccion temprana de crecimiento y desarrollo",
    banner: "https://camaraica.org.pe/wp-content/uploads/2025/09/IMG-20250909-WA0016.avif",
  },
];

export const galleryImages = [
  { src: galleryCourseGroup, title: "Actividad institucional" },
  { src: galleryTraining, title: "Capacitacion aplicada" },
  { src: galleryInnovation, title: "Convenios y tecnologia" },
  { src: galleryMeeting, title: "Red de aliados" },
];

export const partners = [
  { name: "Piskus", logo: "https://centroempresarialica.com/media/piskus.jpg" },
  { name: "ESSALUD", logo: "https://centroempresarialica.com/media/Essalud.png" },
  { name: "Rumi Wasi", logo: "https://centroempresarialica.com/media/rumi-wasi.jpg" },
  { name: "El Sabor Milagroso", logo: "https://centroempresarialica.com/media/sabor-milagroso.jpg" },
  { name: "Camara de Comercio de Ica", logo: "https://centroempresarialica.com/media/CamaraLogo.jpg" },
];

export const associationSteps = [
  "Selecciona la categoria que corresponde a tu perfil.",
  "Completa la ficha con tus datos de contacto.",
  "Envia tu solicitud por WhatsApp para recibir orientacion.",
  "Activa beneficios, eventos, aliados y descuentos disponibles.",
];

export const executiveServices = [
  { icon: GraduationCap, label: "Capacitaciones y cursos" },
  { icon: Handshake, label: "Aliados estrategicos" },
  { icon: BriefcaseBusiness, label: "Asesoria empresarial" },
  { icon: CalendarDays, label: "Eventos y webinars" },
];

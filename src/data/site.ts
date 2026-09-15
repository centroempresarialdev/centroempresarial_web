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
import galleryCourseGroup from "@/assets/galeria/16 de septiembre 2025.jpg";
import galleryTraining from "@/assets/galeria/2025.jpg";
import galleryInnovation from "@/assets/galeria/2026.jpg";
import galleryMeeting from "@/assets/galeria/5 de septiembre 2025.jpg";
import logoIntedya from "@/assets/logos/Logo_Intedya_Alta Blanco.jpeg";
import eventParacas from "@/assets/eventos/paracas.jpg";
import eventSeguridad from "@/assets/eventos/seguridad.jpg";

export type IconItem = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export type ServiceItem = {
  title: string;
  description: string;
};

// Agrega aquí los servicios confirmados para que aparezcan automáticamente en /servicios.
export const serviceCatalog: ServiceItem[] = [];

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
    audience: "Orientada a estudiantes que buscan capacitaciones, recursos empresariales y apoyo academico.",
    description: "Acceso formativo para estudiantes que quieren avanzar con recursos, descuentos y soporte academico.",
    benefits: [
      "Capacitaciones empresariales con 50% de descuento.",
      "Videos empresariales gratuitos.",
      "Blog empresarial gratuito.",
      "Monografias, proyectos de tesis y tesis para titulacion, maestria y doctorado con 20% de descuento.",
    ],
    bestFor: "Estudiantes",
    featured: false,
  },
  {
    icon: UserRound,
    name: "Profesionales",
    price: "S/ 480",
    period: "anual",
    audience: "Orientada a profesionales que buscan formacion continua, beneficios academicos y acceso a eventos especializados.",
    description: "Una membresia para actualizar competencias, acceder a beneficios academicos y conectar con espacios especializados.",
    benefits: [
      "Capacitaciones con 50% de descuento.",
      "Acceso a videos y blogs.",
      "Postgrado con 20% de descuento.",
      "Eventos y webinars con ponentes internacionales.",
      "Alianzas estrategicas con colegios profesionales.",
    ],
    bestFor: "Profesionales",
    featured: true,
  },
  {
    icon: BriefcaseBusiness,
    name: "Empresarial",
    price: "S/ 1,500",
    period: "anual",
    audience: "Orientada a empresas que requieren capacitaciones, asesorias, consultorias y acompanamiento en mejora continua.",
    description: "Un plan corporativo para equipos que necesitan orientacion especializada, auditorias e innovacion aplicada.",
    benefits: [
      "Capacitaciones relacionadas a negocios con ponentes nacionales e internacionales.",
      "Asesorias y orientacion con instituciones publicas y privadas.",
      "Consultorias y auditorias.",
      "Asesoramiento en tecnologia aplicada a los negocios y mejora continua.",
      "Asesoria e implementacion de inteligencia artificial para empresas.",
    ],
    bestFor: "Empresas",
    featured: false,
  },
];

export const benefitGroups = [
  {
    category: "Estudiante",
    items: [
      "Capacitaciones empresariales con 50% de descuento.",
      "Videos empresariales gratuitos.",
      "Blog empresarial gratuito.",
      "Monografias, proyectos de tesis y tesis para titulacion, maestria y doctorado con 20% de descuento.",
    ],
  },
  {
    category: "Profesionales",
    items: [
      "Capacitaciones con 50% de descuento.",
      "Acceso a videos y blogs.",
      "Postgrado con 20% de descuento.",
      "Eventos y webinars con ponentes internacionales.",
      "Alianzas estrategicas con colegios profesionales.",
    ],
  },
  {
    category: "Empresarial",
    items: [
      "Capacitaciones relacionadas a negocios con ponentes nacionales e internacionales.",
      "Asesorias y orientacion con instituciones publicas y privadas.",
      "Consultorias y auditorias.",
      "Asesoramiento en tecnologia aplicada a los negocios y mejora continua.",
      "Asesoria e implementacion de inteligencia artificial para empresas.",
    ],
  },
];

export const monthlyMembership = {
  title: "Membresia mensual",
  description:
    "Estructura visual preparada para mostrar membresias mensuales cuando se definan los montos correspondientes. No se muestran importes hasta que el cliente los confirme.",
  status: "Proximamente",
};

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
  {
    name: "Intedya Internacional",
    logo: logoIntedya,
    logoScale: 1,
    summary: "Formacion, gestion empresarial y mejora continua con alcance internacional.",
    darkLogo: true,
    benefits: [
      "Acceso a conocimiento y buenas practicas empresariales de alcance internacional.",
      "Capacitacion especializada en gestion, calidad, seguridad y mejora continua.",
      "Impulso a la competitividad, innovacion y optimizacion de procesos.",
      "Prestigio institucional y oportunidades de colaboracion empresarial.",
    ],
  },
  {
    name: "Piskus",
    logo: "https://centroempresarialica.com/media/piskus.jpg",
    logoScale: 1,
    summary: "Beneficios comerciales para asociados y actividades de integracion.",
    benefits: [
      "Condiciones preferenciales para miembros activos.",
      "Oportunidades para activaciones, sorteos o campanas con la comunidad.",
      "Espacios de relacionamiento para asociados y aliados.",
    ],
  },
  {
    name: "ESSALUD",
    logo: "https://centroempresarialica.com/media/Essalud.png",
    logoScale: 1,
    summary: "Articulacion institucional orientada a bienestar, prevencion y comunidad.",
    benefits: [
      "Acceso a actividades informativas de salud preventiva cuando se programen.",
      "Orientacion institucional para iniciativas de bienestar laboral.",
      "Participacion en campanas y espacios de sensibilizacion para asociados.",
    ],
  },
  {
    name: "Rumi Wasi",
    logo: "https://centroempresarialica.com/media/rumi-wasi.jpg",
    logoScale: 1.2,
    summary: "Experiencias y espacios para integracion, reuniones y actividades corporativas.",
    benefits: [
      "Beneficios preferenciales para actividades de integracion.",
      "Opciones para reuniones, encuentros o experiencias empresariales.",
      "Apoyo para dinamicas de networking y relacionamiento entre miembros.",
    ],
  },
  {
    name: "El Sabor Milagroso",
    logo: "https://centroempresarialica.com/media/sabor-milagroso.jpg",
    logoScale: 1.6,
    summary: "Beneficios gastronomicos para asociados, reuniones y eventos.",
    benefits: [
      "Condiciones especiales para consumos o coordinaciones de asociados.",
      "Opciones para reuniones, celebraciones y encuentros de la comunidad.",
      "Apoyo en activaciones comerciales vinculadas a eventos institucionales.",
    ],
  },
  {
    name: "Camara de Comercio de Ica",
    logo: "https://camaraica.org.pe/wp-content/uploads/2026/03/LOGO-FULL-COLOR-scaled.webp",
    logoScale: 1,
    summary: "Vinculacion institucional, oportunidades empresariales y fortalecimiento comercial.",
    benefits: [
      "Acceso a espacios de relacionamiento empresarial e institucional.",
      "Mayor visibilidad para oportunidades comerciales y colaborativas.",
      "Conexion con iniciativas que fortalecen el desarrollo empresarial regional.",
    ],
  },
];

export const eventHighlights = [
  {
    src: eventParacas,
    title: "Encuentro empresarial en Paracas",
    label: "Evento institucional",
  },
  {
    src: eventSeguridad,
    title: "Capacitacion en seguridad y gestion",
    label: "Formacion aplicada",
  },
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

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  TrendingUp, 
  Users, 
  FileText, 
  Shield, 
  Briefcase, 
  GraduationCap,
  Award,
  CheckCircle 
} from "lucide-react";

const Services = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contacto');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const mainServices = [
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Consultoría Estratégica",
      description: "Desarrollo de planes estratégicos y análisis de mercado para impulsar el crecimiento empresarial",
      features: ["Análisis FODA", "Planificación estratégica", "Estudios de mercado", "Proyecciones financieras"]
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Recursos Humanos",
      description: "Gestión integral del talento humano y desarrollo organizacional",
      features: ["Selección de personal", "Evaluación de desempeño", "Capacitación laboral", "Clima organizacional"]
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Asesoría Legal",
      description: "Servicios legales especializados en derecho empresarial y laboral",
      features: ["Contratos empresariales", "Cumplimiento normativo", "Resolución de conflictos", "Auditorías legales"]
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Seguridad y Salud Ocupacional",
      description: "Implementación de sistemas de gestión en SST según normativas vigentes",
      features: ["IPERC", "Plan de SST", "Capacitaciones especializadas", "Auditorías SST"]
    },
    {
      icon: <Briefcase className="h-8 w-8" />,
      title: "Gestión de Calidad",
      description: "Implementación de sistemas de gestión de calidad ISO",
      features: ["ISO 9001", "ISO 14001", "ISO 45001", "Mejora continua"]
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "Proyectos de Inversión",
      description: "Elaboración y evaluación de proyectos de inversión pública y privada",
      features: ["Estudios de factibilidad", "Evaluación económica", "SNIP", "Seguimiento de proyectos"]
    }
  ];

  const featuredServices = [
    {
      icon: <GraduationCap className="h-12 w-12" />,
      title: "Cursos Especializados",
      description: "Programas de capacitación diseñados para potenciar las competencias profesionales",
      highlight: "Más de 50 cursos disponibles",
      color: "bg-primary"
    },
    {
      icon: <Award className="h-12 w-12" />,
      title: "Cursos para ESSALUD",
      description: "Capacitaciones específicas para el sector salud y seguridad social",
      highlight: "Certificación oficial",
      color: "bg-accent"
    }
  ];

  return (
    <section id="servicios" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-primary">
            Soluciones Empresariales
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold font-serif text-corporate mb-6">
            Nuestros Servicios
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ofrecemos una amplia gama de servicios de consultoría y asesoría 
            empresarial para impulsar el crecimiento de su organización
          </p>
        </div>

        {/* Featured Services */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {featuredServices.map((service, index) => (
            <Card key={index} className="relative overflow-hidden shadow-elevated hover:shadow-corporate transition-all duration-300 group">
              <CardContent className="p-8">
                <div className={`absolute top-0 right-0 w-32 h-32 ${service.color} rounded-full opacity-10 transform translate-x-16 -translate-y-16 group-hover:scale-110 transition-transform duration-300`}></div>
                <div className="relative z-10">
                  <div className={`inline-flex p-4 ${service.color} text-white rounded-lg mb-6`}>
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-corporate mb-4">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 text-lg">
                    {service.description}
                  </p>
                  <div className="flex items-center gap-2 text-accent font-semibold">
                    <CheckCircle className="h-5 w-5" />
                    {service.highlight}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {mainServices.map((service, index) => (
            <Card key={index} className="hover:shadow-corporate transition-all duration-300 hover:scale-105 group">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-corporate">
                    {service.title}
                  </h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-primary p-12 rounded-lg shadow-elevated">
          <h3 className="text-3xl font-bold text-primary-foreground mb-4">
            ¿Listo para Transformar tu Empresa?
          </h3>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Contacta con nuestros expertos y descubre cómo podemos ayudarte 
            a alcanzar tus objetivos empresariales
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="hero"
              size="lg"
              onClick={scrollToContact}
              className="bg-background text-primary hover:bg-background/90"
            >
              Solicitar Consulta Gratuita
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
            >
              Ver Todos los Servicios
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, TrendingUp, Users, FileText, Shield, Briefcase, GraduationCap, Award, CheckCircle } from "lucide-react";
const Services = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contacto');
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  const mainServices = [{
    icon: <GraduationCap className="h-8 w-8" />,
    title: "Cursos para ESSALUD",
    description: "Programas de capacitación especializados para el personal de ESSALUD y Red de Salud Ica, diseñados para fortalecer competencias en el sector salud",
    features: ["Capacitación en gestión hospitalaria", "Actualización en normativas de salud", "Desarrollo de competencias técnicas", "Protocolos de atención", "Gestión administrativa", "Calidad en servicios de salud", "Certificación oficial"]
  }];
  const cursos = [{
    id: 1,
    nombre: "Estrategias de Comunicacion Eficaz con Pacientes y Familiares",
    banner: "https://camaraica.org.pe/wp-content/uploads/2025/09/IMG-20250909-WA0017.avif",
    link: "/cursos/marketing-digital"
  }, {
    id: 2,
    nombre: "Atención al Paciente con Enfermedades Crónicas",
    banner: "https://camaraica.org.pe/wp-content/uploads/2025/09/IMG-20250909-WA0018.avif",
    link: "/cursos/finanzas"
  }, {
    id: 3,
    nombre: "Desarrollo de Habilidades Blandas para el personal de Salud",
    banner: "https://camaraica.org.pe/wp-content/uploads/2025/09/IMG-20250909-WA0015.avif",
    link: "/cursos/ventas"
  }, {
    id: 4,
    nombre: "Curso Deteccion Temprana de Problemas de Crecimiento y Desarrollo de los Niños",
    banner: "https://camaraica.org.pe/wp-content/uploads/2025/09/IMG-20250909-WA0016.avif",
    link: "/cursos/liderazgo"
  }];
  const featuredServices = [{
    icon: <GraduationCap className="h-12 w-12" />,
    title: "Cursos para ESSALUD - Red de Salud Ica",
    description: "Programas de capacitación especializados para el personal de ESSALUD - Red de Salud Ica, diseñados para fortalecer competencias en el sector salud",
    highlight: "Certificación oficial",
    color: "bg-primary",
    features: ["Capacitación en gestión hospitalaria", "Actualización en normativas de salud", "Desarrollo de competencias técnicas", "Protocolos de atención", "Gestión administrativa", "Calidad en servicios de salud"]
  }, {
    icon: <Award className="h-12 w-12" />,
    title: "Cursos Especializados",
    description: "Programas de capacitación diseñados para potenciar las competencias profesionales en diversas áreas empresariales",
    highlight: "Más de 50 cursos disponibles",
    color: "bg-accent"
  }];
  return <section id="servicios" className="py-20 bg-background">
      <div className="container mx-auto px-8 lg:px-16">{/* Added more side padding */}
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
          {featuredServices.map((service, index) => <Card key={index} className="relative overflow-hidden shadow-elevated hover:shadow-corporate transition-all duration-500 group cursor-pointer hover:scale-[1.02] transform-gpu">
              <CardContent className="p-8 relative">
                {/* Animated background elements */}
                <div className={`absolute top-0 right-0 w-32 h-32 ${service.color} rounded-full opacity-10 transform translate-x-16 -translate-y-16 group-hover:scale-125 group-hover:opacity-20 transition-all duration-500`}></div>
                <div className={`absolute bottom-0 left-0 w-24 h-24 ${service.color} rounded-full opacity-5 transform -translate-x-12 translate-y-12 group-hover:scale-110 transition-all duration-700 delay-100`}></div>
                
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-${service.color.replace('bg-', '')}/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                <div className="relative z-10">
                  <div className={`inline-flex p-4 ${service.color} text-white rounded-lg mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg group-hover:shadow-xl`}>
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-corporate mb-4 group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 text-lg group-hover:text-foreground transition-colors duration-300">
                    {service.description}
                  </p>
                  
                  {/* Features list for ESSALUD service */}
                  {service.features && <ul className="space-y-2 mb-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-200">
                      {service.features.slice(0, 3).map((feature, featureIndex) => <li key={featureIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="h-4 w-4 text-primary animate-pulse" />
                          {feature}
                        </li>)}
                    </ul>}
                  
                  <div className="flex items-center gap-2 text-accent font-semibold group-hover:scale-105 transition-transform duration-300">
                    <CheckCircle className="h-5 w-5 group-hover:animate-bounce" />
                    {service.highlight}
                  </div>
                </div>
                
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
              </CardContent>
            </Card>)}
        </div>


        {/* Course Banners Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 text-primary">
              Cursos Disponibles
            </Badge>
            <h3 className="text-3xl md:text-4xl font-bold font-serif text-corporate mb-4">Cursos Especializados</h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ofrecemos una amplia variedad de cursos diseñados para potenciar las competencias profesionales
            </p>
          </div>
          
          {/* Course Banners Grid - Space for 8 course banners */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {cursos.map(curso => <a key={curso.id} href={curso.link} // si usás React Router, sería <Link to={curso.link}>
          className="block rounded-lg overflow-hidden shadow-md hover:shadow-xl transition">
      <img src={curso.banner} alt={curso.nombre} className="w-full aspect-square object-cover" />

      <div className="p-3 bg-white">
        <h3 className="text-sm font-semibold text-gray-800">
          {curso.nombre}
        </h3>
      </div>
    </a>)}
        </div>
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
            <Button variant="hero" size="lg" onClick={scrollToContact} className="bg-background text-primary hover:bg-background/90">
              Solicitar Consulta Gratuita
            </Button>
            
            
          </div>
        </div>
      </div>
    </section>;
};
export default Services;
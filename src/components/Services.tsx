import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, TrendingUp, Users, FileText, Shield, Briefcase, GraduationCap, Award, CheckCircle, ArrowRight } from "lucide-react";
import servicesImage from "@/assets/services-header.jpg";
import essaludImage from "@/assets/essalud-training.jpg";
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
  return <section id="servicios" className="py-20 bg-muted/30">
      <div className="container mx-auto px-8 lg:px-16">
        {/* Section Header with Image - Right Text, Left Image */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="relative overflow-hidden rounded-lg shadow-elevated">
            <img 
              src={servicesImage} 
              alt="Servicios de Consultoría" 
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent"></div>
          </div>
          <div className="text-left">
            <Badge variant="outline" className="mb-4 text-primary">
              Soluciones Empresariales
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold font-serif text-corporate mb-6">
              Nuestros Servicios
            </h2>
            <p className="text-xl text-muted-foreground mb-6">
              Ofrecemos una amplia gama de servicios de consultoría y asesoría 
              empresarial para impulsar el crecimiento de su organización
            </p>
            <p className="text-lg text-muted-foreground">
              Nuestros servicios están diseñados para adaptarse a las necesidades específicas 
              de cada empresa, garantizando soluciones efectivas y sostenibles.
            </p>
          </div>
        </div>

        {/* Featured Services - Interactive Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {/* ESSALUD Card */}
          <div className="group relative overflow-hidden rounded-2xl shadow-elevated hover:shadow-2xl transition-all duration-500 cursor-pointer h-[500px]">
            {/* Image */}
            <div className="absolute inset-0 h-1/2">
              <img 
                src={essaludImage} 
                alt="Cursos ESSALUD" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/20"></div>
            </div>
            
            {/* Content - Normal State */}
            <div className="absolute bottom-0 left-0 right-0 bg-primary text-white p-8 transition-all duration-500 group-hover:h-full group-hover:bg-primary/95 flex flex-col justify-end">
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">
                      Cursos para ESSALUD - Red de Salud Ica
                    </h3>
                    <p className="text-white/90 font-medium">
                      Programas especializados
                    </p>
                  </div>
                  <div className="bg-white/20 p-3 rounded-full group-hover:rotate-45 transition-transform duration-500">
                    <ArrowRight className="h-6 w-6" />
                  </div>
                </div>
                
                {/* Expanded content - Shows on hover */}
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 max-h-0 group-hover:max-h-96 overflow-hidden">
                  <div className="pt-4 border-t border-white/20 space-y-3">
                    <p className="text-white/95">
                      Capacitación especializada para el personal de ESSALUD y Red de Salud Ica, 
                      diseñados para fortalecer competencias en el sector salud.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 flex-shrink-0" />
                        Capacitación en gestión hospitalaria
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 flex-shrink-0" />
                        Actualización en normativas de salud
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 flex-shrink-0" />
                        Desarrollo de competencias técnicas
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 flex-shrink-0" />
                        Certificación oficial
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cursos Especializados Card */}
          <div className="group relative overflow-hidden rounded-2xl shadow-elevated hover:shadow-2xl transition-all duration-500 cursor-pointer h-[500px]">
            {/* Image */}
            <div className="absolute inset-0 h-1/2">
              <img 
                src={servicesImage} 
                alt="Cursos Especializados" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-accent/20"></div>
            </div>
            
            {/* Content - Normal State */}
            <div className="absolute bottom-0 left-0 right-0 bg-accent text-white p-8 transition-all duration-500 group-hover:h-full group-hover:bg-accent/95 flex flex-col justify-end">
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">
                      Cursos Especializados
                    </h3>
                    <p className="text-white/90 font-medium">
                      Más de 50 cursos disponibles
                    </p>
                  </div>
                  <div className="bg-white/20 p-3 rounded-full group-hover:rotate-45 transition-transform duration-500">
                    <ArrowRight className="h-6 w-6" />
                  </div>
                </div>
                
                {/* Expanded content - Shows on hover */}
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 max-h-0 group-hover:max-h-96 overflow-hidden">
                  <div className="pt-4 border-t border-white/20 space-y-3">
                    <p className="text-white/95">
                      Programas de capacitación diseñados para potenciar las competencias 
                      profesionales en diversas áreas empresariales.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 flex-shrink-0" />
                        Marketing Digital y Ventas
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 flex-shrink-0" />
                        Gestión Financiera y Contabilidad
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 flex-shrink-0" />
                        Recursos Humanos y Liderazgo
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 flex-shrink-0" />
                        Gestión de Proyectos
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
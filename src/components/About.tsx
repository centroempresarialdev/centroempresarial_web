import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, Eye, Heart, Lightbulb, Handshake, Users } from "lucide-react";
import aboutImage from "@/assets/about-nosotros.jpg";
const About = () => {
  const values = [{
    icon: <Target className="h-6 w-6" />,
    title: "Excelencia",
    description: "Comprometidos con la más alta calidad en todos nuestros servicios"
  }, {
    icon: <Heart className="h-6 w-6" />,
    title: "Integridad",
    description: "Actuamos con transparencia y ética en cada proyecto"
  }, {
    icon: <Lightbulb className="h-6 w-6" />,
    title: "Innovación",
    description: "Soluciones creativas y actualizadas para cada desafío"
  }, {
    icon: <Handshake className="h-6 w-6" />,
    title: "Compromiso",
    description: "Dedicados al éxito y crecimiento de nuestros clientes"
  }];
  const partners = [{
    name: "Piskus",
    logo: "https://centroempresarialica.com/media/piskus.jpg"
  }, {
    name: "ESSALUD",
    logo: "https://centroempresarialica.com/media/Essalud.png"
  }, {
    name: "Rumi Wasi",
    logo: "https://centroempresarialica.com/media/rumi-wasi.jpg"
  }, {
    name: "El Sabor Milagroso",
    logo: "https://centroempresarialica.com/media/sabor-milagroso.jpg"
  }, {
    name: "Cámara de Comercio de Ica",
    logo: "https://centroempresarialica.com/media/CamaraLogo.jpg"
  }];
  return <section id="nosotros" className="py-20 bg-background">
      <div className="container mx-auto px-8 lg:px-16">
        {/* Section Header with Image - Left Text, Right Image */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="text-left">
            <Badge variant="outline" className="mb-4 text-primary">
              Experiencia y Confianza
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold font-serif text-corporate mb-6">
              Sobre Nosotros
            </h2>
            <p className="text-xl text-muted-foreground mb-6">
              Somos un equipo multidisciplinario de expertos dedicados a impulsar 
              el éxito de tu organización
            </p>
            <p className="text-lg text-muted-foreground">
              Con más de 12 años de experiencia en el mercado, Centro Empresarial se ha consolidado 
              como un referente en consultoría y asesoría empresarial en la región de Ica y a nivel nacional.
            </p>
          </div>
          <div className="relative overflow-hidden rounded-lg shadow-elevated order-first lg:order-last">
            <img 
              src={aboutImage} 
              alt="Equipo de Centro Empresarial" 
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent"></div>
          </div>
        </div>

        {/* Company Story */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-corporate">
              Nuestra Historia
            </h3>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                Con más de 12 años de experiencia en el sector, <strong className="text-corporate">Centro empresarial – Asesores y Consultores</strong> se ha consolidado como una firma líder en consultoría y asesoría empresarial en Ica y la región.
              </p>
              <p>
                A lo largo de los años, hemos crecido hasta convertirnos en una firma 
                de consultoría reconocida, trabajando con empresas privadas e instituciones 
                públicas, siempre manteniendo nuestro compromiso con la excelencia y 
                la innovación en cada proyecto.
              </p>
              <p>
                Nuestro enfoque personalizado y nuestra profunda comprensión del mercado 
                local nos han permitido generar resultados excepcionales para nuestros clientes.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            {/* Mission */}
            <Card className="shadow-corporate">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-corporate mb-3">Misión</h4>
                    <p className="text-muted-foreground">
                      Brindar soluciones estratégicas de alta calidad que impulsen 
                      el crecimiento y la competitividad de nuestros clientes, 
                      contribuyendo al desarrollo empresarial sostenible de la región.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Vision */}
            <Card className="shadow-corporate">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-accent/10 rounded-lg">
                    <Eye className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-corporate mb-3">Visión</h4>
                    <p className="text-muted-foreground">
                      Ser la firma de consultoría empresarial líder en el sur del Perú, 
                      reconocida por nuestra excelencia, innovación y compromiso con 
                      el éxito de nuestros clientes.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-corporate text-center mb-12">
            Nuestros Valores
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => <Card key={index} className="text-center hover:shadow-corporate transition-all duration-300 hover:scale-105">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-primary/10 rounded-full text-primary">
                      {value.icon}
                    </div>
                  </div>
                  <h4 className="text-xl font-bold text-corporate mb-3">
                    {value.title}
                  </h4>
                  <p className="text-muted-foreground">
                    {value.description}
                  </p>
                </CardContent>
              </Card>)}
          </div>
        </div>

        {/* Eslogan */}
        <div className="text-center mb-20">
          <div className="bg-gradient-primary p-8 rounded-lg shadow-elevated">
            <h3 className="text-3xl font-bold font-serif text-primary-foreground mb-4">
              "Transformamos Ideas en Resultados"
            </h3>
            <p className="text-xl text-primary-foreground/90">
              Tu éxito es nuestro compromiso
            </p>
          </div>
        </div>


        {/* Strategic Partners */}
        <div className="text-center">
          <h3 className="text-3xl font-bold text-corporate mb-12">
            Nuestros Socios Estratégicos
          </h3>
        <div className="flex flex-wrap justify-center gap-6">
  {partners.map((partner, index) => <Card key={index} className="w-48 hover:shadow-corporate transition-all duration-300">
      <CardContent className="p-4 text-center flex flex-col items-center">
        <div className="flex items-center justify-center h-40 mb-3">
          <img src={partner.logo} alt={partner.name} className="h-40 w-auto object-contain" />
        </div>
        <p className="text-sm font-medium text-muted-foreground">
          {partner.name}
        </p>
      </CardContent>
    </Card>)}
        </div>
        </div>
      </div>
    </section>;
};
export default About;
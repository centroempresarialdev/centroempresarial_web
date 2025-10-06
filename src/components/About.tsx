import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, Eye, Heart, Lightbulb, Handshake, Users } from "lucide-react";
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
    logo: "https://tuservidor.com/logos/piskus.png"
  }, {
    name: "ESSALUD",
    logo: "https://tuservidor.com/logos/essalud.png"
  }, {
    name: "Rumi Wasi",
    logo: "https://tuservidor.com/logos/rumiwasi.png"
  }, {
    name: "El Sabor Milagroso",
    logo: "https://tuservidor.com/logos/sabor-milagroso.png"
  }, {
    name: "Cámara de Comercio de Ica",
    logo: "https://tuservidor.com/logos/camara-ica.png"
  }];
  return <section id="nosotros" className="py-20 bg-background">{/* White background */}
      <div className="container mx-auto px-8 lg:px-16">{/* Added more side padding */}
        {/* Section Header with Image */}
        <div className="mb-16">
          <div className="relative h-[400px] rounded-lg overflow-hidden mb-8">
            <img 
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=2000" 
              alt="Nuestro equipo" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 flex items-center">
              <div className="container mx-auto px-8">
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-4 text-left">
                  Nosotros
                </h2>
                <p className="text-xl md:text-2xl text-white/90 max-w-2xl text-left">
                  Somos una firma líder en consultoría empresarial con más de una década 
                  de experiencia transformando negocios en la región de Ica
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Company Story with Image */}
        <div className="mb-20">
          <div className="relative h-[300px] rounded-lg overflow-hidden mb-8">
            <img 
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=2000" 
              alt="Nuestra historia" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/40 flex items-center">
              <div className="container mx-auto px-8">
                <h3 className="text-4xl md:text-5xl font-extrabold text-white text-left">
                  Nuestra Historia
                </h3>
              </div>
            </div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-6">
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
        </div>

        {/* Values with Image Header */}
        <div className="mb-20">
          <div className="relative h-[250px] rounded-lg overflow-hidden mb-8">
            <img 
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=2000" 
              alt="Nuestros valores" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-accent/80 to-accent/40 flex items-center">
              <div className="container mx-auto px-8">
                <h3 className="text-4xl md:text-5xl font-extrabold text-white text-left">
                  Nuestros Valores
                </h3>
              </div>
            </div>
          </div>
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
  {partners.map((partner, index) => <Card key={index} className="w-40 hover:shadow-corporate transition-all duration-300">
      <CardContent className="p-4 text-center flex flex-col items-center">
        <div className="flex items-center justify-center h-16 mb-3">
          <img src={partner.logo} alt={partner.name} className="h-12 w-auto object-contain" />
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
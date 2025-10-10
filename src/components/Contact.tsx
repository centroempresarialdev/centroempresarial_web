import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send,
  User,
  MessageCircle
} from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Here you would normally send to your n8n webhook
      // Replace this URL with your actual n8n webhook URL
      const webhookUrl = 'https://n8n-n8n.ricijy.easypanel.host/webhook/03033f2e-7822-4fa4-b213-93547a929ad8';
      
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: "Mensaje Enviado",
          description: "Gracias por contactarnos. Te responderemos pronto.",
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          service: '',
          message: ''
        });
      } else {
        throw new Error('Error al enviar el mensaje');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema al enviar tu mensaje. Inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Oficina Principal",
      content: "Calle Castrovirreyna 323, Tercer piso, Ica, Perú",
      link: "https://maps.google.com/?q=Calle+Castrovirreyna+323+Ica+Peru"
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Teléfono",
      content: "+51 945 228 848",
      link: "tel:+51945228848"
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      content: "centroempresarialsac@gmail.com",
      link: "mailto:centroempresarialsac@gmail.com"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Horarios",
      content: "Lunes - Viernes: 8:00 AM - 6:00 PM",
      link: null
    }
  ];

  return (
    <section id="contacto" className="py-20 bg-background">
      <div className="container mx-auto px-8 lg:px-16">
        {/* Section Header */}
        <div className="text-left mb-12">
          <Badge variant="outline" className="mb-4 text-primary">
            Hablemos de tu Proyecto
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold font-serif text-corporate mb-6">
            Contáctanos
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Estamos aquí para ayudarte a transformar tu empresa. 
            Contacta con nuestros expertos para una consulta personalizada
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Form - Takes 3 columns */}
          <Card className="shadow-elevated lg:col-span-3">
            <CardHeader>
              <CardTitle className="text-2xl text-corporate flex items-center gap-2">
                <MessageCircle className="h-6 w-6 text-primary" />
                Envíanos un Mensaje
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Nombre Completo *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Tu nombre completo"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                      Teléfono
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+51 999 999 999"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
                      Empresa
                    </label>
                    <Input
                      id="company"
                      name="company"
                      type="text"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Nombre de tu empresa"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-foreground mb-2">
                    Servicio de Interés
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="">Selecciona un servicio</option>
                    <option value="consultoria-estrategica">Consultoría Estratégica</option>
                    <option value="recursos-humanos">Recursos Humanos</option>
                    <option value="asesoria-legal">Asesoría Legal</option>
                    <option value="seguridad-salud">Seguridad y Salud Ocupacional</option>
                    <option value="gestion-calidad">Gestión de Calidad</option>
                    <option value="proyectos-inversion">Proyectos de Inversión</option>
                    <option value="cursos">Cursos Especializados</option>
                    <option value="cursos-essalud">Cursos para ESSALUD</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Mensaje *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Cuéntanos sobre tu proyecto o consulta..."
                    rows={5}
                  />
                </div>

                <Button
                  type="submit"
                  variant="corporate"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? (
                    "Enviando..."
                  ) : (
                    <>
                      Enviar Mensaje
                      <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information - Takes 2 columns */}
          <div className="space-y-8 lg:col-span-2">
            <Card className="shadow-elevated">
              <CardHeader>
                <CardTitle className="text-2xl text-corporate flex items-center gap-2">
                  <User className="h-6 w-6 text-primary" />
                  Información de Contacto
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg text-primary">
                      {info.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-corporate mb-1">
                        {info.title}
                      </h4>
                      {info.link ? (
                        <a
                          href={info.link}
                          target={info.link.startsWith('http') ? '_blank' : undefined}
                          rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          {info.content}
                        </a>
                      ) : (
                        <p className="text-muted-foreground">{info.content}</p>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Call to Action */}
            <Card className="shadow-elevated bg-gradient-primary">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-primary-foreground mb-4">
                  ¿Necesitas una Consulta Urgente?
                </h3>
                <p className="text-primary-foreground/90 mb-6">
                  Llámanos directamente para una respuesta inmediata
                </p>
                <Button
                  variant="hero"
                  size="lg"
                  asChild
                  className="bg-background text-primary hover:bg-background/90"
                >
                  <a href="tel:+51945228848">
                    <Phone className="mr-2 h-4 w-4" />
                    Llamar Ahora
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
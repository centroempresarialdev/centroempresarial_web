import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import ScrollReveal from "@/components/ScrollReveal";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { contactInfo } from "@/data/site";
import { Building2, Mail, MapPin, MessageCircle, Phone, Send, UserCheck } from "lucide-react";

const interestedTypes = ["Estudiante", "Profesional", "Corporacion", "Empresa"];
const membershipTypes = ["Estudiante - S/ 360 anual", "Profesionales - S/ 480 anual", "Empresarial - S/ 1,500 anual", "Evaluacion mensual bajo consulta", "Necesito orientacion"];

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    interestedType: "",
    membership: "",
    message: "",
  });

  const whatsappPreview = useMemo(() => {
    return [
      "Hola, deseo recibir informacion para asociarme al Centro Empresarial.",
      `Nombre / Razon social: ${formData.name || "-"}`,
      `Telefono / WhatsApp: ${formData.phone || "-"}`,
      `Correo: ${formData.email || "-"}`,
      `Tipo de interesado: ${formData.interestedType || "-"}`,
      `Membresia de interes: ${formData.membership || "-"}`,
      `Consulta adicional: ${formData.message || "-"}`,
    ].join("\n");
  }, [formData]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!formData.name || !formData.phone || !formData.email || !formData.interestedType || !formData.membership) {
      toast({
        title: "Completa los datos requeridos",
        description: "Nombre, telefono, correo, tipo de interesado y membresia son obligatorios.",
        variant: "destructive",
      });
      return;
    }

    const whatsappUrl = `https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent(whatsappPreview)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    toast({
      title: "Solicitud preparada",
      description: "Se abrio WhatsApp con tu mensaje de inscripcion.",
    });
  };

  return (
    <section id="contacto" className="bg-muted/35 pt-36 pb-20">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55 }}
          >
            <Badge variant="outline" className="mb-4 text-primary">
              Ficha de inscripcion
            </Badge>
            <h1 className="max-w-3xl text-4xl font-extrabold leading-tight text-corporate md:text-6xl">
              Solicita orientacion y recibe una respuesta directa
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
              Completa los datos principales y la web preparara un mensaje profesional para continuar por WhatsApp con el asesor.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { icon: UserCheck, title: "Datos claros", text: "Nombre, telefono y correo." },
                { icon: Building2, title: "Perfil correcto", text: "Estudiante, profesional o empresa." },
                { icon: MessageCircle, title: "Cierre directo", text: "Mensaje listo para WhatsApp." },
              ].map((item, index) => (
                <ScrollReveal key={item.title} delay={index * 0.07} className="rounded-lg border border-border bg-background p-5 shadow-sm">
                  <item.icon className="mb-4 h-6 w-6 text-primary" />
                  <h2 className="text-base font-bold text-corporate">{item.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{item.text}</p>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal>
            <Card className="mt-8 border-border/80 bg-primary text-primary-foreground shadow-elevated">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-white">Atencion directa</h2>
                <div className="mt-5 space-y-4 text-white/80">
                  <a href={`tel:${contactInfo.phone.replace(/\s/g, "")}`} className="flex items-center gap-3 transition-opacity hover:opacity-85">
                    <Phone className="h-5 w-5 text-accent" />
                    {contactInfo.phone}
                  </a>
                  <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-3 transition-opacity hover:opacity-85">
                    <Mail className="h-5 w-5 text-accent" />
                    {contactInfo.email}
                  </a>
                  <a href={contactInfo.mapUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 transition-opacity hover:opacity-85">
                    <MapPin className="mt-0.5 h-5 w-5 text-accent" />
                    {contactInfo.address}
                  </a>
                </div>
              </CardContent>
            </Card>
            </ScrollReveal>
          </motion.div>

          <motion.div
            id="inscripcion"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="scroll-mt-32"
          >
            <Card className="border-border/80 shadow-elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl text-corporate">
                  <MessageCircle className="h-6 w-6 text-primary" />
                  Solicitud de membresia
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-semibold text-foreground">
                      Nombre y apellidos / razon social *
                    </label>
                    <Input id="name" name="name" value={formData.name} onChange={handleInputChange} placeholder="Ej. Juan Perez / Empresa SAC" />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-foreground">
                        Telefono o WhatsApp *
                      </label>
                      <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+51 999 999 999" />
                    </div>
                    <div>
                      <label htmlFor="email" className="mb-2 block text-sm font-semibold text-foreground">
                        Correo electronico *
                      </label>
                      <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="tu@email.com" />
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="interestedType" className="mb-2 block text-sm font-semibold text-foreground">
                        Tipo de interesado *
                      </label>
                      <select id="interestedType" name="interestedType" value={formData.interestedType} onChange={handleInputChange} className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                        <option value="">Seleccionar</option>
                        {interestedTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="membership" className="mb-2 block text-sm font-semibold text-foreground">
                        Membresia de interes *
                      </label>
                      <select id="membership" name="membership" value={formData.membership} onChange={handleInputChange} className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                        <option value="">Seleccionar</option>
                        {membershipTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="mb-2 block text-sm font-semibold text-foreground">
                      Mensaje o consulta adicional
                    </label>
                    <Textarea id="message" name="message" value={formData.message} onChange={handleInputChange} placeholder="Cuentanos que necesitas o que beneficio te interesa..." rows={5} />
                  </div>

                  <Button type="submit" variant="accent" size="lg" className="w-full text-base">
                    Enviar por WhatsApp
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
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
const membershipTypes = [
  "Estudiante - S/ 360 anual",
  "Profesional - S/ 480 anual",
  "Empresarial - S/ 1,500 anual",
  "Evaluacion mensual bajo consulta",
  "Necesito orientacion",
];

const Contact = () => {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    interestedType: "",
    membership: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const planParam = searchParams.get("plan")?.toLowerCase();
    if (!planParam) return;

    if (planParam.includes("estudiante")) {
      setFormData((prev) => ({
        ...prev,
        interestedType: prev.interestedType || "Estudiante",
        membership: prev.membership || "Estudiante - S/ 360 anual",
      }));
    } else if (planParam.includes("profesional")) {
      setFormData((prev) => ({
        ...prev,
        interestedType: prev.interestedType || "Profesional",
        membership: prev.membership || "Profesional - S/ 480 anual",
      }));
    } else if (planParam.includes("empresa") || planParam.includes("corporaci")) {
      setFormData((prev) => ({
        ...prev,
        interestedType: prev.interestedType || "Empresa",
        membership: prev.membership || "Empresarial - S/ 1,500 anual",
      }));
    }
  }, [searchParams]);

  const whatsappPreview = useMemo(() => {
    const lines = [
      "👋 *Hola, deseo recibir información para asociarme al Centro Empresarial:*",
      "",
      `👤 *Nombre / Razón social:* ${formData.name.trim() || "-"}`,
      `📱 *Teléfono:* ${formData.phone.trim() || "-"}`,
      `✉️ *Correo:* ${formData.email.trim() || "-"}`,
      `🎯 *Tipo de interesado:* ${formData.interestedType || "-"}`,
      `💳 *Membresía de interés:* ${formData.membership || "-"}`,
    ];
    if (formData.message.trim()) {
      lines.push(`💬 *Consulta adicional:* ${formData.message.trim()}`);
    }
    return lines.join("\n");
  }, [formData]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const rest = { ...prev };
        delete rest[name];
        return rest;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Ingresa tu nombre o razón social.";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "El nombre debe tener al menos 3 caracteres.";
    }

    const digits = formData.phone.replace(/\D/g, "");
    if (!formData.phone.trim()) {
      newErrors.phone = "Ingresa tu teléfono o WhatsApp.";
    } else if (digits.length < 9) {
      newErrors.phone = "Ingresa un número válido de al menos 9 dígitos.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Ingresa tu correo electrónico.";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Ingresa un correo electrónico válido.";
    }

    if (!formData.interestedType) {
      newErrors.interestedType = "Selecciona el tipo de interesado.";
    }

    if (!formData.membership) {
      newErrors.membership = "Selecciona la membresía de interés.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!validate()) {
      toast({
        title: "Completa los datos requeridos",
        description: "Revisa los campos destacados en rojo.",
        variant: "destructive",
      });
      return;
    }

    const cleanRecipient = contactInfo.whatsapp.replace(/\D/g, "");
    const whatsappUrl = `https://wa.me/${cleanRecipient}?text=${encodeURIComponent(whatsappPreview)}`;
    const popup = window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    if (!popup || popup.closed || typeof popup.closed === "undefined") {
      window.location.href = whatsappUrl;
    }

    toast({
      title: "Solicitud preparada",
      description: "Se abrió WhatsApp con tu mensaje de inscripción.",
    });
  };

  return (
    <section id="contacto" className="bg-muted/35 pb-14 pt-28 md:pb-20 md:pt-36">
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
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-semibold text-foreground">
                      Nombre y apellidos / razón social <span className="text-destructive">*</span>
                    </label>
                    <Input
                      id="name"
                      name="name"
                      autoComplete="name"
                      required
                      aria-required="true"
                      aria-invalid={!!errors.name}
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Ej. Juan Pérez / Empresa SAC"
                      className={errors.name ? "border-destructive focus-visible:ring-destructive" : ""}
                    />
                    {errors.name && <p className="mt-1.5 text-xs font-medium text-destructive">{errors.name}</p>}
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-foreground">
                        Teléfono o WhatsApp <span className="text-destructive">*</span>
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        required
                        aria-required="true"
                        aria-invalid={!!errors.phone}
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+51 999 999 999"
                        className={errors.phone ? "border-destructive focus-visible:ring-destructive" : ""}
                      />
                      {errors.phone && <p className="mt-1.5 text-xs font-medium text-destructive">{errors.phone}</p>}
                    </div>
                    <div>
                      <label htmlFor="email" className="mb-2 block text-sm font-semibold text-foreground">
                        Correo electrónico <span className="text-destructive">*</span>
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        aria-required="true"
                        aria-invalid={!!errors.email}
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="tu@email.com"
                        className={errors.email ? "border-destructive focus-visible:ring-destructive" : ""}
                      />
                      {errors.email && <p className="mt-1.5 text-xs font-medium text-destructive">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="interestedType" className="mb-2 block text-sm font-semibold text-foreground">
                        Tipo de interesado <span className="text-destructive">*</span>
                      </label>
                      <select
                        id="interestedType"
                        name="interestedType"
                        required
                        aria-required="true"
                        aria-invalid={!!errors.interestedType}
                        value={formData.interestedType}
                        onChange={handleInputChange}
                        className={`h-10 w-full rounded-md border bg-background px-3 text-sm focus:outline-none focus:ring-2 ${
                          errors.interestedType ? "border-destructive focus:ring-destructive" : "border-input focus:ring-ring"
                        }`}
                      >
                        <option value="">Seleccionar</option>
                        {interestedTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                      {errors.interestedType && <p className="mt-1.5 text-xs font-medium text-destructive">{errors.interestedType}</p>}
                    </div>
                    <div>
                      <label htmlFor="membership" className="mb-2 block text-sm font-semibold text-foreground">
                        Membresía de interés <span className="text-destructive">*</span>
                      </label>
                      <select
                        id="membership"
                        name="membership"
                        required
                        aria-required="true"
                        aria-invalid={!!errors.membership}
                        value={formData.membership}
                        onChange={handleInputChange}
                        className={`h-10 w-full rounded-md border bg-background px-3 text-sm focus:outline-none focus:ring-2 ${
                          errors.membership ? "border-destructive focus:ring-destructive" : "border-input focus:ring-ring"
                        }`}
                      >
                        <option value="">Seleccionar</option>
                        {membershipTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                      {errors.membership && <p className="mt-1.5 text-xs font-medium text-destructive">{errors.membership}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="mb-2 block text-sm font-semibold text-foreground">
                      Mensaje o consulta adicional
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Cuéntanos qué necesitas o qué beneficio te interesa..."
                      rows={5}
                    />
                  </div>

                  <Button type="submit" variant="accent" size="lg" className="w-full text-base font-semibold shadow-md">
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

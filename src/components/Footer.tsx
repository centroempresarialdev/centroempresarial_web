import { Link } from "react-router-dom";
import { contactInfo, executiveServices } from "@/data/site";
import { ArrowRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const whatsappUrl = `https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent("Hola, deseo recibir informacion para asociarme al Centro Empresarial.")}`;

  const links = [
    { name: "Inicio", href: "/" },
    { name: "Membresias", href: "/membresias" },
    { name: "Eventos", href: "/eventos" },
    { name: "Aliados", href: "/aliados" },
    { name: "Contacto", href: "/contacto" },
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-6 py-12 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.7fr_0.9fr_1.05fr]">
          <div>
            <Link to="/" className="inline-flex rounded-md bg-white p-3" aria-label="Ir al inicio">
              <img
                src="https://camaraica.org.pe/wp-content/uploads/2025/09/CENTRO.avif"
                alt="Centro Empresarial"
                className="h-12 w-auto"
              />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-7 text-white/72">
              Membresias, eventos, capacitacion y aliados estrategicos para crecer con una red empresarial activa.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-accent px-4 py-3 text-sm font-bold text-accent-foreground transition-colors hover:bg-accent-light"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
              <Link
                to="/contacto"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-white/20 px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-white hover:text-primary"
              >
                Contacto
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-[0.18em] text-accent">Mapa</h3>
            <ul className="mt-5 space-y-3">
              {links.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm font-semibold text-white/72 transition-colors hover:text-accent">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-[0.18em] text-accent">Enfoque</h3>
            <ul className="mt-5 space-y-4">
              {executiveServices.map((service) => (
                <li key={service.label} className="flex items-center gap-3 text-sm text-white/72">
                  <service.icon className="h-4 w-4 shrink-0 text-accent" />
                  <span>{service.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-[0.18em] text-accent">Contacto</h3>
            <div className="mt-5 space-y-4 text-sm text-white/72">
              <a href={`tel:${contactInfo.phone.replace(/\s/g, "")}`} className="flex items-center gap-3 transition-colors hover:text-accent">
                <Phone className="h-5 w-5 shrink-0 text-accent" />
                <span>{contactInfo.phone}</span>
              </a>
              <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-3 transition-colors hover:text-accent">
                <Mail className="h-5 w-5 shrink-0 text-accent" />
                <span className="break-all">{contactInfo.email}</span>
              </a>
              <a href={contactInfo.mapUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 transition-colors hover:text-accent">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <span>{contactInfo.address}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container mx-auto flex flex-col gap-3 px-6 py-5 text-sm text-white/58 md:flex-row md:items-center md:justify-between lg:px-12">
          <p>&copy; {currentYear} Centro Empresarial - Asesores y Consultores. Todos los derechos reservados.</p>
          <p>Formacion, eventos y aliados para crecer en red.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

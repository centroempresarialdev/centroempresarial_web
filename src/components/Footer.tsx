import { Link } from "react-router-dom";
import { contactInfo, executiveServices } from "@/data/site";
import { Facebook, Linkedin, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = [
    { name: "Inicio", href: "/" },
    { name: "Membresias", href: "/membresias" },
    { name: "Eventos", href: "/eventos" },
    { name: "Aliados", href: "/aliados" },
    { name: "Contacto", href: "/contacto" },
  ];

  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-6 py-14 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr_0.75fr_1fr]">
          <div>
            <img
              src="https://camaraica.org.pe/wp-content/uploads/2025/09/CENTRO.avif"
              alt="Centro Empresarial"
              className="mb-5 h-14 w-auto rounded bg-white p-2"
            />
            <h3 className="text-2xl font-bold text-white">Centro Empresarial</h3>
            <p className="mt-4 max-w-sm leading-7 text-white/70">
              Comunidad empresarial para capacitacion, membresias, aliados estrategicos y acompanamiento profesional en Ica y el Peru.
            </p>
            <div className="mt-6 flex gap-3">
              <a href="#" aria-label="Facebook" className="rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-accent hover:text-accent-foreground">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" aria-label="LinkedIn" className="rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-accent hover:text-accent-foreground">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-5 text-lg font-bold text-white">Secciones</h4>
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-left text-sm text-white/70 transition-colors hover:text-accent">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-lg font-bold text-white">Enfoque</h4>
            <ul className="space-y-4">
              {executiveServices.map((service) => (
                <li key={service.label} className="flex items-center gap-3 text-sm text-white/72">
                  <service.icon className="h-4 w-4 text-accent" />
                  {service.label}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-lg font-bold text-white">Contacto</h4>
            <div className="space-y-4 text-sm text-white/72">
              <a href={`tel:${contactInfo.phone.replace(/\s/g, "")}`} className="flex items-center gap-3 transition-colors hover:text-accent">
                <Phone className="h-5 w-5 text-accent" />
                {contactInfo.phone}
              </a>
              <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-3 transition-colors hover:text-accent">
                <Mail className="h-5 w-5 text-accent" />
                {contactInfo.email}
              </a>
              <a href={contactInfo.mapUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 transition-colors hover:text-accent">
                <MapPin className="mt-0.5 h-5 w-5 text-accent" />
                {contactInfo.address}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container mx-auto flex flex-col gap-3 px-6 py-6 text-sm text-white/60 md:flex-row md:items-center md:justify-between lg:px-12">
          <p>© {currentYear} Centro Empresarial - Asesores y Consultores. Todos los derechos reservados.</p>
          <p>Membresias, eventos y contacto directo por WhatsApp.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { contactInfo } from "@/data/site";
import { Mail, Menu, Phone, UserPlus, X } from "lucide-react";

const navigation = [
  { label: "Inicio", href: "/" },
  { label: "Membresias", href: "/membresias" },
  { label: "Beneficios", href: "/beneficios" },
  { label: "Aliados", href: "/aliados" },
  { label: "Contacto", href: "/contacto" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-border/80 bg-background/95 shadow-sm backdrop-blur-xl">
      <div className="hidden bg-primary text-primary-foreground md:block">
        <div className="container mx-auto flex items-center justify-between px-6 py-2 text-sm lg:px-12">
          <div className="flex items-center gap-6">
            <a href={`tel:${contactInfo.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 transition-opacity hover:opacity-85">
              <Phone size={14} />
              <span>{contactInfo.phone}</span>
            </a>
            <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-2 transition-opacity hover:opacity-85">
              <Mail size={14} />
              <span>{contactInfo.email}</span>
            </a>
          </div>
          <p className="font-medium text-primary-foreground/90">Membresias, eventos y capacitacion para crecer en red</p>
        </div>
      </div>

      <nav className="container mx-auto px-6 py-4 lg:px-12">
        <div className="flex items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-3 text-left" aria-label="Ir al inicio" onClick={() => setIsMenuOpen(false)}>
            <img
              src="https://camaraica.org.pe/wp-content/uploads/2025/09/CENTRO.avif"
              alt="Centro Empresarial"
              className="h-12 w-auto"
            />
          </Link>

          <div className="hidden items-center gap-2 lg:flex">
            {navigation.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    "rounded-md px-3 py-2 text-sm font-semibold text-foreground/75 transition-colors hover:bg-muted hover:text-primary",
                    isActive && "bg-primary/10 text-primary",
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            {location.pathname !== "/contacto" && (
              <Button asChild variant="outline">
                <Link to="/contacto">Hablar con asesor</Link>
              </Button>
            )}
            <Button asChild variant="corporate">
              <Link to="/contacto">
                <UserPlus className="h-4 w-4" />
                Asociarme
              </Link>
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen((value) => !value)}
            aria-label="Abrir menu"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </Button>
        </div>

        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 border-t border-border py-4 md:hidden"
          >
            <div className="flex flex-col gap-2">
              {navigation.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "rounded-md px-3 py-3 text-left font-semibold text-foreground/85 hover:bg-muted",
                      isActive && "bg-primary/10 text-primary",
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <Button asChild variant="corporate" className="mt-2 w-full" onClick={() => setIsMenuOpen(false)}>
                <Link to="/contacto">
                  <UserPlus className="h-4 w-4" />
                  Quiero asociarme
                </Link>
              </Button>
            </div>
          </motion.div>
        )}
      </nav>
    </header>
  );
};

export default Header;

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Mail } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      {/* Top bar with contact info */}
      <div className="hidden md:block bg-primary text-primary-foreground py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone size={14} />
              <span>+51 945 228 848</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={14} />
              <span>centroempresarialsac@gmail.com</span>
            </div>
          </div>
          <div className="text-accent">
            Más de 12 años de experiencia
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img 
              src="https://camaraica.org.pe/wp-content/uploads/2025/09/CENTRO.avif" 
              alt="Centro Empresarial Logo" 
              className="w-40 h-auto"
            />
           </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('inicio')}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Inicio
            </button>
            <button
              onClick={() => scrollToSection('nosotros')}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Nosotros
            </button>
            <button
              onClick={() => scrollToSection('servicios')}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Servicios
            </button>
            <button
              onClick={() => scrollToSection('contacto')}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Contacto
            </button>
            <Button 
              variant="corporate"
              onClick={() => scrollToSection('contacto')}
            >
              Contáctanos
            </Button>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <button
                onClick={() => scrollToSection('inicio')}
                className="text-left text-foreground hover:text-primary transition-colors font-medium py-2"
              >
                Inicio
              </button>
              <button
                onClick={() => scrollToSection('nosotros')}
                className="text-left text-foreground hover:text-primary transition-colors font-medium py-2"
              >
                Nosotros
              </button>
              <button
                onClick={() => scrollToSection('servicios')}
                className="text-left text-foreground hover:text-primary transition-colors font-medium py-2"
              >
                Servicios
              </button>
              <button
                onClick={() => scrollToSection('contacto')}
                className="text-left text-foreground hover:text-primary transition-colors font-medium py-2"
              >
                Contacto
              </button>
              <Button 
                variant="corporate"
                className="w-full mt-2"
                onClick={() => scrollToSection('contacto')}
              >
                Contáctanos
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Award, Users, TrendingUp, ChevronLeft, ChevronRight } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import caruImage from "@/assets/luren-manos.png";
import ruleImage from "@/assets/papeles-image.png";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Carousel images - you can add more images here
  const carouselImages = [
    caruImage,
    ruleImage, // Add more different images as needed
    heroImage,
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [carouselImages.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  return (
<section 
  id="inicio" 
  className="relative min-h-screen flex items-center overflow-hidden pt-32"
>

      {/* Carousel Background */}
      <div className="absolute inset-0 overflow-hidden">
        {carouselImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url(${image})` }}
          >
            <div className="absolute inset-0 bg-gradient-hero opacity-85"></div>
          </div>
        ))}
      </div>

      {/* Carousel Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-background/20 hover:bg-background/30 text-primary-foreground p-2 rounded-full transition-all duration-200"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-background/20 hover:bg-background/30 text-primary-foreground p-2 rounded-full transition-all duration-200"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Carousel Indicators */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentSlide ? 'bg-accent' : 'bg-primary-foreground/30'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center text-primary-foreground">
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold font-serif mb-6 animate-fade-in">
            Centro Empresarial
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-8 animate-slide-up">
            Asesores y Consultores
          </h2>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl mb-12 text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed animate-slide-up">
            Más de 12 años de experiencia ofreciendo soluciones estratégicas personalizadas 
            para empresas privadas e instituciones públicas en Ica, Perú
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-slide-up">
            <Button 
              variant="hero"
              size="lg"
              onClick={() => scrollToSection('servicios')}
              className="text-lg px-8 py-4"
            >
              Nuestros Servicios
              <ArrowRight className="ml-2" />
            </Button>
            <Button 
              variant="outline"
              size="lg"
              onClick={() => scrollToSection('contacto')}
              className="text-lg px-8 py-4 bg-background/10 text-primary-foreground border-primary-foreground/30 hover:bg-background/20"
            >
              Contáctanos
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-slide-up">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-accent/20 rounded-full">
                  <Award className="h-8 w-8 text-accent" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-accent mb-2">12+</h3>
              <p className="text-primary-foreground/80">Años de Experiencia</p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-accent/20 rounded-full">
                  <Users className="h-8 w-8 text-accent" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-accent mb-2">500+</h3>
              <p className="text-primary-foreground/80">Clientes Satisfechos</p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-accent/20 rounded-full">
                  <TrendingUp className="h-8 w-8 text-accent" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-accent mb-2">98%</h3>
              <p className="text-primary-foreground/80">Tasa de Éxito</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-foreground/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary-foreground/50 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
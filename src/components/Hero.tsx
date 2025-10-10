import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Award, Users, TrendingUp, ChevronLeft, ChevronRight } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import caruImage from "@/assets/luren-manos.png";
import ruleImage from "@/assets/papeles-image.png";
const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Carousel images - you can add more images here
  const carouselImages = [caruImage, ruleImage,
  // Add more different images as needed
  heroImage];
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [carouselImages.length]);
  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % carouselImages.length);
  };
  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + carouselImages.length) % carouselImages.length);
  };
  return <section id="inicio" className="relative h-[70vh] flex items-center overflow-hidden mt-[120px] md:mt-[140px]">

      {/* Carousel Background */}
      <div className="absolute inset-0 overflow-hidden">
        {carouselImages.map((image, index) => <div key={index} className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`} style={{
        backgroundImage: `url(${image})`
      }}>
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70"></div>
          </div>)}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-8 lg:px-16">
        <div className="max-w-2xl text-left text-primary-foreground">
          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-serif mb-4 animate-fade-in text-white [text-shadow:_2px_2px_8px_rgb(0_0_0_/_80%)]">
            Centro Empresarial
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 animate-slide-up text-white [text-shadow:_1px_1px_4px_rgb(0_0_0_/_70%)]">
            Asesores y Consultores
          </h2>
          
          {/* Subtitle */}
          

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-slide-up">
            <Button variant="hero" size="lg" onClick={() => scrollToSection('contacto')} className="text-lg px-8 py-6">
              Solicitar Información
              <ArrowRight className="ml-2" />
            </Button>
          </div>
        </div>
      </div>

    </section>;
};
export default Hero;
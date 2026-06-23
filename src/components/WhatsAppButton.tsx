import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { contactInfo } from "@/data/site";

const WhatsAppButton = () => {
  const message = "Hola, deseo recibir informacion sobre las membresias del Centro Empresarial.";
  const whatsappUrl = `https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        asChild
        size="lg"
        className="rounded-full bg-[#25D366] p-5 text-white shadow-elevated transition-all duration-300 hover:scale-105 hover:bg-[#20c05c] hover:shadow-corporate sm:px-6"
      >
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="Contactar por WhatsApp">
          <MessageCircle className="h-7 w-7" />
          <span className="hidden font-bold sm:inline">WhatsApp</span>
        </a>
      </Button>
    </div>
  );
};

export default WhatsAppButton;

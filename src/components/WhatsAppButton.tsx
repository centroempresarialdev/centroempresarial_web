import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const WhatsAppButton = () => {
  const phoneNumber = "51945228848"; // Without the + sign for WhatsApp API
  const message = "Hola, me interesa obtener más información sobre sus servicios de consultoría empresarial.";
  
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        asChild
        size="lg"
        className="rounded-full bg-[#25D366] hover:bg-[#20c05c] text-white shadow-elevated hover:shadow-corporate transition-all duration-2000 p-4 animate-bounce"
      >
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contactar por WhatsApp"
        >
          <MessageCircle className="h-6 w-6" />
          <span className="hidden sm:inline ml-2">WhatsApp</span>
        </a>
      </Button>
    </div>
  );
};

export default WhatsAppButton;
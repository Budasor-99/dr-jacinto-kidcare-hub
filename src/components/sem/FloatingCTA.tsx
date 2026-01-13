import { Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_NUMBER = "593998396186";
const PHONE_NUMBER = "0998396186";
const WHATSAPP_MESSAGE = "Hola Dr. Salazar, quiero agendar una cita para mi hijo/a";

const FloatingCTA = () => {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
  const phoneUrl = `tel:${PHONE_NUMBER}`;

  const trackWhatsAppClick = () => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Lead', {
        content_name: 'WhatsApp Click',
        content_category: 'SEM Landing Floating'
      });
    }
  };

  const trackCallClick = () => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Contact', {
        content_name: 'Call Click',
        content_category: 'SEM Landing Floating'
      });
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      {/* Gradient fade effect */}
      <div className="absolute -top-6 left-0 right-0 h-6 bg-gradient-to-t from-card to-transparent" />
      
      <div className="bg-card/98 backdrop-blur-xl border-t border-border/50 shadow-[0_-4px_30px_-10px_rgba(0,0,0,0.2)] p-4">
        <div className="flex gap-3 max-w-md mx-auto">
          <Button
            asChild
            className="flex-1 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground font-bold h-14 text-base shadow-lg rounded-2xl transition-all duration-300 hover:scale-[1.02]"
          >
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={trackWhatsAppClick}>
              <MessageCircle className="w-5 h-5 mr-2" />
              WhatsApp
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="flex-1 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold h-14 text-base rounded-2xl transition-all duration-300 hover:scale-[1.02]"
          >
            <a href={phoneUrl} onClick={trackCallClick}>
              <Phone className="w-5 h-5 mr-2" />
              Llamar
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FloatingCTA;

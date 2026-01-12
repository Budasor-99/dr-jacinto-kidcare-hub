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
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-t border-border p-3 md:hidden">
      <div className="flex gap-3 max-w-md mx-auto">
        <Button
          asChild
          className="flex-1 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold h-12 text-base shadow-lg"
        >
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={trackWhatsAppClick}>
            <MessageCircle className="w-5 h-5 mr-2" />
            WhatsApp
          </a>
        </Button>
        <Button
          asChild
          variant="outline"
          className="flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold h-12 text-base"
        >
          <a href={phoneUrl} onClick={trackCallClick}>
            <Phone className="w-5 h-5 mr-2" />
            Llamar
          </a>
        </Button>
      </div>
    </div>
  );
};

export default FloatingCTA;

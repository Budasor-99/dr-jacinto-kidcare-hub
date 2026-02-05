import { Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackWhatsAppClick, trackPhoneClick } from "@/lib/analytics";

const WHATSAPP_NUMBER = "593998396186";
const PHONE_NUMBER = "0998396186";
const WHATSAPP_MESSAGE = "Hola Dr. Salazar, quiero agendar una cita para mi hijo/a";

const FloatingCTA = () => {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
  const phoneUrl = `tel:${PHONE_NUMBER}`;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      {/* Premium gradient fade */}
      <div className="absolute -top-8 left-0 right-0 h-8 bg-gradient-to-t from-background via-background/80 to-transparent" />
      
      <div className="bg-background/98 backdrop-blur-xl border-t border-border/30 shadow-[0_-8px_30px_-10px_rgba(0,0,0,0.15)] px-4 py-3 safe-area-pb">
        {/* Urgency text */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-xs font-medium text-muted-foreground">Disponible ahora • Respuesta inmediata</span>
        </div>
        
        <div className="flex gap-2.5 max-w-sm mx-auto">
          <Button
            asChild
            className="flex-[1.2] bg-[#25D366] hover:bg-[#1da851] text-white font-bold h-12 text-sm shadow-[0_4px_15px_-3px_rgba(37,211,102,0.4)] rounded-xl transition-all duration-200 active:scale-[0.98]"
            onClick={() => trackWhatsAppClick('sem_floating_cta')}
          >
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-4.5 h-4.5 mr-2" />
              WhatsApp
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="flex-1 border-2 border-primary/30 text-primary hover:bg-primary/5 font-semibold h-12 text-sm rounded-xl transition-all duration-200 active:scale-[0.98]"
            onClick={() => trackPhoneClick(PHONE_NUMBER, 'sem_floating_cta')}
          >
            <a href={phoneUrl}>
              <Phone className="w-4.5 h-4.5 mr-1.5" />
              Llamar
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FloatingCTA;

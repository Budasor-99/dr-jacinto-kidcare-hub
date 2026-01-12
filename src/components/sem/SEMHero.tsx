import { Phone, MessageCircle, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import doctorImage from "@/assets/doctor-profile.png";

const WHATSAPP_NUMBER = "593998396186";
const PHONE_NUMBER = "0998396186";
const WHATSAPP_MESSAGE = "Hola Dr. Salazar, quiero agendar una cita para mi hijo/a";

const SEMHero = () => {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
  const phoneUrl = `tel:${PHONE_NUMBER}`;

  const trackWhatsAppClick = () => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Lead', {
        content_name: 'WhatsApp Click',
        content_category: 'SEM Landing Hero'
      });
    }
  };

  const trackCallClick = () => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Contact', {
        content_name: 'Call Click',
        content_category: 'SEM Landing Hero'
      });
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-primary/5 via-background to-pediatric-light/20 overflow-hidden">
      {/* Minimal Header - Logo only */}
      <div className="container mx-auto px-4 py-4">
        <img src={logo} alt="Centro Médico Salazar Vargas" className="h-12 md:h-14" />
      </div>

      {/* Hero Content */}
      <div className="container mx-auto px-4 pb-10 pt-4">
        <div className="flex flex-col md:flex-row items-center gap-8 max-w-4xl mx-auto">
          {/* Doctor Image */}
          <div className="relative flex-shrink-0">
            <div className="w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden border-4 border-primary/20 shadow-xl">
              <img
                src={doctorImage}
                alt="Dr. Jacinto Salazar"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Experience Badge */}
            <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
              <Award className="w-4 h-4" />
              <span className="text-xs font-bold">+30 años</span>
            </div>
          </div>

          {/* Text Content */}
          <div className="text-center md:text-left flex-1">
            <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-3 leading-tight">
              Agenda tu Cita con el{" "}
              <span className="text-primary">Pediatra de Confianza</span> en Quito
            </h1>
            <p className="text-base md:text-lg text-muted-foreground mb-6">
              Dr. Jacinto Salazar Vargas — Más de 30 años cuidando la salud de los niños en Carcelén.
              Atención personalizada y diagnóstico preciso.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <Button
                asChild
                size="lg"
                className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-base h-14 px-8 shadow-lg hover:shadow-xl transition-all"
              >
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={trackWhatsAppClick}>
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Agendar por WhatsApp
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold text-base h-14 px-8 transition-all"
              >
                <a href={phoneUrl} onClick={trackCallClick}>
                  <Phone className="w-5 h-5 mr-2" />
                  Llamar Ahora
                </a>
              </Button>
            </div>

            {/* Quick Info */}
            <p className="text-sm text-muted-foreground mt-4">
              📍 Rodrigo Muñoz N81-46, Carcelén • ⏰ Lun-Vie 9AM-7PM
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SEMHero;

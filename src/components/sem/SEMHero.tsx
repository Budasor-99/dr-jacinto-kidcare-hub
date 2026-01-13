import { Phone, MessageCircle, Award, Star, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import doctorImage from "@/assets/doctor-profile.png";
import BlobBackground from "@/components/decorative/BlobBackground";
import MedicalCrosses from "@/components/decorative/MedicalCrosses";

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
    <section className="relative min-h-[85vh] bg-gradient-to-br from-primary via-primary/90 to-accent overflow-hidden">
      {/* Decorative Elements */}
      <BlobBackground variant="hero" />
      <MedicalCrosses variant="scattered" />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent" />

      {/* Header with Logo */}
      <div className="relative z-20 container mx-auto px-4 py-4">
        <img src={logo} alt="Centro Médico Salazar Vargas" className="h-10 md:h-12 brightness-0 invert" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 pb-12 pt-6">
        <div className="flex flex-col md:flex-row items-center gap-8 max-w-4xl mx-auto">
          {/* Doctor Image */}
          <div className="relative flex-shrink-0 animate-fade-in">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-white/20 rounded-full scale-110 blur-2xl" />
            
            <div className="relative w-44 h-44 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl">
              <img
                src={doctorImage}
                alt="Dr. Jacinto Salazar"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Experience Badge */}
            <div className="absolute -bottom-3 -right-3 bg-white shadow-xl rounded-full px-4 py-2 flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              <span className="text-sm font-bold text-foreground">+30 años</span>
            </div>
          </div>

          {/* Text Content */}
          <div className="text-center md:text-left flex-1 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full mb-4">
              <Star className="w-4 h-4 fill-current" />
              <span className="text-sm font-semibold">Pediatra de confianza en Quito</span>
            </div>
            
            <h1 className="font-heading text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Agenda tu Cita con el{" "}
              <span className="text-white/90 block">Pediatra #1 en Carcelén</span>
            </h1>
            
            <p className="text-base md:text-lg text-white/80 mb-6 max-w-lg">
              Dr. Jacinto Salazar Vargas — Más de 30 años cuidando la salud de los niños.
              Atención personalizada y diagnóstico preciso.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start mb-6" style={{ animationDelay: "0.2s" }}>
              <Button
                asChild
                size="lg"
                className="bg-white text-primary hover:bg-white/90 font-bold text-base h-14 px-8 shadow-xl hover:shadow-2xl transition-all"
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
                className="border-2 border-white text-white hover:bg-white hover:text-primary font-bold text-base h-14 px-8 bg-transparent transition-all"
              >
                <a href={phoneUrl} onClick={trackCallClick}>
                  <Phone className="w-5 h-5 mr-2" />
                  Llamar Ahora
                </a>
              </Button>
            </div>

            {/* Quick Info */}
            <div className="flex items-center justify-center md:justify-start gap-2 text-white/70 text-sm">
              <MapPin className="w-4 h-4" />
              <span>Rodrigo Muñoz N81-46, Carcelén</span>
              <span className="mx-2">•</span>
              <span>Lun-Vie 9AM-7PM</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SEMHero;

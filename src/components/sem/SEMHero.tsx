import { Phone, MessageCircle, Award, Star, MapPin, Shield, Clock } from "lucide-react";
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
    <section className="relative min-h-[90vh] overflow-hidden">
      {/* Layered gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-accent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />
      
      {/* Decorative circles */}
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
      <div className="absolute -bottom-48 -left-48 w-[500px] h-[500px] rounded-full bg-accent/20 blur-3xl" />
      <div className="absolute top-1/2 left-1/4 w-64 h-64 rounded-full bg-white/5 blur-2xl animate-pulse" />

      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />

      {/* Header with Logo */}
      <div className="relative z-20 container mx-auto px-4 py-5">
        <div className="flex items-center justify-between">
          <img src={logo} alt="Centro Médico Salazar Vargas" className="h-11 md:h-14 brightness-0 invert drop-shadow-lg" />
          <div className="hidden md:flex items-center gap-2 text-white/80 text-sm">
            <Clock className="w-4 h-4" />
            <span>Lun-Vie 9AM-7PM</span>
          </div>
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 pb-16 pt-8 md:pt-12">
        <div className="flex flex-col md:flex-row items-center gap-10 max-w-5xl mx-auto">
          {/* Doctor Image */}
          <div className="relative flex-shrink-0 animate-fade-in">
            {/* Multiple glow rings */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-accent/30 rounded-full scale-125 blur-3xl animate-pulse" />
            <div className="absolute inset-0 bg-white/10 rounded-full scale-110 blur-xl" />
            
            <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden ring-4 ring-white/20 ring-offset-4 ring-offset-primary/50 shadow-2xl">
              <img
                src={doctorImage}
                alt="Dr. Jacinto Salazar"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Experience Badge - Enhanced */}
            <div className="absolute -bottom-2 -right-2 bg-white shadow-2xl rounded-2xl px-5 py-3 flex items-center gap-2 border border-primary/10">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Award className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <span className="text-lg font-bold text-foreground block leading-none">+30</span>
                <span className="text-xs text-muted-foreground">años exp.</span>
              </div>
            </div>

            {/* Trust badge */}
            <div className="absolute -top-2 -left-2 bg-white shadow-xl rounded-full p-2 border border-primary/10">
              <Shield className="w-6 h-6 text-primary" />
            </div>
          </div>

          {/* Text Content */}
          <div className="text-center md:text-left flex-1 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md text-white px-5 py-2.5 rounded-full mb-5 border border-white/20">
              <Star className="w-4 h-4 fill-current text-yellow-300" />
              <span className="text-sm font-semibold">Pediatra de confianza en Quito</span>
            </div>
            
            <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-5 leading-[1.1] tracking-tight">
              Agenda tu Cita con el{" "}
              <span className="bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">
                Pediatra #1 en Carcelén
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/85 mb-8 max-w-xl leading-relaxed">
              <span className="font-semibold text-white">Dr. Jacinto Salazar Vargas</span> — Más de 30 años cuidando la salud de los niños con atención personalizada y diagnóstico preciso.
            </p>

            {/* CTAs - Enhanced */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-8">
              <Button
                asChild
                size="lg"
                className="bg-white text-primary hover:bg-white/95 font-bold text-lg h-16 px-10 shadow-2xl hover:shadow-[0_20px_50px_-12px_rgba(255,255,255,0.4)] transition-all duration-300 hover:scale-[1.02] rounded-2xl"
              >
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={trackWhatsAppClick}>
                  <MessageCircle className="w-6 h-6 mr-3" />
                  Agendar por WhatsApp
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-white/40 text-white hover:bg-white hover:text-primary font-bold text-lg h-16 px-10 bg-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] rounded-2xl"
              >
                <a href={phoneUrl} onClick={trackCallClick}>
                  <Phone className="w-6 h-6 mr-3" />
                  Llamar Ahora
                </a>
              </Button>
            </div>

            {/* Quick Info - Enhanced */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-white/80 text-sm">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <MapPin className="w-4 h-4" />
                <span>Carcelén, Quito</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Clock className="w-4 h-4" />
                <span>Lun-Vie 9AM-7PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="hsl(var(--background))"/>
        </svg>
      </div>
    </section>
  );
};

export default SEMHero;

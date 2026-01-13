import { Phone, MessageCircle, Award, Star, MapPin, Shield, Clock, CheckCircle2, Users, Sparkles } from "lucide-react";
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
    <section className="relative min-h-[92vh] overflow-hidden">
      {/* Premium gradient background with multiple layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-accent/80" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/15 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-accent/30 via-transparent to-transparent" />
      
      {/* Animated decorative orbs */}
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-white/8 blur-3xl animate-pulse" style={{ animationDuration: "4s" }} />
      <div className="absolute -bottom-48 -left-48 w-[600px] h-[600px] rounded-full bg-accent/25 blur-3xl animate-pulse" style={{ animationDuration: "6s" }} />
      <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full bg-white/5 blur-2xl animate-pulse" style={{ animationDuration: "5s" }} />
      <div className="absolute bottom-1/4 left-1/3 w-48 h-48 rounded-full bg-primary/30 blur-2xl animate-pulse" style={{ animationDuration: "3s" }} />

      {/* Subtle medical cross pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />

      {/* Header with Logo - Enhanced with availability indicator */}
      <div className="relative z-20 container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <img src={logo} alt="Centro Médico Salazar Vargas" className="h-10 md:h-12 brightness-0 invert drop-shadow-lg" />
          <div className="flex items-center gap-3">
            {/* Live availability indicator */}
            <div className="hidden sm:flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400"></span>
              </span>
              <span className="text-white/90 text-sm font-medium">Disponible hoy</span>
            </div>
            <div className="hidden md:flex items-center gap-2 text-white/80 text-sm bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <Clock className="w-4 h-4" />
              <span>9AM-7PM</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 pb-20 pt-6 md:pt-10">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 max-w-5xl mx-auto">
          {/* Doctor Image - Enhanced with floating elements */}
          <div className="relative flex-shrink-0 animate-fade-in">
            {/* Animated glow rings */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-accent/40 rounded-full scale-[1.35] blur-3xl animate-pulse" style={{ animationDuration: "3s" }} />
            <div className="absolute inset-0 bg-white/15 rounded-full scale-[1.15] blur-xl" />
            
            <div className="relative w-44 h-44 md:w-60 md:h-60 rounded-full overflow-hidden ring-4 ring-white/25 ring-offset-4 ring-offset-primary/30 shadow-[0_25px_80px_-12px_rgba(0,0,0,0.35)]">
              <img
                src={doctorImage}
                alt="Dr. Jacinto Salazar"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Experience Badge - Premium design */}
            <div className="absolute -bottom-3 -right-3 bg-white shadow-[0_8px_30px_-4px_rgba(0,0,0,0.2)] rounded-2xl px-4 py-2.5 flex items-center gap-2.5 border border-primary/5">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary via-primary to-accent flex items-center justify-center shadow-lg">
                <Award className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <span className="text-xl font-bold text-foreground block leading-none">+30</span>
                <span className="text-xs text-muted-foreground font-medium">años exp.</span>
              </div>
            </div>

            {/* Verified badge - Top left */}
            <div className="absolute -top-1 -left-1 bg-white shadow-lg rounded-2xl px-3 py-2 flex items-center gap-1.5 border border-primary/5">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span className="text-xs font-bold text-foreground">Verificado</span>
            </div>

          </div>

          {/* Text Content - Enhanced hierarchy */}
          <div className="text-center md:text-left flex-1 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            {/* Trust badge with sparkle */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md text-white px-5 py-2.5 rounded-full mb-5 border border-white/25 shadow-lg">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span className="text-sm font-bold tracking-wide">Pediatra de Confianza en Quito</span>
              <div className="flex -space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-yellow-300 text-yellow-300" />
                ))}
              </div>
            </div>
            
            <h1 className="font-heading text-3xl md:text-5xl lg:text-[3.5rem] font-bold text-white mb-5 leading-[1.08] tracking-tight">
              Tu Hijo Merece al{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
                  Mejor Pediatra
                </span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                  <path d="M2 8C50 2 150 2 198 8" stroke="rgba(255,255,255,0.4)" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/90 mb-6 max-w-lg leading-relaxed">
              <span className="font-bold text-white">Dr. Jacinto Salazar Vargas</span> — Más de 30 años brindando atención pediátrica de excelencia en Carcelén.
            </p>

            {/* Value propositions - Quick scan */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-7 text-sm">
              {["Diagnóstico preciso", "Atención personalizada", "Horarios flexibles"].map((item, i) => (
                <div key={i} className="flex items-center gap-1.5 text-white/95">
                  <CheckCircle2 className="w-4 h-4 text-green-300" />
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>

            {/* CTAs - Premium conversion-focused design */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start mb-6">
              <Button
                asChild
                size="lg"
                className="group relative bg-white text-primary hover:bg-white font-bold text-lg h-[60px] px-8 shadow-[0_15px_50px_-12px_rgba(255,255,255,0.5)] hover:shadow-[0_20px_60px_-12px_rgba(255,255,255,0.6)] transition-all duration-300 hover:scale-[1.02] rounded-2xl overflow-hidden"
              >
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={trackWhatsAppClick}>
                  <span className="absolute inset-0 bg-gradient-to-r from-green-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <MessageCircle className="w-5 h-5 mr-2.5 relative z-10" />
                  <span className="relative z-10">Agendar Cita Ahora</span>
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-white/50 text-white hover:bg-white hover:text-primary font-bold text-lg h-[60px] px-8 bg-white/10 backdrop-blur-md transition-all duration-300 hover:scale-[1.02] rounded-2xl"
              >
                <a href={phoneUrl} onClick={trackCallClick}>
                  <Phone className="w-5 h-5 mr-2.5" />
                  Llamar: 0998396186
                </a>
              </Button>
            </div>

            {/* Micro-conversion hint */}
            <p className="text-white/70 text-sm flex items-center justify-center md:justify-start gap-2">
              <Clock className="w-4 h-4" />
              <span>Respuesta inmediata • Sin costo de consulta telefónica</span>
            </p>
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

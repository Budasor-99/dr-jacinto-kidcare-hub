import { Phone, MessageCircle, Award, Star, MapPin, Shield, Clock, CheckCircle2, Users, Sparkles, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackWhatsAppClick, trackPhoneClick } from "@/lib/analytics";
import logo from "@/assets/logo.svg";
import doctorImage from "@/assets/doctor-profile.png";
import heroSem from "@/assets/hero-sem.jpg";
import BlobBackground from "@/components/decorative/BlobBackground";
import MedicalCrosses from "@/components/decorative/MedicalCrosses";

const WHATSAPP_NUMBER = "593998396186";
const PHONE_NUMBER = "0998396186";
const WHATSAPP_MESSAGE = "Hola Dr. Salazar, quiero agendar una cita para mi hijo/a";

const SEMHero = () => {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
  const phoneUrl = `tel:${PHONE_NUMBER}`;

  return (
    <section className="relative min-h-[92vh] overflow-hidden bg-gradient-deep-sea">
      {/* Underwater illustration background */}
      <div className="absolute inset-0">
        <img
          src={heroSem}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/60 to-background" />
      </div>

      {/* Decorative bubbles & particles */}
      <BlobBackground variant="hero" />
      <MedicalCrosses variant="scattered" />

      {/* Header with Logo */}
      <div className="relative z-20 container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <img src={logo} alt="Centro Médico Salazar Vargas" className="h-10 md:h-12 drop-shadow-lg" />
          <div className="flex items-center gap-3">
            {/* Live availability indicator */}
            <div className="hidden sm:flex items-center gap-2 glass-card px-4 py-2 rounded-full">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent"></span>
              </span>
              <span className="text-foreground/90 text-sm font-medium">Disponible hoy</span>
            </div>
            <div className="hidden md:flex items-center gap-2 text-foreground/80 text-sm glass-card px-4 py-2 rounded-full">
              <Clock className="w-4 h-4" />
              <span>9AM-8PM</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 pb-20 pt-6 lg:pt-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 max-w-5xl mx-auto">
          {/* Doctor Image */}
          <div className="relative flex-shrink-0 animate-fade-in">
            {/* Animated glow rings */}
            <div className="absolute inset-0 bg-gradient-aqua rounded-full scale-[1.35] blur-3xl opacity-60 animate-pulse" style={{ animationDuration: "3s" }} />
            <div className="absolute inset-0 bg-accent/20 rounded-full scale-[1.15] blur-xl" />

            <div className="relative w-44 h-44 md:w-52 md:h-52 lg:w-60 lg:h-60 rounded-full overflow-hidden ring-4 ring-accent/40 ring-offset-4 ring-offset-background shadow-aqua">
              <img
                src={doctorImage}
                alt="Dr. Jacinto Salazar"
                className="w-full h-full object-cover" />
            </div>

            {/* Experience Badge */}
            <div className="absolute -bottom-3 -right-3 glass-strong shadow-aqua rounded-2xl px-4 py-2.5 flex items-center gap-2.5">
              <div className="w-11 h-11 rounded-xl bg-gradient-aqua flex items-center justify-center shadow-aqua">
                <Award className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="text-left">
                <span className="text-xl font-display text-foreground block leading-none">+30</span>
                <span className="text-xs text-muted-foreground font-medium">años exp.</span>
              </div>
            </div>

            {/* Verified badge */}
            <div className="absolute -top-1 -left-1 glass-strong shadow-aqua rounded-2xl px-3 py-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-5 h-5 text-accent" />
              <span className="text-xs font-bold text-foreground">Verificado</span>
            </div>
          </div>

          {/* Text Content */}
          <div className="text-center lg:text-left flex-1 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 glass-card text-foreground px-5 py-2.5 rounded-full mb-5">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm font-bold tracking-wide">Pediatra de Confianza en Quito</span>
              <div className="flex -space-x-1">
                {[...Array(5)].map((_, i) =>
                  <Star key={i} className="w-3.5 h-3.5 fill-accent text-accent" />
                )}
              </div>
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl uppercase text-foreground mb-5 leading-[0.95] tracking-tight">
              Tu Hijo Merece al{" "}
              <span className="text-gradient block">Mejor Pediatra</span>
            </h1>

            <p className="text-lg md:text-xl text-foreground/85 mb-6 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              <span className="font-bold text-foreground">Dr. Jacinto Salazar Vargas</span> — Más de 30 años brindando atención pediátrica de excelencia en Carcelén.
            </p>

            {/* Value propositions */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-7 text-sm">
              {["Diagnóstico preciso", "Atención personalizada", "Horarios flexibles"].map((item, i) =>
                <div key={i} className="flex items-center gap-1.5 text-foreground/90">
                  <CheckCircle2 className="w-4 h-4 text-accent" />
                  <span className="font-medium">{item}</span>
                </div>
              )}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-4">
              <Button
                asChild
                size="lg"
                className="group relative bg-[#25D366] text-white hover:bg-[#1da851] font-bold text-lg h-[60px] px-8 shadow-[0_15px_50px_-12px_rgba(37,211,102,0.5)] hover:shadow-[0_20px_60px_-12px_rgba(37,211,102,0.6)] transition-all duration-300 hover:scale-[1.02] rounded-2xl overflow-hidden"
                onClick={() => trackWhatsAppClick('sem_hero')}>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-5 h-5 mr-2.5 relative z-10" />
                  <span className="relative z-10">Agendar por WhatsApp</span>
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-primary/40 text-foreground hover:bg-primary/10 hover:text-foreground font-bold text-lg h-[60px] px-8 bg-transparent backdrop-blur-md transition-all duration-300 hover:scale-[1.02] rounded-2xl"
                onClick={() => trackPhoneClick(PHONE_NUMBER, 'sem_hero')}>
                <a href={phoneUrl}>
                  <Phone className="w-5 h-5 mr-2.5" />
                  Llamar: 0998396186
                </a>
              </Button>
            </div>

            {/* Calendly CTA */}
            <div className="flex justify-center lg:justify-start mb-6">
              <Button
                size="lg"
                className="group relative bg-gradient-aqua text-primary-foreground hover:opacity-90 font-bold text-lg h-[60px] px-8 shadow-aqua transition-all duration-300 hover:scale-[1.02] rounded-2xl"
                onClick={() => {
                  if (window.Calendly) {
                    window.Calendly.initPopupWidget({ url: 'https://calendly.com/andresalazarcevallos99/30min' });
                  }
                }}>
                <CalendarDays className="w-5 h-5 mr-2.5" />
                Agendar Cita Online
              </Button>
            </div>

            {/* Micro-conversion hint */}
            <p className="text-foreground/70 text-sm flex items-center justify-center lg:justify-start gap-2">
              <Clock className="w-4 h-4" />
              <span>Responde en menos de 5 min • Atención personalizada</span>
            </p>
          </div>
        </div>
      </div>
    </section>);

};

export default SEMHero;

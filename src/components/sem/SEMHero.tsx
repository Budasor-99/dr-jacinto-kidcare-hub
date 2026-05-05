import { Phone, MessageCircle, Award, Star, MapPin, Shield, Clock, CheckCircle2, Users, Sparkles, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackWhatsAppClick, trackPhoneClick } from "@/lib/analytics";
import logo from "@/assets/logo.svg";
import doctorImage from "@/assets/doctor-portrait-sem.png";
import heroSem from "@/assets/hero-sem.jpg";

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
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />
        {/* Readability overlay — darker at edges, lighter center for content */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/30 to-background/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-background/30" />
        {/* Soft glow accents */}
        <div className="absolute top-1/4 -right-32 w-[600px] h-[600px] rounded-full bg-primary/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 -left-32 w-[500px] h-[500px] rounded-full bg-accent/10 blur-3xl pointer-events-none" />
      </div>

      {/* Header with Logo */}
      <div className="relative z-20 container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <img src={logo} alt="Centro Médico Salazar Vargas" className="h-10 md:h-12 drop-shadow-lg" />
          <div className="hidden sm:flex items-center gap-2 glass-card px-4 py-2 rounded-full">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent"></span>
            </span>
            <span className="text-foreground/90 text-sm font-medium">Disponible hoy · 8AM-12PM</span>
          </div>
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 pb-20 pt-6 lg:pt-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 max-w-5xl mx-auto">
          {/* Doctor Image */}
          <div className="relative flex-shrink-0 animate-fade-in">
            {/* Soft aqua glow */}
            <div className="absolute -inset-4 bg-accent/20 rounded-3xl blur-3xl" />
            <div className="absolute -inset-2 bg-primary/15 rounded-3xl blur-2xl" />

            <div className="relative w-56 h-56 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-3xl overflow-hidden ring-1 ring-accent/30 shadow-aqua">
              <img
                src={doctorImage}
                alt="Dr. Jacinto Salazar"
                className="w-full h-full object-cover" />
              {/* Subtle bottom gradient for badge legibility */}
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background/80 to-transparent pointer-events-none" />
            </div>

            {/* Experience Badge — single, refined */}
            <div className="absolute -bottom-3 -right-3 glass-strong shadow-aqua rounded-2xl px-3.5 py-2 flex items-center gap-2">
              <Award className="w-4 h-4 text-accent" />
              <div className="text-left leading-tight">
                <span className="text-base font-display text-foreground block leading-none">+30 años</span>
                <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">experiencia</span>
              </div>
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
              Pediatría de confianza{" "}
              <span className="text-gradient block">en Carcelén</span>
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

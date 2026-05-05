import { Button } from "@/components/ui/button";
import { Calendar, Phone, MapPin, Star } from "lucide-react";
import heroUnderwater from "@/assets/hero-underwater.jpg";
import BlobBackground from "@/components/decorative/BlobBackground";
import MedicalCrosses from "@/components/decorative/MedicalCrosses";

const Hero = () => {
  return (
    <section
      id="inicio"
      className="relative min-h-screen pt-20 overflow-hidden bg-gradient-deep-sea"
    >
      {/* Underwater illustration as full background */}
      <div className="absolute inset-0">
        <img
          src={heroUnderwater}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />
        {/* Dark overlay for legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      </div>

      {/* Decorative bubbles & particles */}
      <BlobBackground variant="hero" />
      <MedicalCrosses variant="scattered" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-5rem)] py-12">
          {/* Content */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 glass-card text-foreground px-4 py-2 rounded-full mb-6 animate-fade-in">
              <Star className="w-4 h-4 fill-accent text-accent" />
              <span className="text-sm font-semibold tracking-wide">+30 AÑOS DE EXPERIENCIA</span>
            </div>

            <h1
              className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl uppercase text-foreground mb-6 leading-[0.95] tracking-tight animate-fade-in"
              style={{ animationDelay: "0.1s" }}
            >
              Pediatra
              <span className="block text-gradient">Jacinto Salazar</span>
            </h1>

            <p
              className="text-lg md:text-xl text-foreground/80 mb-8 max-w-xl mx-auto lg:mx-0 animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              Atención pediátrica personalizada con calidez y profesionalismo.
              Acompañamos el crecimiento de sus pequeños en cada etapa.
            </p>

            <div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10 animate-fade-in"
              style={{ animationDelay: "0.3s" }}
            >
              <Button
                asChild
                size="lg"
                className="bg-gradient-aqua text-primary-foreground hover:opacity-90 shadow-aqua text-lg px-8 font-semibold"
              >
                <a href="#citas">
                  <Calendar className="w-5 h-5 mr-2" />
                  Agendar Cita
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-primary/40 text-foreground hover:bg-primary/10 hover:text-foreground text-lg px-8 bg-transparent backdrop-blur-sm"
              >
                <a href="tel:0998396186">
                  <Phone className="w-5 h-5 mr-2" />
                  Llamar Ahora
                </a>
              </Button>
            </div>

            {/* Quick Info */}
            <div
              className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start animate-fade-in"
              style={{ animationDelay: "0.4s" }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 glass-card rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-accent" />
                </div>
                <div className="text-left">
                  <p className="text-xs text-muted-foreground">Teléfono</p>
                  <p className="font-semibold text-foreground">099 839 6186</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 glass-card rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <div className="text-left">
                  <p className="text-xs text-muted-foreground">Ubicación</p>
                  <p className="font-semibold text-foreground">Carcelén, Quito</p>
                </div>
              </div>
            </div>
          </div>

          {/* Empty visual side - the underwater illustration shows through */}
          <div className="order-1 lg:order-2 hidden lg:block" />
        </div>
      </div>
    </section>
  );
};

export default Hero;

import { Button } from "@/components/ui/button";
import { Calendar, Phone, MapPin, Star, Heart } from "lucide-react";
import doctorImage from "@/assets/doctor-hero.png";

const Hero = () => {
  return (
    <section id="inicio" className="relative min-h-screen pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary via-background to-pediatric-light-blue" />
      <div className="absolute top-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      
      {/* Floating decorative elements */}
      <div className="absolute top-40 left-10 animate-float">
        <Heart className="w-8 h-8 text-accent/40" />
      </div>
      <div className="absolute top-60 right-20 animate-float" style={{ animationDelay: "1s" }}>
        <Star className="w-6 h-6 text-primary/40" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-5rem)] py-12">
          {/* Content */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6 animate-fade-in">
              <Star className="w-4 h-4 fill-current" />
              <span className="text-sm font-semibold">+30 años de experiencia</span>
            </div>
            
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              El cuidado que sus 
              <span className="text-gradient block">pequeños merecen</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Atención pediátrica personalizada con calidez y profesionalismo. 
              Porque la salud de sus hijos es nuestra prioridad.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <Button asChild size="lg" className="bg-gradient-hero hover:opacity-90 shadow-glow text-lg px-8">
                <a href="#citas">
                  <Calendar className="w-5 h-5 mr-2" />
                  Agendar Cita
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground text-lg px-8">
                <a href="tel:0998396186">
                  <Phone className="w-5 h-5 mr-2" />
                  Llamar Ahora
                </a>
              </Button>
            </div>

            {/* Quick Info */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div className="text-left">
                  <p className="text-xs text-muted-foreground">Teléfono</p>
                  <p className="font-semibold text-foreground">099 839 6186</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div className="text-left">
                  <p className="text-xs text-muted-foreground">Ubicación</p>
                  <p className="font-semibold text-foreground">Carcelén, Quito</p>
                </div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2 flex justify-center animate-slide-in-right">
            <div className="relative">
              {/* Background shape */}
              <div className="absolute inset-0 bg-gradient-hero rounded-full scale-90 blur-2xl opacity-20" />
              
              {/* Main image container */}
              <div className="relative w-72 h-72 md:w-96 md:h-96 lg:w-[450px] lg:h-[450px]">
                <div className="absolute inset-0 bg-gradient-hero rounded-full" />
                <img
                  src={doctorImage}
                  alt="Dr. Jacinto Salazar - Médico Pediatra"
                  className="absolute inset-0 w-full h-full object-cover object-top rounded-full border-4 border-card shadow-card"
                />
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-card shadow-card rounded-2xl px-6 py-3 flex items-center gap-3">
                <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                  <Heart className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-heading font-bold text-foreground">+10,000</p>
                  <p className="text-xs text-muted-foreground">Pacientes atendidos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

import { Button } from "@/components/ui/button";
import { Calendar, Phone, MapPin, Star, Heart } from "lucide-react";
import doctorProfileImage from "@/assets/doctor-profile.png";
import BlobBackground from "@/components/decorative/BlobBackground";
import MedicalCrosses from "@/components/decorative/MedicalCrosses";
import DotPattern from "@/components/decorative/DotPattern";

const Hero = () => {
  return (
    <section id="inicio" className="relative min-h-screen pt-20 overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-blue-500">
      {/* Blob Background */}
      <BlobBackground variant="hero" />
      
      {/* Medical Crosses */}
      <MedicalCrosses variant="scattered" />
      
      {/* Dot Pattern */}
      <DotPattern className="opacity-30" dotSize={2} gap={32} opacity={0.2} />

      {/* Additional gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-5rem)] py-12">
          {/* Content */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full mb-6 animate-fade-in">
              <Star className="w-4 h-4 fill-current" />
              <span className="text-sm font-semibold">+30 años de experiencia</span>
            </div>
            
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              El cuidado que sus 
              <span className="block text-white/90">pequeños merecen</span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-xl mx-auto lg:mx-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Atención pediátrica personalizada con calidez y profesionalismo. 
              Porque la salud de sus hijos es nuestra prioridad.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 shadow-lg text-lg px-8 font-semibold">
                <a href="#citas">
                  <Calendar className="w-5 h-5 mr-2" />
                  Agendar Cita
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-primary text-lg px-8 bg-transparent">
                <a href="tel:0998396186">
                  <Phone className="w-5 h-5 mr-2" />
                  Llamar Ahora
                </a>
              </Button>
            </div>

            {/* Quick Info */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-xs text-white/60">Teléfono</p>
                  <p className="font-semibold text-white">099 839 6186</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-xs text-white/60">Ubicación</p>
                  <p className="font-semibold text-white">Carcelén, Quito</p>
                </div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2 flex justify-center animate-slide-in-right">
            <div className="relative">
              {/* Background glow */}
              <div className="absolute inset-0 bg-white/20 rounded-full scale-110 blur-3xl" />
              
              {/* Main image container */}
              <div className="relative w-72 h-72 md:w-96 md:h-96 lg:w-[450px] lg:h-[450px]">
                <div className="absolute inset-0 bg-white/10 rounded-full" />
                <img
                  src={doctorProfileImage}
                  alt="Dr. Jacinto Salazar - Médico Pediatra"
                  className="absolute inset-0 w-full h-full object-cover object-top rounded-full border-4 border-white/30 shadow-2xl"
                />
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white shadow-xl rounded-2xl px-6 py-3 flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Heart className="w-5 h-5 text-primary" />
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

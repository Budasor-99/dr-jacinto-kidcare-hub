import { MapPin, Clock, Phone, Navigation } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const SEMContact = () => {
  return (
    <section className="py-14 px-4 bg-gradient-to-b from-muted/30 to-muted/50 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-50">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-2xl relative z-10">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-accent/10 text-primary px-5 py-2.5 rounded-full text-sm font-semibold mb-4 border border-primary/10">
            <Navigation className="w-4 h-4" />
            Ubicación
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground font-heading">
            Encuéntranos
          </h2>
        </div>
        
        <Card className="bg-card/90 backdrop-blur-sm border-border/50 shadow-xl overflow-hidden">
          <CardContent className="p-0">
            <div className="p-6 space-y-5">
              <div className="flex items-start gap-4 group">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-foreground font-heading text-lg">Dirección</p>
                  <p className="text-muted-foreground">
                    Rodrigo Muñoz N81-46, Carcelén, Quito
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-accent/70 flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-foreground font-heading text-lg">Horarios</p>
                  <p className="text-muted-foreground">
                    Lunes a Viernes: 9:00 AM - 1:00 PM, 3:00 PM - 7:00 PM
                  </p>
                  <p className="text-muted-foreground">
                    Sábados: 9:00 AM - 1:00 PM
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-foreground font-heading text-lg">Teléfonos</p>
                  <p className="text-muted-foreground">
                    Celular: 0998396186 • Fijo: 022485286
                  </p>
                </div>
              </div>
            </div>

            {/* Map with gradient overlay */}
            <div className="relative border-t border-border/50">
              <div className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-card to-transparent z-10" />
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7896785867285!2d-78.45!3d-0.08!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMMKwMDQnNDguMCJTIDc4wrAyNycwMC4wIlc!5e0!3m2!1ses!2sec!4v1234567890"
                width="100%"
                height="220"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación del consultorio"
                className="grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default SEMContact;

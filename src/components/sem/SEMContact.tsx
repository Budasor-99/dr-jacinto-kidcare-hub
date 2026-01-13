import { MapPin, Clock, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const SEMContact = () => {
  return (
    <section className="py-12 px-4 bg-muted/30">
      <div className="container mx-auto max-w-2xl">
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-3">
            <MapPin className="w-4 h-4" />
            Ubicación
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground font-heading">
            Encuéntranos
          </h2>
        </div>
        
        <Card className="bg-card border-border/50 shadow-card overflow-hidden mb-6">
          <CardContent className="p-0">
            <div className="p-5 space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground font-heading">Dirección</p>
                  <p className="text-muted-foreground">
                    Rodrigo Muñoz N81-46, Carcelén, Quito
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="font-semibold text-foreground font-heading">Horarios</p>
                  <p className="text-muted-foreground">
                    Lunes a Viernes: 9:00 AM - 1:00 PM, 3:00 PM - 7:00 PM
                  </p>
                  <p className="text-muted-foreground">
                    Sábados: 9:00 AM - 1:00 PM
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground font-heading">Teléfonos</p>
                  <p className="text-muted-foreground">
                    Celular: 0998396186 • Fijo: 022485286
                  </p>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="border-t border-border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7896785867285!2d-78.45!3d-0.08!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMMKwMDQnNDguMCJTIDc4wrAyNycwMC4wIlc!5e0!3m2!1ses!2sec!4v1234567890"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación del consultorio"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default SEMContact;

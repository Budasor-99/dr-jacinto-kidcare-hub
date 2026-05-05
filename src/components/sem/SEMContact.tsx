import { MapPin, Clock, Phone, Navigation, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { trackPhoneClick } from "@/lib/analytics";

const SEMContact = () => {
  const googleMapsUrl = "https://www.google.com/maps/search/?api=1&query=Rodrigo+Muñoz+N81-46+Carcelén+Quito";

  return (
    <section className="py-10 px-4 bg-background relative">
      <div className="container mx-auto max-w-lg md:max-w-xl lg:max-w-lg relative z-10">
        {/* Compact header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-display uppercase text-foreground tracking-tight">
            <span className="text-gradient">Visítanos</span>
          </h2>
          <p className="text-foreground/75 text-sm mt-1">Estamos en Carcelén, Quito</p>
        </div>

        <Card className="glass-strong border-primary/20 shadow-aqua overflow-hidden">
          <CardContent className="p-0">
            {/* Map first - visual hierarchy */}
            <div className="relative h-40 md:h-48">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7896785867285!2d-78.45!3d-0.08!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMMKwMDQnNDguMCJTIDc4wrAyNycwMC4wIlc!5e0!3m2!1ses!2sec!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación del consultorio"
                className="absolute inset-0"
              />
              {/* Overlay with CTA */}
              <div className="absolute bottom-3 right-3">
                <Button
                  asChild
                  size="sm"
                  className="bg-gradient-aqua text-primary-foreground hover:opacity-90 shadow-aqua rounded-full text-xs font-semibold"
                >
                  <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
                    <Navigation className="w-3.5 h-3.5 mr-1.5" />
                    Cómo llegar
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </Button>
              </div>
            </div>

            {/* Contact info - Compact grid */}
            <div className="p-5 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-aqua flex items-center justify-center flex-shrink-0 shadow-aqua">
                  <MapPin className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">Dirección</p>
                  <p className="text-foreground/75 text-sm">
                    Rodrigo Muñoz N81-46, Carcelén
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">Horario</p>
                    <p className="text-foreground/70 text-xs">L-V: 8AM-12PM</p>
                    <p className="text-foreground/70 text-xs">Sáb: 9AM-12PM</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">Teléfono</p>
                    <a
                      href="tel:0998396186"
                      className="text-accent text-xs font-medium hover:underline block"
                      onClick={() => trackPhoneClick('0998396186', 'sem_contact')}
                    >
                      0998396186
                    </a>
                    <a
                      href="tel:022485286"
                      className="text-foreground/70 text-xs hover:underline block"
                      onClick={() => trackPhoneClick('022485286', 'sem_contact')}
                    >
                      022485286
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default SEMContact;

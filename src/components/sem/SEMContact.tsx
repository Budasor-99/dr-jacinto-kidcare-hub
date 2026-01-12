import { MapPin, Clock, Phone } from "lucide-react";

const SEMContact = () => {
  return (
    <section className="py-10 px-4 bg-muted/30">
      <div className="container mx-auto max-w-2xl">
        <h2 className="text-xl md:text-2xl font-bold text-center text-foreground mb-6">
          Encuéntranos
        </h2>
        
        <div className="space-y-4 mb-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Dirección</p>
              <p className="text-sm text-muted-foreground">
                Rodrigo Muñoz N81-46, Carcelén, Quito
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Horarios</p>
              <p className="text-sm text-muted-foreground">
                Lunes a Viernes: 9:00 AM - 1:00 PM, 3:00 PM - 7:00 PM
              </p>
              <p className="text-sm text-muted-foreground">
                Sábados: 9:00 AM - 1:00 PM
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Phone className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Teléfonos</p>
              <p className="text-sm text-muted-foreground">
                Celular: 0998396186 • Fijo: 022485286
              </p>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="rounded-xl overflow-hidden shadow-lg border border-border">
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
      </div>
    </section>
  );
};

export default SEMContact;

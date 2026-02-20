import { useEffect } from "react";
import { Link } from "react-router-dom";
import { CheckCircle, Phone, MapPin, Clock, CalendarDays, ArrowLeft, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { trackEvent } from "@/lib/analytics";
import logoImage from "@/assets/logo.png";
import doctorImage from "@/assets/doctor-profile.png";

const ThankYou = () => {
  useEffect(() => {
    trackEvent("appointment_booked", { page: "thank_you" });

    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);

    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background flex flex-col">
      {/* Header */}
      <header className="py-4 px-4 border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={logoImage} alt="Dr. Jacinto Salazar" className="w-10 h-10 object-contain" />
            <span className="font-heading font-bold text-lg text-foreground">Dr. Jacinto Salazar</span>
          </Link>
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-1">
              <ArrowLeft className="w-4 h-4" />
              Volver al inicio
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-2xl w-full space-y-8">
          {/* Success Icon & Message */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mx-auto">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
              ¡Cita agendada con éxito!
            </h1>
            <p className="text-muted-foreground text-lg max-w-md mx-auto">
              Gracias por confiar en el <strong>Dr. Jacinto Salazar</strong> para el cuidado de su pequeño/a. Recibirá un correo de confirmación en breve.
            </p>
          </div>

          {/* Doctor Card */}
          <Card className="border-primary/20 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={doctorImage}
                  alt="Dr. Jacinto Salazar"
                  className="w-16 h-16 rounded-full object-cover border-2 border-primary/30"
                />
                <div>
                  <h2 className="font-heading font-bold text-lg text-foreground">Dr. Jacinto Salazar Vargas</h2>
                  <p className="text-muted-foreground text-sm">Médico Pediatra · +30 años de experiencia</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-sm text-foreground">Dirección</p>
                    <p className="text-muted-foreground text-sm">Rodrigo Muñoz N81-46, Carcelén, Quito</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <Phone className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-sm text-foreground">Teléfonos</p>
                    <p className="text-muted-foreground text-sm">099 839 6186 · 022 485 286</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <Clock className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-sm text-foreground">Horario</p>
                    <p className="text-muted-foreground text-sm">Lun-Vie: 9:00–12:00 y 15:00–20:00</p>
                    <p className="text-muted-foreground text-sm">Sábados: 9:00–12:00</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <CalendarDays className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-sm text-foreground">Modificar cita</p>
                    <p className="text-muted-foreground text-sm">Revise el correo de Calendly</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-heading font-semibold text-foreground mb-3">📋 Recomendaciones para su visita</h3>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  Llegue <strong>10 minutos antes</strong> de su cita para el registro.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  Traiga el <strong>carné de vacunación</strong> y documentos médicos previos del niño/a.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  Anote cualquier <strong>síntoma o pregunta</strong> que desee consultar.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  Si necesita cancelar, hágalo con <strong>al menos 24 horas</strong> de anticipación.
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://wa.me/593998396186?text=Hola%2C%20acabo%20de%20agendar%20una%20cita%20con%20el%20Dr.%20Salazar"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="w-full sm:w-auto gap-2 bg-green-600 hover:bg-green-700 text-white">
                <MessageCircle className="w-4 h-4" />
                Escribir por WhatsApp
              </Button>
            </a>
            <Link to="/">
              <Button variant="outline" className="w-full sm:w-auto gap-2">
                <ArrowLeft className="w-4 h-4" />
                Volver al inicio
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ThankYou;

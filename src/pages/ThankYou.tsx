import { useEffect } from "react";
import { Link } from "react-router-dom";
import { CheckCircle, Phone, MapPin, Clock, CalendarDays, ArrowLeft, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { trackEvent } from "@/lib/analytics";
import { trackMetaEvent } from "@/lib/metaPixel";
import logoImage from "@/assets/logo.svg";
import doctorImage from "@/assets/doctor-profile.png";
import SEO from "@/components/SEO";

const ThankYou = () => {
  useEffect(() => {
    trackEvent("appointment_booked", { page: "thank_you" });
    trackMetaEvent("Schedule");
  }, []);

  return (
    <div className="min-h-screen bg-gradient-deep-sea flex flex-col relative overflow-hidden">
      <SEO
        title="¡Cita agendada! | Dr. Jacinto Salazar"
        description="Cita pediátrica confirmada con el Dr. Jacinto Salazar."
        path="/gracias"
        noindex
      />
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <header className="py-4 px-4 glass-strong border-b border-primary/20 relative z-10">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={logoImage} alt="Dr. Jacinto Salazar" className="w-10 h-10 object-contain" />
            <span className="font-display text-foreground uppercase tracking-tight">Dr. Jacinto Salazar</span>
          </Link>
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-1 text-foreground/80 hover:text-accent hover:bg-primary/10">
              <ArrowLeft className="w-4 h-4" />
              Volver al inicio
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12 relative z-10">
        <div className="max-w-2xl w-full space-y-8">
          {/* Success Icon & Message */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-aqua mx-auto shadow-aqua">
              <CheckCircle className="w-12 h-12 text-primary-foreground" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl uppercase text-foreground leading-[0.95] tracking-tight">
              ¡Cita agendada con <span className="text-gradient">éxito!</span>
            </h1>
            <p className="text-foreground/80 text-lg max-w-md mx-auto">
              Gracias por confiar en el <strong className="text-foreground">Dr. Jacinto Salazar</strong> para el cuidado de su pequeño/a. Recibirá un correo de confirmación en breve.
            </p>
          </div>

          {/* Doctor Card */}
          <Card className="glass-strong border-primary/20 shadow-aqua">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={doctorImage}
                  alt="Dr. Jacinto Salazar"
                  className="w-16 h-16 rounded-full object-cover border-2 border-accent/40 shadow-aqua"
                />
                <div>
                  <h2 className="font-heading font-bold text-lg text-foreground">Dr. Jacinto Salazar Vargas</h2>
                  <p className="text-foreground/70 text-sm">Médico Pediatra · +30 años de experiencia</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-background/40 border border-primary/15">
                  <MapPin className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-sm text-foreground">Dirección</p>
                    <p className="text-foreground/70 text-sm">Rodrigo Muñoz N81-46, Carcelén, Quito</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-background/40 border border-primary/15">
                  <Phone className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-sm text-foreground">Teléfonos</p>
                    <p className="text-foreground/70 text-sm">099 839 6186 · 022 485 286</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-background/40 border border-primary/15">
                  <Clock className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-sm text-foreground">Horario</p>
                    <p className="text-foreground/70 text-sm">Lun-Vie: 8:00–12:00 y 15:00–20:00</p>
                    <p className="text-foreground/70 text-sm">Sábados: 9:00–12:00</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-background/40 border border-primary/15">
                  <CalendarDays className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-sm text-foreground">Modificar cita</p>
                    <p className="text-foreground/70 text-sm">Revise el correo de Calendly</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card className="glass-card border-primary/20">
            <CardContent className="p-6">
              <h3 className="font-heading font-semibold text-foreground mb-3">📋 Recomendaciones para su visita</h3>
              <ul className="space-y-2 text-foreground/80 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold">•</span>
                  Llegue <strong className="text-foreground">10 minutos antes</strong> de su cita para el registro.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold">•</span>
                  Traiga los <strong className="text-foreground">documentos médicos previos</strong> del niño/a (exámenes, recetas, controles anteriores).
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold">•</span>
                  Anote cualquier <strong className="text-foreground">síntoma o pregunta</strong> que desee consultar.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold">•</span>
                  Si necesita cancelar, hágalo con <strong className="text-foreground">al menos 24 horas</strong> de anticipación.
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
              <Button className="w-full sm:w-auto gap-2 bg-[#25D366] hover:bg-[#1da851] text-white shadow-[0_4px_15px_-3px_rgba(37,211,102,0.4)]">
                <MessageCircle className="w-4 h-4" />
                Escribir por WhatsApp
              </Button>
            </a>
            <Link to="/">
              <Button variant="outline" className="w-full sm:w-auto gap-2 border-primary/40 text-foreground hover:bg-primary/10 hover:text-foreground bg-transparent">
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

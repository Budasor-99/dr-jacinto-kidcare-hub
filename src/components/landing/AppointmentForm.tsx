import { useEffect } from "react";
import { CalendarDays } from "lucide-react";
import BlobBackground from "@/components/decorative/BlobBackground";
import MedicalCrosses from "@/components/decorative/MedicalCrosses";

const CALENDLY_URL = "https://calendly.com/andresalazarcevallos99/30min";

const AppointmentForm = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section id="citas" className="py-20 bg-gradient-deep-sea relative overflow-hidden">
      {/* Decorative elements */}
      <BlobBackground variant="section" />
      <MedicalCrosses variant="scattered" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card text-accent px-4 py-2 rounded-full mb-6">
            <CalendarDays className="w-4 h-4" />
            <span className="text-sm font-semibold tracking-wide uppercase">Agendar Cita</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl uppercase text-foreground mb-4 leading-[0.95] tracking-tight">
            Reserve su
            <span className="text-gradient block">cita hoy</span>
          </h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Seleccione el horario que más le convenga y agende su cita en segundos.
          </p>
        </div>

        <div className="max-w-3xl mx-auto glass-strong rounded-3xl shadow-aqua overflow-hidden p-2">
          <div
            className="calendly-inline-widget rounded-2xl overflow-hidden"
            data-url={CALENDLY_URL}
            style={{ minWidth: "320px", height: "700px" }}
          />
        </div>
      </div>
    </section>
  );
};

export default AppointmentForm;

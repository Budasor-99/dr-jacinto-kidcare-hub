import { useEffect } from "react";
import { CalendarDays } from "lucide-react";
import MedicalCrosses from "@/components/decorative/MedicalCrosses";
import DotPattern from "@/components/decorative/DotPattern";

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
    <section id="citas" className="py-20 bg-gradient-to-r from-primary via-primary/95 to-blue-500 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      </div>
      <MedicalCrosses variant="scattered" className="opacity-30" />
      <DotPattern className="opacity-20" dotSize={2} gap={40} opacity={0.15} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full mb-4">
            <CalendarDays className="w-4 h-4" />
            <span className="text-sm font-semibold">Agendar Cita</span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Reserve su cita hoy
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Seleccione el horario que más le convenga y agende su cita en segundos.
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div
            className="calendly-inline-widget"
            data-url={CALENDLY_URL}
            style={{ minWidth: "320px", height: "700px" }}
          />
        </div>
      </div>
    </section>
  );
};

export default AppointmentForm;

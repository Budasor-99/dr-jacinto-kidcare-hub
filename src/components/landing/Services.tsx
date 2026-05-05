import { 
  Baby, 
  Syringe, 
  Stethoscope, 
  Activity, 
  HeartPulse, 
  ClipboardList,
  Sparkles,
  Clock
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import BlobBackground from "@/components/decorative/BlobBackground";
import MedicalCrosses from "@/components/decorative/MedicalCrosses";

const services = [
  {
    icon: Baby,
    title: "Control del Niño Sano",
    description: "Evaluaciones periódicas para asegurar el desarrollo óptimo de su hijo desde el nacimiento.",
  },
  {
    icon: Syringe,
    title: "Vacunación",
    description: "Programa completo de vacunación según el esquema nacional e internacional.",
  },
  {
    icon: Stethoscope,
    title: "Consulta General",
    description: "Atención médica integral para todas las afecciones pediátricas comunes.",
  },
  {
    icon: Activity,
    title: "Seguimiento del Desarrollo",
    description: "Monitoreo continuo del crecimiento físico, cognitivo y emocional.",
  },
  {
    icon: HeartPulse,
    title: "Urgencias Pediátricas",
    description: "Atención prioritaria para situaciones que requieren cuidado inmediato.",
  },
  {
    icon: ClipboardList,
    title: "Certificados Médicos",
    description: "Documentación para escuelas, deportes y otras actividades.",
  },
];

const Services = () => {
  return (
    <section id="servicios" className="py-24 bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <BlobBackground variant="subtle" />
      <MedicalCrosses variant="minimal" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass-card text-accent px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-semibold uppercase tracking-wide">Nuestros Servicios</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl uppercase text-foreground mb-4 leading-[0.95] tracking-tight">
            Cuidado integral
            <span className="text-gradient block">para su pequeño</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-6">
            Ofrecemos una amplia gama de servicios pediátricos diseñados para mantener
            a su hijo sano y feliz en cada etapa de su desarrollo.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card
              key={service.title}
              className="group glass-card hover:border-accent/40 hover:shadow-aqua transition-all duration-300 animate-fade-in-up hover:-translate-y-1"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="w-14 h-14 bg-gradient-aqua rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-aqua">
                  <service.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-heading font-bold text-xl text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-muted-foreground">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Schedule Info */}
        <div className="mt-16 relative rounded-3xl p-8 md:p-12 text-center shadow-card overflow-hidden border border-primary/20">
          <div className="absolute inset-0 bg-gradient-aqua opacity-90" />
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-white/10 rounded-full blur-2xl" />

          <div className="relative z-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Clock className="w-8 h-8 text-primary-foreground" />
              <h3 className="font-display text-2xl md:text-4xl uppercase text-primary-foreground tracking-tight">
                Horario de Atención
              </h3>
            </div>
            <p className="text-primary-foreground/95 text-lg mb-2 font-semibold">
              Lunes a Viernes: 8:00 AM - 12:00 PM
            </p>
            <p className="text-primary-foreground/95 text-lg font-semibold">
              Sábados: 9:00 AM - 12:00 PM
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;

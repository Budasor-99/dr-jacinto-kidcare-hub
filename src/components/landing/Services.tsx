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

const services = [
  {
    icon: Baby,
    title: "Control del Niño Sano",
    description: "Evaluaciones periódicas para asegurar el desarrollo óptimo de su hijo desde el nacimiento.",
    color: "bg-pediatric-light-blue",
    iconColor: "text-primary",
  },
  {
    icon: Syringe,
    title: "Vacunación",
    description: "Programa completo de vacunación según el esquema nacional e internacional.",
    color: "bg-pediatric-mint",
    iconColor: "text-emerald-600",
  },
  {
    icon: Stethoscope,
    title: "Consulta General",
    description: "Atención médica integral para todas las afecciones pediátricas comunes.",
    color: "bg-pediatric-soft-pink",
    iconColor: "text-accent",
  },
  {
    icon: Activity,
    title: "Seguimiento del Desarrollo",
    description: "Monitoreo continuo del crecimiento físico, cognitivo y emocional.",
    color: "bg-pediatric-yellow",
    iconColor: "text-amber-600",
  },
  {
    icon: HeartPulse,
    title: "Urgencias Pediátricas",
    description: "Atención prioritaria para situaciones que requieren cuidado inmediato.",
    color: "bg-red-50",
    iconColor: "text-red-500",
  },
  {
    icon: ClipboardList,
    title: "Certificados Médicos",
    description: "Documentación para escuelas, deportes y otras actividades.",
    color: "bg-purple-50",
    iconColor: "text-purple-600",
  },
];

const Services = () => {
  return (
    <section id="servicios" className="py-20 bg-secondary/50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-semibold">Nuestros Servicios</span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Cuidado integral para
            <span className="text-gradient block">su pequeño</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ofrecemos una amplia gama de servicios pediátricos diseñados para mantener 
            a su hijo sano y feliz en cada etapa de su desarrollo.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card 
              key={service.title}
              className="group hover:shadow-card transition-all duration-300 border-0 bg-card animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className={`w-14 h-14 ${service.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className={`w-7 h-7 ${service.iconColor}`} />
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
        <div className="mt-12 bg-gradient-hero rounded-3xl p-8 md:p-12 text-center shadow-glow">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Clock className="w-8 h-8 text-primary-foreground" />
            <h3 className="font-heading text-2xl md:text-3xl font-bold text-primary-foreground">
              Horario de Atención
            </h3>
          </div>
          <p className="text-primary-foreground/90 text-lg mb-2">
            Lunes a Viernes: 9:00 AM - 1:00 PM | 3:00 PM - 7:00 PM
          </p>
          <p className="text-primary-foreground/90 text-lg">
            Sábados: 9:00 AM - 1:00 PM
          </p>
        </div>
      </div>
    </section>
  );
};

export default Services;

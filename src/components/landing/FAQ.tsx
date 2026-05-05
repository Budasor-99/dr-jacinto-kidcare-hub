import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import BlobBackground from "@/components/decorative/BlobBackground";

const faqs = [
  {
    question: "¿Cuáles son los horarios de atención?",
    answer: "Atendemos de lunes a viernes de 9:00 AM a 1:00 PM y de 3:00 PM a 7:00 PM. Los sábados de 9:00 AM a 1:00 PM. Para urgencias, puede comunicarse al número de emergencia.",
  },
  {
    question: "¿Aceptan seguros médicos?",
    answer: "Sí, trabajamos con las principales aseguradoras del país. Le recomendamos verificar la cobertura de su póliza antes de la consulta. También aceptamos pagos en efectivo y tarjeta de crédito/débito.",
  },
  {
    question: "¿Qué debo llevar a la primera consulta?",
    answer: "Para la primera consulta, por favor traiga el carnet de vacunación del niño, resultados de exámenes previos si los tiene, y una lista de medicamentos que el niño esté tomando actualmente.",
  },
  {
    question: "¿Cómo puedo agendar una cita?",
    answer: "Puede agendar su cita a través de nuestro formulario en línea, llamando al 099 839 6186 o al 022 485 286, o escribiéndonos por WhatsApp. Le confirmaremos su cita en el menor tiempo posible.",
  },
  {
    question: "¿Atienden emergencias?",
    answer: "Sí, atendemos emergencias pediátricas. En caso de urgencia durante horario de consulta, contáctenos inmediatamente. Fuera de horario, le recomendamos acudir al centro de emergencias más cercano.",
  },
  {
    question: "¿A qué edad debo llevar a mi bebé a su primera consulta?",
    answer: "Se recomienda la primera consulta pediátrica dentro de la primera semana después del nacimiento. A partir de ahí, programamos controles regulares según la edad del bebé para monitorear su desarrollo.",
  },
  {
    question: "¿Realizan vacunación?",
    answer: "Sí, aplicamos todas las vacunas del esquema nacional de inmunización y también vacunas adicionales recomendadas. Mantenemos un control riguroso del calendario de vacunación de cada paciente.",
  },
  {
    question: "¿Cuánto dura una consulta?",
    answer: "Las consultas tienen una duración aproximada de 30 a 45 minutos. Nos tomamos el tiempo necesario para realizar una evaluación completa y responder todas sus preguntas.",
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="py-20 bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <BlobBackground variant="section" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass-card text-accent px-4 py-2 rounded-full mb-6">
            <HelpCircle className="w-4 h-4" />
            <span className="text-sm font-semibold tracking-wide uppercase">Preguntas Frecuentes</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl uppercase text-foreground mb-4 leading-[0.95] tracking-tight">
            ¿Tiene alguna
            <span className="text-gradient block">pregunta?</span>
          </h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Aquí encontrará respuestas a las preguntas más comunes de nuestros pacientes.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="glass-card rounded-2xl border border-primary/20 px-6 data-[state=open]:border-accent/40 data-[state=open]:shadow-aqua transition-all"
              >
                <AccordionTrigger className="text-left font-heading font-semibold text-foreground hover:text-accent hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-foreground/75 pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            ¿No encontró la respuesta que buscaba?
          </p>
          <a
            href="#contacto"
            className="text-accent font-semibold hover:underline"
          >
            Contáctenos directamente →
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;

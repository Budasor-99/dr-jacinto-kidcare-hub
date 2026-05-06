import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import BlobBackground from "@/components/decorative/BlobBackground";

export const faqs = [
  {
    question: "¿Quién es el Dr. Jacinto Salazar?",
    answer: "El Dr. Jacinto Salazar Vargas es médico pediatra graduado de la Universidad Central del Ecuador, con más de 30 años de experiencia clínica y más de 10,000 pacientes atendidos. Su consultorio está ubicado en Rodrigo Muñoz N81-46, Carcelén, norte de Quito.",
  },
  {
    question: "¿Dónde queda el consultorio del pediatra Jacinto Salazar en Quito?",
    answer: "El consultorio del Dr. Jacinto Salazar está en Rodrigo Muñoz N81-46, sector Carcelén, al norte de Quito, Ecuador. Para citas y referencias puede llamar al 099 839 6186 o al 022 485 286.",
  },
  {
    question: "¿Cuáles son los horarios de atención?",
    answer: "Atendemos de lunes a viernes de 8:00 AM a 12:00 PM y los sábados de 9:00 AM a 12:00 PM. Para urgencias dentro de horario puede comunicarse al 099 839 6186.",
  },
  {
    question: "¿Cómo puedo agendar una cita con el pediatra?",
    answer: "Puede agendar su cita por WhatsApp al 099 839 6186, llamando al 022 485 286, o usando el formulario en línea (Calendly) en este sitio web. La confirmación se realiza en pocas horas.",
  },
  {
    question: "¿Aceptan seguros médicos?",
    answer: "Sí, trabajamos con las principales aseguradoras del Ecuador. Le recomendamos verificar la cobertura específica de su póliza antes de la consulta. También aceptamos pagos en efectivo, tarjeta de crédito y débito.",
  },
  {
    question: "¿Qué debo llevar a la primera consulta pediátrica?",
    answer: "Para la primera consulta traiga: el carné de vacunación del niño, resultados de exámenes médicos previos si los hubiera, y una lista de medicamentos que esté tomando actualmente. También es útil anotar dudas o síntomas de las últimas semanas.",
  },
  {
    question: "¿A qué edad debo llevar a mi bebé al pediatra por primera vez?",
    answer: "Se recomienda la primera consulta pediátrica dentro de la primera semana después del nacimiento. Posteriormente se programan controles del niño sano según la edad: cada mes el primer año, cada 3 meses hasta los 2 años, y luego controles anuales.",
  },
  {
    question: "¿Realizan vacunación infantil en el consultorio?",
    answer: "Sí, aplicamos todas las vacunas del Esquema Nacional de Inmunización del MSP de Ecuador y vacunas adicionales recomendadas por la Sociedad Ecuatoriana de Pediatría. Llevamos un registro digital del calendario de cada paciente.",
  },
  {
    question: "¿Atienden urgencias pediátricas?",
    answer: "Atendemos urgencias pediátricas dentro del horario de consulta (Lun-Vie 8-12, Sáb 9-12). Fuera de horario recomendamos acudir al servicio de emergencias pediátricas más cercano de su zona.",
  },
  {
    question: "¿Cuánto dura una consulta pediátrica?",
    answer: "Las consultas tienen una duración aproximada de 30 a 45 minutos. Tomamos el tiempo necesario para realizar una evaluación completa, revisar el desarrollo del niño y responder todas las inquietudes de los padres.",
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

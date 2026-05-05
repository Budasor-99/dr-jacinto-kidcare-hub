import { Star, Quote, CheckCircle2, ThumbsUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "María García",
    text: "Excelente pediatra, muy atento y cariñoso con los niños. Mi hijo ya no le tiene miedo al doctor.",
    rating: 5,
    initials: "MG",
    yearsAsPatient: "8 años",
    highlight: "Atención cariñosa",
  },
  {
    name: "Carlos Mendoza",
    text: "El Dr. Salazar salvó a mi hijo cuando tenía bronquitis severa. Su diagnóstico fue preciso y el tratamiento efectivo.",
    rating: 5,
    initials: "CM",
    yearsAsPatient: "5 años",
    highlight: "Diagnóstico preciso",
  },
  {
    name: "Ana López",
    text: "Más de 15 años llevando a mis 3 hijos con él. Confianza total. Siempre disponible cuando lo necesitamos.",
    rating: 5,
    initials: "AL",
    yearsAsPatient: "15 años",
    highlight: "Siempre disponible",
  },
];

const SEMTestimonials = () => {
  return (
    <section className="py-12 px-4 bg-gradient-deep-sea relative overflow-hidden">
      <div className="container mx-auto max-w-2xl md:max-w-3xl lg:max-w-2xl relative z-10">
        {/* Header with social proof */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-accent text-accent" />
            ))}
            <span className="ml-2 text-lg font-display text-foreground">5.0</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display uppercase text-foreground mb-2 leading-[0.95] tracking-tight">
            Familias que <span className="text-gradient">Confían</span> en Nosotros
          </h2>
          <p className="text-foreground/75 text-sm">
            +10,000 pacientes satisfechos en más de 30 años
          </p>
        </div>

        <div className="space-y-4">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="glass-card border-primary/20 hover:border-accent/40 hover:shadow-aqua transition-all duration-300 overflow-hidden"
            >
              <CardContent className="p-5">
                {/* Top row: Rating + Highlight */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex gap-0.5">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-accent bg-accent/10 px-2.5 py-1 rounded-full border border-accent/30">
                    {testimonial.highlight}
                  </span>
                </div>

                {/* Testimonial text */}
                <p className="text-foreground/90 mb-4 leading-relaxed">
                  "{testimonial.text}"
                </p>

                {/* Author info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-aqua flex items-center justify-center shadow-aqua">
                      <span className="text-primary-foreground font-bold text-sm">
                        {testimonial.initials}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <p className="font-semibold text-foreground text-sm">
                          {testimonial.name}
                        </p>
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                      </div>
                      <p className="text-xs text-muted-foreground">Paciente por {testimonial.yearsAsPatient}</p>
                    </div>
                  </div>
                  <ThumbsUp className="w-4 h-4 text-muted-foreground/50" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA hint */}
        <p className="text-center text-sm text-foreground/70 mt-6">
          Únete a las miles de familias que confían en el Dr. Salazar
        </p>
      </div>
    </section>
  );
};

export default SEMTestimonials;

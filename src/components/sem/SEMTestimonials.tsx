import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "María García",
    text: "Excelente pediatra, muy atento y cariñoso con los niños. Lo recomiendo 100%.",
    rating: 5,
    initials: "MG",
    color: "from-primary to-primary/70",
  },
  {
    name: "Carlos Mendoza",
    text: "El Dr. Salazar salvó a mi hijo cuando tenía bronquitis severa. Eternamente agradecido.",
    rating: 5,
    initials: "CM",
    color: "from-accent to-accent/70",
  },
  {
    name: "Ana López",
    text: "Más de 15 años llevando a mis hijos con él. Confianza total en su diagnóstico.",
    rating: 5,
    initials: "AL",
    color: "from-primary to-accent",
  },
];

const SEMTestimonials = () => {
  return (
    <section className="py-14 px-4 bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto max-w-3xl relative z-10">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-accent/10 text-primary px-5 py-2.5 rounded-full text-sm font-semibold mb-4 border border-primary/10">
            <Star className="w-4 h-4 fill-current" />
            Testimonios Reales
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground font-heading">
            Lo que dicen las familias
          </h2>
        </div>
        
        <div className="space-y-5">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="bg-card/80 backdrop-blur-sm border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group hover:border-primary/20"
            >
              <CardContent className="p-6 relative">
                {/* Quote decoration */}
                <Quote className="absolute top-4 right-4 w-10 h-10 text-primary/5 group-hover:text-primary/10 transition-colors" />
                
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                
                <p className="text-base md:text-lg text-foreground mb-5 leading-relaxed">
                  "{testimonial.text}"
                </p>
                
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${testimonial.color} flex items-center justify-center shadow-md`}>
                    <span className="text-white font-bold text-sm">
                      {testimonial.initials}
                    </span>
                  </div>
                  <div>
                    <p className="font-bold text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-muted-foreground">Paciente verificado</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SEMTestimonials;

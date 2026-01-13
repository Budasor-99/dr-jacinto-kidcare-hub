import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "María García",
    text: "Excelente pediatra, muy atento y cariñoso con los niños. Lo recomiendo 100%.",
    rating: 5,
  },
  {
    name: "Carlos Mendoza",
    text: "El Dr. Salazar salvó a mi hijo cuando tenía bronquitis severa. Eternamente agradecido.",
    rating: 5,
  },
  {
    name: "Ana López",
    text: "Más de 15 años llevando a mis hijos con él. Confianza total en su diagnóstico.",
    rating: 5,
  },
];

const SEMTestimonials = () => {
  return (
    <section className="py-12 px-4 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-3">
            <Star className="w-4 h-4 fill-current" />
            Testimonios Reales
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground font-heading">
            Lo que dicen las familias
          </h2>
        </div>
        
        <div className="space-y-4">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="bg-card border-border/50 shadow-soft hover:shadow-card transition-all overflow-hidden"
            >
              <CardContent className="p-5 relative">
                {/* Quote decoration */}
                <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/10" />
                
                <div className="flex gap-0.5 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-primary text-primary"
                    />
                  ))}
                </div>
                
                <p className="text-base text-foreground mb-3 leading-relaxed">
                  "{testimonial.text}"
                </p>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-bold text-sm">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <p className="font-semibold text-foreground">
                    {testimonial.name}
                  </p>
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

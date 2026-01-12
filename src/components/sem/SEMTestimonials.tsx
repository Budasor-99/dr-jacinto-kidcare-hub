import { Star } from "lucide-react";
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
    <section className="py-10 px-4">
      <div className="container mx-auto max-w-3xl">
        <h2 className="text-xl md:text-2xl font-bold text-center text-foreground mb-6">
          Lo que dicen las familias
        </h2>
        <div className="space-y-4">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex gap-0.5 mb-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-2 italic">
                  "{testimonial.text}"
                </p>
                <p className="text-sm font-semibold text-foreground">
                  {testimonial.name}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SEMTestimonials;

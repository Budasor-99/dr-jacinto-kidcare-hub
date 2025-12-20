import { useState } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    id: 1,
    name: "María González",
    role: "Madre de Sofía (3 años)",
    content: "El Dr. Salazar ha sido el pediatra de mi hija desde que nació. Su paciencia y dedicación son incomparables. Siempre nos explica todo con calma y nos hace sentir tranquilos.",
    rating: 5,
    avatar: "MG",
  },
  {
    id: 2,
    name: "Carlos Mendoza",
    role: "Padre de Mateo (5 años)",
    content: "Después de probar varios pediatras, encontramos al Dr. Salazar y fue la mejor decisión. Mateo ya no tiene miedo de ir al doctor gracias a su trato tan amable.",
    rating: 5,
    avatar: "CM",
  },
  {
    id: 3,
    name: "Ana Rodríguez",
    role: "Madre de Lucas (1 año)",
    content: "Excelente profesional. Siempre disponible para consultas y muy actualizado en los tratamientos. Lo recomiendo ampliamente a todas las familias.",
    rating: 5,
    avatar: "AR",
  },
  {
    id: 4,
    name: "Patricia Suárez",
    role: "Madre de Emma (4 años)",
    content: "El consultorio es muy acogedor y el Dr. Salazar tiene una manera especial de conectar con los niños. Emma siempre sale feliz de sus consultas.",
    rating: 5,
    avatar: "PS",
  },
  {
    id: 5,
    name: "Roberto Flores",
    role: "Padre de Diego (2 años)",
    content: "La experiencia del doctor se nota en cada consulta. Nos da mucha confianza saber que nuestro hijo está en las mejores manos.",
    rating: 5,
    avatar: "RF",
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const visibleTestimonials = () => {
    const items = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % testimonials.length;
      items.push(testimonials[index]);
    }
    return items;
  };

  return (
    <section id="testimonios" className="py-20 bg-secondary/50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 opacity-10">
        <Quote className="w-32 h-32 text-primary" />
      </div>
      <div className="absolute bottom-20 right-10 opacity-10">
        <Quote className="w-24 h-24 text-primary rotate-180" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm font-semibold">Testimonios</span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Lo que dicen las
            <span className="text-gradient block">familias</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            La confianza de las familias es nuestro mayor logro. 
            Conoce las experiencias de quienes ya nos eligieron.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleTestimonials().map((testimonial, index) => (
              <Card 
                key={`${testimonial.id}-${currentIndex}`}
                className="bg-card border-0 shadow-card animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-amber-400 fill-current" />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-muted-foreground mb-6 italic">
                    "{testimonial.content}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center">
                      <span className="text-primary-foreground font-bold">
                        {testimonial.avatar}
                      </span>
                    </div>
                    <div>
                      <p className="font-heading font-bold text-foreground">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div className="flex gap-2 items-center">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex ? "bg-primary w-6" : "bg-primary/30"
                  }`}
                />
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

import { Camera, Baby, Heart } from "lucide-react";

// Placeholder images - user will upload real ones later
const galleryImages = [
  {
    id: 1,
    title: "Sala de Espera",
    placeholder: true,
  },
  {
    id: 2,
    title: "Consultorio",
    placeholder: true,
  },
  {
    id: 3,
    title: "Área de Vacunación",
    placeholder: true,
  },
  {
    id: 4,
    title: "Zona Infantil",
    placeholder: true,
  },
];

const Gallery = () => {
  return (
    <section id="galeria" className="py-20 bg-secondary/50 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
            <Camera className="w-4 h-4" />
            <span className="text-sm font-semibold">Galería</span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Conozca nuestro
            <span className="text-gradient block">consultorio</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Un espacio diseñado para que los niños se sientan cómodos y seguros.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={image.id}
              className="group relative aspect-square rounded-2xl overflow-hidden shadow-soft animate-fade-in-up cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Placeholder */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-3">
                  {index % 2 === 0 ? (
                    <Baby className="w-8 h-8 text-primary" />
                  ) : (
                    <Heart className="w-8 h-8 text-primary" />
                  )}
                </div>
                <p className="text-primary font-medium text-sm">Próximamente</p>
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-primary-foreground font-heading font-semibold">
                  {image.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Note for user */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 bg-card rounded-full px-6 py-3 shadow-soft">
            <Camera className="w-5 h-5 text-primary" />
            <p className="text-muted-foreground text-sm">
              Las fotos del consultorio serán agregadas próximamente
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;

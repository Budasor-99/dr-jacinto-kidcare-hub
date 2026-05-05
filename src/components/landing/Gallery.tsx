import { Camera } from "lucide-react";
import BlobBackground from "@/components/decorative/BlobBackground";
import MedicalCrosses from "@/components/decorative/MedicalCrosses";

import galleryConsultorio from "@/assets/gallery-consultorio.png";
import gallerySalaEspera from "@/assets/gallery-sala-espera.png";
import galleryDoctorBebe from "@/assets/gallery-doctor-bebe.png";

const galleryImages = [
  {
    id: 1,
    title: "Consultorio",
    image: galleryConsultorio,
  },
  {
    id: 2,
    title: "Sala de Espera",
    image: gallerySalaEspera,
  },
  {
    id: 3,
    title: "Atención Personalizada",
    image: galleryDoctorBebe,
  },
];

const Gallery = () => {
  return (
    <section id="galeria" className="py-20 bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <BlobBackground variant="section" />
      <MedicalCrosses variant="minimal" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass-card text-accent px-4 py-2 rounded-full mb-6">
            <Camera className="w-4 h-4" />
            <span className="text-sm font-semibold tracking-wide uppercase">Galería</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl uppercase text-foreground mb-4 leading-[0.95] tracking-tight">
            Conozca nuestro
            <span className="text-gradient block">consultorio</span>
          </h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Un espacio diseñado para que los niños se sientan cómodos y seguros.
          </p>
        </div>

        {/* Gallery Grid - 3 images */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {galleryImages.map((image, index) => (
            <div
              key={image.id}
              className="group relative aspect-square rounded-2xl overflow-hidden border border-primary/20 shadow-card animate-fade-in cursor-pointer hover:-translate-y-2 hover:shadow-aqua hover:border-accent/50 transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <img
                src={image.image}
                alt={image.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                <p className="text-foreground font-display uppercase tracking-tight text-lg">
                  {image.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;

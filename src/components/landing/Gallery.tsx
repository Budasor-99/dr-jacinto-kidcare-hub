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
    <section id="galeria" className="py-20 bg-gradient-to-b from-background to-secondary/30 relative overflow-hidden">
      {/* Decorative elements */}
      <BlobBackground variant="subtle" />
      <MedicalCrosses variant="minimal" />

      <div className="container mx-auto px-4 relative z-10">
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

        {/* Gallery Grid - 3 images */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {galleryImages.map((image, index) => (
            <div
              key={image.id}
              className="group relative aspect-square rounded-2xl overflow-hidden shadow-lg animate-fade-in-up cursor-pointer hover:-translate-y-2 transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <img
                src={image.image}
                alt={image.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                <p className="text-white font-heading font-semibold text-lg">
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

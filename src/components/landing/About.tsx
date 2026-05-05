import { Award, GraduationCap, Heart, Users, CheckCircle } from "lucide-react";
import aboutIllustration from "@/assets/about-illustration.png";
import BlobBackground from "@/components/decorative/BlobBackground";
import MedicalCrosses from "@/components/decorative/MedicalCrosses";

const achievements = [
  { icon: Award, label: "+30 años de experiencia", value: "Experiencia" },
  { icon: GraduationCap, label: "Universidad Central del Ecuador", value: "Formación" },
  { icon: Users, label: "+10,000 pacientes atendidos", value: "Pacientes" },
  { icon: Heart, label: "Atención con calidez", value: "Compromiso" },
];

const specialties = [
  "Pediatría General",
  "Neonatología",
  "Desarrollo Infantil",
  "Vacunación",
  "Nutrición Pediátrica",
  "Alergias Infantiles",
];

const About = () => {
  return (
    <section id="sobre-mi" className="py-20 bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <BlobBackground variant="section" />
      <MedicalCrosses variant="minimal" />

      {/* Decorative crosses only — illustration is now the protagonist */}

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <div className="relative animate-fade-in">
            <div className="relative mx-auto max-w-md">
              {/* Background decorative shapes */}
              <div className="absolute -top-6 -left-6 w-full h-full bg-gradient-aqua opacity-30 rounded-3xl animate-blob-move blur-xl" />
              <div className="absolute -bottom-6 -right-6 w-full h-full bg-accent/20 rounded-3xl blur-xl" />

              {/* Main illustration */}
              <div className="relative rounded-3xl overflow-hidden shadow-aqua border border-primary/20">
                <img
                  src={aboutIllustration}
                  alt="Dr. Jacinto Salazar con paciente pediátrico"
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Experience badge */}
              <div className="absolute -bottom-6 -right-6 glass-strong shadow-card rounded-2xl p-4 flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-aqua rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground font-display text-lg">30+</span>
                </div>
                <div>
                  <p className="font-heading font-bold text-foreground">Años</p>
                  <p className="text-sm text-muted-foreground">de experiencia</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="animate-slide-in-right">
            <div className="inline-flex items-center gap-2 glass-card text-accent px-4 py-2 rounded-full mb-6">
              <Heart className="w-4 h-4" />
              <span className="text-sm font-semibold tracking-wide uppercase">Conozca al Doctor</span>
            </div>

            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl uppercase text-foreground mb-6 leading-[0.95] tracking-tight">
              Dr. Jacinto
              <span className="text-gradient block">Salazar</span>
              <span className="block text-base md:text-lg text-muted-foreground font-sans font-normal mt-3 normal-case tracking-normal">Médico Pediatra</span>
            </h2>

            <p className="text-lg text-foreground/80 mb-6">
              Con más de 30 años dedicados al cuidado de la salud infantil, el Dr. Jacinto Salazar
              ha construido una reputación basada en la excelencia médica y el trato humano.
              Su filosofía se centra en una atención personalizada donde cada niño y su familia
              reciben el tiempo y la dedicación que merecen.
            </p>

            <p className="text-muted-foreground mb-8">
              Graduado de la prestigiosa Universidad Central del Ecuador, el Dr. Salazar se mantiene
              en constante actualización para ofrecer los tratamientos más modernos y efectivos
              a sus pequeños pacientes.
            </p>

            {/* Specialties */}
            <div className="mb-8">
              <h3 className="font-heading font-bold text-lg text-foreground mb-4">Especialidades</h3>
              <div className="grid grid-cols-2 gap-3">
                {specialties.map((specialty) => (
                  <div key={specialty} className="flex items-center gap-2 text-foreground/80">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                    <span>{specialty}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {achievements.map((item) => (
                <div
                  key={item.value}
                  className="text-center p-4 glass-card rounded-2xl hover:border-accent/40 transition-colors"
                >
                  <item.icon className="w-6 h-6 text-accent mx-auto mb-2" />
                  <p className="font-heading font-bold text-foreground text-sm">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

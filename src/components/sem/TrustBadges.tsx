import { Award, Users, Heart, Shield, Clock, Star } from "lucide-react";

const badges = [
  {
    icon: Award,
    value: "+30",
    label: "Años de experiencia",
    sublabel: "Desde 1994",
  },
  {
    icon: Users,
    value: "+10,000",
    label: "Familias confían",
    sublabel: "En nosotros",
  },
  {
    icon: Star,
    value: "5.0",
    label: "Calificación",
    sublabel: "Excelente",
  },
];

const TrustBadges = () => {
  return (
    <section className="py-8 bg-background relative">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.05] to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Main badges */}
        <div className="grid grid-cols-3 gap-3 md:gap-5 max-w-xl md:max-w-2xl lg:max-w-xl mx-auto mb-6">
          {badges.map((badge, index) => (
            <div
              key={index}
              className="group flex flex-col items-center text-center p-3 md:p-5 rounded-2xl glass-card hover:border-accent/40 hover:shadow-aqua transition-all duration-300 hover:-translate-y-0.5"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-aqua flex items-center justify-center mb-2 shadow-aqua">
                <badge.icon className="w-6 h-6 md:w-7 md:h-7 text-primary-foreground" />
              </div>
              <span className="text-xl md:text-2xl font-display text-foreground leading-none">
                {badge.value}
              </span>
              <span className="text-xs md:text-sm text-foreground/80 leading-tight mt-1 font-medium">
                {badge.label}
              </span>
              <span className="text-[10px] md:text-xs text-muted-foreground mt-0.5">
                {badge.sublabel}
              </span>
            </div>
          ))}
        </div>

        {/* Trust indicators strip */}
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-xs md:text-sm text-foreground/80">
          <div className="flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-accent" />
            <span>Médico certificado</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-accent" />
            <span>Atención inmediata</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Heart className="w-4 h-4 text-accent" />
            <span>Trato humano</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;

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
    <section className="py-8 bg-background relative -mt-6">
      {/* Subtle background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.02] to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Main badges */}
        <div className="grid grid-cols-3 gap-3 md:gap-5 max-w-xl md:max-w-2xl lg:max-w-xl mx-auto mb-6">
          {badges.map((badge, index) => (
            <div
              key={index}
              className="group flex flex-col items-center text-center p-3 md:p-5 rounded-2xl bg-card border border-border/60 shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300 hover:-translate-y-0.5"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-2 group-hover:from-primary/20 group-hover:to-accent/20 transition-colors">
                <badge.icon className="w-6 h-6 md:w-7 md:h-7 text-primary" />
              </div>
              <span className="text-xl md:text-2xl font-bold text-foreground font-heading leading-none">
                {badge.value}
              </span>
              <span className="text-xs md:text-sm text-muted-foreground leading-tight mt-1 font-medium">
                {badge.label}
              </span>
              <span className="text-[10px] md:text-xs text-muted-foreground/70 mt-0.5">
                {badge.sublabel}
              </span>
            </div>
          ))}
        </div>

        {/* Trust indicators strip */}
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-xs md:text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-green-500" />
            <span>Médico certificado</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-primary" />
            <span>Atención inmediata</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Heart className="w-4 h-4 text-red-400" />
            <span>Trato humano</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;

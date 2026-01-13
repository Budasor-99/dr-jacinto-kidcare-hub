import { Award, Users, MapPin, Heart } from "lucide-react";

const badges = [
  {
    icon: Award,
    value: "+30",
    label: "Años de experiencia",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Users,
    value: "+10,000",
    label: "Pacientes atendidos",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: Heart,
    value: "100%",
    label: "Dedicación",
    color: "bg-primary/10 text-primary",
  },
];

const TrustBadges = () => {
  return (
    <section className="py-8 bg-gradient-to-b from-background to-muted/50 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-3 gap-3 md:gap-6 max-w-xl mx-auto">
          {badges.map((badge, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-3 md:p-4 rounded-2xl bg-card shadow-soft border border-border/50 transition-all hover:shadow-card"
            >
              <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full ${badge.color} flex items-center justify-center mb-2`}>
                <badge.icon className="w-6 h-6 md:w-7 md:h-7" />
              </div>
              <span className="text-xl md:text-2xl font-bold text-foreground font-heading">
                {badge.value}
              </span>
              <span className="text-xs md:text-sm text-muted-foreground leading-tight">
                {badge.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;

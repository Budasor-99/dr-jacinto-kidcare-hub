import { Award, Users, Heart } from "lucide-react";

const badges = [
  {
    icon: Award,
    value: "+30",
    label: "Años de experiencia",
    gradient: "from-primary to-primary/70",
  },
  {
    icon: Users,
    value: "+10,000",
    label: "Pacientes atendidos",
    gradient: "from-accent to-accent/70",
  },
  {
    icon: Heart,
    value: "100%",
    label: "Dedicación",
    gradient: "from-primary to-accent",
  },
];

const TrustBadges = () => {
  return (
    <section className="py-10 bg-background relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto">
          {badges.map((badge, index) => (
            <div
              key={index}
              className="group flex flex-col items-center text-center p-4 md:p-6 rounded-3xl bg-gradient-to-b from-muted/50 to-muted/30 border border-border/50 transition-all duration-300 hover:shadow-xl hover:border-primary/20 hover:-translate-y-1"
            >
              <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br ${badge.gradient} flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <badge.icon className="w-7 h-7 md:w-8 md:h-8 text-white" />
              </div>
              <span className="text-2xl md:text-3xl font-bold text-foreground font-heading">
                {badge.value}
              </span>
              <span className="text-xs md:text-sm text-muted-foreground leading-tight mt-1">
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

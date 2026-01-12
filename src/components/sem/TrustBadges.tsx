import { Award, Users, MapPin } from "lucide-react";

const badges = [
  {
    icon: Award,
    value: "+30",
    label: "Años de experiencia",
  },
  {
    icon: Users,
    value: "+10,000",
    label: "Pacientes atendidos",
  },
  {
    icon: MapPin,
    value: "Carcelén",
    label: "Quito, Ecuador",
  },
];

const TrustBadges = () => {
  return (
    <section className="py-8 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
          {badges.map((badge, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-3"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <badge.icon className="w-6 h-6 text-primary" />
              </div>
              <span className="text-lg md:text-xl font-bold text-foreground">
                {badge.value}
              </span>
              <span className="text-xs md:text-sm text-muted-foreground">
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

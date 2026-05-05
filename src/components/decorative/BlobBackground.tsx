import { cn } from "@/lib/utils";

interface KelpDecorationProps {
  className?: string;
}

/** Stylized kelp/leaf silhouette - left side */
const KelpLeft = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 200 600" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMax meet">
    <path
      d="M30 600 C 40 500, 80 450, 60 380 C 40 310, 90 270, 70 200 C 50 130, 100 80, 80 0"
      stroke="hsl(var(--primary))"
      strokeWidth="2"
      strokeLinecap="round"
      opacity="0.4"
    />
    <path
      d="M30 600 Q 60 520 50 440 Q 30 360 70 290 Q 110 220 80 140 Q 50 70 90 0 L 130 0 Q 100 80 130 160 Q 160 240 120 320 Q 80 400 110 480 Q 140 560 100 600 Z"
      fill="hsl(var(--primary) / 0.12)"
    />
    <path
      d="M70 580 Q 110 480 90 380 Q 70 280 110 180 Q 150 80 130 0 L 170 0 Q 190 100 160 200 Q 130 300 170 400 Q 200 500 170 600 Z"
      fill="hsl(var(--accent) / 0.08)"
    />
  </svg>
);

const KelpRight = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 200 600" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMaxYMax meet">
    <path
      d="M170 600 Q 140 520 150 440 Q 170 360 130 290 Q 90 220 120 140 Q 150 70 110 0 L 70 0 Q 100 80 70 160 Q 40 240 80 320 Q 120 400 90 480 Q 60 560 100 600 Z"
      fill="hsl(var(--primary) / 0.12)"
    />
    <path
      d="M130 580 Q 90 480 110 380 Q 130 280 90 180 Q 50 80 70 0 L 30 0 Q 10 100 40 200 Q 70 300 30 400 Q 0 500 30 600 Z"
      fill="hsl(var(--accent) / 0.08)"
    />
  </svg>
);

interface BlobBackgroundProps {
  variant?: "hero" | "section" | "subtle";
  className?: string;
}

const BlobBackground = ({ variant = "hero", className }: BlobBackgroundProps) => {
  if (variant === "hero") {
    return (
      <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
        {/* Light rays from above */}
        <div className="absolute top-0 left-1/4 w-32 h-full bg-gradient-to-b from-accent/15 via-accent/5 to-transparent blur-2xl rotate-6" />
        <div className="absolute top-0 left-1/2 w-40 h-full bg-gradient-to-b from-accent/20 via-accent/5 to-transparent blur-3xl -rotate-3" />
        <div className="absolute top-0 right-1/3 w-28 h-full bg-gradient-to-b from-primary/15 via-primary/5 to-transparent blur-2xl rotate-12" />

        {/* Glow orbs */}
        <div className="absolute -top-40 -right-32 w-[600px] h-[600px] rounded-full bg-primary/15 blur-3xl animate-pulse-soft" />
        <div className="absolute top-1/3 -left-32 w-[500px] h-[500px] rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-primary/10 blur-3xl" />

        {/* Kelp silhouettes on edges */}
        <KelpLeft className="absolute bottom-0 left-0 h-[70%] w-auto opacity-60 origin-bottom animate-sway" />
        <KelpRight className="absolute bottom-0 right-0 h-[70%] w-auto opacity-60 origin-bottom animate-sway" style={{ animationDelay: "1.5s" } as any} />
      </div>
    );
  }

  if (variant === "section") {
    return (
      <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
        <div className="absolute top-0 left-1/3 w-32 h-full bg-gradient-to-b from-accent/8 to-transparent blur-2xl" />
        <div className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-accent/8 blur-3xl" />
        <KelpLeft className="absolute bottom-0 left-0 h-[55%] w-auto opacity-40" />
        <KelpRight className="absolute bottom-0 right-0 h-[55%] w-auto opacity-40" />
      </div>
    );
  }

  // Subtle
  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-primary/8 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-accent/6 blur-3xl" />
    </div>
  );
};

export default BlobBackground;

import { cn } from "@/lib/utils";

interface BubbleProps {
  size: number;
  left: string;
  bottom?: string;
  top?: string;
  delay: number;
  duration?: number;
}

const Bubble = ({ size, left, bottom, top, delay, duration = 12 }: BubbleProps) => (
  <div
    className="absolute rounded-full pointer-events-none"
    style={{
      width: size,
      height: size,
      left,
      bottom,
      top,
      background:
        "radial-gradient(circle at 30% 30%, hsl(var(--accent) / 0.55), hsl(var(--accent) / 0.15) 60%, transparent 70%)",
      border: "1px solid hsl(var(--accent) / 0.25)",
      boxShadow: "0 0 12px hsl(var(--accent) / 0.35)",
      animation: `bubble-rise ${duration}s linear ${delay}s infinite`,
    }}
  />
);

const Particle = ({ left, top, delay, size = 4 }: { left: string; top: string; delay: number; size?: number }) => (
  <div
    className="absolute rounded-full pointer-events-none animate-shimmer"
    style={{
      width: size,
      height: size,
      left,
      top,
      background: "hsl(var(--accent))",
      boxShadow: "0 0 8px hsl(var(--accent) / 0.8), 0 0 16px hsl(var(--accent) / 0.4)",
      animationDelay: `${delay}s`,
    }}
  />
);

interface MedicalCrossesProps {
  variant?: "scattered" | "minimal";
  className?: string;
}

/**
 * Underwater "particles & bubbles" decoration.
 * Kept this filename/exports for backwards compatibility with existing imports.
 */
const MedicalCrosses = ({ variant = "scattered", className }: MedicalCrossesProps) => {
  if (variant === "scattered") {
    return (
      <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
        {/* Rising bubbles */}
        <Bubble size={14} left="8%" bottom="0" delay={0} duration={14} />
        <Bubble size={10} left="18%" bottom="0" delay={3} duration={11} />
        <Bubble size={20} left="28%" bottom="0" delay={6} duration={16} />
        <Bubble size={8} left="42%" bottom="0" delay={1.5} duration={10} />
        <Bubble size={16} left="55%" bottom="0" delay={4} duration={13} />
        <Bubble size={12} left="68%" bottom="0" delay={7} duration={12} />
        <Bubble size={18} left="80%" bottom="0" delay={2} duration={15} />
        <Bubble size={9} left="92%" bottom="0" delay={5} duration={11} />

        {/* Bioluminescent particles */}
        <Particle left="15%" top="22%" delay={0} size={3} />
        <Particle left="32%" top="45%" delay={1.2} size={4} />
        <Particle left="48%" top="18%" delay={2.4} size={3} />
        <Particle left="62%" top="38%" delay={0.8} size={5} />
        <Particle left="78%" top="55%" delay={1.8} size={3} />
        <Particle left="88%" top="28%" delay={2.6} size={4} />
        <Particle left="22%" top="65%" delay={0.4} size={3} />
        <Particle left="55%" top="72%" delay={1.6} size={4} />
        <Particle left="38%" top="82%" delay={2.2} size={3} />
      </div>
    );
  }

  // Minimal
  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      <Bubble size={12} left="20%" bottom="0" delay={1} duration={13} />
      <Bubble size={16} left="60%" bottom="0" delay={5} duration={15} />
      <Bubble size={9} left="85%" bottom="0" delay={3} duration={11} />
      <Particle left="25%" top="30%" delay={0.5} size={3} />
      <Particle left="55%" top="60%" delay={1.8} size={4} />
      <Particle left="80%" top="40%" delay={2.4} size={3} />
    </div>
  );
};

export default MedicalCrosses;

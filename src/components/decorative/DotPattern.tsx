import { cn } from "@/lib/utils";

interface DotPatternProps {
  className?: string;
  dotSize?: number;
  gap?: number;
  opacity?: number;
}

const DotPattern = ({ 
  className, 
  dotSize = 2, 
  gap = 24,
  opacity = 0.15 
}: DotPatternProps) => {
  return (
    <div 
      className={cn("absolute inset-0 pointer-events-none", className)}
      style={{
        backgroundImage: `radial-gradient(circle, hsl(var(--primary) / ${opacity}) ${dotSize}px, transparent ${dotSize}px)`,
        backgroundSize: `${gap}px ${gap}px`,
      }}
    />
  );
};

export default DotPattern;

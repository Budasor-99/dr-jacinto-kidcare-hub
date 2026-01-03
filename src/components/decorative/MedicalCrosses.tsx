import { cn } from "@/lib/utils";

interface MedicalCrossesProps {
  variant?: "scattered" | "minimal";
  className?: string;
}

const MedicalCross = ({ 
  className, 
  size = 24,
  delay = 0 
}: { 
  className?: string; 
  size?: number;
  delay?: number;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("text-primary/30", className)}
    style={{ animationDelay: `${delay}s` }}
  >
    <path
      d="M9 3H15V9H21V15H15V21H9V15H3V9H9V3Z"
      fill="currentColor"
    />
  </svg>
);

const MedicalCrosses = ({ variant = "scattered", className }: MedicalCrossesProps) => {
  if (variant === "scattered") {
    return (
      <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
        {/* Top left area */}
        <MedicalCross 
          className="absolute top-[15%] left-[10%] animate-float opacity-40" 
          size={32}
          delay={0}
        />
        <MedicalCross 
          className="absolute top-[25%] left-[25%] animate-float opacity-25" 
          size={20}
          delay={0.5}
        />
        
        {/* Top right area */}
        <MedicalCross 
          className="absolute top-[10%] right-[15%] animate-float opacity-35" 
          size={28}
          delay={1}
        />
        <MedicalCross 
          className="absolute top-[35%] right-[8%] animate-float opacity-20" 
          size={18}
          delay={1.5}
        />
        
        {/* Center area */}
        <MedicalCross 
          className="absolute top-[45%] left-[5%] animate-float opacity-30" 
          size={24}
          delay={2}
        />
        <MedicalCross 
          className="absolute top-[50%] right-[20%] animate-float opacity-25" 
          size={22}
          delay={2.5}
        />
        
        {/* Bottom area */}
        <MedicalCross 
          className="absolute bottom-[20%] left-[20%] animate-float opacity-35" 
          size={26}
          delay={3}
        />
        <MedicalCross 
          className="absolute bottom-[15%] right-[25%] animate-float opacity-30" 
          size={30}
          delay={3.5}
        />
        <MedicalCross 
          className="absolute bottom-[30%] left-[40%] animate-float opacity-20" 
          size={16}
          delay={4}
        />
      </div>
    );
  }

  // Minimal variant
  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      <MedicalCross 
        className="absolute top-[20%] right-[10%] animate-float opacity-25" 
        size={24}
        delay={0}
      />
      <MedicalCross 
        className="absolute bottom-[25%] left-[15%] animate-float opacity-20" 
        size={20}
        delay={1.5}
      />
    </div>
  );
};

export default MedicalCrosses;

import { cn } from "@/lib/utils";

interface BlobBackgroundProps {
  variant?: "hero" | "section" | "subtle";
  className?: string;
}

const BlobBackground = ({ variant = "hero", className }: BlobBackgroundProps) => {
  if (variant === "hero") {
    return (
      <div className={cn("absolute inset-0 overflow-hidden", className)}>
        {/* Main large blob - top right */}
        <svg
          className="absolute -top-20 -right-20 w-[800px] h-[800px] opacity-90"
          viewBox="0 0 800 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M400 50C550 50 680 120 720 250C760 380 750 520 650 620C550 720 400 750 280 700C160 650 80 550 60 400C40 250 100 120 200 70C300 20 250 50 400 50Z"
            className="fill-primary/20"
          />
        </svg>

        {/* Medium blob - center left */}
        <svg
          className="absolute top-1/4 -left-32 w-[600px] h-[600px] opacity-80"
          viewBox="0 0 600 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M300 50C420 30 520 100 560 200C600 300 580 420 500 500C420 580 300 600 200 550C100 500 30 400 50 280C70 160 180 70 300 50Z"
            className="fill-primary/15"
          />
        </svg>

        {/* Small accent blob - bottom right */}
        <svg
          className="absolute bottom-10 right-1/4 w-[400px] h-[400px] opacity-70"
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M200 30C280 20 350 70 370 150C390 230 360 310 290 360C220 410 130 400 70 340C10 280 20 180 80 110C140 40 120 40 200 30Z"
            className="fill-blue-400/20"
          />
        </svg>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-400/10" />
      </div>
    );
  }

  if (variant === "section") {
    return (
      <div className={cn("absolute inset-0 overflow-hidden", className)}>
        <svg
          className="absolute -top-20 -right-20 w-[500px] h-[500px] opacity-60"
          viewBox="0 0 500 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M250 30C350 20 430 80 460 170C490 260 460 360 380 420C300 480 190 470 110 400C30 330 20 220 70 130C120 40 150 40 250 30Z"
            className="fill-primary/10"
          />
        </svg>

        <svg
          className="absolute -bottom-20 -left-20 w-[400px] h-[400px] opacity-50"
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M200 25C280 15 340 60 365 130C390 200 365 280 300 330C235 380 145 375 85 320C25 265 20 175 60 105C100 35 120 35 200 25Z"
            className="fill-blue-400/10"
          />
        </svg>
      </div>
    );
  }

  // Subtle variant
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      <svg
        className="absolute top-0 right-0 w-[300px] h-[300px] opacity-40"
        viewBox="0 0 300 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M150 20C210 15 260 50 280 110C300 170 280 240 220 280C160 320 85 310 40 260C-5 210 10 130 60 70C110 10 90 25 150 20Z"
          className="fill-primary/8"
        />
      </svg>
    </div>
  );
};

export default BlobBackground;

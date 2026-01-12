import SEMHero from "@/components/sem/SEMHero";
import TrustBadges from "@/components/sem/TrustBadges";
import SEMTestimonials from "@/components/sem/SEMTestimonials";
import SEMContact from "@/components/sem/SEMContact";
import FloatingCTA from "@/components/sem/FloatingCTA";

const LandingSEM = () => {
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <SEMHero />
      <TrustBadges />
      <SEMTestimonials />
      <SEMContact />
      <FloatingCTA />
    </div>
  );
};

export default LandingSEM;

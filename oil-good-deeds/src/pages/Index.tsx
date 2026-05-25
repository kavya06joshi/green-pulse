import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import FeaturesSection from "@/components/FeaturesSection";
import RewardSection from "@/components/RewardSection";
import LeaderboardSection from "@/components/LeaderboardSection";
import ImpactSection from "@/components/ImpactSection";
import FooterCTA from "@/components/FooterCTA";
import EcoCity360Banner from "@/components/EcoCity360Banner";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <div id="how-it-works"><HowItWorks /></div>
      <div id="features"><FeaturesSection /></div>
      <div id="rewards"><RewardSection /></div>
      <div id="leaderboard"><LeaderboardSection /></div>
      <div id="impact"><ImpactSection /></div>
      <EcoCity360Banner />
      <FooterCTA />
    </div>
  );
};

export default Index;

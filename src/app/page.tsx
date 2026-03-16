import { HeroScrollVideo } from "@/components/home/HeroScrollVideo";
import { CastingGrid } from "@/components/home/CastingGrid";
import { SocialProof } from "@/components/home/SocialProof";
import { FeaturedCases } from "@/components/home/FeaturedCases";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { FinalCTA } from "@/components/home/FinalCTA";
import { GradientBar } from "@/components/ui/GradientBar";

export default function Home() {
  return (
    <>
      <HeroScrollVideo />
      <GradientBar />
      <CastingGrid />
      <SocialProof />
      <GradientBar />
      <FeaturedCases />
      <GradientBar />
      <ServicesOverview />
      <FinalCTA />
    </>
  );
}

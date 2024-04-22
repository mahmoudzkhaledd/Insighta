
import { BentoGrid } from "./components/sections/bentogrid";
import { Features } from "./components/sections/features";
import { HeroLanding } from "./components/sections/hero-landing";
import { InfoLanding } from "./components/sections/info-landing";
import { Powered } from "./components/sections/powered";
import { PreviewLanding } from "./components/sections/preview-landing";
import { Testimonials } from "./components/sections/testimonials";
import InfoSection from "./components/General/InfoSection";

export default async function IndexPage() {
  return (
    <>
      <HeroLanding />
      <PreviewLanding />
      <BentoGrid />
      <InfoSection />
      <Features />
      {/* <Testimonials /> */}
    </>
  );
}

import { SiteShell } from "@/components/layout/site-shell";
import { Hero } from "@/components/sections/hero";
import { Manifesto } from "@/components/sections/manifesto";
import { Services } from "@/components/sections/services";
import { HomeFeatured } from "@/components/pages/home-featured";
import { FinalCta } from "@/components/sections/final-cta";
import { IntroExperience } from "@/components/intro/intro-experience";
import { pageMetadata } from "@/lib/page-metadata";
import { preload } from "react-dom";
export const metadata = pageMetadata("home");
export default function Home() {
  preload("/originkit/dither-reveal/hands-diagonal.webp", {
    as: "image",
    fetchPriority: "low",
    crossOrigin: "anonymous",
  });
  return (
    <IntroExperience>
      <SiteShell>
        <main id="main-content" className="home-page">
          <Hero />
          <Manifesto />
          <Services teaser />
          <HomeFeatured />
          <FinalCta />
        </main>
      </SiteShell>
    </IntroExperience>
  );
}

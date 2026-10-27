import { SiteShell } from "@/components/layout/site-shell";
import { Hero } from "@/components/sections/hero";
import { Manifesto } from "@/components/sections/manifesto";
import { Services } from "@/components/sections/services";
import { Agents } from "@/components/sections/agents";
import { Process } from "@/components/sections/process";
import { TechStack } from "@/components/sections/tech-stack";
import { Work } from "@/components/sections/work";
import { Engagement } from "@/components/sections/engagement";
import { TestimonialsFaq } from "@/components/sections/testimonials-faq";
import { FinalCta } from "@/components/sections/final-cta";
import { IntroExperience } from "@/components/intro/intro-experience";
export default function Home() {
  return (
    <IntroExperience>
      <SiteShell>
        <main id="main-content">
          <Hero />
          <Manifesto />
          <Services />
          <Agents />
          <Process />
          <TechStack />
          <Work />
          <Engagement />
          <TestimonialsFaq />
          <FinalCta />
        </main>
      </SiteShell>
    </IntroExperience>
  );
}

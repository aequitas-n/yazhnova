import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Agents } from "@/components/sections/agents";
import { Stats } from "@/components/sections/stats";
import { Process } from "@/components/sections/process";
import { TechStack } from "@/components/sections/tech-stack";
import { CaseStudies } from "@/components/sections/case-studies";
import { Engagement } from "@/components/sections/engagement";
import { Testimonials } from "@/components/sections/testimonials";
import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";
export default function Home() {
  return (
    <main id="main-content">
      <Hero />
      <Services />
      <Agents />
      <Stats />
      <Process />
      <TechStack />
      <CaseStudies />
      <Engagement />
      <Testimonials />
      <Faq />
      <FinalCta />
    </main>
  );
}

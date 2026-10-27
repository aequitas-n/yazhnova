import { SiteShell } from "@/components/layout/site-shell";
import { PageHero } from "@/components/pages/page-hero";
import { ProcessDetails, CloudArchitecture } from "@/components/pages/editorial-sections";
import { TechStack } from "@/components/sections/tech-stack";
import { pageMetadata } from "@/lib/page-metadata";
export const metadata = pageMetadata("process");
export default function ProcessPage() {
  return (
    <SiteShell>
      <main id="main-content">
        <PageHero page="process" />
        <ProcessDetails />
        <TechStack />
        <CloudArchitecture />
      </main>
    </SiteShell>
  );
}

import { SiteShell } from "@/components/layout/site-shell";
import { PageHero } from "@/components/pages/page-hero";
import { Services } from "@/components/sections/services";
import { pageMetadata } from "@/lib/page-metadata";
export const metadata = pageMetadata("services");
export default function ServicesPage() {
  return (
    <SiteShell>
      <main id="main-content">
        <PageHero page="services" />
        <div id="practice">
          <Services />
        </div>
      </main>
    </SiteShell>
  );
}

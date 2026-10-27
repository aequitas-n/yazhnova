import { SiteShell } from "@/components/layout/site-shell";
import { PageHero } from "@/components/pages/page-hero";
import { Work } from "@/components/sections/work";
import { pageMetadata } from "@/lib/page-metadata";
export const metadata = pageMetadata("work");
export default function WorkPage() {
  return (
    <SiteShell>
      <main id="main-content">
        <PageHero page="work" />
        <Work />
      </main>
    </SiteShell>
  );
}

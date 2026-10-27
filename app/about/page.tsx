import { SiteShell } from "@/components/layout/site-shell";
import { PageHero } from "@/components/pages/page-hero";
import { AboutStory } from "@/components/pages/editorial-sections";
import { pageMetadata } from "@/lib/page-metadata";
export const metadata = pageMetadata("about");
export default function AboutPage() {
  return (
    <SiteShell>
      <main id="main-content">
        <PageHero page="about" />
        <AboutStory />
      </main>
    </SiteShell>
  );
}

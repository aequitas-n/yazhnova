import { SiteShell } from "@/components/layout/site-shell";
import { PageHero } from "@/components/pages/page-hero";
import { Engagement } from "@/components/sections/engagement";
import { Faq } from "@/components/sections/testimonials-faq";
import { pageMetadata } from "@/lib/page-metadata";
export const metadata = pageMetadata("engage");
export default function EngagePage() {
  return (
    <SiteShell>
      <main id="main-content">
        <PageHero page="engage" />
        <Engagement />
        <Faq />
      </main>
    </SiteShell>
  );
}

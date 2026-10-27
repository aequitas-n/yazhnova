import { SiteShell } from "@/components/layout/site-shell";
import { PageHero } from "@/components/pages/page-hero";
import { Agents } from "@/components/sections/agents";
import { EditorialList, AgentFlow } from "@/components/pages/editorial-sections";
import { multiPage } from "@/content/site";
import { pageMetadata } from "@/lib/page-metadata";
export const metadata = pageMetadata("agents");
export default function AgentsPage() {
  return (
    <SiteShell>
      <main id="main-content">
        <PageHero page="agents" />
        <div id="agent-demo">
          <Agents />
        </div>
        <EditorialList
          label={multiPage.agents.useLabel}
          title={multiPage.agents.useTitle}
          items={multiPage.agents.cases}
        />
        <AgentFlow />
      </main>
    </SiteShell>
  );
}

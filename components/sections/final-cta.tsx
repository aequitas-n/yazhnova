import { site } from "@/content/site";
import { SectionTitle } from "@/components/ui/section-title";
import { ProjectLink } from "@/components/ui/project-link";
import { LiveVisual } from "@/components/visuals/live-visual";
export function FinalCta() {
  return (
    <section className="final-cta paper" aria-labelledby="cta-title">
      <div className="container final-cta-layout">
        <div className="cta-copy">
          <p className="eyebrow">{site.cta.label}</p>
          <SectionTitle id="cta-title">
            {site.cta.title}
            <br />
            <em>{site.cta.serif}</em>
          </SectionTitle>
          <p>{site.cta.description}</p>
          <ProjectLink>{site.cta.action}</ProjectLink>
        </div>
        <div className="cta-object">
          <LiveVisual kind="ember" alt={site.cta.alt} />
        </div>
      </div>
    </section>
  );
}

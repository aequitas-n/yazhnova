import { site } from "@/content/site";
import { SectionTitle } from "@/components/ui/section-title";
import { ProjectLink } from "@/components/ui/project-link";
import { LiveVisual } from "@/components/visuals/live-visual";
export function FinalCta() {
  return (
    <section className="final-cta ink" aria-labelledby="cta-title">
      <div className="cta-tunnel" aria-hidden="true">
        <LiveVisual kind="gate" alt="" sizes="100vw" />
      </div>
      <div className="container cta-copy">
        <p className="eyebrow">{site.cta.label}</p>
        <SectionTitle id="cta-title">
          {site.cta.title}
          <br />
          <em>{site.cta.serif}</em>
        </SectionTitle>
        <p>{site.cta.description}</p>
        <ProjectLink>{site.cta.action}</ProjectLink>
      </div>
    </section>
  );
}

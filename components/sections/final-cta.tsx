import { site } from "@/content/site";
import { SectionTitle } from "@/components/ui/section-title";
import { ProjectLink } from "@/components/ui/project-link";
export function FinalCta() {
  return (
    <section className="final-cta home-cta ink" aria-labelledby="cta-title">
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

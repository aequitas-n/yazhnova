import { site } from "@/content/site";
import { GridRails } from "@/components/originkit/ui/hero-28/grid-frame";
import { SectionLabel } from "@/components/ui/section-label";
import { SectionTitle } from "@/components/ui/section-title";
import { LiveVisual } from "@/components/visuals/live-visual";
export function Process() {
  return (
    <section id="process" className="section process-section paper" aria-labelledby="process-title">
      <div className="source-rails" aria-hidden="true">
        <GridRails />
      </div>
      <div className="container">
        <div className="heading-row">
          <div>
            <SectionLabel number={site.process.number}>{site.process.label}</SectionLabel>
            <SectionTitle id="process-title">
              {site.process.title}
              <br />
              <em>{site.process.serif}</em>
            </SectionTitle>
          </div>
          <p className="section-description">{site.process.description}</p>
        </div>
        <div className="process-steps">
          <div className="process-network" aria-hidden="true">
            <LiveVisual kind="sparks" />
          </div>
          {site.process.steps.map((step) => (
            <article key={step.number}>
              <span className="step-number">
                {step.number}
                <span aria-hidden="true">↗</span>
              </span>
              <h3>{step.title}</h3>
              <p>{step.detail}</p>
              <span className="step-output mono">{step.output}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

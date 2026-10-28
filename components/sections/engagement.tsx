import { Check } from "lucide-react";
import { site } from "@/content/site";
import { SectionLabel } from "@/components/ui/section-label";
import { SectionTitle } from "@/components/ui/section-title";
import { ProjectLink } from "@/components/ui/project-link";
import { LiveVisual } from "@/components/visuals/live-visual";
import { RollingHeading } from "@/components/visuals/native-details";
export function Engagement() {
  return (
    <section id="engage" className="section engage-section ink" aria-labelledby="engage-title">
      <div className="engage-network" aria-hidden="true">
        <LiveVisual kind="network" />
      </div>
      <div className="container">
        <div className="heading-row">
          <div>
            <SectionLabel number={site.engage.number}>{site.engage.label}</SectionLabel>
            <SectionTitle id="engage-title">
              {site.engage.title}
              <br />
              <em>{site.engage.serif}</em>
            </SectionTitle>
          </div>
          <p className="section-description">{site.engage.description}</p>
        </div>
        <div className="engagement-columns">
          {site.engage.models.map((model) => (
            <article
              key={model.name}
              className={`engagement-model ${model.featured ? "featured" : ""}`}
            >
              <div className="engagement-index mono">
                <span>/{model.number}</span>
                {model.featured && <span className="signal" />}
              </div>
              <RollingHeading text={model.name} />
              <div className="engagement-fit mono">{model.fit}</div>
              <p>{model.description}</p>
              <ul>
                {model.features.map((feature) => (
                  <li key={feature}>
                    <Check size={13} />
                    {feature}
                  </li>
                ))}
              </ul>
              <ProjectLink href={`/contact?engagement=${encodeURIComponent(model.name)}`}>
                {site.actions.talk}
              </ProjectLink>
            </article>
          ))}
        </div>
        <p className="engagement-assurance">{site.engage.assurance}</p>
      </div>
    </section>
  );
}

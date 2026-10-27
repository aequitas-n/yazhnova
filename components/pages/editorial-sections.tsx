import { multiPage, site } from "@/content/site";
import { SectionTitle } from "@/components/ui/section-title";
import { LiveVisual } from "@/components/visuals/live-visual";
import { StoryStage } from "@/components/services/story-stage";

export function EditorialList({
  label,
  title,
  items,
}: {
  label: string;
  title: string;
  items: { title: string; detail: string }[];
}) {
  return (
    <section className="section editorial-list ink">
      <div className="container">
        <p className="eyebrow">{label}</p>
        <SectionTitle>{title}</SectionTitle>
        <div className="editorial-rows">
          {items.map((item, index) => (
            <article key={item.title}>
              <span className="mono">0{index + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
export function AgentFlow() {
  const copy = multiPage.agents;
  return (
    <>
      <section className="section story-detail ink">
        <div className="container">
          <p className="eyebrow">{copy.flowLabel}</p>
          <SectionTitle>{copy.flowTitle}</SectionTitle>
          <div className="story-detail-grid">
            <ol>
              {copy.flow.map((item, index) => (
                <li key={item}>
                  <span className="mono">0{index + 1}</span>
                  {item}
                </li>
              ))}
            </ol>
            <div className="standalone-story">
              <StoryStage id="ai" />
            </div>
          </div>
        </div>
      </section>
      <section className="section integrations ink">
        <div className="container">
          <p className="eyebrow">{copy.integrationsLabel}</p>
          <SectionTitle>{copy.integrationsTitle}</SectionTitle>
          <ul>
            {copy.integrations.map((item) => (
              <li key={item}>
                <span className="signal" />
                {item}
              </li>
            ))}
          </ul>
          <p className="section-description">{copy.integrationNote}</p>
        </div>
      </section>
    </>
  );
}
export function ProcessDetails() {
  return (
    <section id="process" className="section process-depth ink">
      <div className="container">
        {site.process.steps.map((step, index) => (
          <article key={step.number}>
            <div>
              <span className="eyebrow">
                {step.number} / {step.output}
              </span>
              <SectionTitle>{step.title}</SectionTitle>
            </div>
            <div>
              <p>{multiPage.process.details[index].body}</p>
              <ul>
                {multiPage.process.details[index].items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
export function CloudArchitecture() {
  return (
    <section className="section architecture-section ink">
      <div className="container">
        <p className="eyebrow">{multiPage.process.architectureLabel}</p>
        <SectionTitle>{multiPage.process.architectureTitle}</SectionTitle>
      </div>
      <div className="architecture-stage standalone-story">
        <StoryStage id="cloud" />
      </div>
    </section>
  );
}
export function AboutStory() {
  const copy = multiPage.about;
  return (
    <>
      <section id="our-story" className="section about-story ink">
        <div className="container">
          <div>
            <p className="eyebrow">{copy.storyLabel}</p>
            <SectionTitle>{copy.storyTitle}</SectionTitle>
          </div>
          <div>
            {copy.story.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </section>
      <EditorialList label={copy.valuesLabel} title={copy.valuesTitle} items={copy.values} />
      {copy.team.length > 0 && (
        <section className="section ink">
          <div className="container">
            <p className="eyebrow">{copy.teamLabel}</p>
            {copy.team.map((person) => (
              <article key={person.name}>
                <h2>{person.name}</h2>
                <p>{person.role}</p>
              </article>
            ))}
          </div>
        </section>
      )}
      <section className="section where-work ink">
        <div className="where-globe" aria-hidden="true">
          <LiveVisual kind="globe" sizes="100vw" />
        </div>
        <div className="container where-copy">
          <p className="eyebrow">{copy.globeLabel}</p>
          <SectionTitle>{copy.globeTitle}</SectionTitle>
          <p>{copy.globeDescription}</p>
          <span className="mono">{copy.globeNote}</span>
        </div>
      </section>
    </>
  );
}

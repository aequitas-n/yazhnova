import { site } from "@/content/site";
import { SectionLabel } from "@/components/ui/section-label";
import { LiveVisual } from "@/components/visuals/live-visual";
import { SectionTitle } from "@/components/ui/section-title";
export function Manifesto() {
  return (
    <section id="manifesto" className="manifesto-section ink section">
      <div className="manifesto-newsprint" aria-hidden="true">
        <LiveVisual kind="manifesto" />
      </div>
      <div className="container">
        <div className="manifesto-heading">
          <SectionLabel number={site.manifesto.number}>{site.manifesto.label}</SectionLabel>
          <span className="eyebrow">{site.manifesto.caption}</span>
        </div>
        <SectionTitle className="manifesto-slogan">
          {site.manifesto.brush.split("\n").map((line, i) => (
            <span key={line}>
              {line}
              {i === 0 && <br />}
            </span>
          ))}
        </SectionTitle>
        <span className="mono manifesto-signal-note">{site.manifesto.signalNote}</span>
        <div className="manifesto-note">
          <h3>{site.manifesto.heading}</h3>
          <p>{site.manifesto.description}</p>
          <span className="editorial-mark" aria-hidden="true">
            ↗
          </span>
        </div>
      </div>
    </section>
  );
}

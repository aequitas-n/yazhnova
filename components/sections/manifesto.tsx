import { site } from "@/content/site";
import { SectionLabel } from "@/components/ui/section-label";
import { LiveVisual } from "@/components/visuals/live-visual";
export function Manifesto() {
  return (
    <section id="manifesto" className="manifesto-section ink section">
      <div className="container">
        <div className="manifesto-heading">
          <SectionLabel number={site.manifesto.number}>{site.manifesto.label}</SectionLabel>
          <span className="eyebrow">{site.manifesto.caption}</span>
        </div>
        <div className="dispatch">
          <LiveVisual kind="manifesto" />
          <h2 className="sr-only">{site.manifesto.accessible}</h2>
        </div>
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

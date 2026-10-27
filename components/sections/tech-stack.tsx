import { site } from "@/content/site";
import { LiveVisual } from "@/components/visuals/live-visual";
import { NativeMarquee } from "@/components/visuals/native-details";
export function TechStack() {
  return (
    <section className="tech-section ink" aria-label={site.stack.note}>
      <div className="container tech-intro">
        <span className="eyebrow">{site.stack.label}</span>
        <p>{site.stack.note}</p>
      </div>
      <div className="tech-strings" aria-hidden="true">
        <LiveVisual kind="strings" />
      </div>
      <NativeMarquee />
    </section>
  );
}

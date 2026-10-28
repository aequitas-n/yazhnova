import { site } from "@/content/site";
import { LiveVisual } from "@/components/visuals/live-visual";
export function Manifesto() {
  return (
    <section
      id="manifesto"
      className="manifesto-section ink section"
      aria-labelledby="manifesto-title"
    >
      <div className="manifesto-newsprint" aria-hidden="true">
        <LiveVisual
          kind="manifesto"
          initialFrame
          sizes="100vw"
          frameSrc="/frames/signal/manifesto.png?v=quiet-type-2"
          mobileFrameSrc="/frames/signal/manifesto-mobile.webp?v=quiet-type-2"
        />
      </div>
      <div className="container manifesto-content">
        <h2 id="manifesto-title" className="sr-only">
          {site.manifesto.brush}
        </h2>
        <div className="manifesto-title-space" aria-hidden="true" />
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

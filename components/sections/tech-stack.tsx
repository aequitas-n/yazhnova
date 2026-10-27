import { site } from "@/content/site";
import { CurvedMarquee, DataStrings } from "@/components/slots";
export function TechStack() {
  return (
    <section className="tech-section ink" aria-label={site.stack.note}>
      <div className="container tech-intro">
        <span className="eyebrow">{site.stack.label}</span>
        <p>{site.stack.note}</p>
      </div>
      <DataStrings />
      <CurvedMarquee items={site.stack.items}>
        <div className="tech-marquee" tabIndex={0} role="region" aria-label={site.stack.label}>
          <div className="tech-track">
            {[false, true].map((duplicate) => (
              <div
                className="tech-row"
                key={String(duplicate)}
                aria-hidden={duplicate || undefined}
              >
                {site.stack.items.map((name) => (
                  <span className="mono" key={name}>
                    {name}
                    <i aria-hidden="true">+</i>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </CurvedMarquee>
    </section>
  );
}

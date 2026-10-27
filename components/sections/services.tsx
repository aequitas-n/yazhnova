import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import { site } from "@/content/site";
import { SectionLabel } from "@/components/ui/section-label";
import { SectionTitle } from "@/components/ui/section-title";
import { LiveVisual } from "@/components/visuals/live-visual";
import { LiquidGrid, SingleGlossySphere } from "@/components/slots";
export function Services() {
  return (
    <section
      id="services"
      className="section services-section ink"
      aria-labelledby="services-title"
    >
      <div className="container">
        <div className="heading-row">
          <div>
            <SectionLabel number={site.services.number}>{site.services.label}</SectionLabel>
            <SectionTitle id="services-title">
              {site.services.title}
              <br />
              <em>{site.services.serif}</em>
            </SectionTitle>
          </div>
          <p className="section-description">{site.services.description}</p>
        </div>
        <div className="service-columns">
          {site.services.cards.map((service, i) => (
            <article className="service-column" key={service.title}>
              <div className="service-index mono">
                <span>/{service.number}</span>
                <Link
                  href={`/contact?service=${encodeURIComponent(service.service)}`}
                  aria-label={`${site.actions.start}: ${service.title}`}
                >
                  <ArrowUpRight size={22} />
                </Link>
              </div>
              <div className={`service-visual service-visual-${i}`}>
                {i === 1 ? (
                  <LiquidGrid>
                    <LiveVisual kind={service.visual} />
                  </LiquidGrid>
                ) : i === 2 ? (
                  <SingleGlossySphere>
                    <LiveVisual kind={service.visual} className="monochrome" />
                  </SingleGlossySphere>
                ) : (
                  <LiveVisual kind={service.visual} />
                )}
              </div>
              <p className="eyebrow">{service.tag}</p>
              <h3>{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <ul>
                {service.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <div className="secondary-services">
          <span className="eyebrow">{site.services.more}</span>
          <div>
            {site.services.secondary.map((label) => (
              <Link href="/contact" key={label}>
                <Plus size={13} />
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

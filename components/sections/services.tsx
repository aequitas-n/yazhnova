import Link from "next/link";
import {
  ArrowUpRight,
  AppWindow,
  Layers3,
  Sparkles,
  Smartphone,
  Cloud,
  PenTool,
  Workflow,
} from "lucide-react";
import { site } from "@/content/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { Ambient } from "@/components/effects/ambient";

const icons = [AppWindow, Layers3, Sparkles];
const moreIcons = [Smartphone, Cloud, PenTool, Workflow];
export function Services() {
  return (
    <section id="services" className="section services-section" aria-labelledby="services-title">
      <div className="container">
        <div className="intro-statement">
          <span className="eyebrow">{site.intro.label}</span>
          <p>
            {site.intro.text}
            <br />
            <span>{site.intro.emphasis}</span>
          </p>
          <span className="intro-description">{site.intro.description}</span>
        </div>
        <div className="section-heading-row">
          <div>
            <p className="eyebrow">{site.services.label}</p>
            <SectionHeading id="services-title">{site.services.title}</SectionHeading>
          </div>
          <p className="section-description">{site.services.description}</p>
        </div>
        <div className="services-grid">
          {site.services.cards.map((card, i) => {
            const Icon = icons[i];
            return (
              <Link
                key={card.title}
                href={`/contact?service=${encodeURIComponent(site.contact.services[i])}`}
                className={`service-card service-${card.effect}`}
              >
                <div className="service-card-top">
                  <span className="mono service-number">/{card.number}</span>
                  <ArrowUpRight size={18} className="card-arrow" />
                </div>
                <div className="service-art">
                  <Ambient mode={card.effect} />
                  <div className={`service-overlay overlay-${card.effect}`} aria-hidden="true">
                    {i === 0 ? (
                      <div className="mini-browser">
                        <div className="mini-browser-bar">
                          <i />
                          <i />
                          <i />
                        </div>
                        <div className="mini-browser-content">
                          <div />
                          <div />
                          <div />
                          <div />
                        </div>
                      </div>
                    ) : i === 1 ? (
                      <div className="product-cubes">
                        <span />
                        <span />
                        <span />
                      </div>
                    ) : null}
                  </div>
                  <span className="service-art-label mono">{card.visualLabel}</span>
                </div>
                <div className="service-card-body">
                  <div className="service-title">
                    <Icon size={19} />
                    <h3>{card.title}</h3>
                  </div>
                  <p>{card.description}</p>
                  <div className="service-tags">
                    {card.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        <div className="more-services">
          <span className="mono">{site.services.moreLabel}</span>
          <div>
            {site.services.more.map((label, i) => {
              const Icon = moreIcons[i];
              return (
                <Link href="/contact" key={label}>
                  <Icon size={16} />
                  {label}
                  <ArrowUpRight size={13} />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

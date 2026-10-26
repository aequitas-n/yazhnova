import Link from "next/link";
import { ArrowUpRight, Check, ShieldCheck } from "lucide-react";
import { site } from "@/content/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
export function Engagement() {
  return (
    <section id="engage" className="section engage-section" aria-labelledby="engage-title">
      <div className="container">
        <div className="center-heading">
          <p className="eyebrow">{site.engage.label}</p>
          <SectionHeading id="engage-title">{site.engage.title}</SectionHeading>
          <p className="section-description">{site.engage.description}</p>
        </div>
        <div className="engagement-grid">
          {site.engage.models.map((model) => (
            <article
              key={model.title}
              className={`engagement-card ${model.featured ? "engagement-featured" : ""}`}
            >
              <div className="engagement-card-top">
                <span className="mono">/{model.number}</span>
                {model.featured && (
                  <span className="featured-label">
                    <span className="status-dot" />
                    {site.engage.featured}
                  </span>
                )}
              </div>
              <p className="mono engagement-fit">{model.fit}</p>
              <h3>{model.title}</h3>
              <p className="engagement-description">{model.description}</p>
              <div className="engagement-divider" />
              <ul>
                {model.features.map((feature) => (
                  <li key={feature}>
                    <Check size={15} />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                variant={model.featured ? "default" : "secondary"}
                asChild
                className={model.featured ? "glow-border" : ""}
              >
                <Link href={`/contact?engagement=${encodeURIComponent(model.title)}`}>
                  {site.actions.talk}
                  <ArrowUpRight size={16} />
                </Link>
              </Button>
            </article>
          ))}
        </div>
        <p className="engagement-assurance">
          <ShieldCheck size={15} />
          {site.engage.assurance}
        </p>
      </div>
    </section>
  );
}

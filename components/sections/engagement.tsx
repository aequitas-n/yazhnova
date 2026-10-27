"use client";
import dynamic from "next/dynamic";
import { useReducedMotion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check } from "lucide-react";
import { site } from "@/content/site";
import { SectionLabel } from "@/components/ui/section-label";
import { SectionTitle } from "@/components/ui/section-title";
import { ProjectLink } from "@/components/ui/project-link";
const RollingLetters = dynamic(
  () => import("@/components/originkit/ui/pricing-04/rolling-letters"),
  { ssr: false },
);
const labelFont = {
  fontFamily: "Geist Mono,monospace",
  fontSize: "10px",
  fontWeight: 400,
  lineHeight: "1.6em",
  letterSpacing: "0.01em",
  textAlign: "left",
};
export function Engagement() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  return (
    <section
      ref={ref}
      id="engage"
      className="section engage-section paper"
      aria-labelledby="engage-title"
    >
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
              <h3>{model.name}</h3>
              <div className="engagement-fit">
                {reduced || !inView ? (
                  <span className="mono">{model.fit}</span>
                ) : (
                  <RollingLetters
                    text={model.fit}
                    font={labelFont}
                    tag="span"
                    color="#62605A"
                    transition={{
                      type: "tween",
                      duration: 0.35,
                      delay: 0,
                      staggerChildren: 0.009,
                      ease: "easeOut",
                    }}
                  />
                )}
              </div>
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

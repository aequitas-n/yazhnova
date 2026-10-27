"use client";
import { useRef, useState, type KeyboardEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { site, pageContent } from "@/content/site";
import { SectionLabel } from "@/components/ui/section-label";
import { SectionTitle } from "@/components/ui/section-title";
import { ProjectLink } from "@/components/ui/project-link";
import { StoryStage } from "@/components/services/story-stage";
import type { StoryId } from "@/lib/service-story-canvas";

export function Services({ teaser = false }: { teaser?: boolean }) {
  const [active, setActive] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const selected = site.services.tabs[active];
  const onKey = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (["ArrowDown", "ArrowRight"].includes(event.key))
      next = (index + 1) % site.services.tabs.length;
    else if (["ArrowUp", "ArrowLeft"].includes(event.key))
      next = (index - 1 + site.services.tabs.length) % site.services.tabs.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = site.services.tabs.length - 1;
    else return;
    event.preventDefault();
    setActive(next);
    buttons.current[next]?.focus();
  };
  return (
    <section
      id="services"
      className={"section services-section ink" + (teaser ? " home-practice" : "")}
      aria-labelledby="services-title"
    >
      <div className="container heading-row">
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
      <div className="service-stage">
        <div className="service-console">
          <div
            role="tablist"
            aria-label={site.services.tabLabel}
            aria-orientation="vertical"
            className="service-tabs"
          >
            {site.services.tabs.map((tab, index) => (
              <button
                key={tab.id}
                id={"service-tab-" + tab.id}
                role="tab"
                aria-selected={active === index}
                aria-controls="service-panel"
                tabIndex={active === index ? 0 : -1}
                ref={(node) => {
                  buttons.current[index] = node;
                }}
                onClick={() => setActive(index)}
                onKeyDown={(event) => onKey(event, index)}
              >
                <span className="mono">0{index + 1}</span>
                {tab.label}
                <ArrowUpRight size={18} />
              </button>
            ))}
          </div>
          <div className="service-active-copy">
            <h3>{selected.title}</h3>
            <p>{selected.description}</p>
            {!teaser && (
              <ul>
                {selected.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            )}
            <ProjectLink
              href={
                teaser ? "/services" : "/contact?service=" + encodeURIComponent(selected.service)
              }
            >
              {teaser ? pageContent.exploreServices : site.actions.start}
            </ProjectLink>
          </div>
        </div>
        <div
          id="service-panel"
          role="tabpanel"
          tabIndex={0}
          aria-labelledby={"service-tab-" + selected.id}
          className="service-stage-visual"
        >
          <StoryStage key={selected.id} id={selected.id as StoryId} />
        </div>
      </div>
    </section>
  );
}

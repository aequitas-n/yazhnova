"use client";
import { useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";
import { SectionLabel } from "@/components/ui/section-label";
import { SectionTitle } from "@/components/ui/section-title";
import { LiveVisual } from "@/components/visuals/live-visual";
import { StackedCarousel, ImageSpotlight } from "@/components/slots";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ProjectLink } from "@/components/ui/project-link";
export function Work() {
  const [index, setIndex] = useState(0);
  const project = site.work.projects[index];
  const move = (d: number) =>
    setIndex((i) => (i + d + site.work.projects.length) % site.work.projects.length);
  return (
    <section id="work" className="section work-section paper" aria-labelledby="work-title">
      <div className="container">
        <div className="heading-row">
          <div>
            <SectionLabel number={site.work.number}>{site.work.label}</SectionLabel>
            <SectionTitle id="work-title">
              {site.work.title}
              <br />
              <em>{site.work.serif}</em>
            </SectionTitle>
          </div>
          <div className="work-heading-side">
            <p className="section-description">{site.work.description}</p>
            <div className="work-controls">
              <button onClick={() => move(-1)} aria-label={site.actions.previous}>
                <ArrowLeft size={18} />
              </button>
              <button onClick={() => move(1)} aria-label={site.actions.next}>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
        <StackedCarousel activeIndex={index} itemCount={site.work.projects.length}>
          <article className="work-card">
            <ImageSpotlight>
              <div className="work-stage ink">
                <LiveVisual kind="shadow" />
                <div className="work-stage-top mono">
                  <span>{site.work.concept}</span>
                  <span>0{index + 1} / 03</span>
                </div>
                <div className="concept-product">
                  <div className="concept-toolbar">
                    <strong>{project.mock.name}</strong>
                    <span className="mono">{project.mock.label}</span>
                    <span className="concept-avatar">Y</span>
                  </div>
                  <div className="concept-main">
                    <span className="eyebrow">{project.category}</span>
                    <h3>{project.mock.title}</h3>
                    <div className="concept-columns">
                      {project.mock.columns.map((label, i) => (
                        <div key={label}>
                          <span className="mono">
                            <i />
                            {label}
                          </span>
                          <p>{project.mock.tasks[i]}</p>
                          <div className="concept-rule" />
                          <div className="concept-rule short" />
                          <span className="concept-task-count mono">0{i + 1}</span>
                        </div>
                      ))}
                    </div>
                    <p className="concept-footer mono">{project.mock.footer}</p>
                  </div>
                </div>
              </div>
            </ImageSpotlight>
            <div className="work-info" aria-live="polite">
              <div>
                <span className="eyebrow">{project.category}</span>
                <h3>
                  {project.name}
                  <span>{project.headline.replace("\n", " ")}</span>
                </h3>
                <p>{project.description}</p>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <button
                    className="project-details"
                    aria-label={`${site.actions.details}: ${project.name}`}
                  >
                    <ArrowUpRight size={28} />
                  </button>
                </DialogTrigger>
                <DialogContent closeLabel={site.actions.close} className="project-dialog">
                  <span className="eyebrow">
                    {site.work.concept} / {project.category}
                  </span>
                  <DialogTitle>{project.name}</DialogTitle>
                  <DialogDescription>{project.description}</DialogDescription>
                  <h3>{site.work.overview}</h3>
                  <p>{project.opportunity}</p>
                  <h3>{site.work.approach}</h3>
                  <p>{project.approach}</p>
                  <ul>
                    {project.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                  <p className="placeholder-notice">{site.work.notice}</p>
                  <ProjectLink>{site.actions.start}</ProjectLink>
                </DialogContent>
              </Dialog>
            </div>
          </article>
        </StackedCarousel>
        <div className="work-bottom">
          <p className="placeholder-notice">{site.work.notice}</p>
          <div className="work-pagination">
            {site.work.projects.map((p, i) => (
              <button
                key={p.name}
                onClick={() => setIndex(i)}
                aria-label={`0${i + 1}: ${p.name}`}
                aria-pressed={index === i}
              >
                <span className="mono">0{i + 1}</span>
                <i />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

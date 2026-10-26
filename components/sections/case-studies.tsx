"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export function CaseStudies() {
  const [index, setIndex] = useState(0);
  const spotlight = useRef<HTMLDivElement>(null);
  const project = site.work.projects[index];
  const move = (direction: number) =>
    setIndex(
      (value) => (value + direction + site.work.projects.length) % site.work.projects.length,
    );
  return (
    <section id="work" className="section work-section" aria-labelledby="work-title">
      <div className="shadow-pillars" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
        <i />
      </div>
      <div className="container">
        <div className="section-heading-row">
          <div>
            <p className="eyebrow">{site.work.label}</p>
            <SectionHeading id="work-title">{site.work.title}</SectionHeading>
          </div>
          <div className="work-heading-side">
            <p className="section-description">{site.work.description}</p>
            <div className="carousel-controls">
              <button type="button" aria-label={site.actions.previous} onClick={() => move(-1)}>
                <ArrowLeft size={18} />
              </button>
              <button type="button" aria-label={site.actions.next} onClick={() => move(1)}>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
        <div
          className="stacked-carousel"
          aria-roledescription="carousel"
          aria-label={site.work.title}
        >
          <div className="stacked-ghost ghost-back" aria-hidden="true" />
          <div className="stacked-ghost ghost-front" aria-hidden="true" />
          <article className={`project-card project-${project.color}`}>
            <div
              className="project-visual"
              ref={spotlight}
              onPointerMove={(event) => {
                const rect = event.currentTarget.getBoundingClientRect();
                spotlight.current?.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
                spotlight.current?.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
              }}
            >
              <Image
                key={project.image}
                src={project.image}
                alt={project.alt}
                width={1100}
                height={640}
                className="project-image"
                sizes="(max-width: 767px) 92vw, 80vw"
              />
              <span className="concept-badge mono">{site.work.concept}</span>
              <span className="image-spotlight" aria-hidden="true" />
            </div>
            <div className="project-info" aria-live="polite">
              <div>
                <span className="eyebrow">{project.category}</span>
                <h3>
                  {project.title}
                  <span>{project.subtitle}</span>
                </h3>
                <p>{project.description}</p>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <button
                    className="project-open"
                    aria-label={`${site.work.read}: ${project.title}`}
                  >
                    <ArrowUpRight size={26} />
                  </button>
                </DialogTrigger>
                <DialogContent className="project-dialog" closeLabel={site.work.close}>
                  <div className="project-dialog-image">
                    <Image src={project.image} alt={project.alt} width={1100} height={640} />
                  </div>
                  <div className="project-dialog-body">
                    <p className="eyebrow">
                      {site.work.concept} / {project.category}
                    </p>
                    <DialogTitle>{project.title}</DialogTitle>
                    <DialogDescription>{project.description}</DialogDescription>
                    <div className="project-tags">
                      {project.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                    <h3 className="eyebrow">{site.work.overview}</h3>
                    <p>{project.problem}</p>
                    <h3 className="eyebrow">{site.work.approach}</h3>
                    <p>{project.solution}</p>
                    <h3 className="eyebrow">{site.work.deliverablesLabel}</h3>
                    <ul>
                      {project.deliverables.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    <p className="todo-note">{site.work.notice}</p>
                    <Button asChild className="glow-border">
                      <Link href="/contact">
                        {site.actions.start}
                        <ArrowUpRight size={16} />
                      </Link>
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </article>
        </div>
        <div className="carousel-bottom">
          <p className="todo-note">{site.work.notice}</p>
          <div className="carousel-pagination" aria-label={site.work.projectLabel}>
            {site.work.projects.map((p, i) => (
              <button
                key={p.title}
                aria-label={`${site.work.projectLabel} 0${i + 1}: ${p.title}`}
                aria-pressed={i === index}
                onClick={() => setIndex(i)}
              >
                <span className="mono">0{i + 1}</span>
                <span className="pagination-line" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";
import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
  type ComponentType,
} from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";
import { SectionLabel } from "@/components/ui/section-label";
import { SectionTitle } from "@/components/ui/section-title";
import { ProjectSpotlight } from "@/components/visuals/native-details";
import Link from "next/link";

export type TrackProps = {
  track: RefObject<HTMLDivElement | null>;
  scene: RefObject<HTMLDivElement | null>;
  distance: number;
  onIndex: (index: number) => void;
  children: ReactNode;
};
function StaticTrack({ track, children }: TrackProps) {
  return (
    <div ref={track} className="work-track">
      {children}
    </div>
  );
}

export function Work() {
  const scene = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const [PinnedTrack, setPinnedTrack] = useState<ComponentType<TrackProps> | null>(null);
  const [pinned, setPinned] = useState(false);
  const [distance, setDistance] = useState(0);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const query = matchMedia(
      "(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    const sync = () => setPinned(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);
  useEffect(() => {
    if (!pinned) return;
    const measure = () =>
      setDistance(
        Math.max(0, (track.current?.scrollWidth ?? 0) - (viewport.current?.clientWidth ?? 0)),
      );
    const observer = new ResizeObserver(measure);
    if (track.current) observer.observe(track.current);
    if (viewport.current) observer.observe(viewport.current);
    measure();
    return () => observer.disconnect();
  }, [pinned]);
  useEffect(() => {
    if (!pinned) return;
    let cancelled = false;
    void import("./pinned-work-track").then((module) => {
      if (!cancelled) setPinnedTrack(() => module.default);
    });
    return () => {
      cancelled = true;
    };
  }, [pinned]);
  const Track = pinned && PinnedTrack ? PinnedTrack : StaticTrack;
  const move = (next: number) => {
    const value = Math.max(0, Math.min(site.work.projects.length - 1, next));
    if (pinned && scene.current) {
      const start = scene.current.getBoundingClientRect().top + scrollY - 76;
      window.scrollTo({
        top: start + (distance * value) / (site.work.projects.length - 1),
        behavior: "smooth",
      });
    } else track.current?.children[value]?.scrollIntoView({ behavior: "auto", block: "center" });
    setIndex(value);
  };
  return (
    <section
      id="work"
      className="section work-section work-editorial paper"
      aria-labelledby="work-title"
    >
      <div className="container heading-row work-heading">
        <div>
          <SectionLabel number={site.work.number}>{site.work.label}</SectionLabel>
          <SectionTitle id="work-title">
            {site.work.title}
            <br />
            <em>{site.work.serif}</em>
          </SectionTitle>
        </div>
        <p className="section-description">{site.work.description}</p>
      </div>
      <div
        ref={scene}
        className="work-horizontal"
        data-pinned={pinned}
        style={pinned ? { height: "calc(100svh - 76px + " + distance + "px)" } : undefined}
      >
        <div ref={viewport} className="work-track-viewport">
          <Track track={track} scene={scene} distance={distance} onIndex={setIndex}>
            {site.work.projects.map((project, panel) => (
              <article
                key={project.name}
                className="case-panel"
                data-project={project.name}
                onFocusCapture={() => {
                  if (pinned && panel !== index) move(panel);
                }}
              >
                <div className="case-meta mono">
                  <span>
                    {project.kind} / {site.work.concept}
                  </span>
                  <span>0{panel + 1}</span>
                </div>
                <div className="case-heading">
                  <h3>{project.name}</h3>
                  <p>{project.outcome}</p>
                </div>
                <ProjectSpotlight src={project.preview} alt={project.previewAlt} />
                <div className="case-bottom">
                  <span className="mono">{project.tags.join(" / ")}</span>
                  <Link
                    href={"/work/" + project.name.toLowerCase()}
                    prefetch={false}
                    className="case-study-link"
                    aria-label={site.work.caseAction + ": " + project.name}
                  >
                    {site.work.caseAction}
                    <ArrowUpRight size={18} />
                  </Link>
                </div>
              </article>
            ))}
          </Track>
          <div className="work-track-footer container">
            <span className="mono">{site.work.scrollHint}</span>
            <div className="work-controls">
              <button
                onClick={() => move(index - 1)}
                disabled={index === 0}
                aria-label={site.actions.previous}
              >
                <ArrowLeft size={18} />
              </button>
              <span className="work-progress mono" aria-label={site.work.label}>
                0{index + 1} / 0{site.work.projects.length}
              </span>
              <button
                onClick={() => move(index + 1)}
                disabled={index === site.work.projects.length - 1}
                aria-label={site.actions.next}
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

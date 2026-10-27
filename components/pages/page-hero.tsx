import { ArrowDown } from "lucide-react";
import { pageContent, site } from "@/content/site";
import { LiveVisual } from "@/components/visuals/live-visual";
import { ScrambleLabel } from "@/components/visuals/native-details";
import { ProjectLink } from "@/components/ui/project-link";
import type { VisualKind } from "@/lib/visual-presets";
type HeroKey = "services" | "agents" | "work" | "process" | "engage" | "about";
const kinds: Record<HeroKey, VisualKind> = {
  services: "iris",
  agents: "glassbound",
  work: "shadow",
  process: "cables",
  engage: "gate",
  about: "horizon",
};
export function PageHero({ page }: { page: HeroKey }) {
  const copy = pageContent[page];
  return (
    <section
      className={"page-hero page-hero-" + page}
      aria-labelledby="page-title"
      data-page-hero={page}
    >
      <div className="page-hero-art" aria-hidden="true">
        <LiveVisual kind={kinds[page]} priority sizes="100vw" />
      </div>
      <div className="page-hero-shade" aria-hidden="true" />
      <div className="container page-hero-copy">
        <div className="eyebrow">
          <span className="signal" />
          <ScrambleLabel text={copy.label} />
        </div>
        <h1 id="page-title">
          {copy.title} <em>{copy.serif}</em>
        </h1>
        <p>{copy.description}</p>
        <ProjectLink>{site.actions.start}</ProjectLink>
      </div>
      <a className="page-scroll mono" href={"#" + copy.next}>
        <span>{pageContent.scroll}</span>
        <ArrowDown size={17} />
      </a>
    </section>
  );
}

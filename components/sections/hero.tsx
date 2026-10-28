import Link from "next/link";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";
import { GridRails } from "@/components/originkit/ui/hero-28/grid-frame";
import { LiveVisual } from "@/components/visuals/live-visual";
import { ProjectLink } from "@/components/ui/project-link";
import { ScrambleLabel } from "@/components/visuals/native-details";
import { HomeStone } from "@/components/intro/home-stone";
export function Hero() {
  return (
    <section className="hero-section paper stone-hands-hero" aria-labelledby="hero-title">
      <div className="hero-stage">
        <div className="source-rails" aria-hidden="true">
          <GridRails />
        </div>
        <div className="container hero-composition">
          <div className="hero-eyebrow">
            <span className="signal" />
            <ScrambleLabel text={site.hero.label} />
          </div>
          <h1 id="hero-title">
            <span>{site.hero.lines.join(" ")}</span> <em>{site.hero.serif}</em>
          </h1>
          <p className="hero-description">{site.hero.description}</p>
          <div className="hero-visual-space" aria-hidden="true">
            <div className="hero-art" data-source="dither-reveal">
              <LiveVisual
                kind="hero-dither"
                surfaceClassName="hero-hands-surface"
                priority
                sizes="100vw"
                frameSrc="/frames/signal/hero-hands-edge.png"
                mobileFrameSrc="/frames/signal/hero-hands-diagonal.png"
                frameSources={[
                  {
                    media: "(min-width: 768px) and (min-aspect-ratio: 2/1)",
                    srcSet: "/frames/signal/hero-hands-edge-wide.png",
                  },
                  {
                    media: "(min-width: 768px) and (max-height: 800px)",
                    srcSet: "/frames/signal/hero-hands-edge-short.png",
                  },
                  {
                    media: "(min-width: 768px) and (max-aspect-ratio: 6/5)",
                    srcSet: "/frames/signal/hero-hands-edge-portrait.png",
                  },
                ]}
              />
            </div>
            <div className="hero-stone" data-source="hero-69">
              <HomeStone />
            </div>
          </div>
          <div className="hero-support">
            <div className="hero-action-group">
              <div className="hero-actions">
                <ProjectLink>{site.actions.start}</ProjectLink>
                <Link className="text-link" href="/work" prefetch={false}>
                  {site.actions.work}
                  <ArrowUpRight size={15} />
                </Link>
              </div>
              <span className="hero-note">{site.hero.note}</span>
            </div>
          </div>
          <div className="hero-baseline mono">
            <span>{site.hero.baseline[0]}</span>
            <span>{site.hero.baseline[1]}</span>
            <a href="#manifesto" aria-label={site.manifesto.label}>
              <ArrowDownRight size={20} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";
import { GridRails } from "@/components/originkit/ui/hero-28/grid-frame";
import { LiveVisual } from "@/components/visuals/live-visual";
import { ProjectLink } from "@/components/ui/project-link";
import { ScrambleLabel } from "@/components/visuals/native-details";
export function Hero() {
  return (
    <section className="hero-section paper" aria-labelledby="hero-title">
      <div className="hero-stage">
        <div className="hero-art" aria-hidden="true">
          <LiveVisual
            kind="hero-dither"
            priority
            sizes="100vw"
            frameSrc="/frames/signal/hero-hands.png"
            className="monochrome"
          />
        </div>
        <span className="fingertip-signal" aria-hidden="true" />
        <div className="source-rails" aria-hidden="true">
          <GridRails />
        </div>
        <div className="container hero-layout">
          <div className="hero-eyebrow">
            <span className="signal" />
            <ScrambleLabel text={site.hero.label} />
          </div>
          <h1 id="hero-title">
            {site.hero.lines[0]}
            <br />
            {site.hero.lines[1]}
            <br />
            <em>{site.hero.serif}</em>
            <span className="hero-period">.</span>
          </h1>
          <div className="hero-bottom-copy">
            <p>{site.hero.description}</p>
            <div className="hero-actions">
              <ProjectLink>{site.actions.start}</ProjectLink>
              <Link className="text-link" href="/#work">
                {site.actions.work}
                <ArrowUpRight size={15} />
              </Link>
            </div>
            <span>{site.hero.note}</span>
          </div>
          <div className="hero-baseline mono">
            <span>{site.hero.baseline[0]}</span>
            <span>{site.hero.baseline[1]}</span>
            <a href="#manifesto" aria-label={site.manifesto.label}>
              <ArrowDownRight size={20} />
            </a>
          </div>
        </div>
        <span className="hero-art-caption mono" aria-hidden="true">
          {site.hero.side}
        </span>
        <span className="hero-art-index" aria-hidden="true">
          {site.hero.index}
        </span>
      </div>
      <div className="hero-horizon signal-rim" aria-hidden="true">
        <LiveVisual kind="horizon" />
      </div>
    </section>
  );
}

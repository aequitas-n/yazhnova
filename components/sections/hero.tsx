import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";
import { Button } from "@/components/ui/button";
import { ScrambleText } from "@/components/effects/scramble-text";
import { Horizon } from "@/components/effects/horizon";

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-grid" aria-hidden="true" />
      <div className="container hero-container">
        <div className="hero-copy">
          <div className="availability">
            <span className="status-dot" />
            {site.hero.availability}
            <ArrowUpRight size={13} />
          </div>
          <p className="eyebrow hero-eyebrow">{site.hero.eyebrow}</p>
          <h1 id="hero-title">
            {site.hero.lineOne}
            <br />
            <span className="hero-gradient">
              <ScrambleText text={site.hero.lineTwo} />
            </span>
          </h1>
          <p className="hero-description">{site.hero.description}</p>
          <div className="hero-buttons">
            <Button asChild className="glow-border">
              <Link href="/contact">
                {site.actions.start}
                <ArrowUpRight size={17} />
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/#work">
                {site.actions.work}
                <ArrowRight size={17} />
              </Link>
            </Button>
          </div>
          <p className="hero-note">{site.hero.note}</p>
        </div>
        <Horizon />
        <div className="hero-baseline">
          <span className="mono">{site.hero.bottomLabel}</span>
          <a href="#services" className="scroll-hint">
            <span>{site.hero.scroll}</span>
            <ArrowDown size={14} />
          </a>
          <span className="hero-coordinates mono">{site.hero.visual.speed}</span>
        </div>
      </div>
    </section>
  );
}

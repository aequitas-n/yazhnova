"use client";

import { BlackHoleVisual } from "@/components/originkit/ui/hero-28/black-hole-visual";
import { GridFrame, GridRails } from "@/components/originkit/ui/hero-28/grid-frame";
import { HeroContent } from "@/components/originkit/ui/hero-28/hero-content";
import { LogoMarquee } from "@/components/originkit/ui/hero-28/logo-marquee";
import { Navbar } from "@/components/originkit/ui/hero-28/navbar";
import { StatsRow } from "@/components/originkit/ui/hero-28/stats-row";

export const SectionHero = () => (
  <main className="animate-hero-reveal relative isolate min-h-dvh w-full overflow-hidden bg-[#0a0a0a]">
    {}
    <GridRails />

    <div className="relative h-[1233px] w-full [--stage-h:clamp(811px,100dvh,1142px)] ipad:h-[1330px] desktop-sm:h-[var(--stage-h)]">
      {}
      <GridFrame />

      <div className="relative z-10 mx-auto h-full w-full max-w-[402px] ipad:max-w-[744px] desktop-sm:max-w-[1920px]">
        <Navbar />

        <div className="pointer-events-none absolute inset-0 [--band-h:calc(var(--stage-h)-341px)] desktop-sm:top-[173px] desktop-sm:bottom-[168px]">
          <HeroContent />
          <BlackHoleVisual />
        </div>

        <StatsRow />
        <LogoMarquee />
      </div>
    </div>
  </main>
);
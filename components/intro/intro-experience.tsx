"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { Component, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";
import { IntroActiveContext } from "./intro-context";
import type { IntroBeat } from "./cinematic-intro";

const CinematicIntro = dynamic(() => import("./cinematic-intro"), { ssr: false });
const SESSION_KEY = "yazhnova:intro:v1";
type Phase = "pending" | "loading" | "playing" | "revealing" | "done";

class IntroBoundary extends Component<
  { children: ReactNode; onError: () => void },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onError();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export function IntroExperience({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<Phase>("pending");
  const [beat, setBeat] = useState<IntroBeat>("formed");
  const skip = useRef<HTMLButtonElement>(null);
  const replaying = useRef(false);
  const finish = useCallback(() => {
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {}
    setPhase("done");
  }, []);
  const onReady = useCallback(() => setPhase("playing"), []);
  const onReveal = useCallback(() => setPhase("revealing"), []);
  const onBeat = useCallback((value: IntroBeat) => setBeat(value), []);
  const active = phase !== "done";
  const blocking = phase === "loading" || phase === "playing" || phase === "revealing";

  useEffect(() => {
    const capable = matchMedia(
      "(min-width: 768px) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    const dataSaver = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
      ?.saveData;
    let seen = false;
    try {
      seen = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {}
    const replay = new URLSearchParams(location.search).get("intro") === "replay";
    replaying.current = replay;
    if (!capable.matches || dataSaver || location.hash || (seen && !replay)) setPhase("done");
    else setPhase("loading");
    const onPreference = () => {
      if (!capable.matches) finish();
    };
    capable.addEventListener("change", onPreference);
    return () => capable.removeEventListener("change", onPreference);
  }, [finish]);

  useEffect(() => {
    if (phase !== "loading") return;
    const timeout = setTimeout(finish, replaying.current ? 12000 : 3500);
    return () => clearTimeout(timeout);
  }, [phase, finish]);

  useEffect(() => {
    if (!blocking) return;
    const originalOverflow = document.documentElement.style.overflow;
    const originalPadding = document.body.style.paddingRight;
    const gutter = innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.overflow = "hidden";
    if (gutter) document.body.style.paddingRight = `${gutter}px`;
    skip.current?.focus({ preventScroll: true });
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") finish();
      if (event.key === "Tab") {
        event.preventDefault();
        skip.current?.focus();
      }
    };
    document.addEventListener("keydown", keydown);
    return () => {
      document.documentElement.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPadding;
      document.removeEventListener("keydown", keydown);
      if (document.activeElement === skip.current || document.activeElement === document.body) {
        const heading = document.querySelector<HTMLElement>("#hero-title");
        heading?.setAttribute("tabindex", "-1");
        heading?.focus({ preventScroll: true });
      }
    };
  }, [blocking, finish]);

  return (
    <IntroActiveContext.Provider value={active}>
      <div className="intro-page" inert={blocking || undefined} aria-hidden={blocking || undefined}>
        {children}
      </div>
      {active && (
        <div
          className="site-intro"
          data-intro-phase={phase}
          data-intro-beat={beat}
          role="dialog"
          aria-modal="true"
          aria-labelledby="intro-title"
        >
          <p id="intro-title" className="sr-only">
            {site.intro.title}
          </p>
          <div className="intro-visual-layer">
            <Image
              src="/frames/signal/ember.png"
              alt=""
              fill
              sizes="100vw"
              className="intro-poster"
            />
            {phase !== "pending" && (
              <IntroBoundary onError={finish}>
                <CinematicIntro
                  onReady={onReady}
                  onBeat={onBeat}
                  onReveal={onReveal}
                  onComplete={finish}
                />
              </IntroBoundary>
            )}
          </div>
          <div className="intro-controls">
            <span className="intro-label mono">
              <span className="signal" />
              {site.hero.label}
            </span>
            <button ref={skip} type="button" className="intro-skip" onClick={finish}>
              {site.intro.skip}
              <ArrowUpRight size={15} aria-hidden="true" />
            </button>
            <span className="intro-progress" aria-hidden="true" />
          </div>
        </div>
      )}
      <noscript>
        <style>{".site-intro{display:none!important}"}</style>
      </noscript>
    </IntroActiveContext.Provider>
  );
}

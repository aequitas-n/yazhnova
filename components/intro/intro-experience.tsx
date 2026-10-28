"use client";

import dynamic from "next/dynamic";
import { Component, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { site } from "@/content/site";
import { IntroActiveContext, StoneContinuityContext } from "./intro-context";
import type { IntroBeat } from "./cinematic-intro";
import type { EmberHuskChoreography } from "@/components/originkit/ui/hero-69/ember-husk";

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
  const [compact, setCompact] = useState(false);
  const [mount, setMount] = useState<HTMLDivElement | null>(null);
  const [started, setStarted] = useState(false);
  const [nativeReady, setNativeReady] = useState(false);
  const cue = useRef<EmberHuskChoreography>({
    fracture: 0,
    scale: 0.86,
    rotation: -0.14,
    paused: false,
    size: 2.2,
    spread: 0.42,
    idle: false,
    viewportFraming: true,
  });
  const onNativeReady = useCallback(() => setNativeReady(true), []);
  const dialog = useRef<HTMLDivElement>(null);
  const replaying = useRef(false);
  const finish = useCallback(() => {
    Object.assign(cue.current, {
      fracture: 0,
      scale: 1,
      size: 4.5,
      spread: 1,
      idle: true,
      paused: false,
    });
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
    const capable = matchMedia("(prefers-reduced-motion: no-preference)");
    setCompact(matchMedia("(max-width: 767px), (pointer: coarse)").matches);
    let seen = false;
    try {
      seen = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {}
    const replay = new URLSearchParams(location.search).get("intro") === "replay";
    replaying.current = replay;
    if (!capable.matches || location.hash || (seen && !replay)) setPhase("done");
    else {
      setStarted(true);
      setPhase("loading");
    }
    const onPreference = () => {
      if (!capable.matches) finish();
    };
    capable.addEventListener("change", onPreference);
    return () => capable.removeEventListener("change", onPreference);
  }, [finish]);

  useEffect(() => {
    if (phase !== "loading") return;
    const timeout = setTimeout(finish, compact || replaying.current ? 12000 : 6000);
    return () => clearTimeout(timeout);
  }, [phase, finish, compact]);

  useEffect(() => {
    if (!blocking) return;
    const originalOverflow = document.documentElement.style.overflow;
    const originalPadding = document.body.style.paddingRight;
    const gutter = innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.overflow = "hidden";
    if (gutter) document.body.style.paddingRight = `${gutter}px`;
    const overlay = dialog.current;
    overlay?.focus({ preventScroll: true });
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") finish();
      if (event.key === "Tab") {
        event.preventDefault();
        overlay?.focus({ preventScroll: true });
      }
    };
    document.addEventListener("keydown", keydown);
    return () => {
      document.documentElement.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPadding;
      document.removeEventListener("keydown", keydown);
      if (document.activeElement === overlay || document.activeElement === document.body) {
        const heading = document.querySelector<HTMLElement>("#hero-title");
        heading?.setAttribute("tabindex", "-1");
        heading?.focus({ preventScroll: true });
      }
    };
  }, [blocking, finish]);

  return (
    <IntroActiveContext.Provider value={active && phase !== "revealing"}>
      <StoneContinuityContext.Provider
        value={{
          mount,
          staging: blocking,
          started,
          compact,
          ready: nativeReady,
          cue,
          onReady: onNativeReady,
          onError: finish,
        }}
      >
        <div
          className="intro-page"
          data-intro-state={phase}
          inert={blocking || undefined}
          aria-hidden={blocking || undefined}
        >
          {children}
        </div>
        {active && (
          <div
            ref={dialog}
            tabIndex={-1}
            className="site-intro"
            data-compact={compact}
            data-intro-phase={phase}
            data-intro-beat={beat}
            role="dialog"
            aria-modal="true"
            aria-labelledby="intro-title"
            aria-describedby="intro-dismiss"
          >
            <p id="intro-title" className="sr-only">
              {site.intro.title}
            </p>
            <p id="intro-dismiss" className="sr-only">
              {site.intro.dismiss}
            </p>
            <div className="intro-visual-layer">
              {phase !== "pending" && (
                <IntroBoundary onError={finish}>
                  <CinematicIntro
                    compact={compact}
                    onReady={onReady}
                    onBeat={onBeat}
                    onReveal={onReveal}
                    onComplete={finish}
                  />
                </IntroBoundary>
              )}
            </div>
            <div ref={setMount} className="intro-stone" data-intro-stone aria-hidden="true" />
            <div className="intro-controls">
              <span className="intro-label mono">
                <span className="signal" />
                {site.hero.label}
              </span>
              <span className="intro-progress" aria-hidden="true" />
            </div>
          </div>
        )}
        <noscript>
          <style>{".site-intro{display:none!important}"}</style>
        </noscript>
      </StoneContinuityContext.Provider>
    </IntroActiveContext.Provider>
  );
}

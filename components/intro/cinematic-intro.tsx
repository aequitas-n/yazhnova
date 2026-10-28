"use client";

import { useContext, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { site } from "@/content/site";
import { StoneContinuityContext } from "./intro-context";

export type IntroBeat = "formed" | "opening" | "wordmark" | "closing" | "reformed" | "docking";

export default function CinematicIntro({
  onReady,
  onBeat,
  onReveal,
  onComplete,
  compact = false,
}: {
  onReady: () => void;
  onBeat: (beat: IntroBeat) => void;
  onReveal: () => void;
  onComplete: () => void;
  compact?: boolean;
}) {
  const root = useRef<HTMLDivElement>(null);
  const left = useRef<HTMLSpanElement>(null);
  const right = useRef<HTMLSpanElement>(null);
  const note = useRef<HTMLParagraphElement>(null);
  const continuity = useContext(StoneContinuityContext);
  const ready = continuity?.ready;
  const cue = continuity?.cue;

  useEffect(() => {
    if (!ready || !cue || !root.current) return;
    const overlay = root.current.closest<HTMLElement>(".site-intro");
    const layer = overlay?.querySelector<HTMLElement>(".intro-visual-layer");
    const frame = overlay?.querySelector<HTMLElement>(".intro-stone");
    const destination = document.querySelector<HTMLElement>(".hero-stone");
    if (!overlay || !layer || !frame || !destination) {
      onComplete();
      return;
    }
    onReady();
    // A square native render target retains its resolution while only its outer
    // transform moves. No per-frame GPU target allocation or canvas replacement.
    const size = Math.min(innerWidth, innerHeight);
    const state = { dock: 0 };
    gsap.set(frame, {
      width: size,
      height: size,
      left: innerWidth / 2,
      top: innerHeight / 2,
      xPercent: -50,
      yPercent: -50,
      scale: 1,
    });
    const timeline = gsap.timeline({
      onUpdate: () => {
        overlay.style.setProperty("--intro-progress", String(timeline.progress()));
        if (!state.dock) return;
        const target = destination.getBoundingClientRect();
        const centerX = innerWidth / 2;
        const centerY = innerHeight / 2;
        gsap.set(frame, {
          left: centerX + (target.left + target.width / 2 - centerX) * state.dock,
          top: centerY + (target.top + target.height / 2 - centerY) * state.dock,
          scale: 1 + (target.width / size - 1) * state.dock,
        });
      },
      onComplete,
    });
    gsap.set(left.current, { x: 0, xPercent: 100, scale: 0.94, transformOrigin: "right center" });
    gsap.set(right.current, { x: 0, xPercent: -100, scale: 0.94, transformOrigin: "left center" });
    gsap.set(note.current, { opacity: 0, y: 8 });
    timeline
      .call(() => onBeat("formed"), [], 0)
      .to(frame, { opacity: 1, duration: 0.22 }, 0)
      .to(cue.current, { scale: 1, duration: 0.65, ease: "power3.out" }, 0)
      .to(cue.current, { rotation: 0.18, duration: 3, ease: "none" }, 0)
      .call(() => onBeat("opening"), [], 0.7)
      .to(cue.current, { fracture: 1.65, duration: 1.05, ease: "power3.inOut" }, 0.7)
      .to(left.current, { xPercent: 0, scale: 1, duration: 0.95, ease: "power3.out" }, 1.15)
      .to(right.current, { xPercent: 0, scale: 1, duration: 0.95, ease: "power3.out" }, 1.15)
      .to(note.current, { opacity: 1, y: 0, duration: 0.45 }, 1.8)
      .call(() => onBeat("wordmark"), [], 2.1)
      .call(() => onBeat("closing"), [], 2.95)
      .to(note.current, { opacity: 0, duration: 0.2 }, 2.95)
      .to(left.current, { xPercent: 100, scale: 0.6, duration: 0.65, ease: "power3.inOut" }, 2.95)
      .to(right.current, { xPercent: -100, scale: 0.6, duration: 0.65, ease: "power3.inOut" }, 2.95)
      .to(cue.current, { fracture: 0, duration: 0.8, ease: "power3.inOut" }, 3.15)
      .to(cue.current, { rotation: 0.36, duration: 1.05, ease: "power2.out" }, 3)
      .call(() => onBeat("reformed"), [], 3.95)
      .call(
        () => {
          onBeat("docking");
          onReveal();
        },
        [],
        4.18,
      )
      .to(layer, { opacity: 0, duration: 1.22, ease: "power2.inOut" }, 4.18)
      .to(state, { dock: 1, duration: 1.22, ease: "power3.inOut" }, 4.18)
      .to(cue.current, { size: 4.5, spread: 1, duration: 1.22, ease: "power3.inOut" }, 4.18)
      .to(overlay.querySelector(".intro-label"), { opacity: 0, duration: 0.25 }, 0.7)
      .to(overlay.querySelector(".intro-controls"), { opacity: 0, duration: 0.3 }, 4.9);
    if (compact) timeline.timeScale(5.4 / 2.1);
    const visibility = () => {
      cue.current.paused = document.hidden;
      if (document.hidden) timeline.pause();
      else timeline.resume();
    };
    visibility();
    document.addEventListener("visibilitychange", visibility);
    return () => {
      timeline.kill();
      document.removeEventListener("visibilitychange", visibility);
      overlay.style.removeProperty("--intro-progress");
    };
  }, [ready, cue, onReady, onBeat, onReveal, onComplete, compact]);

  return (
    <div className="intro-scene" ref={root}>
      <div className="intro-wordmark" aria-hidden="true">
        <div className="intro-word-half intro-word-left">
          <span ref={left}>{site.name.slice(0, 4)}</span>
        </div>
        <div className="intro-word-half intro-word-right">
          <span ref={right}>{site.name.slice(4)}</span>
        </div>
      </div>
      <p className="intro-note mono" ref={note} aria-hidden="true">
        {site.intro.note}
      </p>
    </div>
  );
}

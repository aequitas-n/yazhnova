"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import EmberHusk, {
  type EmberHuskChoreography,
} from "@/components/originkit/ui/hero-69/ember-husk";
import { site } from "@/content/site";
import { visualPresets } from "@/lib/visual-presets";

export type IntroBeat = "formed" | "opening" | "wordmark" | "closing" | "reformed" | "burst";

export default function CinematicIntro({
  onReady,
  onBeat,
  onReveal,
  onComplete,
}: {
  onReady: () => void;
  onBeat: (beat: IntroBeat) => void;
  onReveal: () => void;
  onComplete: () => void;
}) {
  const root = useRef<HTMLDivElement>(null);
  const left = useRef<HTMLSpanElement>(null);
  const right = useRef<HTMLSpanElement>(null);
  const note = useRef<HTMLParagraphElement>(null);
  const [ready, setReady] = useState(false);
  const cue = useRef<EmberHuskChoreography>({
    fracture: 0,
    scale: 0.86,
    rotation: -0.14,
    paused: false,
  });
  const didRender = useCallback(() => setReady(true), []);

  useEffect(() => {
    if (!ready || !root.current) return;
    onReady();
    const state = { opening: 0 };
    const layer = root.current.closest<HTMLElement>(".intro-visual-layer");
    const overlay = root.current.closest<HTMLElement>(".site-intro");
    const timeline = gsap.timeline({
      onUpdate: () => {
        layer?.style.setProperty("--intro-opening", `${state.opening * 80}vmax`);
        overlay?.style.setProperty("--intro-progress", String(timeline.progress()));
      },
      onComplete,
    });
    gsap.set(left.current, { x: 0, xPercent: 100, scale: 0.94, transformOrigin: "right center" });
    gsap.set(right.current, { x: 0, xPercent: -100, scale: 0.94, transformOrigin: "left center" });
    gsap.set(note.current, { opacity: 0, y: 8 });
    timeline
      .call(() => onBeat("formed"), [], 0)
      .to(overlay!.querySelector(".intro-poster"), { opacity: 0, duration: 0.35 }, 0)
      .to(root.current.querySelector(".intro-stone"), { opacity: 1, duration: 0.35 }, 0)
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
      .call(() => onBeat("burst"), [], 4.3)
      .to(cue.current, { fracture: 5.2, rotation: 0.7, duration: 1.2, ease: "power3.in" }, 4.3)
      .call(onReveal, [], 4.62)
      .to(state, { opening: 1, duration: 0.95, ease: "power2.inOut" }, 4.62)
      .to(overlay!.querySelector(".intro-label"), { opacity: 0, duration: 0.25 }, 0.7)
      .to(overlay!.querySelector(".intro-controls"), { opacity: 0, duration: 0.3 }, 5.1);

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
      layer?.style.removeProperty("--intro-opening");
      overlay?.style.removeProperty("--intro-progress");
    };
  }, [ready, onReady, onBeat, onReveal, onComplete]);

  useEffect(() => {
    const layer = root.current;
    const lost = (event: Event) => {
      event.preventDefault();
      onComplete();
    };
    layer?.addEventListener("webglcontextlost", lost, true);
    return () => layer?.removeEventListener("webglcontextlost", lost, true);
  }, [onComplete]);

  return (
    <div className="intro-scene" ref={root}>
      <div className="intro-stone" data-intro-stone aria-hidden="true">
        <EmberHusk
          {...visualPresets.ember}
          size={2.2}
          quality="low"
          choreography={cue}
          entrance={{ scatter: 0, tumble: 0, stagger: 0 }}
          response={{ strength: 0, repel: 0, settle: 8 }}
          drift={{ spin: 0, bob: 1, sway: 1 }}
          debris={{ count: 28, size: 3, spread: 3 }}
          beads={0}
          onReady={didRender}
          onError={onComplete}
          style={{ width: "100%", height: "100%", minWidth: 0, minHeight: 0 }}
        />
      </div>
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

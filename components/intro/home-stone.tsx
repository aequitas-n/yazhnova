"use client";

import { useContext, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { StoneContinuityContext } from "./intro-context";
import { LiveVisual } from "@/components/visuals/live-visual";

// Move a stable portal container, not the React renderer. Its WebGL canvas,
// geometry, textures and animation clock survive the entire intro handoff.
export function HomeStone() {
  const continuity = useContext(StoneContinuityContext);
  const anchor = useRef<HTMLDivElement>(null);
  const [surface, setSurface] = useState<HTMLDivElement | null>(null);
  useLayoutEffect(() => {
    const element = document.createElement("div");
    element.className = "home-stone-surface";
    element.style.cssText = "width:100%;height:100%";
    setSurface(element);
    return () => element.remove();
  }, []);
  const target = continuity?.staging ? continuity.mount : null;
  useLayoutEffect(() => {
    if (surface) (target ?? anchor.current)?.appendChild(surface);
  }, [surface, target]);
  const visual = (
    <LiveVisual
      kind="hero-stone"
      priority
      sizes="38vw"
      frameSrc="/frames/signal/hero-stone.webp?v=diagonal"
      forceLive={continuity?.staging}
      playDuringIntro
      onNativeReady={continuity?.onReady}
      overrides={
        continuity?.started
          ? {
              choreography: continuity.cue,
              onError: continuity.onError,
            }
          : undefined
      }
    />
  );
  return (
    <div ref={anchor} className="home-stone-mount" style={{ width: "100%", height: "100%" }}>
      {surface ? createPortal(visual, surface) : visual}
    </div>
  );
}

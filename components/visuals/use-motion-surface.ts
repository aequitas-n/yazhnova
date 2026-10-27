"use client";
import { useEffect, useRef, useState, type ComponentType } from "react";
import { useIntroActive } from "@/components/intro/intro-context";

export function useMotionSurface() {
  const ref = useRef<HTMLDivElement>(null);
  const intro = useIntroActive();
  const [allowed, setAllowed] = useState(false);
  const [visible, setVisible] = useState(false);
  const [foreground, setForeground] = useState(true);
  useEffect(() => {
    const query = matchMedia(
      "(min-width: 768px) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    const sync = () => setAllowed(query.matches);
    const visibility = () => setForeground(!document.hidden);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    if (ref.current) observer.observe(ref.current);
    sync();
    visibility();
    query.addEventListener("change", sync);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      observer.disconnect();
      query.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);
  return { ref, live: allowed && visible && foreground && !intro };
}

const loaders = {
  rolling: () => import("@/components/originkit/ui/pricing-04/rolling-letters"),
  chat: () => import("@/components/originkit/ui/live-chat"),
  marquee: () => import("@/components/originkit/ui/curvedmarquee"),
  scramble: () => import("@/components/originkit/ui/scrambletext"),
  reveal: () => import("@/components/originkit/ui/scroll-text-reveal"),
  border: () => import("@/components/originkit/ui/glow-border"),
  spotlight: () => import("@/components/originkit/ui/image-spotlight"),
};
type Source = ComponentType<Record<string, unknown>>;
export function useNativeSource(kind: keyof typeof loaders, enabled: boolean) {
  const [Source, setSource] = useState<Source | null>(null);
  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;
    loaders[kind]()
      .then((module) => {
        if (!cancelled) setSource(() => module.default as unknown as Source);
      })
      .catch(() => {
        /* The semantic/static content remains available. */
      });
    return () => {
      cancelled = true;
    };
  }, [kind, enabled]);
  return enabled ? Source : null;
}

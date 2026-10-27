"use client";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import type { VisualKind } from "@/lib/visual-presets";
import { useIntroActive } from "@/components/intro/intro-context";
import { useWebGLBudget } from "./webgl-budget";
const flatKinds = new Set<VisualKind>(["manifesto", "pixels", "liquid", "strings"]);
const Renderer = dynamic(() => import("./renderers"), { ssr: false });
class VisualBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}
export function LiveVisual({
  kind,
  className = "",
  alt = "",
  priority = false,
  sizes = "(max-width:767px) 100vw, 60vw",
  frameSrc,
  overrides,
}: {
  kind: VisualKind;
  className?: string;
  alt?: string;
  priority?: boolean;
  sizes?: string;
  frameSrc?: string;
  overrides?: Record<string, unknown>;
}) {
  const introActive = useIntroActive();
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [allowed, setAllowed] = useState(false);
  const [visible, setVisible] = useState(true);
  const [loaded, setLoaded] = useState(priority);
  const [exposure, setExposure] = useState(0);
  useEffect(() => {
    const media = matchMedia(
      "(min-width: 768px) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    const sync = () => setAllowed(media.matches);
    sync();
    media.addEventListener("change", sync);
    const observer = new IntersectionObserver(
      ([entry]) => {
        setActive(entry.isIntersecting);
        const center = (entry.boundingClientRect.top + entry.boundingClientRect.bottom) / 2;
        setExposure(entry.intersectionRatio + 1 / (1 + Math.abs(center - innerHeight / 2)));
      },
      {
        threshold: [0, 0.02, 0.1, 0.25, 0.5, 0.75, 1],
      },
    );
    if (ref.current) observer.observe(ref.current);
    const imageObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoaded(true);
          imageObserver.disconnect();
        }
      },
      { rootMargin: "96px 0px" },
    );
    if (ref.current) imageObserver.observe(ref.current);
    const onVisibility = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer.disconnect();
      imageObserver.disconnect();
      media.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);
  const live = useWebGLBudget(
    active && allowed && visible && !introActive,
    exposure,
    !flatKinds.has(kind),
  );
  useEffect(() => {
    if (!live || flatKinds.has(kind) || !ref.current) return;
    const host = ref.current;
    const canvases = new Set<HTMLCanvasElement>();
    const collect = () => host.querySelectorAll("canvas").forEach((canvas) => canvases.add(canvas));
    const observer = new MutationObserver(collect);
    collect();
    observer.observe(host, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
      const type = ["glossy", "glassbound", "globe", "gate", "ocean", "ember", "wordmark"].includes(
        kind,
      )
        ? "webgl2"
        : "webgl";
      for (const canvas of canvases) {
        const gl = canvas.getContext(type) as WebGLRenderingContext | null;
        if (gl && !gl.isContextLost()) gl.getExtension("WEBGL_lose_context")?.loseContext();
      }
    };
  }, [live, kind]);
  return (
    <div
      ref={ref}
      className={`live-visual ${className}`}
      data-visual={kind}
      data-mode={live ? "live" : "static"}
    >
      {loaded && (
        <Image
          src={frameSrc ?? `/frames/signal/${kind}.png`}
          alt={alt}
          fill
          sizes={sizes}
          className="visual-frame"
          priority={priority}
          fetchPriority={priority ? "high" : undefined}
          quality={kind === "pixels" || kind === "manifesto" ? 65 : 75}
        />
      )}
      {live && (
        <div className="visual-canvas" aria-hidden="true">
          <VisualBoundary>
            <Renderer kind={kind} overrides={overrides} />
          </VisualBoundary>
        </div>
      )}
    </div>
  );
}

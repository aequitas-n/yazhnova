"use client";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import type { VisualKind } from "@/lib/visual-presets";
import { useIntroActive } from "@/components/intro/intro-context";
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
}: {
  kind: VisualKind;
  className?: string;
  alt?: string;
  priority?: boolean;
  sizes?: string;
  frameSrc?: string;
}) {
  const introActive = useIntroActive();
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [allowed, setAllowed] = useState(false);
  const [visible, setVisible] = useState(true);
  const [loaded, setLoaded] = useState(priority);
  useEffect(() => {
    const media = matchMedia(
      "(min-width: 768px) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    const sync = () => setAllowed(media.matches);
    sync();
    media.addEventListener("change", sync);
    const observer = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), {
      threshold: 0.02,
    });
    if (ref.current) observer.observe(ref.current);
    const imageObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoaded(true);
          imageObserver.disconnect();
        }
      },
      { rootMargin: "240px 0px" },
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
  const live = active && allowed && visible && !introActive;
  return (
    <div
      ref={ref}
      className={`live-visual ${className}`}
      data-visual={kind}
      data-mode={live ? "live" : "static"}
    >
      {loaded && (
        <Image
          src={frameSrc ?? `/frames/${kind}.png`}
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
            <Renderer kind={kind} />
          </VisualBoundary>
        </div>
      )}
    </div>
  );
}

"use client";
import Image from "next/image";
import dynamic from "next/dynamic";
import {
  Component,
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type CSSProperties,
} from "react";
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
  initialFrame = false,
  sizes = "(max-width:767px) 100vw, 60vw",
  frameSrc,
  mobileFrameSrc,
  frameSources,
  overrides,
  surfaceClassName,
  surfaceStyle,
  overlay,
  forceLive = false,
  playDuringIntro = false,
  onNativeReady,
}: {
  kind: VisualKind;
  className?: string;
  alt?: string;
  priority?: boolean;
  initialFrame?: boolean;
  sizes?: string;
  frameSrc?: string;
  mobileFrameSrc?: string;
  frameSources?: ReadonlyArray<{ media: string; srcSet: string }>;
  overrides?: Record<string, unknown>;
  surfaceClassName?: string;
  surfaceStyle?: CSSProperties;
  overlay?: ReactNode;
  forceLive?: boolean;
  playDuringIntro?: boolean;
  onNativeReady?: () => void;
}) {
  const introActive = useIntroActive();
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [allowed, setAllowed] = useState(false);
  const [visible, setVisible] = useState(true);
  const [loaded, setLoaded] = useState(priority || initialFrame);
  const [exposure, setExposure] = useState(0);
  const keepPreview = kind === "hero-dither" || kind === "hero-stone";
  const [ready, setReady] = useState(false);
  const onReady = useCallback(() => {
    setReady(true);
    onNativeReady?.();
  }, [onNativeReady]);
  // Keep the SSR/reduced-motion frame available without preloading a large
  // decorative bitmap ahead of the live chapter scene and its fonts.
  const preloadFrame =
    priority && kind !== "plasma" && kind !== "contact-rain" && !frameSources?.length;
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: no-preference)");
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
    (forceLive || (active && allowed)) && visible && (!introActive || playDuringIntro),
    exposure,
    !flatKinds.has(kind),
  );
  useEffect(() => {
    if (!live) setReady(false);
  }, [live]);
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
      const type = [
        "glossy",
        "glassbound",
        "globe",
        "gate",
        "ocean",
        "ember",
        "hero-stone",
        "wordmark",
      ].includes(kind)
        ? "webgl2"
        : "webgl";
      for (const canvas of canvases) {
        const gl = canvas.getContext(type) as WebGLRenderingContext | null;
        if (gl && !gl.isContextLost()) gl.getExtension("WEBGL_lose_context")?.loseContext();
      }
    };
  }, [live, kind]);
  const Frame = mobileFrameSrc || frameSources?.length ? "picture" : Fragment;
  return (
    <div
      ref={ref}
      className={`live-visual ${className}`}
      data-visual={kind}
      data-mode={live ? "live" : allowed ? "waiting" : "static"}
      data-ready={keepPreview ? String(ready) : undefined}
    >
      {loaded && (!allowed || (keepPreview && (!live || !ready))) && !forceLive && (
        <Frame>
          {mobileFrameSrc && <source media="(max-width: 767px)" srcSet={mobileFrameSrc} />}
          {frameSources?.map((source) => (
            <source key={source.media} {...source} />
          ))}
          <Image
            src={frameSrc ?? `/frames/signal/${kind}.png`}
            alt={alt}
            fill
            sizes={sizes}
            className="visual-frame"
            priority={preloadFrame}
            fetchPriority={preloadFrame || (priority && frameSources?.length) ? "high" : undefined}
            loading={priority && frameSources?.length ? "eager" : undefined}
            quality={kind === "manifesto" ? 90 : kind === "pixels" ? 65 : 75}
            unoptimized={keepPreview}
          />
        </Frame>
      )}
      {live && (
        <div
          className="visual-canvas"
          aria-hidden="true"
          style={keepPreview && !ready ? { visibility: "hidden" } : undefined}
        >
          <VisualBoundary>
            <div
              className={surfaceClassName}
              style={{ width: "100%", height: "100%", ...surfaceStyle }}
            >
              <Renderer
                kind={kind}
                overrides={overrides}
                onReady={keepPreview ? onReady : undefined}
              />
            </div>
          </VisualBoundary>
        </div>
      )}
      {live && overlay}
    </div>
  );
}

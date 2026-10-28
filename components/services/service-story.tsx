"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { RotateCcw, Mail, Calendar, FileText, MessageSquare, Database, Check } from "lucide-react";
import { serviceStories as copy } from "@/content/site";
import { drawServiceStory, type StoryId } from "@/lib/service-story-canvas";
import type { RasterStoryInput, ArchitectureGraph } from "@/lib/service-story-types";
import { useMotionSurface } from "@/components/visuals/use-motion-surface";
import { LiveVisual } from "@/components/visuals/live-visual";
import { visualPresets, type VisualKind } from "@/lib/visual-presets";

const kinds: Record<StoryId, VisualKind> = {
  web: "pixels",
  saas: "liquid",
  ai: "glossy",
  mobile: "pixels",
  cloud: "network",
  design: "pixels",
};
const icons = [Mail, Database, Calendar, FileText, MessageSquare];
const cap = (value: number) => Math.max(0, Math.min(1, value));
export function ServiceStory({
  id,
  forceLive = false,
  sampleTime,
}: {
  id: StoryId;
  forceLive?: boolean;
  sampleTime?: number;
}) {
  const { ref, live, allowed } = useMotionSurface();
  const scene = useRef<HTMLDivElement>(null);
  const elapsed = useRef(0);
  const raster = useRef<RasterStoryInput["current"]>({
    canvas: null,
    assemble: 0,
    reveal: 0,
    version: 0,
  });
  const graph = useRef<ArchitectureGraph["current"]>({
    nodes: copy.cloud.nodes,
    edges: copy.cloud.edges,
    route: copy.cloud.route,
    time: 0,
    hovered: null,
  });
  const [ready, setReady] = useState(false);
  const [clock, setClock] = useState(0);
  const [replay, setReplay] = useState(0);
  const [hovered, setHovered] = useState<string | null>(null);
  const [width, setWidth] = useState(1000);
  const active = forceLive || live;
  const kind = kinds[id];
  const overrides = useMemo(() => {
    if (id === "cloud")
      return {
        graph,
        density: copy.cloud.nodes.length,
        hover: 0,
        network: { lineWidth: 120, halo: 180, pulse: 70 },
      };
    if (id === "ai")
      return {
        scale: 67,
        speed: 8,
        advanced: { ...visualPresets.glossy.advanced, resolution: 75 },
      };
    if (id === "saas") return { composition: raster, intensity: 55, radius: 180 };
    return {
      composition: raster,
      scale: 100,
      speed: 2,
      offColor: "#0A0A0A",
      advanced: {
        cellsAcross: 160,
        gridWidth: 7,
        gridOpacity: 0,
        grain: 0,
        halo: 0,
        hover: 30,
        pointerRadius: 12,
      },
    };
  }, [id]);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    raster.current.canvas = canvas;
    const time = sampleTime ?? 0;
    drawServiceStory(canvas, id, time);
    raster.current.version++;
    let disposed = false;
    void document.fonts.ready.then(() => {
      if (disposed) return;
      drawServiceStory(canvas, id, sampleTime ?? elapsed.current);
      raster.current.version++;
    });
    const host = scene.current;
    if (!host) return;
    const observer = new MutationObserver(() =>
      setReady(!!host.querySelector(".visual-canvas canvas")),
    );
    observer.observe(host, { childList: true, subtree: true });
    const resize = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    resize.observe(host);
    return () => {
      disposed = true;
      observer.disconnect();
      resize.disconnect();
    };
  }, [id, sampleTime]);

  useEffect(() => {
    elapsed.current = 0;
    setClock(0);
  }, [id, replay]);
  useEffect(() => {
    if (!active || !ready) return;
    let frame = 0,
      last = performance.now(),
      lastPaint = -100,
      lastState = -100;
    const tick = (now: number) => {
      const delta = Math.max(0, now - last);
      last = now;
      elapsed.current = sampleTime ?? elapsed.current + delta;
      const time = id === "ai" ? elapsed.current % 9600 : Math.min(copy.duration, elapsed.current);
      const seconds = time / 1000;
      graph.current.time = elapsed.current / 1000;
      raster.current.assemble = cap((time - 250) / 1500);
      raster.current.reveal = cap((time - (id === "mobile" ? 1300 : 1900)) / 1050);
      if (now - lastPaint > 32 && raster.current.canvas && id !== "ai" && id !== "cloud") {
        drawServiceStory(raster.current.canvas, id, time);
        raster.current.version++;
        lastPaint = now;
      }
      const pulse = seconds > 2.8 && seconds < 4.2 ? Math.sin((seconds - 2.8) * 14) * 0.055 : 0;
      scene.current?.style.setProperty("--core-scale", String(1 + pulse));
      if (now - lastState > 80 || sampleTime !== undefined) {
        setClock(elapsed.current);
        lastState = now;
      }
      if (
        sampleTime === undefined &&
        (elapsed.current < copy.duration || id === "ai" || id === "cloud")
      )
        frame = requestAnimationFrame(tick);
      else {
        raster.current.assemble = 1;
        raster.current.reveal = 1;
        setClock(elapsed.current);
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, ready, id, replay, sampleTime]);

  const staticMode = !forceLive && !allowed;
  const time = staticMode
    ? copy.duration
    : id === "ai"
      ? clock % 9600
      : Math.min(copy.duration, clock);
  const seconds = time / 1000;
  const step = Math.max(
    0,
    copy.stepTimes[id].findLastIndex((start) => time >= start),
  );
  const hoveredNode = copy.cloud.nodes.find((node) => node.id === hovered);
  const selectNode = (value: string | null) => {
    graph.current.hovered = value;
    setHovered(value);
  };
  const overlay =
    id === "ai" ? (
      <div className="agent-story-overlay" aria-hidden="true">
        <span className="agent-core-label mono">
          {seconds > 2.8 && seconds < 4.2 ? copy.ai.thinking : copy.ai.core}
        </span>
        {copy.ai.tools.map((label, index) => {
          const angle = (index / 5) * Math.PI * 2 - Math.PI / 2 + seconds * 0.12;
          const pull = cap((seconds - 0.65 - index * 0.42) / 0.65);
          const radius = Math.min(280, width * 0.29) * (1 - pull);
          const Icon = icons[index];
          return (
            <span
              key={label}
              className="story-tool"
              style={{
                transform:
                  "translate(-50%, -50%) translate(" +
                  Math.cos(angle) * radius +
                  "px," +
                  Math.sin(angle) * radius * 0.75 +
                  "px) scale(" +
                  (1 - pull * 0.65) +
                  ")",
                opacity: 1 - pull,
              }}
            >
              <Icon size={17} />
              {label}
            </span>
          );
        })}
        <div
          className="agent-story-task"
          style={{
            opacity: cap((seconds - 4.1) / 0.6),
            transform: "translate(-50%, " + 20 * (1 - cap((seconds - 4.1) / 0.6)) + "px)",
          }}
        >
          <span className="mono">
            <Check size={14} />
            {copy.ai.taskLabel}
          </span>
          <strong>{copy.ai.tasks[Math.floor(clock / 9600) % copy.ai.tasks.length]}</strong>
        </div>
        <span className="agent-story-note mono">{copy.ai.note}</span>
      </div>
    ) : id === "cloud" ? (
      <div className="architecture-overlay">
        <h3>{copy.cloud.title}</h3>
        {copy.cloud.nodes.map((node, index) => (
          <button
            key={node.id}
            type="button"
            className="architecture-node"
            aria-describedby={hovered === node.id ? "architecture-tooltip" : undefined}
            onPointerEnter={() => selectNode(node.id)}
            onPointerLeave={(event) => {
              if (event.pointerType === "mouse") selectNode(null);
            }}
            onClick={() => selectNode(node.id)}
            onFocus={() => selectNode(node.id)}
            onBlur={() => selectNode(null)}
            style={{
              left: node.x * 100 + "%",
              top: node.y * 100 + "%",
              opacity: 0.35 + 0.65 * cap(seconds / 0.9 - index * 0.035),
            }}
          >
            <span className="architecture-logos">
              {node.mark ||
                node.logos.map((logo) => (
                  <img key={logo} src={"/stack/" + logo + ".svg"} width={19} height={19} alt="" />
                ))}
            </span>
            <span>{node.label}</span>
          </button>
        ))}
        {hoveredNode && (
          <div id="architecture-tooltip" role="tooltip" className="architecture-tooltip">
            {hoveredNode.detail}
          </div>
        )}
        <span className="architecture-note mono">{copy.cloud.note}</span>
      </div>
    ) : undefined;
  return (
    <div
      ref={ref}
      className="service-story"
      data-story={id}
      data-step={step}
      data-hover={hovered ?? undefined}
      data-state={
        staticMode
          ? "static"
          : !active
            ? "paused"
            : !ready
              ? "loading"
              : time >= copy.duration
                ? "idle"
                : "playing"
      }
      data-time={Math.round(time)}
    >
      <p className="sr-only">{copy.descriptions[id]}</p>
      {id === "cloud" && (
        <ul className="sr-only">
          {copy.cloud.nodes.map((node) => (
            <li key={node.id}>
              {node.label}: {node.detail}
            </li>
          ))}
        </ul>
      )}
      <div ref={scene} className="service-story-scene">
        <LiveVisual
          kind={kind}
          overrides={overrides}
          forceLive={forceLive}
          frameSrc={
            forceLive
              ? "/frames/signal/" + kind + ".png"
              : "/frames/stories/" +
                (id === "mobile" ? "mobile-phone" : id) +
                ".webp?v=pass5"
          }
          sizes="(max-width:767px) 100vw, 70vw"
          overlay={overlay}
          surfaceClassName={
            id === "ai"
              ? "story-core"
              : id === "mobile"
                ? "story-phone"
                : id === "cloud"
                  ? "story-native"
                  : "story-native story-board"
          }
        />
      </div>
      <div className="story-caption">
        <ol aria-live="polite">
          {copy.steps[id].map((label, index) => (
            <li key={label} aria-current={step === index ? "step" : undefined}>
              {label}
            </li>
          ))}
        </ol>
        <button
          type="button"
          onClick={() => setReplay((value) => value + 1)}
          aria-label={copy.replay}
          disabled={!active}
        >
          <RotateCcw size={14} />
        </button>
      </div>
    </div>
  );
}

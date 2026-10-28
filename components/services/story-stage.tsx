"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";
import { RotateCcw } from "lucide-react";
import { serviceStories as copy } from "@/content/site";
import type { StoryId } from "@/lib/service-story-canvas";
import { useMotionSurface } from "@/components/visuals/use-motion-surface";

const Story = dynamic(() => import("./service-story").then((module) => module.ServiceStory), {
  ssr: false,
});

export function StoryStage({ id }: { id: StoryId }) {
  const { ref, live, allowed, visible } = useMotionSurface();
  const [visited, setVisited] = useState(false);
  const [frameVisited, setFrameVisited] = useState(false);
  useEffect(() => {
    if (live) setVisited(true);
    if (visible) setFrameVisited(true);
  }, [live, visible]);
  return (
    <div ref={ref} style={{ position: "absolute", inset: 0 }}>
      {visited && allowed ? (
        <Story id={id} />
      ) : (
        <div
          className="service-story"
          data-story={id}
          data-state={allowed ? "loading" : "static"}
          data-step="3"
          data-time={copy.duration}
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
          <div className="service-story-scene">
            {frameVisited && !allowed && (
              <Image
                src={"/frames/stories/" + (id === "mobile" ? "mobile-phone" : id) + ".png"}
                alt=""
                fill
                sizes="(max-width:767px) 100vw, 70vw"
                className="visual-frame"
              />
            )}
          </div>
          <div className="story-caption">
            <ol>
              {copy.steps[id].map((label, index) => (
                <li key={label} aria-current={index === 3 ? "step" : undefined}>
                  {label}
                </li>
              ))}
            </ol>
            <button type="button" disabled aria-label={copy.replay}>
              <RotateCcw size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

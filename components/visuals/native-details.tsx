"use client";
import Image from "next/image";
import { site } from "@/content/site";
import { editorialPresets, palette } from "@/lib/originkit-catalog";
import { useMotionSurface, useNativeSource } from "./use-motion-surface";

const labelFont = {
  fontFamily: "Geist Mono",
  fontSize: "inherit",
  fontWeight: 400,
  letterSpacing: "inherit",
  lineHeight: "inherit",
};
const copyFont = {
  fontFamily: "inherit",
  fontSize: "inherit",
  fontWeight: 400,
  lineHeight: "inherit",
  textAlign: "left",
  letterSpacing: "inherit",
};

export function ScrambleLabel({ text }: { text: string }) {
  const { ref, live } = useMotionSurface();
  const Source = useNativeSource("scramble", live);
  return (
    <div ref={ref} className="native-label native-copy" data-source="scrambletext">
      <span className={Source ? "copy-underlay" : undefined}>{text}</span>
      {Source && (
        <div className="native-copy-overlay" aria-hidden="true">
          <Source
            {...editorialPresets.scrambletext}
            words={text}
            color="inherit"
            font={labelFont}
          />
        </div>
      )}
    </div>
  );
}

export function RevealCopy({
  text,
  className = "section-description",
}: {
  text: string;
  className?: string;
}) {
  const { ref, live } = useMotionSurface();
  const Source = useNativeSource("reveal", live);
  return (
    <div ref={ref} className={`native-copy ${className}`} data-source="scroll-text-reveal">
      <p className={Source ? "copy-underlay" : undefined}>{text}</p>
      {Source && (
        <div className="native-copy-overlay" aria-hidden="true">
          <Source
            text={text}
            tag="p"
            color="inherit"
            font={copyFont}
            reverse={false}
            splitMode="words"
            blurEnabled={false}
            translateYInitial={10}
            transition={{ duration: 0.45, stagger: 0.015 }}
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      )}
    </div>
  );
}

export function NativeChat({ run }: { run: number }) {
  const { ref, live } = useMotionSurface();
  const Source = useNativeSource("chat", live);
  return (
    <div ref={ref} className="native-chat" data-source="live-chat">
      {Source ? (
        <Source
          key={run}
          {...editorialPresets["live-chat"]}
          messages={site.agents.demo.messages}
          font={{ fontFamily: "Inter Tight", fontSize: 14, lineHeight: "1.45em" }}
          staggerDelay={500}
          showTyping={false}
          style={{ height: "auto", padding: 0, overflow: "visible", minWidth: 0, minHeight: 0 }}
        />
      ) : (
        <div className="chat-static">
          {site.agents.demo.messages.map((message) => (
            <p className={`chat-${message.sender}`} key={message.text}>
              {message.text}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export function NativeMarquee() {
  const { ref, live } = useMotionSurface();
  const Source = useNativeSource("marquee", live);
  return (
    <div
      ref={ref}
      className={`native-marquee ${Source ? "is-live" : ""}`}
      data-source="curvedmarquee"
    >
      <ul className="tech-static mono">
        {site.stack.items.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
      {Source && (
        <div className="marquee-source" aria-hidden="true">
          <Source
            {...editorialPresets.curvedmarquee}
            text={site.stack.items.join("  /  ")}
            color={palette.paper}
            curveAmount={-45}
            baseVelocity={5}
            draggable={false}
            font={{
              fontFamily: "Geist Mono",
              fontSize: 34,
              fontWeight: 400,
              letterSpacing: "-0.02em",
            }}
            style={{ minHeight: 0, width: "100%", height: "100%" }}
          />
        </div>
      )}
    </div>
  );
}

export function ProjectSpotlight({ src, alt }: { src: string; alt: string }) {
  const { ref, live } = useMotionSurface();
  const Source = useNativeSource("spotlight", live);
  return (
    <div ref={ref} className="project-spotlight" data-source="image-spotlight">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width:767px) 90vw, 65vw"
        className="project-preview"
      />
      {Source && (
        <div className="spotlight-source" aria-hidden="true">
          <Source
            {...editorialPresets["image-spotlight"]}
            image={{ src, alt: "" }}
            fit="contain"
            visibility={85}
            size={340}
            style={{ width: "100%", height: "100%", minHeight: 0 }}
          />
        </div>
      )}
    </div>
  );
}

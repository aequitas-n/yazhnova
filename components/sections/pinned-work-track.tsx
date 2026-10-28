"use client";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { site } from "@/content/site";
import type { TrackProps } from "./work";
export default function PinnedTrack({ track, scene, distance, onIndex, children }: TrackProps) {
  const { scrollYProgress } = useScroll({ target: scene, offset: ["start 76px", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  useMotionValueEvent(scrollYProgress, "change", (value) =>
    onIndex(
      Math.min(site.work.projects.length - 1, Math.round(value * (site.work.projects.length - 1))),
    ),
  );
  return (
    <motion.div ref={track} className="work-track" style={{ x }}>
      {children}
    </motion.div>
  );
}

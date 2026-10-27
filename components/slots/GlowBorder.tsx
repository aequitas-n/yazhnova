"use client";
import { useState } from "react";
import type { SlotProps } from "./types";
import { editorialPresets } from "@/lib/originkit-catalog";
import { useMotionSurface, useNativeSource } from "@/components/visuals/use-motion-surface";
export interface GlowBorderProps extends SlotProps {
  color?: string;
  radius?: number;
  duration?: number;
}
export function GlowBorder({ children, className, style }: GlowBorderProps) {
  const { ref, live } = useMotionSurface();
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const Source = useNativeSource("border", live && (hovered || focused));
  return (
    <div
      ref={ref}
      className={`native-button-border ${className ?? ""}`}
      style={style}
      data-source="glow-border"
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      {Source && (
        <div className="button-border-source" aria-hidden="true">
          <Source {...editorialPresets["glow-border"]} style={{ width: "100%", height: "100%" }} />
        </div>
      )}
      {children}
    </div>
  );
}

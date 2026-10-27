import type { SlotProps } from "./types";
// TODO(originkit:glow-border)
export interface GlowBorderProps extends SlotProps {
  color?: string;
  radius?: number;
  duration?: number;
}
export function GlowBorder({ children, className, style }: GlowBorderProps) {
  if (!children) return null;
  return (
    <div
      className={className}
      style={{ display: "contents", ...style }}
      data-slot="glow-border"
      data-slot-status="pending"
    >
      {children}
    </div>
  );
}

import type { SlotProps } from "./types";
// TODO(originkit:curvedmarquee)
export interface CurvedMarqueeProps extends SlotProps {
  items?: readonly string[];
  speed?: number;
  direction?: "left" | "right";
}
export function CurvedMarquee({ children, className, style }: CurvedMarqueeProps) {
  if (!children) return null;
  return (
    <div
      className={className}
      style={{ display: "contents", ...style }}
      data-slot="curvedmarquee"
      data-slot-status="pending"
    >
      {children}
    </div>
  );
}

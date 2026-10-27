import type { SlotProps } from "./types";
// Legacy inactive adapter for curvedmarquee. See docs/component-ratings.md for the real integration or curation decision.
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
      data-slot-status="inactive"
    >
      {children}
    </div>
  );
}

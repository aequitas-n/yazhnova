import type { SlotProps } from "./types";
// Legacy inactive adapter for liquid-grid. See docs/component-ratings.md for the real integration or curation decision.
export interface LiquidGridProps extends SlotProps {
  background?: string;
  color?: string;
  density?: number;
  speed?: number;
}
export function LiquidGrid({ children, className, style }: LiquidGridProps) {
  if (!children) return null;
  return (
    <div
      className={className}
      style={{ display: "contents", ...style }}
      data-slot="liquid-grid"
      data-slot-status="inactive"
    >
      {children}
    </div>
  );
}

import type { SlotProps } from "./types";
// TODO(originkit:liquid-grid)
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
      data-slot-status="pending"
    >
      {children}
    </div>
  );
}

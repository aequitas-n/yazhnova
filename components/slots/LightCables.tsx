import type { SlotProps } from "./types";
// Legacy inactive adapter for light-cables. See docs/component-ratings.md for the real integration or curation decision.
export interface LightCablesProps extends SlotProps {
  background?: string;
  color?: string;
  speed?: number;
}
export function LightCables({ children, className, style }: LightCablesProps) {
  if (!children) return null;
  return (
    <div
      className={className}
      style={{ display: "contents", ...style }}
      data-slot="light-cables"
      data-slot-status="inactive"
    >
      {children}
    </div>
  );
}

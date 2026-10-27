import type { SlotProps } from "./types";
// Legacy inactive adapter for light-bloom. See docs/component-ratings.md for the real integration or curation decision.
export interface LightBloomProps extends SlotProps {
  background?: string;
  color?: string;
  intensity?: number;
}
export function LightBloom({ children, className, style }: LightBloomProps) {
  if (!children) return null;
  return (
    <div
      className={className}
      style={{ display: "contents", ...style }}
      data-slot="light-bloom"
      data-slot-status="inactive"
    >
      {children}
    </div>
  );
}

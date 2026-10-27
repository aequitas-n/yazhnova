import type { SlotProps } from "./types";
// Legacy inactive adapter for single-glossy-sphere. See docs/component-ratings.md for the real integration or curation decision.
export interface SingleGlossySphereProps extends SlotProps {
  color?: string;
  size?: number;
  speed?: number;
}
export function SingleGlossySphere({ children, className, style }: SingleGlossySphereProps) {
  if (!children) return null;
  return (
    <div
      className={className}
      style={{ display: "contents", ...style }}
      data-slot="single-glossy-sphere"
      data-slot-status="inactive"
    >
      {children}
    </div>
  );
}

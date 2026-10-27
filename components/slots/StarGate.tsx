import type { SlotProps } from "./types";
// Legacy inactive adapter for star-gate. See docs/component-ratings.md for the real integration or curation decision.
export interface StarGateProps extends SlotProps {
  background?: string;
  color?: string;
  speed?: number;
}
export function StarGate({ children, className, style }: StarGateProps) {
  if (!children) return null;
  return (
    <div
      className={className}
      style={{ display: "contents", ...style }}
      data-slot="star-gate"
      data-slot-status="inactive"
    >
      {children}
    </div>
  );
}

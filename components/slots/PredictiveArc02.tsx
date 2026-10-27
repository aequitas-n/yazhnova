import type { SlotProps } from "./types";
// TODO(originkit:predictive-arc-02)
export interface PredictiveArc02Props extends SlotProps {
  background?: string;
  color?: string;
  opacity?: number;
  speed?: number;
}
export function PredictiveArc02({ children, className, style }: PredictiveArc02Props) {
  if (!children) return null;
  return (
    <div
      className={className}
      style={{ display: "contents", ...style }}
      data-slot="predictive-arc-02"
      data-slot-status="pending"
    >
      {children}
    </div>
  );
}

import type { SlotProps } from "./types";
// TODO(originkit:star-gate)
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
      data-slot-status="pending"
    >
      {children}
    </div>
  );
}

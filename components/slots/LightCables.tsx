import type { SlotProps } from "./types";
// TODO(originkit:light-cables)
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
      data-slot-status="pending"
    >
      {children}
    </div>
  );
}

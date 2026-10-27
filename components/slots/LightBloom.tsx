import type { SlotProps } from "./types";
// TODO(originkit:light-bloom)
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
      data-slot-status="pending"
    >
      {children}
    </div>
  );
}

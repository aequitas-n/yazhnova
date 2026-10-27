import type { SlotProps } from "./types";
// TODO(originkit:single-glossy-sphere)
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
      data-slot-status="pending"
    >
      {children}
    </div>
  );
}

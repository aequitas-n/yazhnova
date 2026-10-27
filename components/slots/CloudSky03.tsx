import type { SlotProps } from "./types";
// TODO(originkit:cloud-sky/03)
export interface CloudSky03Props extends SlotProps {
  background?: string;
  cloudColor?: string;
  speed?: number;
}
export function CloudSky03({ children, className, style }: CloudSky03Props) {
  if (!children) return null;
  return (
    <div
      className={className}
      style={{ display: "contents", ...style }}
      data-slot="cloud-sky/03"
      data-slot-status="pending"
    >
      {children}
    </div>
  );
}

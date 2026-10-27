import type { SlotProps } from "./types";
// TODO(originkit:hairline-loader)
export interface HairlineLoaderProps extends SlotProps {
  color?: string;
  duration?: number;
}
export function HairlineLoader({ children, className, style }: HairlineLoaderProps) {
  if (!children) return null;
  return (
    <div
      className={className}
      style={{ display: "contents", ...style }}
      data-slot="hairline-loader"
      data-slot-status="pending"
    >
      {children}
    </div>
  );
}

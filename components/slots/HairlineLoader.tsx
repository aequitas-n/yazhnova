import type { SlotProps } from "./types";
// Legacy inactive adapter for hairline-loader. See docs/component-ratings.md for the real integration or curation decision.
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
      data-slot-status="inactive"
    >
      {children}
    </div>
  );
}

import type { SlotProps } from "./types";
// Legacy inactive adapter for fluid-field. See docs/component-ratings.md for the real integration or curation decision.
export interface FluidFieldProps extends SlotProps {
  background?: string;
  colors?: string[];
  speed?: number;
}
export function FluidField({ children, className, style }: FluidFieldProps) {
  if (!children) return null;
  return (
    <div
      className={className}
      style={{ display: "contents", ...style }}
      data-slot="fluid-field"
      data-slot-status="inactive"
    >
      {children}
    </div>
  );
}

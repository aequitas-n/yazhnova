import type { SlotProps } from "./types";
// TODO(originkit:fluid-field)
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
      data-slot-status="pending"
    >
      {children}
    </div>
  );
}

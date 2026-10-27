import type { SlotProps } from "./types";
// Legacy inactive adapter for spark-lattice. See docs/component-ratings.md for the real integration or curation decision.
export interface SparkLatticeProps extends SlotProps {
  sparkColor?: string;
  density?: number;
  speed?: number;
}
export function SparkLattice({ children, className, style }: SparkLatticeProps) {
  if (!children) return null;
  return (
    <div
      className={className}
      style={{ display: "contents", ...style }}
      data-slot="spark-lattice"
      data-slot-status="inactive"
    >
      {children}
    </div>
  );
}

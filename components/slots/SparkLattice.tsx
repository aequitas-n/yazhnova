import type { SlotProps } from "./types";
// TODO(originkit:spark-lattice)
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
      data-slot-status="pending"
    >
      {children}
    </div>
  );
}

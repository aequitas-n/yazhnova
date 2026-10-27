import type { SlotProps } from "./types";
// TODO(originkit:data-strings)
export interface DataStringsProps extends SlotProps {
  color?: string;
  text?: string;
  speed?: number;
  opacity?: number;
}
export function DataStrings({ children, className, style }: DataStringsProps) {
  if (!children) return null;
  return (
    <div
      className={className}
      style={{ display: "contents", ...style }}
      data-slot="data-strings"
      data-slot-status="pending"
    >
      {children}
    </div>
  );
}

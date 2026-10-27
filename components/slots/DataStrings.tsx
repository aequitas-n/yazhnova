import type { SlotProps } from "./types";
// Legacy inactive adapter for data-strings. See docs/component-ratings.md for the real integration or curation decision.
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
      data-slot-status="inactive"
    >
      {children}
    </div>
  );
}

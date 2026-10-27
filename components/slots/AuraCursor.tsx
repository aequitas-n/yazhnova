import type { SlotProps } from "./types";
// Legacy inactive adapter for aura-cursor. See docs/component-ratings.md for the real integration or curation decision.
export interface AuraCursorProps extends SlotProps {
  color?: string;
  size?: number;
  enabled?: boolean;
}
export function AuraCursor({ children, className, style }: AuraCursorProps) {
  if (!children) return null;
  return (
    <div
      className={className}
      style={{ display: "contents", ...style }}
      data-slot="aura-cursor"
      data-slot-status="inactive"
    >
      {children}
    </div>
  );
}

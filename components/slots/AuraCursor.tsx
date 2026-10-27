import type { SlotProps } from "./types";
// TODO(originkit:aura-cursor)
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
      data-slot-status="pending"
    >
      {children}
    </div>
  );
}

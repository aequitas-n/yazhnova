import type { SlotProps } from "./types";
// TODO(originkit:scroll-text-reveal)
export interface ScrollTextRevealProps extends SlotProps {
  text?: string;
  amount?: number;
}
export function ScrollTextReveal({ children, text, className, style }: ScrollTextRevealProps) {
  return (
    <div
      className={className}
      style={{ display: "contents", ...style }}
      data-slot="scroll-text-reveal"
      data-slot-status="pending"
    >
      {children ?? text}
    </div>
  );
}

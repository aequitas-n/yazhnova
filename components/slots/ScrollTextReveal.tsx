import type { SlotProps } from "./types";
// Legacy inactive adapter for scroll-text-reveal. See docs/component-ratings.md for the real integration or curation decision.
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
      data-slot-status="inactive"
    >
      {children ?? text}
    </div>
  );
}

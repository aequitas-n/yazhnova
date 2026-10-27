import type { SlotProps } from "./types";
// Legacy inactive adapter for scrambletext. See docs/component-ratings.md for the real integration or curation decision.
export interface ScrambleTextProps extends SlotProps {
  text: string;
  speed?: number;
  trigger?: "load" | "hover" | "view";
}
export function ScrambleText({ text, className, style }: ScrambleTextProps) {
  return (
    <span
      className={className}
      style={{ display: "contents", ...style }}
      data-slot="scrambletext"
      data-slot-status="inactive"
    >
      {text}
    </span>
  );
}

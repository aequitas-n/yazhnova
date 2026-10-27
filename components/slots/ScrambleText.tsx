import type { SlotProps } from "./types";
// TODO(originkit:scrambletext)
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
      data-slot-status="pending"
    >
      {text}
    </span>
  );
}

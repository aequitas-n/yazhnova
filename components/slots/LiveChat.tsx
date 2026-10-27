import type { SlotProps } from "./types";
// Legacy inactive adapter for live-chat. See docs/component-ratings.md for the real integration or curation decision.
export interface LiveChatProps extends SlotProps {
  messages?: readonly { role: "user" | "agent"; content: string }[];
  accent?: string;
}
export function LiveChat({ children, className, style }: LiveChatProps) {
  if (!children) return null;
  return (
    <div
      className={className}
      style={{ display: "contents", ...style }}
      data-slot="live-chat"
      data-slot-status="inactive"
    >
      {children}
    </div>
  );
}

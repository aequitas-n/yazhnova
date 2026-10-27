import type { SlotProps } from "./types";
// TODO(originkit:live-chat)
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
      data-slot-status="pending"
    >
      {children}
    </div>
  );
}

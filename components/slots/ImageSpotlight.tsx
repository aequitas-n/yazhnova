import type { SlotProps } from "./types";
// TODO(originkit:image-spotlight)
export interface ImageSpotlightProps extends SlotProps {
  src?: string;
  alt?: string;
  color?: string;
  radius?: number;
}
export function ImageSpotlight({ children, className, style }: ImageSpotlightProps) {
  if (!children) return null;
  return (
    <div
      className={className}
      style={{ display: "contents", ...style }}
      data-slot="image-spotlight"
      data-slot-status="pending"
    >
      {children}
    </div>
  );
}

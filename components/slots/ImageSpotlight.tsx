import type { SlotProps } from "./types";
// Legacy inactive adapter for image-spotlight. See docs/component-ratings.md for the real integration or curation decision.
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
      data-slot-status="inactive"
    >
      {children}
    </div>
  );
}

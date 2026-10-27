import type { SlotProps } from "./types";
// Legacy inactive adapter for stacked-carousel. See docs/component-ratings.md for the real integration or curation decision.
export interface StackedCarouselProps extends SlotProps {
  activeIndex?: number;
  itemCount?: number;
}
export function StackedCarousel({ children, className, style }: StackedCarouselProps) {
  if (!children) return null;
  return (
    <div
      className={className}
      style={{ display: "contents", ...style }}
      data-slot="stacked-carousel"
      data-slot-status="inactive"
    >
      {children}
    </div>
  );
}

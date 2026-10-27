import type { SlotProps } from "./types";
// TODO(originkit:stacked-carousel)
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
      data-slot-status="pending"
    >
      {children}
    </div>
  );
}

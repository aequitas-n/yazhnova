import { getVisualTier } from "./visual-runtime";
// Shared by the installed renderers: touch screens animate, at a bounded cost.
export function isMobileCanvas() {
  return (
    typeof window !== "undefined" && matchMedia("(max-width: 767px), (pointer: coarse)").matches
  );
}
export function canvasPixelRatio(cap = 2) {
  if (typeof window === "undefined") return 1;
  return Math.min(window.devicePixelRatio || 1, getVisualTier().dprCap, cap);
}

// Small focal objects need enough pixels to preserve their texture. The
// optional detail pass has a fixed buffer budget; full-screen intros retain
// the normal device tier, cadence and post-processing limits.
export function detailCanvasPixelRatio(width: number, height: number, cap?: number) {
  const base = canvasPixelRatio();
  if (typeof window === "undefined" || !cap) return base;
  return Math.max(
    base,
    Math.min(window.devicePixelRatio || 1, cap, Math.sqrt(262144 / Math.max(1, width * height))),
  );
}

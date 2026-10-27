// Shared by the installed renderers: touch screens animate, at a bounded cost.
export function isMobileCanvas() {
  return (
    typeof window !== "undefined" && matchMedia("(max-width: 767px), (pointer: coarse)").matches
  );
}
export function canvasPixelRatio(cap = 2) {
  if (typeof window === "undefined") return 1;
  return Math.min(window.devicePixelRatio || 1, isMobileCanvas() ? 1 : cap, cap);
}

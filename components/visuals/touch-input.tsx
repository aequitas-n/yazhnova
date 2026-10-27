"use client";
import { useEffect } from "react";
// Some installed sources listen to mousemove. Touch still scrolls normally;
// this bridge supplies coordinates to those sources without requiring hover.
export function TouchInput() {
  useEffect(() => {
    const point = (event: PointerEvent) => {
      if (event.pointerType !== "touch") return;
      event.target?.dispatchEvent(
        new MouseEvent("mousemove", {
          bubbles: true,
          clientX: event.clientX,
          clientY: event.clientY,
        }),
      );
    };
    window.addEventListener("pointerdown", point, { passive: true });
    window.addEventListener("pointermove", point, { passive: true });
    return () => {
      window.removeEventListener("pointerdown", point);
      window.removeEventListener("pointermove", point);
    };
  }, []);
  return null;
}

"use client";
import { useEffect, useRef } from "react";

export function GlobalEffects() {
  const cursor = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const media = window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)");
    if (!media.matches) return;
    const element = cursor.current;
    if (!element) return;
    const move = (event: PointerEvent) => {
      element.style.setProperty("--cursor-x", `${event.clientX}px`);
      element.style.setProperty("--cursor-y", `${event.clientY}px`);
      element.style.opacity = "1";
    };
    const leave = () => {
      element.style.opacity = "0";
    };
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, []);
  return (
    <>
      <div className="hairline-loader" aria-hidden="true" />
      <div ref={cursor} className="aura-cursor" aria-hidden="true" />
    </>
  );
}

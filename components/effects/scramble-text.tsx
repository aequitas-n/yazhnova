"use client";
import { useEffect, useRef } from "react";
export function ScrambleText({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let tick = 0;
    const symbols = "01·/<>";
    const interval = window.setInterval(() => {
      tick += 1;
      if (ref.current)
        ref.current.textContent = text
          .split("")
          .map((char, i) =>
            char === " " || i < tick / 1.7 ? char : symbols[(i + tick) % symbols.length],
          )
          .join("");
      if (tick > text.length * 1.7) window.clearInterval(interval);
    }, 34);
    return () => {
      window.clearInterval(interval);
      if (ref.current) ref.current.textContent = text;
    };
  }, [text]);
  return (
    <>
      <span className="sr-only">{text}</span>
      <span ref={ref} aria-hidden="true">
        {text}
      </span>
    </>
  );
}

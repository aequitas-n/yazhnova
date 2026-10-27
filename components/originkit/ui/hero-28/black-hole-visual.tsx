"use client";

import { useEffect, useRef, useState } from "react";

import BlackHole from "@/components/originkit/ui/hero-28/black-hole";

function asset(file: string) {
  return `/originkit/hero-28/${file}`;
}

const NATIVE_WIDTH = 707;
const NATIVE_VOID = 35;

const HAND_MASK = `radial-gradient(ellipse closest-side at 50% 50%, ${[
  "rgba(0,0,0,1) 0%",
  "rgba(0,0,0,1) 37.9%",
  "rgba(0,0,0,0.994) 48.3%",
  "rgba(0,0,0,0.952) 55.2%",
  "rgba(0,0,0,0.894) 58.6%",
  "rgba(0,0,0,0.797) 62.1%",
  "rgba(0,0,0,0.661) 65.5%",
  "rgba(0,0,0,0.5) 69%",
  "rgba(0,0,0,0.339) 72.4%",
  "rgba(0,0,0,0.203) 75.9%",
  "rgba(0,0,0,0.106) 79.3%",
  "rgba(0,0,0,0.048) 82.8%",
  "rgba(0,0,0,0.019) 86.2%",
  "rgba(0,0,0,0.006) 89.7%",
  "transparent 100%",
].join(", ")})`;

export const BlackHoleVisual = () => {
  const hostRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    setWidth(Math.round(host.getBoundingClientRect().width));
    const observer = new ResizeObserver(([entry]) =>
      setWidth(Math.round(entry.contentRect.width)),
    );
    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  const voidRadius = Math.max(
    1,
    Math.round((NATIVE_VOID * width) / NATIVE_WIDTH),
  );

  return (
    <div
      ref={hostRef}
      className="absolute top-[489px] left-[-2.74%] z-10 aspect-[733.681/512.049] w-[102.84%] ipad:top-[567px] ipad:left-[14.11%] ipad:w-[71.75%] desktop-sm:top-[calc(50%-76px)] desktop-sm:left-[45.21%] desktop-sm:w-[min(50.95%,calc((0.7729*var(--band-h)_+_148.86px)*1.4328))] desktop-sm:-translate-y-1/2"
    >
      {width > 0 && (
        <BlackHole
          style={{ background: "transparent" }}
          tilt={12}
          tiltSideway={158}
          outerRadius={75}
          centre={{ voidRadius, voidX: 50, voidY: 50 }}
        />
      )}

      {}
      <div
        aria-hidden
        className="pointer-events-none absolute top-[47.19%] left-[37.11%] h-[67.5%] w-[42.85%]"
        style={{ maskImage: HAND_MASK, WebkitMaskImage: HAND_MASK }}
      >
        <img
          src={asset("hand.png")}
          alt=""
          className="absolute top-[6.76%] left-[-3.11%] h-[100.94%] w-[110.88%] max-w-none opacity-50"
        />
      </div>
    </div>
  );
};
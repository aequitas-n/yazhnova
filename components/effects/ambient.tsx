"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

export type AmbientMode = "pixels" | "liquid" | "sphere" | "lattice" | "fluid" | "gate";
const Renderer = dynamic(() => import("./ambient-renderer"), { ssr: false });
export function Ambient({ mode, className = "" }: { mode: AmbientMode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [active, setActive] = useState(false);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const loadObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoaded(true);
          loadObserver.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    const playObserver = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), {
      threshold: 0,
    });
    loadObserver.observe(element);
    playObserver.observe(element);
    return () => {
      loadObserver.disconnect();
      playObserver.disconnect();
    };
  }, []);
  return (
    <div ref={ref} aria-hidden="true" className={`ambient ambient-${mode} ${className}`}>
      {loaded && <Renderer mode={mode} active={active} />}
    </div>
  );
}

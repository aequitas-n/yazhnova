"use client";
import { useEffect, useRef, useState } from "react";
export function SectionTitle({
  children,
  id,
  className = "",
}: {
  children: React.ReactNode;
  id?: string;
  className?: string;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setSeen(true);
        observer.disconnect();
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <h2 ref={ref} id={id} className={`section-title ${className}`} data-revealed={seen}>
      {children}
    </h2>
  );
}

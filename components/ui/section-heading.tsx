"use client";
import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

export function SectionHeading({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -35px 0px" });
  const reduced = useReducedMotion();
  return (
    <motion.h2
      ref={ref}
      id={id}
      className={`section-title ${className}`}
      initial={false}
      animate={{
        y: inView || reduced ? 0 : 12,
        filter: inView || reduced ? "blur(0px)" : "blur(0.6px)",
      }}
      transition={{ duration: reduced ? 0 : 0.7, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {children}
    </motion.h2>
  );
}

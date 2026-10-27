"use client";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
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
  const seen = useInView(ref, { once: true });
  const reduced = useReducedMotion();
  return (
    <motion.h2
      ref={ref}
      id={id}
      className={`section-title ${className}`}
      initial={{ y: 12 }}
      animate={{ y: seen || reduced ? 0 : 12 }}
      transition={{ duration: reduced ? 0 : 0.6, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {children}
    </motion.h2>
  );
}

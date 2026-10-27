"use client";
import { motion, useReducedMotion } from "framer-motion";
export default function Template({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  return (
    <>
      {children}
      <motion.div
        className="route-wipe"
        aria-hidden="true"
        initial={{ y: "0%" }}
        animate={{ y: "-105%" }}
        transition={{ duration: reduced ? 0 : 0.42, ease: [0.76, 0, 0.24, 1] }}
      >
        <span />
      </motion.div>
    </>
  );
}

"use client";
import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { chapterHeroes, pageContent } from "@/content/site";
export default function Template({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  const pathname = usePathname();
  const chapter = Object.keys(chapterHeroes).some(
    (key) => pageContent[key as keyof typeof chapterHeroes].path === pathname,
  );
  return (
    <>
      {children}
      <motion.div
        className={`route-wipe${chapter ? " chapter-wipe" : ""}`}
        aria-hidden="true"
        initial={chapter ? { x: "0%" } : { y: "0%" }}
        animate={chapter ? { x: "-105%" } : { y: "-105%" }}
        transition={{ duration: reduced ? 0 : chapter ? 0.55 : 0.42, ease: [0.76, 0, 0.24, 1] }}
      >
        <span />
      </motion.div>
    </>
  );
}

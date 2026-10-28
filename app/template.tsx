"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { chapterHeroes, pageContent } from "@/content/site";
let entered = false;
export default function Template({ children }: { children: React.ReactNode }) {
  const [navigating] = useState(() => entered);
  useEffect(() => {
    entered = true;
  }, []);
  const pathname = usePathname();
  const chapter = Object.keys(chapterHeroes).some(
    (key) => pageContent[key as keyof typeof chapterHeroes].path === pathname,
  );
  return (
    <>
      {children}
      {navigating && (
        <div className={`route-wipe${chapter ? " chapter-wipe" : ""}`} aria-hidden="true">
          <span />
        </div>
      )}
    </>
  );
}

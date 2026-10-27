"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { sourceCatalog } from "@/lib/originkit-catalog";

function Panel({ item, index }: { item: (typeof sourceCatalog)[number]; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting && entry.intersectionRatio >= 0.15),
      { rootMargin: "-64px 0px 0px", threshold: [0, 0.15] },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <section ref={ref} id={item.slug} data-panel={item.slug} className="study-panel">
      <div className="study-panel-head">
        <div>
          <span className="study-label">
            {String(index + 1).padStart(2, "0")} / {item.kind}
          </span>
          <h2>{item.slug}</h2>
          <p>{item.signature}</p>
        </div>
        <span className="study-cost">RENDER COST / {item.cost.toUpperCase()}</span>
      </div>
      <div className="study-pair">
        {[false, true].map((editorial) => (
          <div className="study-frame" key={String(editorial)}>
            <div className="study-frame-label">
              <span>{editorial ? "02 / YAZHNOVA PALETTE" : "01 / ORIGINAL PRESET"}</span>
              <a
                href={`/playground/render/${item.slug}?palette=${editorial ? "editorial" : "default"}`}
                target="_blank"
                rel="noreferrer"
              >
                Open ↗
              </a>
            </div>
            {active ? (
              <iframe
                title={`${item.slug} — ${editorial ? "Yazhnova palette" : "original preset"}`}
                src={`/playground/render/${item.slug}?palette=${editorial ? "editorial" : "default"}`}
              />
            ) : (
              <div className="study-frame-idle">Loads when visible</div>
            )}
          </div>
        ))}
      </div>
      <div className="study-panel-foot">
        <span>{item.title}</span>
        <span>REAL SOURCE / ISOLATED RENDER</span>
      </div>
    </section>
  );
}
export function Playground() {
  return (
    <main className="playground">
      <header className="study-header">
        <Link href="/">
          YAZHNOVA <span>/ COMPONENT STUDIES</span>
        </Link>
        <nav>
          <a href="#hero-40">
            Sections /{" "}
            {String(sourceCatalog.filter((item) => item.kind === "section").length).padStart(
              2,
              "0",
            )}
          </a>
          <a href="#dither-reveal">
            Visuals /{" "}
            {String(sourceCatalog.filter((item) => item.kind === "component").length).padStart(
              2,
              "0",
            )}
          </a>
        </nav>
        <span>PHASE A / {sourceCatalog.length} STUDIES</span>
      </header>
      {sourceCatalog.map((item, index) => (
        <Panel key={item.slug} item={item} index={index} />
      ))}
    </main>
  );
}

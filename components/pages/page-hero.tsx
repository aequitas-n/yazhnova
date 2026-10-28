"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { SectionHero as Hero44 } from "@/components/originkit/ui/hero-44/section-hero";
import { chapterHeroes, pageContent, site } from "@/content/site";
import { LiveVisual } from "@/components/visuals/live-visual";
import { ProjectLink } from "@/components/ui/project-link";
import { scheduleVisualStart } from "@/lib/visual-runtime";

type HeroKey = keyof typeof chapterHeroes;
function Words({ text }: { text: string }) {
  return text.split(" ").map((value, index, words) => (
    <span key={`${value}-${index}`}>
      <span className="chapter-word-clip">
        <span className="chapter-word">{value}</span>
      </span>
      {index < words.length - 1 ? " " : null}
    </span>
  ));
}

export function PageHero({ page }: { page: HeroKey }) {
  const copy = pageContent[page];
  const chapter = chapterHeroes[page];
  const root = useRef<HTMLElement>(null);
  const [entered, setEntered] = useState(false);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion:reduce)").matches) {
      setEntered(true);
      return;
    }
    const animations: Animation[] = [];
    const cancel = scheduleVisualStart(() => {
      const element = root.current;
      if (!element) return;
      const easing = "cubic-bezier(0.22, 1, 0.36, 1)";
      const play = (node: Element, frames: Keyframe[], duration: number, delay = 0) => {
        const animation = node.animate(frames, { duration, delay, easing, fill: "backwards" });
        animations.push(animation);
      };
      const object = element.querySelector(".chapter-object");
      if (object)
        play(
          object,
          [
            { transform: "scale(0.82) rotate(-12deg)", opacity: 0 },
            { transform: "scale(1) rotate(0deg)", opacity: chapter.align === "center" ? 0.6 : 1 },
          ],
          1250,
        );
      element.querySelectorAll(".chapter-line").forEach((line) => {
        line.querySelectorAll(".chapter-word").forEach((word, index) =>
          play(
            word,
            [
              { transform: "translateY(112%) rotate(3deg)", opacity: 0 },
              { transform: "translateY(0) rotate(0deg)", opacity: 1 },
            ],
            850,
            220 + index * 75,
          ),
        );
      });
      element.querySelectorAll(".chapter-eyebrow,.chapter-description").forEach((node) =>
        play(
          node,
          [
            { transform: "translateY(16px)", opacity: 0 },
            { transform: "translateY(0)", opacity: 1 },
          ],
          650,
          600,
        ),
      );
      void Promise.all(animations.map((animation) => animation.finished))
        .then(() => setEntered(true))
        .catch(() => {});
    });
    return () => {
      cancel();
      animations.forEach((animation) => animation.cancel());
    };
  }, [page, chapter.align]);

  return (
    <section
      ref={root}
      className={`page-hero chapter-hero chapter-${chapter.align} chapter-${page}`}
      aria-labelledby="page-title"
      data-page-hero={page}
      data-chapter-entered={entered}
    >
      <Hero44
        artwork={
          <div className="chapter-object">
            <LiveVisual
              key={page}
              kind="plasma"
              priority
              sizes="(max-width:767px) 135vw, 60vw"
              overrides={{ initialRotation: chapter.rotation }}
            />
            <Image
              className="chapter-hand"
              src="/originkit/hero-44/hand.webp"
              alt=""
              aria-hidden="true"
              width={1024}
              height={1536}
              sizes="(max-width:767px) 50vw, 25vw"
              quality={70}
            />
          </div>
        }
      >
        <div className="chapter-shade" aria-hidden="true" />
        <div className="container chapter-content">
          <div className="chapter-eyebrow mono">
            <span className="signal" />
            {copy.label}
          </div>
          <h1 id="page-title" aria-label={`${copy.title} ${copy.serif}`}>
            <span className="chapter-line">
              <Words text={copy.title} />
            </span>
            <em className="chapter-line chapter-serif">
              <Words text={copy.serif} />
            </em>
          </h1>
          <div className="chapter-description">
            <p>{copy.description}</p>
            <ProjectLink>{site.actions.start}</ProjectLink>
          </div>
        </div>
        <div className="chapter-folio mono" aria-hidden="true">
          <span>
            {chapter.number} <span className="chapter-folio-rule" /> {chapter.verb}
          </span>
          <span className="chapter-terms">
            {chapter.terms.map((term) => (
              <span key={term}>{term}</span>
            ))}
          </span>
        </div>
        <a className="page-scroll mono" href={`#${copy.next}`}>
          <span>{pageContent.scroll}</span>
          <ArrowDown size={17} />
        </a>
      </Hero44>
    </section>
  );
}

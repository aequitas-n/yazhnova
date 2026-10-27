"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useAnimationControls, useReducedMotion, type Variants } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { SectionHero as Hero44 } from "@/components/originkit/ui/hero-44/section-hero";
import { chapterHeroes, pageContent, site } from "@/content/site";
import { LiveVisual } from "@/components/visuals/live-visual";
import { ProjectLink } from "@/components/ui/project-link";

type HeroKey = keyof typeof chapterHeroes;
const ease = [0.22, 1, 0.36, 1] as const;
const heading: Variants = {
  hidden: {},
  show: { transition: { delayChildren: 0.22, staggerChildren: 0.075 } },
};
const word: Variants = {
  hidden: { y: "112%", rotate: 3, opacity: 0 },
  show: { y: "0%", rotate: 0, opacity: 1, transition: { duration: 0.85, ease } },
};
const details: Variants = {
  hidden: { y: 16, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { delay: 0.6, duration: 0.65, ease } },
};

function Words({ text }: { text: string }) {
  return text.split(" ").map((value, index, words) => (
    <span key={`${value}-${index}`}>
      <span className="chapter-word-clip">
        <motion.span className="chapter-word" variants={word}>
          {value}
        </motion.span>
      </span>
      {index < words.length - 1 ? " " : null}
    </span>
  ));
}

export function PageHero({ page }: { page: HeroKey }) {
  const copy = pageContent[page];
  const chapter = chapterHeroes[page];
  const controls = useAnimationControls();
  const reduced = useReducedMotion();
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    let cancelled = false;
    if (reduced) {
      controls.set("show");
      setEntered(true);
      return;
    }
    setEntered(false);
    controls.set("hidden");
    void controls.start("show").then(() => {
      if (!cancelled) setEntered(true);
    });
    return () => {
      cancelled = true;
      controls.stop();
    };
  }, [controls, page, reduced]);

  return (
    <section
      className={`page-hero chapter-hero chapter-${chapter.align} chapter-${page}`}
      aria-labelledby="page-title"
      data-page-hero={page}
      data-chapter-entered={entered}
    >
      <Hero44
        artwork={
          <motion.div
            className="chapter-object"
            initial={false}
            animate={controls}
            variants={{
              hidden: { scale: 0.82, rotate: -12, opacity: 0 },
              show: {
                scale: 1,
                rotate: 0,
                opacity: chapter.align === "center" ? 0.6 : 1,
                transition: { duration: 1.25, ease },
              },
            }}
          >
            <LiveVisual
              key={page}
              kind="plasma"
              priority
              sizes="(max-width:767px) 100vw, 60vw"
              overrides={{ initialRotation: chapter.rotation }}
            />
            <Image
              className="chapter-hand"
              src="/originkit/hero-44/hand.png"
              alt=""
              aria-hidden="true"
              width={1024}
              height={1536}
              sizes="(max-width:767px) 50vw, 25vw"
              quality={70}
            />
          </motion.div>
        }
      >
        <div className="chapter-shade" aria-hidden="true" />
        <div className="container chapter-content">
          <motion.div
            className="chapter-eyebrow mono"
            initial={false}
            animate={controls}
            variants={details}
          >
            <span className="signal" />
            {copy.label}
          </motion.div>
          <motion.h1
            id="page-title"
            initial={false}
            animate={controls}
            variants={heading}
            aria-label={`${copy.title} ${copy.serif}`}
          >
            <span className="chapter-line">
              <Words text={copy.title} />
            </span>
            <em className="chapter-line chapter-serif">
              <Words text={copy.serif} />
            </em>
          </motion.h1>
          <motion.div
            className="chapter-description"
            initial={false}
            animate={controls}
            variants={details}
          >
            <p>{copy.description}</p>
            <ProjectLink>{site.actions.start}</ProjectLink>
          </motion.div>
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

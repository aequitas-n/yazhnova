/* eslint-disable */
// @ts-nocheck
"use client"
import RainPuddle from "@/components/originkit/ui/hero-55/rain-puddle";
import type { ReactNode } from "react";

export interface SectionHeroProps {
  children?: ReactNode
  artwork?: ReactNode
}

export function SectionHero({ children, artwork }: SectionHeroProps = {}) {
  if (children) return (
    <div className="hero-55 contact-native" data-originkit="hero-55">
      <div className="contact-rain-scene" aria-hidden="true">{artwork}</div>
      {children}
    </div>
  )
  return (
    <div className="hero-55">
    <section className="hero">
      <div
        id="rain"
        aria-label="A rain-slicked street at night; the pointer casts a pool of light on the wet ground"
      >
        <RainPuddle
          background="#07080B"
          baseColor="#24272E"
          accentColor="#FFB547"
          rain={85}
          speed={80}
          tilt={30}
          puddles={{ coverage: 62, scale: 170, reflection: 150 }}
          drops={{ ripples: 100, streaks: 60 }}
          cursor={{ reach: 50, ripple: 100, glow: 55 }}
          style={{ width: "100%", height: "100%", minWidth: 0, minHeight: 0 }}
        />
      </div>
      <nav className="wrap" aria-label="Main">
        <a className="logo" href="#">
          <svg viewBox="0 0 22 26" aria-hidden="true">
            <path d="M11 1C11 1 2 11.5 2 17a9 9 0 0 0 18 0C20 11.5 11 1 11 1Z" fill="#FFD23F" />
            <path
              d="M6.5 17.5a4.5 4.5 0 0 0 4.5 4.5"
              stroke="#111"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
          Drench
        </a>
        <div className="links">
          <a href="#">Shells</a>
          <a href="#">Layers</a>
          <a href="#">Rain tests</a>
          <a href="#">Stores</a>
        </div>
        <a className="bag" href="#">
          Bag <i>0</i>
        </a>
      </nav>
      <div className="bottom wrap">
        <div>
          <p className="new">
            <b>New</b>Drench Shell 3L · Autumn / Winter
          </p>
          <h1>
            Built for
            <br />
            <span>November.</span>
          </h1>
          <p className="lede">
            A three-layer shell that keeps out a downpour for hours, breathes on the climb, and
            packs into its own chest pocket when the sky clears.
          </p>
          <div className="ctas">
            <a className="btn" href="#">
              Shop the Shell <small>€340</small>
            </a>
            <a className="ghost" href="#">
              <svg viewBox="0 0 12 12" aria-hidden="true">
                <path d="M2 1v10l9-5z" />
              </svg>
              Watch the rain test
            </a>
          </div>
        </div>
        <ul className="specs" aria-label="Key specifications">
          <li>
            <span>Waterproof</span>
            <b>20,000 mm</b>
          </li>
          <li>
            <span>Breathable</span>
            <b>15,000 g/m²</b>
          </li>
          <li>
            <span>Weight</span>
            <b>380 g</b>
          </li>
        </ul>
      </div>
    </section>
    </div>
  );
}

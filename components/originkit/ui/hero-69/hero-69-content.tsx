/* eslint-disable */
// @ts-nocheck
"use client";
import EmberHusk from "@/components/originkit/ui/hero-69/ember-husk"

const GRID_X = [19.4, 50.8, 82.4]
const GRID_Y = [33.6, 67.4]
const PLUSES: [number, number][] = [
    [19.4, 67.4],
    [82.4, 67.4],
    [50.8, 33.6],
]
const LINKS = ["Platform", "Agent Monitoring", "Threat Detection", "Policies", "Resources"]

export default function App() {
    return (
        <main className="hero">
            <svg className="lines grid" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
                {GRID_X.map((x) => (
                    <line key={x} x1={x} y1={0} x2={x} y2={100} />
                ))}
                {GRID_Y.map((y) => (
                    <line key={y} x1={0} y1={y} x2={100} y2={y} />
                ))}
            </svg>

            <div className="husk">
                <EmberHusk
                    size={1.1}
                    background={{ color: "#FFFFFF", glowColor: "#000000", glow: 0 }}
                    structure={{ shards: 14, irregularity: 8, thickness: 7 }}
                    rock={{ color: "#1B1A17", weathering: 3, seam: 2 }}
                    core={{ color: "#04E762", hotColor: "#8BFFC0", intensity: 4, flow: 4 }}
                    crosses={{ count: 0 }}
                    debris={{ count: 54, size: 5, spread: 5 }}
                    beads={5}
                    drift={{ spin: 2, bob: 4, sway: 3 }}
                    glow={{ strength: 3, radius: 4, threshold: 6 }}
                />
            </div>

            {PLUSES.map(([x, y]) => (
                <span key={`${x}${y}`} className="plus" style={{ left: `${x}%`, top: `${y}%` }} />
            ))}

            <header className="nav mono">
                <a className="brand" href="/">
                    {}
                    <svg viewBox="0 0 32 32" aria-hidden>
                        <path d="M16 3.5 26.5 7.5v7.6c0 6.6-4.3 10.9-10.5 13.4C9.8 26 5.5 21.7 5.5 15.1V7.5Z" />
                        <circle cx="16" cy="15.5" r="3.2" />
                    </svg>
                    Aegent
                </a>
                <nav>
                    {LINKS.map((l) => (
                        <a key={l} href="#">
                            {l.toUpperCase()}
                        </a>
                    ))}
                </nav>
                <div className="nav-actions">
                    <a href="#">CONTACT SALES</a>
                    <a className="signin" href="#">
                        SIGN IN
                    </a>
                </div>
            </header>

            <section className="intro">
                <h1>
                    Secure AI systems
                    <br />
                    for the enterprise.
                </h1>
                <p className="desc">
                    Monitor AI agents, detect emerging threats, and maintain control over every
                    action.
                </p>
            </section>

            <section className="cta">
                <p className="desc">
                    Unify AI security, risk monitoring, and policy enforcement in one platform built
                    to protect your business as AI scales.
                </p>
                <div className="cta-actions mono">
                    <a className="primary" href="#">
                        <span className="play" aria-hidden />
                        REQUEST A DEMO
                    </a>
                    <a href="#">SEE PLATFORM →</a>
                </div>
            </section>
        </main>
    )
}
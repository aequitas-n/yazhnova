"use client";
import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { Check, RotateCcw } from "lucide-react";
import { site } from "@/content/site";
import { SectionLabel } from "@/components/ui/section-label";
import { SectionTitle } from "@/components/ui/section-title";
import { LiveVisual } from "@/components/visuals/live-visual";
import { NativeChat, RevealCopy } from "@/components/visuals/native-details";
export function Agents() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduced = useReducedMotion();
  const [step, setStep] = useState(0);
  const [run, setRun] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setStep(3);
      return;
    }
    const timers = [1, 2, 3].map((value, i) =>
      window.setTimeout(() => setStep(value), 850 * (i + 1)),
    );
    return () => timers.forEach(clearTimeout);
  }, [inView, reduced, run]);
  return (
    <section className="section agents-section ink" aria-labelledby="agents-title">
      <div className="container agent-container">
        <SectionLabel number={site.agents.number}>{site.agents.label}</SectionLabel>
        <div className="agent-layout">
          <div className="agent-visual">
            <LiveVisual kind="glassbound" alt={site.agents.visualAlt} />
            <div className="agent-visual-caption mono">
              <span>{site.agents.visualLabel}</span>
              <span className="signal" />
              {site.agents.visualAction}
            </div>
          </div>
          <div className="agent-copy">
            <SectionTitle id="agents-title">
              {site.agents.title}
              <br />
              <em>{site.agents.serif}</em>
            </SectionTitle>
            <RevealCopy text={site.agents.description} />
            <ul className="agent-principles">
              {site.agents.features.map((feature) => (
                <li key={feature}>
                  <Check size={13} />
                  {feature}
                </li>
              ))}
            </ul>
            <div ref={ref} className="workflow-demo">
              <div className="workflow-head mono">
                <span>{site.agents.demo.label}</span>
                <button
                  onClick={() => {
                    setStep(0);
                    setRun((v) => v + 1);
                  }}
                  aria-label={site.agents.demo.replay}
                >
                  <RotateCcw size={12} />
                </button>
              </div>
              <NativeChat run={run} />
              <ol>
                {site.agents.demo.steps.map((task, i) => (
                  <li key={task.label} className={step > i ? "complete" : "pending"}>
                    <span className="task-indicator">
                      {step > i ? <Check size={11} /> : <span className="mono">0{i + 1}</span>}
                    </span>
                    <div>
                      <strong>{task.label}</strong>
                      <p>{task.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <div
                className={`workflow-status mono ${step === 3 ? "ready" : ""}`}
                aria-live="polite"
              >
                <span className="signal" />
                {site.agents.demo.status}
              </div>
              <p className="demo-notice">{site.agents.demo.footnote}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

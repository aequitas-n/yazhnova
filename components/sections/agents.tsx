"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  CheckCheck,
  CalendarDays,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Workflow,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { site } from "@/content/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { BrandMark } from "@/components/ui/logo";

export function Agents() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { amount: 0.3 });
  const reduced = useReducedMotion();
  const [step, setStep] = useState(0);
  const [run, setRun] = useState(0);
  useEffect(() => {
    if (!visible) return;
    if (reduced) {
      setStep(5);
      return;
    }
    const timer = window.setInterval(() => setStep((value) => Math.min(value + 1, 5)), 1050);
    return () => window.clearInterval(timer);
  }, [visible, reduced, run]);
  return (
    <section className="section agents-section" aria-labelledby="agents-title">
      <div className="container">
        <div className="section-heading-row">
          <div>
            <p className="eyebrow">{site.agents.label}</p>
            <SectionHeading id="agents-title">
              {site.agents.title}
              <br />
              <span className="text-gradient">{site.agents.emphasis}</span>
            </SectionHeading>
          </div>
          <div className="agents-intro">
            <p className="section-description">{site.agents.description}</p>
            <Link href="/contact" className="text-link">
              {site.actions.talk}
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
        <div className="agents-grid">
          <div className="agent-core-visual">
            <div className="core-visual-grid" />
            <div className="core-topline">
              <span className="mono">
                <span className="status-dot" />
                {site.agents.visual.label}
              </span>
              <Sparkles size={17} />
            </div>
            <div className="glassbound">
              <div className="glass-orbit orbit-1" />
              <div className="glass-orbit orbit-2" />
              <div className="glass-platform platform-bottom" />
              <div className="glass-platform platform-mid" />
              <div className="glass-platform platform-top">
                <BrandMark />
              </div>
              <div className="core-beam" />
              {site.agents.visual.nodes.map((node, i) => (
                <span key={node} className={`core-node core-node-${i}`}>
                  {i % 2 ? <Workflow size={13} /> : <ShieldCheck size={13} />}
                  {node}
                </span>
              ))}
            </div>
            <div className="core-caption">
              <h3>{site.agents.visual.title}</h3>
              <p>{site.agents.visual.caption}</p>
            </div>
          </div>
          <div className="agent-chat" ref={ref}>
            <div className="chat-titlebar">
              <div className="agent-avatar">
                <BrandMark />
              </div>
              <div>
                <h3>{site.agents.demo.name}</h3>
                <span>
                  <span className="status-dot" />
                  {site.agents.demo.status}
                </span>
              </div>
              <span className="chat-demo mono">{site.agents.demo.badge}</span>
            </div>
            <div className="chat-messages">
              <p className="mono chat-label">{site.agents.demo.label}</p>
              <div className="chat-message user-message">{site.agents.demo.user}</div>
              <div className="agent-message">
                <span className="message-icon">
                  <Sparkles size={14} />
                </span>
                <div>
                  <p className="thinking">{site.agents.demo.thinking}</p>
                  <div className="agent-tasks">
                    {site.agents.demo.tasks.map((task, i) => (
                      <motion.div
                        key={task}
                        initial={false}
                        animate={{ opacity: step > i ? 1 : 0.35 }}
                        transition={{ duration: reduced ? 0 : 0.3 }}
                      >
                        <span className={step > i ? "task-done" : "task-pending"}>
                          {step > i ? <Check size={11} /> : <span />}
                        </span>
                        {task}
                      </motion.div>
                    ))}
                  </div>
                  <motion.div
                    className="agent-result"
                    initial={false}
                    animate={{ opacity: step >= 4 ? 1 : 0.25 }}
                  >
                    <p>{site.agents.demo.response}</p>
                    <div className="meeting-card">
                      <CalendarDays size={22} />
                      <div>
                        <strong>{site.agents.demo.event}</strong>
                        <span className="mono">{site.agents.demo.eventMeta}</span>
                      </div>
                      <ArrowUpRight size={15} />
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
            <div className="chat-footer">
              <span className={`workflow-status ${step >= 5 ? "is-complete" : ""}`}>
                <CheckCheck size={14} />
                {site.agents.demo.completed}
              </span>
              <button
                type="button"
                onClick={() => {
                  setStep(0);
                  setRun((value) => value + 1);
                }}
              >
                <RotateCcw size={12} />
                {site.agents.demo.replay}
              </button>
            </div>
            <p className="demo-disclaimer">{site.agents.demo.footer}</p>
          </div>
        </div>
        <div className="agent-features">
          {site.agents.features.map((feature) => (
            <span key={feature}>
              <Check size={14} />
              {feature}
            </span>
          ))}
          <ArrowRight className="agent-features-arrow" size={20} />
        </div>
      </div>
    </section>
  );
}

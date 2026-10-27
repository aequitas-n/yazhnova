/* eslint-disable */
// @ts-nocheck
"use client"
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import RollingLetters from "@/components/originkit/ui/pricing-04/rolling-letters";
import CosmicBG from "@/components/originkit/ui/pricing-04/cosmic-bg";
import NeonBorder from "@/components/originkit/ui/pricing-04/neon-border";
import MovingGradientButton from "@/components/originkit/ui/pricing-04/moving-gradient-button";

export function SectionPricing() {
  const [mounts, setMounts] = useState([]);
  useEffect(
    () => runPageScript({ RollingLetters, CosmicBG, NeonBorder, MovingGradientButton }, setMounts),
    [],
  );
  return (
    <div className="pricing-04">
    <>
      <section className="pricing" aria-labelledby="pricing-title">
        <div className="head">
          <p className="eyebrow">Pricing</p>
          <h2 id="pricing-title">
            Pay for runs, <span>not for idle servers.</span>
          </h2>
          <p>
            Every plan includes the whole platform. You only move up when you need more runs, more
            concurrency or longer history.
          </p>
          <div className="billing" role="group" aria-label="Billing period">
            <button type="button" data-period="monthly" aria-pressed="false">
              Monthly
            </button>
            <button type="button" data-period="annual" aria-pressed="true">
              Annual <span className="save">−20%</span>
            </button>
          </div>
        </div>
        <div className="plans">
          <article className="plan">
            <div className="name">
              <h3>Hobby</h3>
            </div>
            <div className="price">
              <span className="amount" id="p-hobby" />
              <span className="per">/ month</span>
            </div>
            <p className="billed" data-billed="hobby">
              Free forever
            </p>
            <p className="desc">For side projects and trying Runnel on something real.</p>
            <div className="cta-slot">
              <a className="btn" href="#">
                Start for free
              </a>
            </div>
            <dl className="limits">
              <div>
                <dt>Runs / month</dt>
                <dd>50,000</dd>
              </div>
              <div>
                <dt>Concurrency</dt>
                <dd>5</dd>
              </div>
              <div>
                <dt>Log history</dt>
                <dd>24 hours</dd>
              </div>
            </dl>
            <ul className="features">
              <li>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="#5CC8FF"
                  strokeWidth="1.6"
                >
                  <path d="m3.5 8.5 3 3 6-7" />
                </svg>
                Queues, retries and schedules
              </li>
              <li>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="#5CC8FF"
                  strokeWidth="1.6"
                >
                  <path d="m3.5 8.5 3 3 6-7" />
                </svg>
                1 region
              </li>
              <li>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="#5CC8FF"
                  strokeWidth="1.6"
                >
                  <path d="m3.5 8.5 3 3 6-7" />
                </svg>
                Community support
              </li>
            </ul>
          </article>
          <div className="pro-wrap">
            <div className="aura" aria-hidden="true">
              <div id="aura-pro" />
            </div>
            <article className="plan pro">
              <div className="edge" aria-hidden="true" id="edge-pro" />
              <div className="name">
                <h3>Pro</h3>
                <span className="tag">Most teams</span>
              </div>
              <div className="price">
                <span className="amount" id="p-pro" />
                <span className="per">/ month</span>
              </div>
              <p className="billed" data-billed="pro" />
              <p className="desc">
                For products in production with real traffic and an on-call rota.
              </p>
              <div className="cta-slot" id="cta-pro" />
              <dl className="limits">
                <div>
                  <dt>Runs / month</dt>
                  <dd>5,000,000</dd>
                </div>
                <div>
                  <dt>Concurrency</dt>
                  <dd>200</dd>
                </div>
                <div>
                  <dt>Log history</dt>
                  <dd>30 days</dd>
                </div>
              </dl>
              <ul className="features">
                <li>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="#5CC8FF"
                    strokeWidth="1.6"
                  >
                    <path d="m3.5 8.5 3 3 6-7" />
                  </svg>
                  Everything in Hobby
                </li>
                <li>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="#5CC8FF"
                    strokeWidth="1.6"
                  >
                    <path d="m3.5 8.5 3 3 6-7" />
                  </svg>
                  Fan-out to 10,000 workers
                </li>
                <li>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="#5CC8FF"
                    strokeWidth="1.6"
                  >
                    <path d="m3.5 8.5 3 3 6-7" />
                  </svg>
                  8 regions with pinning
                </li>
                <li>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="#5CC8FF"
                    strokeWidth="1.6"
                  >
                    <path d="m3.5 8.5 3 3 6-7" />
                  </svg>
                  Alerts to Slack and PagerDuty
                </li>
              </ul>
            </article>
          </div>
          <article className="plan">
            <div className="name">
              <h3>Scale</h3>
            </div>
            <div className="price">
              <span className="amount" id="p-scale" />
              <span className="per">/ month</span>
            </div>
            <p className="billed" data-billed="scale" />
            <p className="desc">For platforms where background work is the product.</p>
            <div className="cta-slot">
              <a className="btn" href="#">
                Talk to sales
              </a>
            </div>
            <dl className="limits">
              <div>
                <dt>Runs / month</dt>
                <dd>100,000,000</dd>
              </div>
              <div>
                <dt>Concurrency</dt>
                <dd>5,000</dd>
              </div>
              <div>
                <dt>Log history</dt>
                <dd>1 year</dd>
              </div>
            </dl>
            <ul className="features">
              <li>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="#5CC8FF"
                  strokeWidth="1.6"
                >
                  <path d="m3.5 8.5 3 3 6-7" />
                </svg>
                Everything in Pro
              </li>
              <li>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="#5CC8FF"
                  strokeWidth="1.6"
                >
                  <path d="m3.5 8.5 3 3 6-7" />
                </svg>
                All 30 regions
              </li>
              <li>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="#5CC8FF"
                  strokeWidth="1.6"
                >
                  <path d="m3.5 8.5 3 3 6-7" />
                </svg>
                99.99% uptime SLA
              </li>
              <li>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="#5CC8FF"
                  strokeWidth="1.6"
                >
                  <path d="m3.5 8.5 3 3 6-7" />
                </svg>
                Dedicated support engineer
              </li>
            </ul>
          </article>
        </div>
        <div className="fine">
          <ul>
            <li>
              Extra runs <b>$8</b> per million
            </li>
            <li>
              <b>Unlimited</b> projects and seats
            </li>
            <li>
              <b>SOC 2</b> Type II
            </li>
          </ul>
          <a href="#">
            Need SSO, VPC peering or a custom contract? Talk to us{" "}
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
            >
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </a>
        </div>
      </section>
      {mounts.map((m) => createPortal(m.element, m.el, m.id))}
    </>
    </div>
  );
}

function runPageScript({ RollingLetters, CosmicBG, NeonBorder, MovingGradientButton }, setMounts) {
  let next = 0;
  const timers = [];
  const createRoot = (el) => {
    const id = "m" + next++;
    return {
      render: (element) =>
        setMounts((ms) =>
          ms.some((m) => m.id === id)
            ? ms.map((m) => (m.id === id ? { id, el, element } : m))
            : [...ms, { id, el, element }],
        ),
      unmount: () => setMounts((ms) => ms.filter((m) => m.id !== id)),
    };
  };
  const ReactDOM = { createRoot };
  const OKReact = {
    mount(Comp, el, props) {
      const root = createRoot(el);
      root.render(React.createElement(Comp, props));
      return { el, update: (next) => root.render(React.createElement(Comp, next)) };
    },
  };
  const setInterval = (...a) => (timers.push(window.setInterval(...a)), timers.at(-1));
  const setTimeout = (...a) => (timers.push(window.setTimeout(...a)), timers.at(-1));

  class IntersectionObserver {
    constructor(cb, opts = {}) {
      this.cb = cb;
      this.targets = new Set();
      this.seen = new Map();
      this.off = false;
      const th = [].concat(opts.threshold ?? 0)[0];
      this.real = new window.IntersectionObserver((entries) => {
        for (const e of entries) this.seen.set(e.target, e.isIntersecting);
        if (!this.off) cb(entries, this);
      }, opts);
      this.check = () => {
        for (const t of this.targets) {
          if (this.off || this.seen.get(t)) continue;
          const r = t.getBoundingClientRect(),
            vw = window.innerWidth,
            vh = window.innerHeight;
          const w = Math.max(0, Math.min(r.right, vw) - Math.max(r.left, 0)),
            h = Math.max(0, Math.min(r.bottom, vh) - Math.max(r.top, 0));
          const ratio = r.width && r.height ? (w * h) / (r.width * r.height) : 0;
          if (ratio > 0 && ratio >= th) {
            this.seen.set(t, true);
            cb(
              [
                {
                  target: t,
                  isIntersecting: true,
                  intersectionRatio: ratio,
                  boundingClientRect: r,
                },
              ],
              this,
            );
          }
        }
      };
      window.addEventListener("scroll", this.check, true);
      window.addEventListener("resize", this.check);
    }
    observe(t) {
      this.targets.add(t);
      this.real.observe(t);
      timers.push(window.setTimeout(this.check, 300), window.setTimeout(this.check, 1200));
    }
    unobserve(t) {
      this.targets.delete(t);
      this.real.unobserve(t);
    }
    disconnect() {
      this.off = true;
      this.targets.clear();
      this.real.disconnect();
      window.removeEventListener("scroll", this.check, true);
      window.removeEventListener("resize", this.check);
    }
  }

  (function () {
    var C = { tile: "#0B0D0F", ice: "#EAF2FF", cyan: "#5CC8FF", deep: "#1E6FA8", pale: "#BFE9FF" };
    function root(id) {
      return ReactDOM.createRoot(document.getElementById(id));
    }
    function el(Comp, props) {
      return React.createElement(Comp, props);
    }

    var PLANS = {
      hobby: { monthly: 0, annual: 0 },
      pro: { monthly: 49, annual: 39 },
      scale: { monthly: 399, annual: 319 },
    };
    var PRICE_FONT = {
      fontFamily: "Inter Tight, system-ui, sans-serif",
      fontSize: "56px",
      fontWeight: 600,
      letterSpacing: "-0.04em",
      lineHeight: "1em",
    };
    var roots = { hobby: root("p-hobby"), pro: root("p-pro"), scale: root("p-scale") };
    var shown = {},
      first = true;

    function render(period) {
      Object.keys(PLANS).forEach(function (k) {
        var v = PLANS[k][period];

        if (shown[k] === v) return;
        shown[k] = v;
        roots[k].render(
          el(RollingLetters, {
            text: "$" + v,
            tag: "span",
            color: C.ice,
            font: PRICE_FONT,
            startFrom: period === "annual" ? "bottom" : "top",
            staggerFrom: "start",

            transition: first
              ? { type: "tween", duration: 0.001, delay: 0, ease: "easeOut", staggerChildren: 0 }
              : { type: "tween", duration: 0.55, delay: 0, ease: "easeOut", staggerChildren: 0.05 },
          }),
        );
        var billed = document.querySelector('[data-billed="' + k + '"]');
        if (k !== "hobby")
          billed.textContent =
            period === "annual"
              ? "$" + (v * 12).toLocaleString("en-US") + " billed yearly"
              : "Billed monthly, cancel anytime";
      });
      document.querySelectorAll(".billing button").forEach(function (b) {
        b.setAttribute("aria-pressed", String(b.dataset.period === period));
      });
      first = false;
    }
    document.querySelectorAll(".billing button").forEach(function (b) {
      b.addEventListener("click", function () {
        if (b.getAttribute("aria-pressed") !== "true") render(b.dataset.period);
      });
    });
    render("annual");

    root("aura-pro").render(
      el(CosmicBG, {
        core: false,
        coreColor: C.pale,
        midColor: C.cyan,
        accentColor: C.deep,
        outerColor: "#0A1A2A",
        detail: 50,
        brightness: 45,
        speed: 30,
        rotation: 0,
        style: { width: "100%", height: "100%" },
      }),
    );

    root("edge-pro").render(
      el(NeonBorder, {
        color: C.cyan,
        rounded: 11,
        thickness: 2,
        borderSize: 40,
        glow: 70,
        movement: "continuous",
        speed: 14,
        style: { width: "100%", height: "100%" },
      }),
    );

    root("cta-pro").render(
      el(MovingGradientButton, {
        label: "Start 14-day trial",
        link: "#",
        newTab: false,
        font: {
          fontFamily: "Inter",
          fontWeight: 600,
          fontSize: 15,
          lineHeight: "1.2em",
          letterSpacing: "0em",
          textAlign: "center",
        },
        padding: "14px 22px",
        rounded: 100,
        colors: {
          fill: C.ice,
          hoverFill: "#FFFFFF",
          textColor: "#060708",
          hoverTextColor: "#060708",
        },
        hover: { fill: "#FFFFFF", textColor: "#060708" },
        border: {
          borderWidth: 2,
          borderStyle: "solid",
          borderColor: C.ice,
          borderTopWidth: 2,
          borderLeftWidth: 2,
          borderRightWidth: 2,
          borderBottomWidth: 2,
        },
        stroke: {
          color: C.deep,
          headColor: C.cyan,
          count: 2,
          speed: 22,
          trail: 100,
          movement: "step",
          direction: "cw",
        },
        style: { width: "100%" },
      }),
    );
  })();

  return () => {
    timers.forEach((id) => {
      window.clearInterval(id);
      window.clearTimeout(id);
    });
    setMounts([]);
  };
}
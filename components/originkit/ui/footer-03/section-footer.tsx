/* eslint-disable */
// @ts-nocheck
"use client"
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import StarfieldButton from "@/components/originkit/ui/footer-03/starfield-button";
import LightShaftText from "@/components/originkit/ui/footer-03/light-shaft-text";

export function SectionFooter() {
  const [mounts, setMounts] = useState([]);
  useEffect(() => runPageScript({ StarfieldButton, LightShaftText }, setMounts), []);
  return (
    <div className="footer-03">
    <>
      <footer className="footer">
        <section className="cta" aria-labelledby="cta-title">
          <p className="cta-eyebrow">Free to start</p>
          <h2 id="cta-title">
            Ship your first job <span>today.</span>
          </h2>
          <p>
            Install the SDK, send one event and watch it run. The Hobby plan is free for good, with
            no card required.
          </p>
          <div className="actions">
            <div id="cta-start" />
            <div className="install">
              <span>$</span>
              <code id="cmd">npm i @runnel/sdk</code>
              <button className="copy" type="button" id="copy">
                Copy
              </button>
            </div>
            <a className="demo" href="#">
              Book a demo →
            </a>
          </div>
        </section>
        <div className="links">
          <div className="brand">
            <div className="logo">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M3 6c4 0 4 4 8 4s4-4 8-4M3 12c4 0 4 4 8 4s4-4 8-4M3 18c4 0 4 4 8 4"
                  stroke="#5CC8FF"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>{" "}
              Runnel{" "}
            </div>
            <p>
              Background jobs and event pipelines for teams that would rather ship than babysit
              queues.
            </p>
            <a className="status" href="#">
              <i />
              All systems normal
            </a>
          </div>
          <nav className="col" aria-label="Product">
            <h4>Product</h4>
            <ul>
              <li>
                <a href="#">Queues</a>
              </li>
              <li>
                <a href="#">Workflows</a>
              </li>
              <li>
                <a href="#">Schedules</a>
              </li>
              <li>
                <a href="#">Pricing</a>
              </li>
            </ul>
          </nav>
          <nav className="col" aria-label="Developers">
            <h4>Developers</h4>
            <ul>
              <li>
                <a href="#">Docs</a>
              </li>
              <li>
                <a href="#">API reference</a>
              </li>
              <li>
                <a href="#">SDKs</a>
              </li>
              <li>
                <a href="#">Changelog</a>
              </li>
            </ul>
          </nav>
          <nav className="col" aria-label="Company">
            <h4>Company</h4>
            <ul>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Customers</a>
              </li>
              <li>
                <a href="#">Careers</a>
              </li>
              <li>
                <a href="#">Blog</a>
              </li>
            </ul>
          </nav>
          <nav className="col" aria-label="Legal">
            <h4>Legal</h4>
            <ul>
              <li>
                <a href="#">Privacy</a>
              </li>
              <li>
                <a href="#">Terms</a>
              </li>
              <li>
                <a href="#">DPA</a>
              </li>
              <li>
                <a href="#">Security</a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="wordmark" id="wordmark" aria-hidden="true" />
        <div className="bar">
          <span>© 2026 Runnel, Inc.</span>
          <nav aria-label="Social">
            <a href="#">GitHub</a>
            <a href="#">X</a>
            <a href="#">Discord</a>
            <a href="#">RSS</a>
          </nav>
        </div>
      </footer>
      {mounts.map((m) => createPortal(m.element, m.el, m.id))}
    </>
    </div>
  );
}

function runPageScript({ StarfieldButton, LightShaftText }, setMounts) {
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
    var C = {
      page: "#060708",
      tile: "#0B0D0F",
      ice: "#EAF2FF",
      cyan: "#5CC8FF",
      deep: "#1E6FA8",
      pale: "#BFE9FF",
    };
    function root(id) {
      return ReactDOM.createRoot(document.getElementById(id));
    }
    function el(Comp, props) {
      return React.createElement(Comp, props);
    }

    root("cta-start").render(
      el(StarfieldButton, {
        label: "Start building free",
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
        padding: "16px 26px",
        rounded: 100,
        colors: { fill: C.page, textColor: C.ice },
        border: { borderColor: "rgba(234,242,255,0.16)", borderStyle: "solid", borderWidth: 1 },
        glow: { size: 16, color: C.cyan, opacity: 80 },
        stroke: {
          size: 96,
          color: C.cyan,
          count: 1,
          speed: 50,
          movement: "continuous",
          direction: "ccw",
          thickness: 2,
        },
        pixel: { size: 4, color: C.cyan, density: 50, brightness: 100 },
      }),
    );

    var wm = root("wordmark"),
      host = document.getElementById("wordmark");
    function drawWordmark() {
      var size = Math.round(host.clientWidth * 0.27);
      wm.render(
        el(LightShaftText, {
          text: "runnel",
          font: {
            fontFamily: "Inter Tight",
            fontWeight: 700,
            fontSize: size + "px",
            lineHeight: "1em",
            letterSpacing: "-0.06em",
            textAlign: "center",
          },
          background: C.page,
          textColor: C.page,
          lineColor: "#8FD8FF",
          speed: 50,
          offsetY: -16,
          interactive: true,
          pointerIntensity: 6,
          lines: { density: 200, width: 34, softness: 91, depth: 13, overshoot: 35, flicker: 100 },
          style: { width: "100%", height: "100%", minWidth: 0, minHeight: 0 },
        }),
      );
    }
    drawWordmark();
    new ResizeObserver(drawWordmark).observe(host);

    var btn = document.getElementById("copy");
    btn.addEventListener("click", function () {
      var txt = document.getElementById("cmd").textContent;
      var done = function () {
        btn.textContent = "Copied";
        setTimeout(function () {
          btn.textContent = "Copy";
        }, 1600);
      };
      if (navigator.clipboard) navigator.clipboard.writeText(txt).then(done, function () {});
    });
  })();

  return () => {
    timers.forEach((id) => {
      window.clearInterval(id);
      window.clearTimeout(id);
    });
    setMounts([]);
  };
}
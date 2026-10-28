/* eslint-disable */
// @ts-nocheck
"use client"
import dynamic from "next/dynamic";
const PlasmaRing = dynamic(() => import("@/components/originkit/ui/hero-44/plasma-ring"), { ssr: false });
import Image from "next/image";
import type { ReactNode } from "react";

export interface SectionHeroProps {
  children?: ReactNode
  artwork?: ReactNode
  className?: string
}

export function SectionHero({ children, artwork, className = "" }: SectionHeroProps = {}) {
  // Yazhnova composition: the original atmospheric assets and plasma renderer,
  // with an editorial content slot. The downloaded study remains below.
  if (children) return (
    <div className={`hero-44 chapter-native ${className}`} data-originkit="hero-44">
      <div className="chapter-atmosphere" aria-hidden="true">
        <Image className="chapter-mist" src="/originkit/hero-44/mist-overlay.webp" alt="" width={1440} height={810} sizes="(max-width:767px) 50vw, 100vw" quality={60} priority fetchPriority="high" />
        <Image className="chapter-ridge" src="/originkit/hero-44/ridge.webp" alt="" width={3440} height={952} sizes="100vw" quality={60} />
      </div>
      {artwork}
      {children}
    </div>
  )
  return (
    <div className="hero-44">
    <div className="stage">
      <section className="hero" data-node-id="1712:817">
        <div className="layer bg">
          <div
            className="abs ctr"
            style={{ left: "490.03px", top: "357.75px", width: "518.611px", height: "343.828px" }}
            data-node-id="1712:818"
          >
            <div
              className="rel"
              style={{ width: "478.869px", height: "203.667px", transform: "rotate(-18.31deg)" }}
            >
              <div className="abs" style={{ inset: "-30.29% -12.88%" }}>
                <img className="fill" src="/originkit/hero-44/ellipse-47046.svg" alt="" />
              </div>
            </div>
          </div>
          <div
            className="abs"
            style={{ left: "0", top: "150px", width: "1440px", height: "810px" }}
            data-node-id="1712:850"
          >
            <img
              className="fill cover"
              style={{ mixBlendMode: "soft-light" }}
              src="/originkit/hero-44/mist-overlay.webp"
              alt=""
            />
          </div>
          <div
            className="abs"
            style={{
              left: "0",
              top: "0",
              width: "1440px",
              height: "434px",
              background:
                "linear-gradient(178.352deg, rgb(153,178,206) 4.2416%, rgb(107,144,180) 47.539%, rgba(80,124,165,0) 72.349%)",
            }}
            data-node-id="1712:852"
          />
          <div
            className="abs"
            style={{ left: "1842px", top: "55px", width: "290px", height: "379px" }}
            data-node-id="1712:853"
          >
            <img className="fill cover" src="/originkit/hero-44/side-art.webp" alt="" />
          </div>
          <div
            className="abs"
            style={{ left: "-79px", top: "626px", width: "1595px", height: "441px" }}
            data-node-id="1712:855"
          >
            <img className="fill cover lum" src="/originkit/hero-44/ridge.webp" alt="" />
          </div>
          <div
            className="abs ctr"
            style={{ left: "-186px", top: "702px", width: "1141.405px", height: "376.608px" }}
            data-node-id="1712:856"
          >
            <div
              className="rel"
              style={{ width: "1123.817px", height: "302.852px", transform: "rotate(-3.8deg)" }}
            >
              <div className="bgblur" />
            </div>
          </div>
          <div
            className="abs ctr"
            style={{ left: "-366px", top: "607px", width: "1148.347px", height: "413.015px" }}
            data-node-id="1712:857"
          >
            <div
              className="rel"
              style={{ width: "1123.817px", height: "302.852px", transform: "rotate(5.7deg)" }}
            >
              <div className="bgblur" />
            </div>
          </div>
          <div
            className="abs ctr"
            style={{ left: "252.33px", top: "618.45px", width: "1389.991px", height: "478.863px" }}
            data-node-id="1712:858"
          >
            <div
              className="rel"
              style={{ width: "1367.22px", height: "389.179px", transform: "rotate(-3.8deg)" }}
            >
              <div className="bgblur" />
            </div>
          </div>
          <div
            className="abs ctr"
            style={{ left: "-400px", top: "555px", width: "1215.374px", height: "1084.897px" }}
            data-node-id="1712:859"
          >
            <div
              className="rel"
              style={{
                width: "1092.269px",
                height: "559.19px",
                transform: "rotate(-144.97deg) scaleY(-1)",
              }}
            >
              <div className="bgblur" />
            </div>
          </div>
          <div
            className="abs"
            style={{ left: "448px", top: "595px", width: "663px", height: "371px" }}
            data-node-id="1712:860"
          >
            <div
              className="abs lum"
              style={{ inset: "0", overflow: "hidden", pointerEvents: "none" }}
            >
              <img
                className="abs"
                style={{ left: "-147.54%", top: "-106.78%", width: "389.4%", height: "341.79%" }}
                src="/originkit/hero-44/image737.png"
                alt=""
              />
            </div>
          </div>
          <div
            className="abs ctr plus"
            style={{ left: "108.12px", top: "473.41px", width: "57.917px", height: "497.022px" }}
            data-node-id="1712:863"
          >
            <div
              className="rel"
              style={{ width: "51.202px", height: "496.374px", transform: "rotate(179.22deg)" }}
            >
              <div className="abs" style={{ inset: "-2.22% -21.48%" }}>
                <img className="fill" src="/originkit/hero-44/beam-8413.svg" alt="" />
              </div>
            </div>
          </div>
          <div
            className="abs ctr plus"
            style={{ left: "253.2px", top: "474.27px", width: "51.202px", height: "496.374px" }}
            data-node-id="1712:864"
          >
            <div
              className="rel"
              style={{ width: "51.202px", height: "496.374px", transform: "scaleY(-1)" }}
            >
              <div className="abs" style={{ inset: "-2.22% -21.48%" }}>
                <img className="fill" src="/originkit/hero-44/beam-8414.svg" alt="" />
              </div>
            </div>
          </div>
          <div
            className="abs ctr plus"
            style={{ left: "387.28px", top: "381px", width: "57.93px", height: "584.723px" }}
            data-node-id="1712:865"
          >
            <div
              className="rel"
              style={{
                width: "51.202px",
                height: "584.172px",
                transform: "rotate(0.66deg) scaleY(-1)",
              }}
            >
              <div className="abs" style={{ inset: "-1.88% -21.48%" }}>
                <img className="fill" src="/originkit/hero-44/beam-8415.svg" alt="" />
              </div>
            </div>
          </div>
          <div
            className="abs ctr plus"
            style={{ left: "1253.18px", top: "472.42px", width: "57.917px", height: "497.022px" }}
            data-node-id="1712:867"
          >
            <div
              className="rel"
              style={{
                width: "51.202px",
                height: "496.374px",
                transform: "rotate(0.78deg) scaleY(-1)",
              }}
            >
              <div className="abs" style={{ inset: "-2.22% -21.48%" }}>
                <img className="fill" src="/originkit/hero-44/beam-8413.svg" alt="" />
              </div>
            </div>
          </div>
          <div
            className="abs ctr plus"
            style={{ left: "1114.73px", top: "473.28px", width: "51.202px", height: "496.374px" }}
            data-node-id="1712:868"
          >
            <div
              className="rel"
              style={{ width: "51.202px", height: "496.374px", transform: "rotate(180deg)" }}
            >
              <div className="abs" style={{ inset: "-2.22% -21.48%" }}>
                <img className="fill" src="/originkit/hero-44/beam-8414.svg" alt="" />
              </div>
            </div>
          </div>
          <div
            className="abs ctr plus"
            style={{ left: "974.01px", top: "380px", width: "57.93px", height: "584.723px" }}
            data-node-id="1712:869"
          >
            <div
              className="rel"
              style={{ width: "51.202px", height: "584.172px", transform: "rotate(179.34deg)" }}
            >
              <div className="abs" style={{ inset: "-1.88% -21.48%" }}>
                <img className="fill" src="/originkit/hero-44/beam-8415.svg" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="layer fg">
          <div
            className="abs ctr"
            style={{
              left: "calc(50% - 11px)",
              top: "433px",
              width: "254px",
              height: "381px",
              transform: "translateX(-50%)",
              WebkitMaskImage: "linear-gradient(to bottom,#000 50%,transparent 72%)",
              maskImage: "linear-gradient(to bottom,#000 50%,transparent 72%)",
            }}
            data-node-id="1712:854"
          >
            <div
              className="rel"
              style={{ width: "254px", height: "381px", transform: "rotate(180deg) scaleY(-1)" }}
            >
              <img className="fill cover" src="/originkit/hero-44/hand.webp" alt="" />
            </div>
          </div>
          <p
            className="abs cx"
            style={{
              top: "183px",
              width: "822px",
              font: "400 64px/62px var(--display)",
              color: "#f6f6f6",
              textAlign: "center",
              letterSpacing: "2.56px",
              textTransform: "uppercase",
              wordBreak: "break-word",
            }}
            data-node-id="1712:861"
          >
            Powering the Future
          </p>
          <nav
            className="abs"
            style={{
              left: "calc(50% + 0.5px)",
              top: "12px",
              width: "1440px",
              height: "80px",
              transform: "translateX(-50%)",
            }}
            data-node-id="1712:870"
          >
            <img
              className="abs"
              style={{ left: "322.5px", top: "28px", width: "794.5px", height: "52px" }}
              src="/originkit/hero-44/navbar-shape.svg"
              alt=""
            />
            <a
              className="abs"
              href="#"
              style={{ left: "332.72px", top: "38px", width: "32.595px", height: "32px" }}
            >
              <img style={{ width: "32.595px", height: "32px" }} src="/originkit/hero-44/logo.svg" alt="Logo" />
            </a>
            <div
              className="abs"
              style={{
                left: "392px",
                top: "32px",
                width: "578.496px",
                height: "44px",
                border: "0.5px solid rgba(0,0,0,0.1)",
                borderRadius: "32px",
              }}
              data-node-id="1712:888"
            />
            <div
              className="abs"
              style={{
                left: "992.78px",
                top: "32px",
                width: "119.583px",
                height: "44px",
                border: "0.5px solid rgba(0,0,0,0.1)",
                borderRadius: "32px",
              }}
              data-node-id="1712:889"
            />
            <div
              className="abs ctr"
              style={{
                left: "calc(50% - 39.01px)",
                top: "45px",
                width: "525.348px",
                height: "19px",
                gap: "20px",
                transform: "translateX(-50%)",
              }}
              data-node-id="1712:873"
            >
              <div className="ctr" style={{ width: "74.027px", height: "18.113px", flex: "none" }}>
                <p
                  style={{
                    font: "500 14px/normal var(--jakarta)",
                    color: "rgba(0,0,0,0.8)",
                    whiteSpace: "nowrap",
                    transform: "rotate(-0.09deg)",
                  }}
                >
                  PLATFORM
                </p>
              </div>
              <div className="ctr" style={{ width: "0", height: "15px", flex: "none" }}>
                <div
                  className="rel"
                  style={{ width: "15px", height: "1px", transform: "rotate(90deg)" }}
                >
                  <img className="fill" src="/originkit/hero-44/divider.svg" alt="" />
                </div>
              </div>
              <div className="ctr" style={{ width: "82.027px", height: "18.125px", flex: "none" }}>
                <p
                  style={{
                    font: "500 14px/normal var(--jakarta)",
                    color: "rgba(0,0,0,0.8)",
                    whiteSpace: "nowrap",
                    transform: "rotate(-0.09deg)",
                  }}
                >
                  SOLUTIONS
                </p>
              </div>
              <div className="ctr" style={{ width: "0", height: "15px", flex: "none" }}>
                <div
                  className="rel"
                  style={{ width: "15px", height: "1px", transform: "rotate(90deg)" }}
                >
                  <img className="fill" src="/originkit/hero-44/divider.svg" alt="" />
                </div>
              </div>
              <div className="ctr" style={{ width: "98.027px", height: "18.15px", flex: "none" }}>
                <p
                  style={{
                    font: "500 14px/normal var(--jakarta)",
                    color: "rgba(0,0,0,0.8)",
                    whiteSpace: "nowrap",
                    transform: "rotate(-0.09deg)",
                  }}
                >
                  CASE STUDIES
                </p>
              </div>
              <div className="ctr" style={{ width: "0", height: "15px", flex: "none" }}>
                <div
                  className="rel"
                  style={{ width: "15px", height: "1px", transform: "rotate(90deg)" }}
                >
                  <img className="fill" src="/originkit/hero-44/divider.svg" alt="" />
                </div>
              </div>
              <div className="ctr" style={{ width: "68.027px", height: "18.104px", flex: "none" }}>
                <p
                  style={{
                    font: "500 14px/normal var(--jakarta)",
                    color: "rgba(0,0,0,0.8)",
                    whiteSpace: "nowrap",
                    transform: "rotate(-0.09deg)",
                  }}
                >
                  CONTACT
                </p>
              </div>
            </div>
            <p
              className="abs"
              style={{
                left: "1053.08px",
                top: "43px",
                width: "96.075px",
                transform: "translateX(-50%)",
                font: "500 15px/1.5 var(--jakarta)",
                color: "#323233",
                textAlign: "center",
                letterSpacing: "-0.3px",
                textTransform: "uppercase",
              }}
              data-node-id="1712:890"
            >
              Get Started
            </p>
          </nav>
          <p
            className="abs"
            style={{
              left: "calc(50% + 0.5px)",
              top: "716px",
              width: "461px",
              transform: "translateX(-50%)",
              font: "400 18px/1.5 var(--outfit)",
              color: "#c4d9ee",
              textAlign: "center",
              letterSpacing: "-0.36px",
            }}
            data-node-id="1712:892"
          >
            Deploy intelligent agents, automate workflows, and scale operations seamlessly across
            industries.
          </p>
          <div
            className="abs cx ctr"
            style={{
              top: "790px",
              width: "128px",
              padding: "10px 5px",
              background: "#fff",
              border: "1px solid #fff",
              borderRadius: "32px",
              overflow: "clip",
            }}
            data-node-id="1712:899"
          >
            <p
              style={{
                font: "500 15px/1.5 var(--jakarta)",
                color: "#323233",
                textAlign: "center",
                letterSpacing: "-0.3px",
                textTransform: "capitalize",
                whiteSpace: "nowrap",
              }}
            >
              Start Building
            </p>
          </div>
          <img
            className="abs"
            style={{ left: "553px", top: "854px", width: "24px", height: "24px", opacity: ".6" }}
            src="/originkit/hero-44/icon-trend.svg"
            alt=""
            data-node-id="1712:894"
          />
          <p
            className="abs"
            style={{
              left: "calc(50% + 16.5px)",
              top: "853px",
              width: "317px",
              transform: "translateX(-50%)",
              font: "400 16px/1.5 var(--outfit)",
              color: "rgba(196,217,238,0.6)",
              opacity: ".6",
              textAlign: "center",
              letterSpacing: "-0.32px",
            }}
            data-node-id="1712:898"
          >
            HIGH PERFORMANCE. MINIMAL LATENCY.
          </p>
          <div
            className="abs"
            style={{ left: "618.82px", top: "282.45px", width: "200.774px", height: "195.936px" }}
            data-node-id="1712:902"
          >
            <div className="abs" style={{ inset: "-39.75% -38.8%" }}>
              <img className="fill" src="/originkit/hero-44/ellipse-47045.svg" alt="" />
            </div>
          </div>
          <div
            className="abs"
            id="plasma-ring"
            style={{
              left: "519.2px",
              top: "180.4px",
              width: "400px",
              height: "400px",
              cursor: "grab",
              background:
                "radial-gradient(ellipse 26% 26% at 50% 50%, rgba(18,38,66,.92) 0%, rgba(18,38,66,.78) 68%, rgba(18,38,66,0) 100%)",
            }}
            data-node-id="1712:903"
          >
            <PlasmaRing
              colors={["#9FC6F0", "#3B6FB5", "#1E3F6B"]}
              centerOpacity={60}
              density={120}
              style={{
                width: "100%",
                height: "100%",
                minWidth: 0,
                minHeight: 0,
                background: "transparent",
              }}
            />
          </div>
        </div>
      </section>
    </div>
    </div>
  );
}

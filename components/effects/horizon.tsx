import { BrandMark } from "@/components/ui/logo";
import { site } from "@/content/site";
import { ArrowUpRight, Sparkles } from "lucide-react";

export function Horizon() {
  return (
    <div className="horizon-composition" aria-hidden="true">
      <div className="horizon-haze" />
      <div className="predictive-arc arc-one" />
      <div className="predictive-arc arc-two" />
      <div className="predictive-arc arc-three" />
      <svg className="network-lines" viewBox="0 0 700 650" fill="none">
        <g stroke="#6EE7FF" strokeWidth=".6" opacity=".3">
          <path d="M50 130 220 220 370 120 580 220 670 70M80 460 220 220 440 410 580 220M370 120 440 410 650 510M80 460 440 410 670 580" />
        </g>
        <g fill="#b7cbff">
          {[
            [50, 130],
            [220, 220],
            [370, 120],
            [580, 220],
            [80, 460],
            [440, 410],
            [650, 510],
            [670, 70],
          ].map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="2" />
          ))}
        </g>
      </svg>
      <div className="horizon-orbit orbit-back" />
      <div className="horizon-orbit orbit-front" />
      <div className="horizon-planet">
        <div className="planet-ring" />
        <div className="planet-surface" />
        <div className="planet-sheen" />
      </div>
      <div className="orbital-label">
        <span className="status-dot" />
        {site.hero.visual.signal}
      </div>
      <div className="floating-node node-top">
        <Sparkles size={16} />
        <span>{site.hero.visual.orbit}</span>
      </div>
      <div className="intelligence-card">
        <div className="intelligence-card-top">
          <BrandMark />
          <ArrowUpRight size={18} />
        </div>
        <div className="card-signal">
          {Array.from({ length: 31 }, (_, i) => (
            <i key={i} style={{ height: `${14 + Math.sin(i * 0.8) * 8 + (i % 5) * 4}px` }} />
          ))}
        </div>
        <span className="mono micro">{site.hero.visual.label}</span>
        <strong>{site.hero.visual.cardTitle}</strong>
        <span className="card-detail">{site.hero.visual.cardDetail}</span>
        <div className="intelligence-card-bottom">
          <span className="status-dot" />
          <span>{site.hero.visual.status}</span>
          <span>↗</span>
        </div>
      </div>
      <div className="horizon-cross cross-one" />
      <div className="horizon-cross cross-two" />
    </div>
  );
}

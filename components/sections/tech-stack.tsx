import {
  siReact,
  siNextdotjs,
  siNodedotjs,
  siPython,
  siGooglecloud,
  siPostgresql,
  siLangchain,
  siDocker,
  siKubernetes,
} from "simple-icons";
import { site } from "@/content/site";
const icons = [
  siReact,
  siNextdotjs,
  siNodedotjs,
  siPython,
  null,
  siGooglecloud,
  siPostgresql,
  null,
  siLangchain,
  siDocker,
  siKubernetes,
];
function TechRow({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <div className="tech-row" aria-hidden={duplicate || undefined}>
      {site.stack.technologies.map((name, i) => (
        <div className="tech-logo" key={name}>
          {icons[i] ? (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path fill="currentColor" d={icons[i]!.path} />
            </svg>
          ) : (
            <span className="tech-letter" aria-hidden="true">
              {name === "AWS" ? "aws" : "✳"}
            </span>
          )}
          <span>{name}</span>
        </div>
      ))}
    </div>
  );
}
export function TechStack() {
  return (
    <section className="stack-section" aria-label={site.stack.description}>
      <svg
        className="data-strings mono"
        aria-hidden="true"
        viewBox="0 0 1400 300"
        preserveAspectRatio="xMidYMid slice"
      >
        {Array.from({ length: 3 }, (_, i) => (
          <text key={i} x="0" y={60 + i * 80} fill="currentColor">
            {site.stack.strings.repeat(3)}
          </text>
        ))}
      </svg>
      <div className="container">
        <p className="eyebrow">{site.stack.label}</p>
      </div>
      <div className="curved-marquee">
        <div className="tech-track">
          <TechRow />
          <TechRow duplicate />
        </div>
      </div>
    </section>
  );
}

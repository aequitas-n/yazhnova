import { site } from "@/content/site";
export function Stats() {
  return (
    <section className="stats-section" aria-label={site.stats.label}>
      <div className="container">
        <div className="stats-grid">
          {site.stats.items.map((stat) => (
            <div className="stat" key={stat.label}>
              <span className="stat-value">
                {stat.value}
                <sup>†</sup>
              </span>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
        <p className="todo-note">† {site.stats.notice}</p>
      </div>
    </section>
  );
}

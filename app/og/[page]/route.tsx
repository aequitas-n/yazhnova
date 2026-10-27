import { ImageResponse } from "next/og";
import { pageContent, site } from "@/content/site";
export async function GET(_request: Request, { params }: { params: Promise<{ page: string }> }) {
  const { page } = await params;
  const project = page.startsWith("case-")
    ? site.work.projects.find((item) => item.name.toLowerCase() === page.slice(5))
    : undefined;
  const key = page as keyof typeof pageContent;
  const entry = pageContent[key];
  if (!project && (typeof entry !== "object" || !("seoTitle" in entry)))
    return new Response("Not found", { status: 404 });
  const copy = typeof entry === "object" ? entry : pageContent.work;
  const title = project?.name || copy.seoTitle;
  const description = project?.outcome || copy.description;
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        background: "#0A0A0A",
        color: "#F4F2EC",
        padding: "65px 75px",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 28, fontWeight: 700 }}
      >
        {site.name}
        <span style={{ display: "flex", height: 8, width: 8, background: "#FF3B00" }} />
      </div>
      <div style={{ display: "flex", height: 1, background: "#F4F2EC30", marginTop: 28 }} />
      <div
        style={{
          display: "flex",
          fontSize: 80,
          letterSpacing: -4,
          lineHeight: 1.05,
          marginTop: 70,
          maxWidth: 1000,
        }}
      >
        {title}
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 23,
          color: "#A3A3A3",
          lineHeight: 1.4,
          marginTop: 30,
          maxWidth: 880,
        }}
      >
        {description}
      </div>
      <div style={{ display: "flex", marginTop: "auto", fontSize: 16, color: "#FF3B00" }}>
        {site.url.replace("https://", "")}
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}

import { ImageResponse } from "next/og";
import { site } from "@/content/site";
export const alt = "Yazhnova — Software, engineered to think.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "54px 70px",
        background: "#0A0A0A",
        color: "#F4F2EC",
        fontFamily: "sans-serif",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 70,
          top: 0,
          height: 630,
          width: 1,
          background: "#F4F2EC15",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 70,
          top: 0,
          height: 630,
          width: 1,
          background: "#F4F2EC15",
        }}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          fontSize: 25,
          fontWeight: 700,
          letterSpacing: -1,
        }}
      >
        {site.name}
        <span style={{ width: 7, height: 7, background: "#FF3B00", marginTop: 12 }} />
      </div>
      <div
        style={{ display: "flex", marginTop: 49, fontSize: 11, letterSpacing: 3, color: "#A3A3A3" }}
      >
        {site.hero.label}
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 96,
          fontWeight: 500,
          letterSpacing: -6,
          lineHeight: 1,
          marginTop: 26,
        }}
      >
        {site.hero.lines[0]}
      </div>
      <div
        style={{ display: "flex", fontSize: 96, fontWeight: 500, letterSpacing: -6, lineHeight: 1 }}
      >
        {site.hero.lines[1]} {site.hero.serif}
      </div>
      <div
        style={{ display: "flex", fontSize: 17, color: "#A3A3A3", marginTop: 26, maxWidth: 750 }}
      >
        {site.description}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 11,
          color: "#A3A3A3",
          marginTop: "auto",
          borderTop: "1px solid #F4F2EC25",
          paddingTop: 18,
        }}
      >
        <span>{site.url.replace("https://", "").toUpperCase()}</span>
        <span>STRATEGY → DESIGN → ENGINEERING</span>
      </div>
    </div>,
    size,
  );
}

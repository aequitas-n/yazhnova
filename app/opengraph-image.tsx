import { ImageResponse } from "next/og";
import { site } from "@/content/site";
export const alt = "Yazhnova — We build software that thinks.";
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
        background: "#05060A",
        color: "#EDEFF7",
        padding: "64px 72px",
        overflow: "hidden",
        position: "relative",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          display: "flex",
          width: 650,
          height: 650,
          right: -120,
          top: 0,
          borderRadius: "50%",
          background: "radial-gradient(circle, #7B5CFF66 0%, #1A2A7844 35%, transparent 68%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          display: "flex",
          width: 1000,
          height: 650,
          right: -360,
          top: 240,
          borderRadius: "50%",
          background: "#05060A",
          borderTop: "2px solid #9C8AFF",
          boxShadow: "0 -15px 100px #7B5CFF77",
        }}
      />
      <div style={{ display: "flex", fontSize: 25, fontWeight: 700, letterSpacing: 4 }}>
        {site.name}
      </div>
      <div
        style={{ display: "flex", fontSize: 13, color: "#8A90A6", letterSpacing: 3, marginTop: 58 }}
      >
        {site.hero.eyebrow}
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 79,
          lineHeight: 1.05,
          letterSpacing: -4,
          fontWeight: 700,
          marginTop: 24,
        }}
      >
        {site.hero.lineOne}
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 91,
          lineHeight: 1.1,
          letterSpacing: -5,
          fontWeight: 700,
          color: "#A696FF",
        }}
      >
        {site.hero.lineTwo}
      </div>
      <div
        style={{ display: "flex", fontSize: 21, color: "#8A90A6", marginTop: 27, maxWidth: 640 }}
      >
        {site.hero.description}
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 14,
          color: "#8A90A6",
          marginTop: "auto",
          letterSpacing: 1,
        }}
      >
        YAZHNOVA.IN
      </div>
    </div>,
    size,
  );
}

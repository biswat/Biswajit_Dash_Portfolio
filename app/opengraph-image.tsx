import { ImageResponse } from "next/og"

import { hero } from "@/lib/content"

export const alt = `${hero.name} — ${hero.role}`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#0a0a0a",
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          color: "#fafafa",
          fontFamily: "monospace",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "9999px",
              background: "#4ade80",
            }}
          />
          <span
            style={{
              fontSize: "20px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "rgba(250,250,250,0.6)",
            }}
          >
            {hero.statusLine}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <span style={{ fontSize: "76px", fontWeight: 600, letterSpacing: "-0.02em" }}>
            {hero.name}
          </span>
          <span
            style={{
              fontSize: "30px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(250,250,250,0.6)",
            }}
          >
            {hero.role}
          </span>
          <span
            style={{
              fontSize: "24px",
              color: "rgba(250,250,250,0.5)",
              maxWidth: "980px",
              lineHeight: 1.5,
            }}
          >
            {hero.tagline}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: "20px",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(250,250,250,0.4)",
          }}
        >
          {hero.location}
        </div>
      </div>
    ),
    { ...size }
  )
}

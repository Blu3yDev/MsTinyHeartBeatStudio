import { ImageResponse } from "next/og";
import { siteConfig } from "@/content/site";

export const alt = `${siteConfig.name} · ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Default Open Graph image for the site. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0e0b0c",
          padding: "80px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: "24px",
            letterSpacing: "6px",
            color: "#d81f2e",
          }}
        >
          EST. 2018 · MAHÉ · SEYCHELLES
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <div style={{ display: "flex", fontSize: "78px", fontWeight: 700 }}>
            <span style={{ display: "flex", color: "#f4ede2" }}>
              Dance with Confidence.
            </span>
          </div>
          <div style={{ display: "flex", fontSize: "78px", fontWeight: 700 }}>
            <span style={{ display: "flex", color: "#f4ede2" }}>
              Perform with&nbsp;
            </span>
            <span style={{ display: "flex", color: "#d81f2e" }}>Heart.</span>
          </div>
        </div>

        <div style={{ display: "flex", fontSize: "27px", color: "#9c9089" }}>
          {siteConfig.name}
        </div>
      </div>
    ),
    { ...size },
  );
}

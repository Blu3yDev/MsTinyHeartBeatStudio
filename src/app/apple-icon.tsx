import { ImageResponse } from "next/og";

/** Apple touch icon — larger brand mark for home-screen bookmarks. */
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0e0b0c",
          color: "#f4ede2",
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 104, fontWeight: 700, lineHeight: 1 }}>
          H<span style={{ color: "#d81f2e" }}>.</span>
        </div>
        <div
          style={{
            marginTop: 14,
            fontFamily: "Arial, sans-serif",
            fontSize: 13,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#d81f2e",
          }}
        >
          Heartbeat
        </div>
      </div>
    ),
    { ...size },
  );
}

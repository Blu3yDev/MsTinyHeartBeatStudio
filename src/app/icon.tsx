import { ImageResponse } from "next/og";

/** Favicon — the "H" wordmark mark with the brand-red accent dot. */
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0e0b0c",
          color: "#f4ede2",
          fontFamily: "Georgia, 'Times New Roman', serif",
          fontSize: 46,
          fontWeight: 700,
        }}
      >
        H<span style={{ color: "#d81f2e" }}>.</span>
      </div>
    ),
    { ...size },
  );
}

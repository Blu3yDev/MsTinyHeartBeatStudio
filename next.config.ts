import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root to this project. Without this, Next.js infers
  // the root from the nearest lockfile and picks up a stray
  // package-lock.json in the user's home directory.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;

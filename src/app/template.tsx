import type { ReactNode } from "react";

/**
 * Unlike `layout.tsx`, a template re-mounts on every navigation. That
 * remount replays the `.route-transition` enter animation (see
 * globals.css), giving a gentle fade-and-rise as each page arrives.
 */
export default function Template({ children }: { children: ReactNode }) {
  return <div className="route-transition">{children}</div>;
}

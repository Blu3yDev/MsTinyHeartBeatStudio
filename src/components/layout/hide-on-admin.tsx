"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

/**
 * Hides public site chrome (header, footer, scroll progress) on the hidden
 * `/admin` route so the management panel renders on a clean canvas. Server
 * components passed as `children` keep rendering on the server.
 */
export function HideOnAdmin({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  return <>{children}</>;
}

import type { Metadata } from "next";
import { siteConfig } from "@/content/site";

/**
 * Build per-page metadata. `title` flows through the root layout's
 * title template; Open Graph / Twitter get the fully-qualified title.
 */
export function pageMeta(title: string, description: string): Metadata {
  const fullTitle = `${title} · ${siteConfig.name}`;
  return {
    title,
    description,
    openGraph: { title: fullTitle, description },
    twitter: { title: fullTitle, description },
  };
}

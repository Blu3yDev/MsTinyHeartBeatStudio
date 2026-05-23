import type { MetadataRoute } from "next";

const baseUrl = "https://heartbeatdancestudio.net";

const routes = [
  "",
  "/studio",
  "/classes",
  "/membership",
  "/events",
  "/gallery",
  "/shop",
  "/contact",
  "/register",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}

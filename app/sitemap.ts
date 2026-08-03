import type { MetadataRoute } from "next";
import { siteUrl } from "../lib/seo";

/** Single-page site — one canonical entry; section anchors don't belong in sitemaps. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1
    }
  ];
}

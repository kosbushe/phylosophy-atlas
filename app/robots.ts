import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://philosophy-atlas.ru/sitemap.xml",
    host: "https://philosophy-atlas.ru",
  };
}

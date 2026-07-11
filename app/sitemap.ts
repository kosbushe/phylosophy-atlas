import type { MetadataRoute } from "next";
import { philosophers } from "@/lib/philosophers";

const origin = "https://philosophy-atlas.ru";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${origin}/`,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...philosophers.map((philosopher) => ({
      url: `${origin}/${philosopher.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: `${origin}/legal`,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}

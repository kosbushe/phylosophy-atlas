import type { Metadata } from "next";
import { LocalizedLanding } from "@/components/LocalizedLanding";

export const metadata: Metadata = {
  title: "Philosophy Atlas · 100 thinkers",
  description: "A clear multilingual guide to 100 philosophers, 700 ideas and ten eras of world thought.",
  alternates: { canonical: "/en", languages: { ru: "/", en: "/en", fr: "/fr", es: "/es", de: "/de" } },
  openGraph: { title: "Philosophy Atlas", description: "100 thinkers · 700 ideas · 5 languages", url: "/en", locale: "en_US", images: ["/og.png"] },
  twitter: { card: "summary_large_image", title: "Philosophy Atlas", description: "100 thinkers · 700 ideas · 5 languages", images: ["/og.png"] },
};

export default function EnglishPage() { return <LocalizedLanding locale="en" />; }

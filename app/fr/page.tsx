import type { Metadata } from "next";
import { LocalizedLanding } from "@/components/LocalizedLanding";

export const metadata: Metadata = {
  title: "Atlas de la philosophie · 100 penseurs",
  description: "Un guide multilingue de 100 philosophes, 700 idées et dix époques de la pensée mondiale.",
  alternates: { canonical: "/fr", languages: { ru: "/", en: "/en", fr: "/fr", es: "/es", de: "/de" } },
  openGraph: { title: "Atlas de la philosophie", description: "100 penseurs · 700 idées · 5 langues", url: "/fr", locale: "fr_FR", images: ["/og.png"] },
  twitter: { card: "summary_large_image", title: "Atlas de la philosophie", description: "100 penseurs · 700 idées · 5 langues", images: ["/og.png"] },
};

export default function FrenchPage() { return <LocalizedLanding locale="fr" />; }

import type { Metadata } from "next";
import { LocalizedLanding } from "@/components/LocalizedLanding";

export const metadata: Metadata = {
  title: "Atlas de la filosofía · 100 pensadores",
  description: "Una guía multilingüe de 100 filósofos, 700 ideas y diez épocas del pensamiento mundial.",
  alternates: { canonical: "/es", languages: { ru: "/", en: "/en", fr: "/fr", es: "/es", de: "/de" } },
  openGraph: { title: "Atlas de la filosofía", description: "100 pensadores · 700 ideas · 5 idiomas", url: "/es", locale: "es_ES", images: ["/og.png"] },
  twitter: { card: "summary_large_image", title: "Atlas de la filosofía", description: "100 pensadores · 700 ideas · 5 idiomas", images: ["/og.png"] },
};

export default function SpanishPage() { return <LocalizedLanding locale="es" />; }

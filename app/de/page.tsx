import type { Metadata } from "next";
import { LocalizedLanding } from "@/components/LocalizedLanding";

export const metadata: Metadata = {
  title: "Atlas der Philosophie · 100 Denker",
  description: "Ein mehrsprachiger Wegweiser zu 100 Philosophen, 700 Ideen und zehn Epochen des Weltdenkens.",
  alternates: { canonical: "/de", languages: { ru: "/", en: "/en", fr: "/fr", es: "/es", de: "/de" } },
  openGraph: { title: "Atlas der Philosophie", description: "100 Denker · 700 Ideen · 5 Sprachen", url: "/de", locale: "de_DE", images: ["/og.png"] },
  twitter: { card: "summary_large_image", title: "Atlas der Philosophie", description: "100 Denker · 700 Ideen · 5 Sprachen", images: ["/og.png"] },
};

export default function GermanPage() { return <LocalizedLanding locale="de" />; }

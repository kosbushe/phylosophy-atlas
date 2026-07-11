import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PhilosopherProfile } from "@/components/PhilosopherProfile";
import { philosophers } from "@/lib/philosophers";

export function generateStaticParams() {
  return philosophers.map((philosopher) => ({ slug: philosopher.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const philosopher = philosophers.find((item) => item.slug === slug);

  return philosopher
    ? {
        title: philosopher.name,
        description: philosopher.oneLine,
        alternates: { canonical: `/${philosopher.slug}` },
        openGraph: {
          type: "article",
          url: `/${philosopher.slug}`,
          title: `${philosopher.name} · Философская карта`,
          description: philosopher.oneLine,
        },
      }
    : { title: "Философ не найден" };
}

export default async function PhilosopherPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const philosopher = philosophers.find((item) => item.slug === slug);

  if (!philosopher) notFound();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${philosopher.name}: семь ключевых идей`,
    description: philosopher.oneLine,
    inLanguage: "ru",
    mainEntity: {
      "@type": "Person",
      name: philosopher.name,
      alternateName: philosopher.nativeName,
      description: philosopher.oneLine,
      knowsAbout: philosopher.ideas.map((idea) => idea.title),
      additionalProperty: {
        "@type": "PropertyValue",
        name: "Даты жизни",
        value: philosopher.dates,
      },
    },
    url: `https://philosophy-atlas.ru/${philosopher.slug}`,
    isPartOf: {
      "@type": "WebSite",
      name: "Философская карта",
      url: "https://philosophy-atlas.ru/",
    },
    author: {
      "@type": "Person",
      name: "Константин Буше",
      url: "https://www.konstantinbushe.ru",
    },
    contributor: {
      "@type": "Person",
      name: "Илья Зибарев",
      url: "https://www.zibarev.com",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <PhilosopherProfile philosopher={philosopher} />
    </>
  );
}

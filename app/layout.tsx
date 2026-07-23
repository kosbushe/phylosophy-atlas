import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://philosophy-atlas.ru"),
  title: {
    default: "Философская карта",
    template: "%s · Философская карта",
  },
  description:
    "Интерактивная карта 100 философов мира: 700 идей, современные примеры, проверенные цитаты, хронология и академические источники.",
  alternates: {
    canonical: "/",
    languages: { ru: "/", en: "/en", fr: "/fr", es: "/es", de: "/de" },
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "/",
    siteName: "Философская карта",
    title: "Философская карта · 100 философов",
    description:
      "100 философов, 700 идей, современные примеры, проверенные цитаты и академические источники.",
    images: [{ url: "/og.png", width: 1731, height: 909, alt: "Philosophy Atlas · 100 thinkers, 700 ideas, 5 languages" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Философская карта · 100 философов",
    description: "100 философов, 700 идей и пять языковых версий.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Философская карта",
              url: "https://philosophy-atlas.ru/",
              inLanguage: "ru",
              description:
                "Интерактивный образовательный атлас 100 философов и 700 ключевых идей мировой философии.",
              creator: {
                "@type": "Person",
                name: "Константин Буше",
                url: "https://www.konstantinbushe.ru",
              },
              contributor: {
                "@type": "Person",
                name: "Илья Зибарев",
                url: "https://www.zibarev.com",
              },
            }).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}

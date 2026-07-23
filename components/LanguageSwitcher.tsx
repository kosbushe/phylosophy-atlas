import Link from "next/link";

export type AtlasLocale = "ru" | "en" | "fr" | "es" | "de";

const languages: Array<{ code: AtlasLocale; href: string; label: string }> = [
  { code: "ru", href: "/", label: "Русский" },
  { code: "en", href: "/en", label: "English" },
  { code: "fr", href: "/fr", label: "Français" },
  { code: "es", href: "/es", label: "Español" },
  { code: "de", href: "/de", label: "Deutsch" },
];

export function LanguageSwitcher({ current = "ru" }: { current?: AtlasLocale }) {
  return (
    <nav className="language-switcher" aria-label="Language / Язык">
      {languages.map((language) => (
        <Link
          aria-current={current === language.code ? "page" : undefined}
          href={language.href}
          key={language.code}
          lang={language.code}
          title={language.label}
        >
          {language.code.toUpperCase()}
        </Link>
      ))}
    </nav>
  );
}


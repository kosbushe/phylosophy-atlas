import { philosophers } from "@/lib/philosophers";

export function GET() {
  const entries = philosophers
    .map(
      (philosopher) =>
        `- ${philosopher.index}. ${philosopher.name} (${philosopher.dates}): ${philosopher.oneLine}\n  https://philosophy-atlas.ru/${philosopher.slug}`,
    )
    .join("\n");

  return new Response(
    [
      "# Философская карта",
      "",
      "Русскоязычный образовательный атлас мировой философии.",
      "100 философов и фигур-спутников; у каждого — семь идей, современные примеры, проверенная цитата и источники.",
      "Редакторские объяснения и реконструкции отделены от прямых цитат.",
      "",
      "## Полный хронологический список",
      "",
      entries,
      "",
      "## Служебные страницы",
      "",
      "- Главная: https://philosophy-atlas.ru/",
      "- Sitemap: https://philosophy-atlas.ru/sitemap.xml",
      "- Правовая информация: https://philosophy-atlas.ru/legal",
      "",
    ].join("\n"),
    {
      headers: {
        "content-type": "text/plain; charset=utf-8",
        "cache-control": "public, max-age=3600",
      },
    },
  );
}

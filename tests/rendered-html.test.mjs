import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const developmentPreviewMeta =
  /<meta(?=[^>]*\bname=["']codex-preview["'])(?=[^>]*\bcontent=["']development["'])[^>]*>/i;

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
const workerPromise = import(workerUrl.href).then((module) => module.default);

async function render(pathname) {
  const worker = await workerPromise;
  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

async function canonicalSlugs() {
  const source = await readFile(new URL("../lib/canon.ts", import.meta.url), "utf8");
  const block = source.match(/const canonOrder100 = \[([\s\S]*?)\] as const;/);
  assert.ok(block, "canonOrder100 must remain explicit and auditable");
  return [...block[1].matchAll(/"([a-z0-9]+)"/g)].map((match) => match[1]);
}

test("renders development preview metadata", async () => {
  const response = await render("/");

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  assert.match(await response.text(), developmentPreviewMeta);
});

test("renders the complete 100-figure atlas and 18 editorial routes", async () => {
  const slugs = await canonicalSlugs();
  assert.equal(slugs.length, 100);
  assert.equal(new Set(slugs).size, 100);
  assert.equal(slugs.at(-1), "byungchulhan");

  const response = await render("/");
  const html = await response.text();
  assert.equal(response.status, 200);
  assert.match(html, /100 ФИЛОСОФОВ · 2500 ЛЕТ РАЗГОВОРА/);
  assert.match(html, /18 маршрутов/);
  assert.match(html, /100 ФИЛОСОФОВ \/ ОТБОРНАЯ КАРТА/);
  assert.doesNotMatch(html, /из 50 мыслителей|Хронология 50 философов/);
});

test("renders every philosopher with seven ideas and source apparatus", async () => {
  const slugs = await canonicalSlugs();

  for (const slug of slugs) {
    const response = await render(`/${slug}`);
    const html = await response.text();
    const ideaChapters = html.match(/class="idea-chapter"/g) ?? [];
    const sourceLinks = html.match(/<a href="https?:\/\/[^\"]+"[^>]*target="_blank"/g) ?? [];

    assert.equal(response.status, 200, `${slug}: route status`);
    assert.equal(ideaChapters.length, 7, `${slug}: seven ideas`);
    assert.ok(sourceLinks.length >= 3, `${slug}: at least three external sources`);
    assert.match(html, /\/ 100<\/span>/, `${slug}: 100-figure coordinate`);
    assert.doesNotMatch(html, />undefined<|>null</, `${slug}: no broken data tokens`);
  }
});

test("renders an editorial philosophy portal and preserves the complete research atlas", async () => {
  const response = await render("/");
  const html = await response.text();
  const portalStage = html.match(/class="portal-stage"/g) ?? [];
  const eraButtons = html.match(/title="[^"]+: [^"]+"/g) ?? [];
  const portalFigures = html.match(/class="portal-portrait(?:[ "])/g) ?? [];
  const researchCards = html.match(/class="canon-v2-card"/g) ?? [];
  const researchFilters = html.match(/class="canon-v2-filters"/g) ?? [];

  assert.equal(portalStage.length, 1, "the title screen is an editorial portal");
  assert.equal(eraButtons.length, 10, "the portal keeps all ten eras visible");
  assert.equal(portalFigures.length, 5, "the portal uses a disciplined set of five portrait entrances");
  assert.equal(researchCards.length, 100, "the complete canon remains available below the portal");
  assert.equal(researchFilters.length, 1, "the full atlas retains its tradition filters");
  assert.match(html, /Сто способов<br\/>\s*<i>увидеть мир\.<\/i>/);
  assert.doesNotMatch(html, /spiral-portraits|spiral-line/);
  assert.doesNotMatch(html, /river-portrait-index|river-portrait|atlas-figure/);
  assert.doesNotMatch(html, /portrait-placeholder\.svg/);
});

test("publishes crawler discovery files for all 100 profiles", async () => {
  const [robotsResponse, sitemapResponse, llmsResponse] = await Promise.all([
    render("/robots.txt"),
    render("/sitemap.xml"),
    render("/llms.txt"),
  ]);
  const robots = await robotsResponse.text();
  const sitemap = await sitemapResponse.text();
  const llms = await llmsResponse.text();

  assert.equal(robotsResponse.status, 200);
  assert.match(robots, /Sitemap: https:\/\/philosophy-atlas\.ru\/sitemap\.xml/i);
  assert.equal(sitemapResponse.status, 200);
  assert.equal((sitemap.match(/<url>/g) ?? []).length, 102);
  assert.match(sitemap, /https:\/\/philosophy-atlas\.ru\/byungchulhan/);
  assert.equal(llmsResponse.status, 200);
  assert.match(llmsResponse.headers.get("content-type") ?? "", /^text\/plain/);
  assert.equal((llms.match(/^\- \d{3}\. /gm) ?? []).length, 100);
});

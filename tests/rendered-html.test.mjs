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

function spiralPoints(count) {
  const samples = [];
  let totalDistance = 0;

  for (let index = 0; index <= 2400; index += 1) {
    const t = index / 2400;
    const angle = -2.5 + t * Math.PI * 6;
    const radiusX = 47 - 27 * t;
    const radiusY = 44 - 26 * t;
    const point = {
      x: 50 + Math.cos(angle) * radiusX,
      y: 50 + Math.sin(angle) * radiusY,
      distance: totalDistance,
    };
    const previous = samples.at(-1);
    if (previous) {
      totalDistance += Math.hypot((point.x - previous.x) * 1.62, point.y - previous.y);
      point.distance = totalDistance;
    }
    samples.push(point);
  }

  return Array.from({ length: count }, (_, index) => {
    const target = (totalDistance * index) / Math.max(1, count - 1);
    return samples.find((point) => point.distance >= target) ?? samples.at(-1);
  });
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
  assert.match(html, /100 философов · 700 идей · 2500 лет/);
  assert.match(html, /18 редакционных маршрутов/);
  assert.match(html, /ХРОНОЛОГИЧЕСКИЙ АТЛАС \/ 100/);
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

test("keeps all 100 idle desktop portraits on a non-overlapping spiral", async () => {
  const slugs = await canonicalSlugs();
  const landmarks = new Set([
    "buddha", "confucius", "socrates", "plato", "aristotle", "nagarjuna",
    "machiavelli", "spinoza", "kant", "nietzsche", "ambedkar", "foucault",
    "rawls", "byungchulhan",
  ]);
  const points = spiralPoints(slugs.length);
  const viewports = [
    { width: 901, height: 760, node: 32, landmark: 42 },
    { width: 1181, height: 760, node: 38, landmark: 50 },
    { width: 1440, height: 920, node: 44, landmark: 58 },
    { width: 1920, height: 920, node: 44, landmark: 58 },
  ];

  for (const viewport of viewports) {
    const rectangles = points.map((point, index) => {
      const size = landmarks.has(slugs[index]) ? viewport.landmark : viewport.node;
      const x = 34 + (point.x / 100) * (viewport.width - 68);
      const y = 12 + (point.y / 100) * (viewport.height - 34);
      return {
        left: x - size / 2,
        right: x + size / 2,
        top: y - size / 2,
        bottom: y + size / 2,
      };
    });
    const overlaps = [];
    for (let leftIndex = 0; leftIndex < rectangles.length; leftIndex += 1) {
      for (let rightIndex = leftIndex + 1; rightIndex < rectangles.length; rightIndex += 1) {
        const left = rectangles[leftIndex];
        const right = rectangles[rightIndex];
        const x = Math.min(left.right, right.right) - Math.max(left.left, right.left);
        const y = Math.min(left.bottom, right.bottom) - Math.max(left.top, right.top);
        if (x > 5 && y > 5) overlaps.push([slugs[leftIndex], slugs[rightIndex]]);
      }
    }
    assert.deepEqual(overlaps, [], `${viewport.width}px: portrait collisions`);
  }
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

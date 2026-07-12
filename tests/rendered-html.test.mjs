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
  assert.match(html, /СОВРЕМЕННЫЙ ГИД ПО ФИЛОСОФИИ/);
  assert.match(html, /100 ФИЛОСОФОВ/);
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
    const milestoneTrack = html.match(/<div class="milestone-track">([\s\S]*?)<\/div><\/section>/)?.[1] ?? "";
    const milestoneCards = milestoneTrack.match(/<article[\s\S]*?<\/article>/g) ?? [];
    const milestoneSecondLines = milestoneCards.filter((card) => /<time>[\s\S]*?<small>/.test(card));

    assert.equal(response.status, 200, `${slug}: route status`);
    assert.equal(ideaChapters.length, 7, `${slug}: seven ideas`);
    assert.ok(milestoneCards.length >= 3, `${slug}: timeline cards`);
    assert.equal(
      milestoneSecondLines.length,
      milestoneCards.length,
      `${slug}: every timeline card has age or context line`,
    );
    assert.doesNotMatch(html, /<small>рождение<\/small>/, `${slug}: birth is shown as age`);
    assert.ok(sourceLinks.length >= 3, `${slug}: at least three external sources`);
    assert.match(html, /\/ 100<\/span>/, `${slug}: 100-figure coordinate`);
    assert.match(html, /class="profile-share-toggle"/, `${slug}: share control`);
    assert.match(html, /class="footer-share"/, `${slug}: footer share control`);
    assert.equal(
      (html.match(/class="profile-title-quote"/g) ?? []).length,
      1,
      `${slug}: one verified cover quotation`,
    );
    assert.match(html, /class="profile-location"/, `${slug}: mapped location control`);
    assert.match(
      html,
      /href="https:\/\/www\.google\.com\/maps\/search\/\?api=1&amp;query=/,
      `${slug}: Google Maps location link`,
    );
    assert.doesNotMatch(html, />undefined<|>null</, `${slug}: no broken data tokens`);
  }
});

test("labels non-direct quotations without calling them verified", async () => {
  const [ockham, habermas] = await Promise.all([
    render("/ockham").then((response) => response.text()),
    render("/habermas").then((response) => response.text()),
  ]);

  assert.match(ockham, /Традиционная формула/);
  assert.match(habermas, /Редакционная формулировка/);
});

test("frames Socrates as a usable 30-second orientation", async () => {
  const response = await render("/socrates");
  const html = await response.text();
  const orientation = html.indexOf("Сократ переносит философию");
  const mainQuestion = html.indexOf("Главный вопрос", orientation);
  const method = html.indexOf("Инструмент", orientation);
  const changed = html.indexOf("Что изменил", orientation);
  const sources = html.indexOf("Как мы это знаем", orientation);
  const titleQuote = html.indexOf("profile-title-quote");
  const thesis = html.indexOf("profile-thesis", titleQuote);
  const tags = html.indexOf("profile-tags", thesis);
  const sourceSeal = html.indexOf("source-seal", tags);
  const portrait = html.indexOf("profile-portrait", sourceSeal);

  assert.match(html, /Общий контур за 30 секунд/);
  assert.doesNotMatch(html, /Увидеть общий контур за три минуты/);
  assert.ok(orientation >= 0, "the central philosophical thought is present");
  assert.ok(orientation < mainQuestion, "the thought comes before the four bearings");
  assert.ok(mainQuestion < method && method < changed && changed < sources, "the bearings keep their reading order");
  assert.match(html, /Надёжность реконструкции/);
  assert.match(html, /Семь главных мыслей (?:<!-- -->)?Сократа/);
  assert.match(html, /Жизненный путь Сократа/);
  assert.doesNotMatch(html, /Семь ходов мысли/);
  assert.match(html, /Рождение/);
  assert.match(html, /ок\. 46–47 лет/);
  assert.match(html, /ок\. 70 лет/);
  assert.match(html, /Жизнь и движение/);
  assert.doesNotMatch(html, /Жизнь и движение текста/);
  assert.match(html, /Материалы для полной картины/);
  assert.match(html, /составить объёмное представление о мыслителе/);
  assert.equal(
    (html.match(/class="profile-title-quote"/g) ?? []).length,
    1,
    "the verified quotation appears once beneath the Socrates name",
  );
  assert.ok(
    titleQuote < thesis && thesis < tags && tags < sourceSeal && sourceSeal < portrait,
    "the hero follows the quote, thesis, facts, source status, and portrait reading order",
  );
  assert.doesNotMatch(html, /profile-hero-quote/, "the quotation never covers the portrait");
  assert.match(html, /href="#verified-quote">Платон, «Апология Сократа», 38a/);
  assert.doesNotMatch(html, /Сократобъёмно|фигуру Сократ/);
  assert.doesNotMatch(html, /—/, "the Socrates template uses short dashes only");
  assert.doesNotMatch(html, /ЛИЧНЫЙ СЛОЙ|Мой ответ:/);
});

test("brings every Axial Age profile to the Socrates editorial standard", async () => {
  const axialProfiles = [
    ["buddha", "Будды", "точная дата неизвестна", "традиционно, ок. 35 лет"],
    ["confucius", "Конфуция", "551 до н. э.", "ок. 51 года"],
    ["heraclitus", "Гераклита", "ок. 540 до н. э.", "ок. 40 лет"],
    ["parmenides", "Парменида", "конец VI века до н. э.", "возраст неизвестен"],
    ["laozi", "Лао-цзы", "не установлено", "историчность спорна"],
    ["mozi", "Мо-цзы", "ок. 470 до н. э.", "взрослые годы"],
  ];

  for (const [slug, genitiveName, lifeMarker, timelineMarker] of axialProfiles) {
    const response = await render(`/${slug}`);
    const html = await response.text();
    const coverQuote = html.indexOf("profile-title-quote");
    const thesis = html.indexOf("profile-thesis", coverQuote);

    assert.equal(response.status, 200, `${slug}: route status`);
    assert.equal(
      (html.match(/class="profile-title-quote"/g) ?? []).length,
      1,
      `${slug}: one verified cover quotation`,
    );
    assert.ok(coverQuote >= 0 && coverQuote < thesis, `${slug}: quotation precedes thesis`);
    assert.match(html, new RegExp(lifeMarker), `${slug}: honest life span`);
    assert.match(html, new RegExp(timelineMarker), `${slug}: timeline context`);
    assert.match(
      html,
      new RegExp(`Семь главных мыслей (?:<!-- -->)?${genitiveName}`),
      `${slug}: grammatically correct idea heading`,
    );
    assert.match(
      html,
      new RegExp(`Жизненный путь ${genitiveName}`),
      `${slug}: grammatically correct timeline label`,
    );
    assert.doesNotMatch(html, /—/, `${slug}: short-dash editorial style`);
  }
});

test("brings every Classical Schools profile to the Socrates editorial standard", async () => {
  const classicalProfiles = [
    ["plato", "Платона", "428/427 до н. э.", "ок. 40–41 года"],
    ["diogenes", "Диогена Синопского", "ок. 412/404 до н. э.", "рассказ легендарен"],
    ["aristotle", "Аристотеля", "384 до н. э.", "ок. 49 лет"],
    ["zhuangzi", "Чжуан-цзы", "ок. 369 до н. э.", "примерно шесть веков спустя"],
    ["epicurus", "Эпикура", "341 до н. э.", "ок. 35 лет"],
  ];

  for (const [slug, genitiveName, lifeMarker, timelineMarker] of classicalProfiles) {
    const response = await render(`/${slug}`);
    const html = await response.text();
    const coverQuote = html.indexOf("profile-title-quote");
    const thesis = html.indexOf("profile-thesis", coverQuote);

    assert.equal(response.status, 200, `${slug}: route status`);
    assert.equal(
      (html.match(/class="profile-title-quote"/g) ?? []).length,
      1,
      `${slug}: one verified cover quotation`,
    );
    assert.ok(coverQuote >= 0 && coverQuote < thesis, `${slug}: quotation precedes thesis`);
    assert.match(html, new RegExp(lifeMarker), `${slug}: honest life span`);
    assert.match(html, new RegExp(timelineMarker), `${slug}: timeline context`);
    assert.match(
      html,
      new RegExp(`Семь главных мыслей (?:<!-- -->)?${genitiveName}`),
      `${slug}: grammatically correct idea heading`,
    );
    assert.match(
      html,
      new RegExp(`Жизненный путь ${genitiveName}`),
      `${slug}: grammatically correct timeline label`,
    );
    assert.doesNotMatch(html, /—/, `${slug}: short-dash editorial style`);
  }

  const platoResponse = await render("/plato");
  const platoHtml = await platoResponse.text();
  assert.match(platoHtml, /Те, кто философствует правильно/);
  assert.doesNotMatch(platoHtml, /Те, кто философствуют правильно/);
});

test("shows a mapped resting place only when the burial is established", async () => {
  const confirmedProfiles = [
    ["confucius", "Кунлин, Цюйфу", "Tomb%20of%20Confucius", "ЮНЕСКО"],
    ["adamsmith", "Канонгейтское кладбище, Эдинбург", "Adam%20Smith%20Grave", "City of Edinburgh Council"],
  ];

  for (const [slug, place, mapQuery, source] of confirmedProfiles) {
    const response = await render(`/${slug}`);
    const html = await response.text();

    assert.equal(response.status, 200, `${slug}: route status`);
    assert.equal(
      (html.match(/class="resting-place-card"/g) ?? []).length,
      1,
      `${slug}: one final place-of-memory point`,
    );
    assert.match(html, /Место памяти/, `${slug}: respectful section title`);
    assert.match(html, /место захоронения/, `${slug}: explicit map meaning`);
    assert.match(html, new RegExp(place), `${slug}: burial place label`);
    assert.match(html, new RegExp(mapQuery), `${slug}: precise Google Maps query`);
    assert.match(html, new RegExp(source), `${slug}: verification source`);
  }

  const socratesResponse = await render("/socrates");
  assert.doesNotMatch(
    await socratesResponse.text(),
    /class="resting-place-card"/,
    "Socrates: no invented grave location",
  );
});

test("shows active death places without inventing them for living or uncertain profiles", async () => {
  const mappedDeaths = [
    ["socrates", "умер:\\s*(?:<!-- -->)?Афины", "Athens"],
    ["epictetus", "умер:\\s*(?:<!-- -->)?Никополь", "Nicopolis"],
    ["augustine", "умер:\\s*(?:<!-- -->)?Гиппон Регий", "Annaba"],
    ["adamsmith", "умер:\\s*(?:<!-- -->)?Эдинбург", "Edinburgh"],
  ];

  for (const [slug, label, query] of mappedDeaths) {
    const response = await render(`/${slug}`);
    const html = await response.text();

    assert.equal(response.status, 200, `${slug}: route status`);
    assert.match(html, new RegExp(label), `${slug}: hero death place label`);
    assert.match(html, /profile-death-location/, `${slug}: active death place control`);
    assert.match(html, new RegExp(query), `${slug}: death place Google Maps query`);
  }

  const nagarjuna = await render("/nagarjuna");
  const nagarjunaHtml = await nagarjuna.text();
  assert.doesNotMatch(nagarjunaHtml, /profile-death-location/, "Nagarjuna: no invented death place");
  assert.match(nagarjunaHtml, /место не установлено/, "Nagarjuna: uncertainty is visible");

  const livingAuthors = ["habermas", "amartyasen", "judithbutler", "mbembe", "byungchulhan"];

  for (const slug of livingAuthors) {
    const response = await render(`/${slug}`);
    const html = await response.text();
    const lifeSection = html.match(/<section class="life-section"[\s\S]*?<\/section>/)?.[0] ?? "";

    assert.equal(response.status, 200, `${slug}: route status`);
    assert.match(lifeSection, /class="life-span is-open-ended"/, `${slug}: living timeline remains open`);
    assert.doesNotMatch(lifeSection, />Статус</, `${slug}: no status label in life timeline`);
    assert.doesNotMatch(lifeSection, />Смерть</, `${slug}: no death label in life timeline`);
    assert.doesNotMatch(lifeSection, /живой автор/, `${slug}: no living-status placeholder`);
    assert.doesNotMatch(lifeSection, /место смерти/i, `${slug}: no death-place placeholder`);
    assert.doesNotMatch(html, /profile-death-location/, `${slug}: no death map for living author`);
  }
});

test("explains specialist terms inline with accessible glossary hints", async () => {
  const cases = [
    ["/ockham", ["Схоластика", "Номинализм", "Онтология"]],
    ["/husserl", ["Феноменология", "Редукция", "Интенциональность"]],
    ["/derrida", ["Деконструкция", "Апория"]],
  ];

  for (const [path, terms] of cases) {
    const response = await render(path);
    const html = await response.text();

    assert.equal(response.status, 200, `${path}: route status`);
    assert.match(html, /class="glossary-term"/, `${path}: glossary term markup`);
    assert.match(html, /data-definition="[^"]{20,}"/, `${path}: short explanation`);
    assert.match(html, /tabindex="0"/, `${path}: keyboard focusable tooltip`);

    for (const term of terms) {
      assert.match(html, new RegExp(`data-term="${term}"`), `${path}: explains ${term}`);
    }
  }
});

test("keeps glossary highlights editorial instead of marking obvious words", async () => {
  const response = await render("/nietzsche");
  const html = await response.text();

  assert.equal(response.status, 200, "Nietzsche: route status");
  assert.match(html, /data-term="Лютеранство"/, "Nietzsche: explains Lutheran context");
  assert.match(html, /data-term="Перспективизм"/, "Nietzsche: explains perspectivism");
  assert.match(html, /data-term="Нигилизм"/, "Nietzsche: explains nihilism");
  assert.doesNotMatch(html, /data-term="Интеллект"/, "Nietzsche: does not mark ordinary intellectual adjective");
  assert.doesNotMatch(html, /data-term="Добродетель"/, "Nietzsche: does not mark obvious everyday virtue word");
  assert.doesNotMatch(html, /data-term="Форма жизни"/, "Nietzsche: does not mark a broad phrase as a Wittgenstein term");
});

test("keeps foreign specialist terms readable in Russian prose", async () => {
  const response = await render("/foucault");
  const html = await response.text();

  assert.equal(response.status, 200, "Foucault: route status");
  assert.doesNotMatch(html, /parrhesia/, "Foucault: no unexplained Latin term in Russian prose");
  assert.match(html, /свободную правдивую речь/, "Foucault: parrhesia is translated in prose");
  assert.match(html, /data-term="Парресия"/, "Foucault: parrhesia remains explained as a specialist term");
});

test("uses Russian-facing labels for all glossary highlights", async () => {
  const slugs = await canonicalSlugs();

  for (const slug of slugs) {
    const response = await render(`/${slug}`);
    const html = await response.text();

    assert.equal(response.status, 200, `${slug}: route status`);

    for (const match of html.matchAll(/<dfn\b([^>]*)>([\s\S]*?)<\/dfn>/g)) {
      const attrs = match[1];
      const term = attrs.match(/data-term="([^"]+)"/)?.[1] ?? "";
      const visibleText = match[2].replace(/<[^>]+>/g, "");

      assert.doesNotMatch(term, /[A-Za-zĀ-žʿ]/, `${slug}: glossary label is Russian-facing`);
      assert.doesNotMatch(
        visibleText,
        /[A-Za-zĀ-žʿ]/,
        `${slug}: highlighted visible term is Russian-facing`,
      );
    }
  }
});

test("renders Benjamin's angel of history in readable Russian", async () => {
  const response = await render("/benjamin");
  const html = await response.text();

  assert.equal(response.status, 200, "Benjamin: route status");
  assert.match(
    html,
    /ангел истории видит то, что люди называют прогрессом/,
    "Benjamin: angel of history sentence is readable",
  );
  assert.doesNotMatch(
    html,
    /прогресс выглядит ангелу истории/,
    "Benjamin: no awkward calque",
  );
  assert.match(html, /вспышку опасности/, "Benjamin: danger motif is phrased naturally");
});

test("explains each specialist term only once per philosopher page", async () => {
  const slugs = await canonicalSlugs();

  for (const slug of slugs) {
    const response = await render(`/${slug}`);
    const html = await response.text();
    const terms = [...html.matchAll(/data-term="([^"]+)"/g)].map((match) => match[1]);
    const duplicates = terms.filter((term, index) => terms.indexOf(term) !== index);

    assert.equal(response.status, 200, `${slug}: route status`);
    assert.deepEqual(duplicates, [], `${slug}: repeated glossary terms`);
  }

  const hegel = await render("/hegel");
  const hegelHtml = await hegel.text();
  assert.equal(
    (hegelHtml.match(/data-term="Признание"/g) ?? []).length,
    1,
    "Hegel: recognition is explained once",
  );
});

test("renders an editorial philosophy portal and preserves the complete research atlas", async () => {
  const response = await render("/");
  const html = await response.text();
  const portalStage = html.match(/class="portal-stage"/g) ?? [];
  const eraButtons = html.match(/title="[^"]+: [^"]+"/g) ?? [];
  const portalArtwork = html.match(/class="portal-artwork(?:[ "])/g) ?? [];
  const portalFigureLinks = html.match(/class="portal-figure-link"/g) ?? [];
  const researchCards = html.match(/class="canon-v2-card"/g) ?? [];
  const researchFilters = html.match(/class="canon-v2-filters"/g) ?? [];

  assert.equal(portalStage.length, 1, "the title screen is an editorial portal");
  assert.equal(eraButtons.length, 10, "the portal keeps all ten eras visible");
  assert.equal(portalArtwork.length, 1, "the portal uses one coherent art-directed image");
  assert.equal(portalFigureLinks.length, 10, "the title image offers ten direct philosopher entrances");
  assert.match(html, /\/images\/philosophy-chronicle-collage-fullbleed\.webp/);
  assert.equal(researchCards.length, 100, "the complete canon remains available below the portal");
  assert.equal(researchFilters.length, 1, "the full atlas retains its historical-era filters");
  assert.match(html, /Понятный путеводитель по главным мыслителям/);
  assert.match(html, /Выберите историческую эпоху/);
  assert.match(html, /Осевое время/);
  assert.match(html, /Классические школы/);
  assert.doesNotMatch(html, />Все эпохи</);
  assert.doesNotMatch(html, /Найти философа или идею/);
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

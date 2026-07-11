import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const subjects = [
  ["mencius", "Mencius"],
  ["kautilya", "Chanakya"],
  ["zeno", "Zeno of Citium"],
  ["xunzi", "Xun Kuang"],
  ["seneca", "Seneca the Younger"],
  ["sextus", "Sextus Empiricus"],
  ["vasubandhu", "Vasubandhu"],
  ["dignaga", "Dignaga"],
  ["alkindi", "Al-Kindi"],
  ["dogen", "Dogen"],
  ["dunsscotus", "Duns Scotus"],
  ["ockham", "William of Ockham"],
  ["ibnkhaldun", "Ibn Khaldun"],
  ["christinedepizan", "Christine de Pizan"],
  ["bacon", "Francis Bacon"],
  ["pascal", "Blaise Pascal"],
  ["berkeley", "George Berkeley"],
  ["adamsmith", "Adam Smith"],
  ["mill", "John Stuart Mill"],
  ["dostoevsky", "Fyodor Dostoevsky"],
  ["tolstoy", "Leo Tolstoy"],
  ["peirce", "Charles Sanders Peirce"],
  ["williamjames", "William James"],
  ["freud", "Sigmund Freud"],
  ["bergson", "Henri Bergson"],
  ["dewey", "John Dewey"],
  ["dubois", "W. E. B. Du Bois"],
  ["gandhi", "Mahatma Gandhi"],
  ["jung", "Carl Jung"],
  ["iqbal", "Muhammad Iqbal"],
  ["ambedkar", "B. R. Ambedkar"],
  ["benjamin", "Walter Benjamin"],
  ["popper", "Karl Popper"],
  ["adorno", "Theodor W. Adorno"],
  ["levinas", "Emmanuel Levinas"],
  ["merleauponty", "Maurice Merleau-Ponty"],
  ["simoneweil", "Simone Weil"],
  ["camus", "Albert Camus"],
  ["anscombe", "G. E. M. Anscombe"],
  ["rawls", "John Rawls"],
  ["kuhn", "Thomas Kuhn"],
  ["deleuze", "Gilles Deleuze"],
  ["fanon", "Frantz Fanon"],
  ["foucault", "Michel Foucault"],
  ["habermas", "Jürgen Habermas"],
  ["derrida", "Jacques Derrida"],
  ["amartyasen", "Amartya Sen"],
  ["judithbutler", "Judith Butler"],
  ["mbembe", "Achille Mbembe"],
  ["byungchulhan", "Byung-Chul Han"],
];

const root = process.cwd();
const portraitDir = path.join(root, "public", "portraits");
const thumbDir = path.join(portraitDir, "thumb");
await mkdir(thumbDir, { recursive: true });

function stripHtml(value = "") {
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

const sleep = (duration) => new Promise((resolve) => setTimeout(resolve, duration));

async function request(url) {
  for (let attempt = 0; attempt < 8; attempt += 1) {
    const response = await fetch(url, {
      headers: { "user-agent": "PhilosophyAtlas/1.0 (editorial image audit; philosophy-atlas.ru)" },
    });

    if (response.ok) return response;
    if (response.status !== 429 && response.status < 500) {
      throw new Error(`${response.status} ${url}`);
    }

    const retryAfter = Number(response.headers.get("retry-after"));
    await sleep(Number.isFinite(retryAfter) && retryAfter > 0 ? retryAfter * 1000 : 1200 * (attempt + 1));
  }

  throw new Error(`лимит повторных запросов исчерпан: ${url}`);
}

async function json(url) {
  const response = await request(url);
  return response.json();
}

const metadataPath = "/tmp/philosophy-atlas-supplement-portraits.json";
let records = [];

try {
  records = JSON.parse(await readFile(metadataPath, "utf8"));
} catch {
  records = [];
}

async function persistRecords() {
  const order = new Map(subjects.map(([slug], index) => [slug, index]));
  records.sort((left, right) => order.get(left.slug) - order.get(right.slug));
  await writeFile(metadataPath, JSON.stringify(records, null, 2));
}

async function processSubject([slug, title]) {
  if (records.some((record) => record.slug === slug)) {
    console.log(`OK   ${slug} · уже проверен`);
    return;
  }

  try {
  const summary = await json(
    `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title.replaceAll(" ", "_"))}`,
  );
  const original = summary.originalimage?.source;
  if (!original?.includes("upload.wikimedia.org/wikipedia/commons/")) {
    throw new Error(`${slug}: свободное Commons-изображение не найдено`);
  }

  const filename = decodeURIComponent(new URL(original).pathname.split("/").at(-1));
  const metadata = await json(
    `https://commons.wikimedia.org/w/api.php?action=query&format=json&origin=*&prop=imageinfo&iiprop=url%7Cextmetadata&iiurlwidth=1200&titles=${encodeURIComponent(`File:${filename}`)}`,
  );
  const page = Object.values(metadata.query.pages)[0];
  const image = page.imageinfo?.[0];
  const license = stripHtml(image?.extmetadata?.LicenseShortName?.value);
  const usageTerms = stripHtml(image?.extmetadata?.UsageTerms?.value);
  const author = stripHtml(image?.extmetadata?.Artist?.value) || "Автор указан на странице файла";

  if (!image?.thumburl || !license || /fair use|copyrighted/i.test(`${license} ${usageTerms}`)) {
    throw new Error(`${slug}: лицензия изображения не прошла проверку (${license || "не указана"})`);
  }

  const imageResponse = await request(image.thumburl);
  const input = Buffer.from(await imageResponse.arrayBuffer());
  const normalized = sharp(input).rotate().resize(720, 900, {
    fit: "cover",
    position: sharp.strategy.attention,
  });
  await normalized.clone().webp({ quality: 84 }).toFile(path.join(portraitDir, `${slug}.webp`));
  await normalized
    .clone()
    .resize(320, 320, { fit: "cover", position: sharp.strategy.attention })
    .webp({ quality: 80 })
    .toFile(path.join(thumbDir, `${slug}.webp`));

  records.push({
    slug,
    title: summary.title,
    alt: `Историческое или фотографическое изображение: ${summary.title}`,
    author,
    license,
    source: image.descriptionurl,
    file: page.title,
  });
  await persistRecords();
  console.log(`${String(records.length).padStart(2, "0")}/50 ${slug} · ${license}`);
  } catch (error) {
    console.error(`SKIP ${slug} · ${error instanceof Error ? error.message : error}`);
  }
}

for (const subject of subjects) {
  await processSubject(subject);
  await sleep(250);
}

await persistRecords();
console.log(`Metadata: ${metadataPath}`);

import { readFile } from "node:fs/promises";

const files = [
  "lib/profiles-supplement-ancient.ts",
  "lib/profiles-supplement-foundations.ts",
  "lib/profiles-supplement-modern.ts",
  "lib/profiles-supplement-twentieth.ts",
  "lib/profiles-supplement-contemporary.ts",
];
const sources = await Promise.all(files.map((file) => readFile(file, "utf8")));
const urls = [...new Set(sources.flatMap((source) => [...source.matchAll(/https:\/\/[^"\s]+/g)].map((match) => match[0])))];

async function check(url) {
  try {
    const response = await fetch(url, {
      redirect: "manual",
      signal: AbortSignal.timeout(12000),
      headers: {
        accept: "text/html,application/xhtml+xml",
        range: "bytes=0-1024",
        "user-agent": "PhilosophyAtlas/1.0 (editorial link audit; philosophy-atlas.ru)",
      },
    });
    await response.body?.cancel();
    return { url, status: response.status };
  } catch (error) {
    return { url, status: "ERR", error: error instanceof Error ? error.message : String(error) };
  }
}

const results = [];
for (let index = 0; index < urls.length; index += 10) {
  results.push(...(await Promise.all(urls.slice(index, index + 10).map(check))));
}

const broken = results.filter(({ status }) => status === 404 || status === 410);
const blocked = results.filter(({ status }) => status === "ERR" || status === 401 || status === 403 || status === 429);
console.log(`Checked: ${results.length}`);
console.log(`Broken: ${broken.length}`);
for (const item of broken) console.log(`${item.status} ${item.url}`);
console.log(`Blocked or inconclusive: ${blocked.length}`);
for (const item of blocked) console.log(`${item.status} ${item.url}${item.error ? ` · ${item.error}` : ""}`);
if (broken.length) process.exitCode = 1;

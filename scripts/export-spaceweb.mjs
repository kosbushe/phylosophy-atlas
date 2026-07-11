import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const outputRoot = process.argv[2]
  ? path.resolve(process.argv[2])
  : path.join(root, "build", "spaceweb-export");
const publicHtml = path.join(outputRoot, "public_html");

const canonSource = await readFile(path.join(root, "lib", "canon.ts"), "utf8");
const canonBlock = canonSource.match(/const canonOrder100 = \[([\s\S]*?)\] as const;/);
if (!canonBlock) throw new Error("Не найден canonOrder100");
const slugs = [...canonBlock[1].matchAll(/"([a-z0-9]+)"/g)].map((match) => match[1]);
if (slugs.length !== 100 || new Set(slugs).size !== 100) {
  throw new Error("Экспорт требует ровно 100 уникальных страниц");
}

await rm(outputRoot, { recursive: true, force: true });
await mkdir(publicHtml, { recursive: true });
await cp(path.join(root, "dist", "client"), publicHtml, { recursive: true });

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("export", `${process.pid}-${Date.now()}`);
const { default: worker } = await import(workerUrl.href);

async function render(route, filename) {
  const response = await worker.fetch(
    new Request(`https://philosophy-atlas.ru${route}`, {
      headers: { accept: route.endsWith(".txt") ? "text/plain" : "text/html" },
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
  if (!response.ok && route !== "/__spaceweb_404__") {
    throw new Error(`${route}: HTTP ${response.status}`);
  }
  await writeFile(path.join(publicHtml, filename), Buffer.from(await response.arrayBuffer()));
}

await render("/", "index.html");
await render("/legal", "legal.html");
for (const slug of slugs) await render(`/${slug}`, `${slug}.html`);
await render("/robots.txt", "robots.txt");
await render("/sitemap.xml", "sitemap.xml");
await render("/llms.txt", "llms.txt");
await render("/__spaceweb_404__", "404.html");

await writeFile(
  path.join(publicHtml, ".htaccess"),
  `Options -Indexes
DirectoryIndex index.html
ErrorDocument 404 /404.html

RewriteEngine On
RewriteCond %{HTTPS} !=on
RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [R=301,L]

RewriteCond %{REQUEST_FILENAME} -f [OR]
RewriteCond %{REQUEST_FILENAME} -d
RewriteRule ^ - [L]

RewriteCond %{DOCUMENT_ROOT}/$1.html -f
RewriteRule ^([^/]+)/?$ $1.html [L]

<IfModule mod_headers.c>
  Header always set X-Content-Type-Options "nosniff"
  Header always set Referrer-Policy "strict-origin-when-cross-origin"
  Header always set X-Frame-Options "SAMEORIGIN"
  <FilesMatch "\\.(html|txt|xml)$">
    Header set Cache-Control "public, max-age=300, must-revalidate"
  </FilesMatch>
  <FilesMatch "\\.(css|js|webp|svg|woff2)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>
</IfModule>

<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/css text/javascript application/javascript application/json application/xml image/svg+xml
</IfModule>
`,
);

await writeFile(
  path.join(outputRoot, "UPLOAD-INSTRUCTIONS.txt"),
  `ФИЛОСОФСКАЯ КАРТА · SPACEWEB · ВЕРСИЯ 10

1. Откройте папку philosophy-atlas_ru/public_html в файловом менеджере SpaceWeb.
2. Сохраните резервную копию текущего содержимого.
3. Загрузите внутрь public_html ВСЁ содержимое папки public_html из этого архива, включая скрытый файл .htaccess.
4. Убедитесь, что SSL-сертификат для philosophy-atlas.ru включён.
5. Проверьте:
   https://philosophy-atlas.ru/
   https://philosophy-atlas.ru/byungchulhan
   https://philosophy-atlas.ru/sitemap.xml
   https://philosophy-atlas.ru/llms.txt

В пакете: 100 профилей, 700 идей, 18 маршрутов, robots.txt, sitemap.xml, llms.txt и структурированные данные.
`,
);

console.log(`SpaceWeb export: ${outputRoot}`);
console.log(`Profiles: ${slugs.length}`);

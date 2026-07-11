import { cp, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const client = "C:\\Projects\\architecture-blog\\dist\\client";
const canonical = "https://atom-architecture-lab.jgalicea.chatgpt.site";
const routes = [
  "",
  "aedes",
  "atom-quantizer",
  "atom-redox-kernel",
  "av1-avatar",
  "experiments",
  "imperium",
  "nuntius",
  "ordo",
  "spiderweb",
  "systems",
];

await cp(client, root, {
  recursive: true,
  force: true,
  filter(source) {
    const name = path.basename(source);
    return name !== ".vite" && name !== "_headers" && name !== ".assetsignore";
  },
});

for (const route of routes) {
  const url = `${canonical}/${route}${route ? "" : ""}?mirror=github-pages`;
  const response = await fetch(url, { headers: { "User-Agent": "Lucerna-Labs-GitHub-Pages-Mirror/1.0" } });
  if (!response.ok) throw new Error(`${url} returned ${response.status}`);
  const html = injectMirrorAssets(await response.text());
  const directory = route ? path.join(root, route) : root;
  await mkdir(directory, { recursive: true });
  await writeFile(path.join(directory, "index.html"), html, "utf8");
}

const index = await readFile(path.join(root, "index.html"), "utf8");
await writeFile(path.join(root, "404.html"), index, "utf8");
await writeFile(path.join(root, "robots.txt"), "User-agent: *\nAllow: /\nSitemap: https://lucerna-labs.github.io/sitemap.xml\n", "utf8");
await writeFile(path.join(root, "sitemap.xml"), sitemap(), "utf8");

function injectMirrorAssets(html) {
  const additions = [
    '<link rel="stylesheet" href="/mirror.css">',
    '<script>window.ATOM_STATIC_MIRROR=true;</script>',
    '<script defer src="/mirror.js"></script>',
  ].join("");
  return html.replace("</head>", `${additions}</head>`);
}

function sitemap() {
  const urls = routes.map(route => `  <url><loc>https://lucerna-labs.github.io/${route}</loc></url>`).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

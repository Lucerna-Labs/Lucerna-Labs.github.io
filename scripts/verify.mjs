import { access, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const routes = new Map([
  ["", "ATOM ARCHITECTURE / 60-SECOND READ"],
  ["aedes", "WORKLOAD-DRIVEN MEMORY MODEL"],
  ["atom-quantizer", "Cross-domain atoms"],
  ["atom-redox-kernel", "THE KERNEL"],
  ["av1-avatar", "SOURCE RECOVERY"],
  ["experiments", "Mother AI"],
  ["imperium", "DYNAMIC VPN SECURITY"],
  ["nuntius", "FIRST APPLICATION"],
  ["ordo", "Provider Gateway"],
  ["spiderweb", "FINISHED ORDO SPINE"],
  ["systems", "INDEPENDENT BUILDS"],
]);

for (const [route, marker] of routes) {
  const file = path.join(root, route, "index.html");
  const html = await readFile(file, "utf8");
  assert(html.includes(marker), `${route || "/"} is missing ${marker}`);
  assert(html.includes('href="/mirror.css"'), `${route || "/"} is missing mirror.css`);
  assert(html.includes('src="/mirror.js"'), `${route || "/"} is missing mirror.js`);

  for (const match of html.matchAll(/(?:src|href)="(\/[a-zA-Z0-9_./-]+\.[a-zA-Z0-9]+)"/g)) {
    await access(path.join(root, match[1].slice(1)));
  }
}

const home = await readFile(path.join(root, "index.html"), "utf8");
const mirrorScript = await readFile(path.join(root, "mirror.js"), "utf8");
const license = await readFile(path.join(root, "LICENSE"), "utf8");
assert(home.includes("THINKING MODEL REQUIRED"), "homepage is missing the Vibe model requirement");
assert(home.includes("50K TOKENS / RUN"), "homepage is missing the public Vibe limit");
assert(mirrorScript.includes("atom-architecture-lab.jgalicea.chatgpt.site"), "Vibe handoff is missing its canonical target");
assert(license.startsWith("# PolyForm Small Business License 1.0.0"), "license is not the required PolyForm version");

console.log(`Verified ${routes.size} static routes and their referenced assets.`);

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

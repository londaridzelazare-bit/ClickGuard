/**
 * Turns a static build's `index.html` into a page fragment suitable for hosts
 * that supply their own `<!doctype>/<html>/<head>/<body>` skeleton (Claude
 * Artifacts, among others).
 *
 * It keeps the head contents that matter — title, description, font and style
 * links, scripts — and drops the document wrapper. Asset hashes are read from
 * the real build rather than hardcoded, so this stays correct across rebuilds.
 *
 *   node scripts/make-artifact-page.mjs [distDir] [--title "..."]
 *
 * Defaults to the prototype build. Writes `<distDir>/artifact-page.html`.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));

const argv = process.argv.slice(2);
const titleFlag = argv.indexOf("--title");
const title = titleFlag === -1 ? null : argv[titleFlag + 1];
const dirArg = argv.find((a, i) => !a.startsWith("--") && argv[i - 1] !== "--title");
const dist = resolve(here, "..", dirArg ?? "apps/prototype/dist");

const html = readFileSync(resolve(dist, "index.html"), "utf8");

const headMatch = html.match(/<head>([\s\S]*?)<\/head>/i);
const bodyMatch = html.match(/<body>([\s\S]*?)<\/body>/i);
if (!headMatch || !bodyMatch) {
  throw new Error(`Unexpected index.html shape in ${dist} — no <head>/<body>.`);
}

let head = headMatch[1]
  // The host supplies charset and viewport itself.
  .replace(/^[ \t]*<meta\s+charset[^>]*>[ \t]*\r?\n?/gim, "")
  .replace(/^[ \t]*<meta\s+name="viewport"[^>]*>[ \t]*\r?\n?/gim, "")
  // Same-origin assets: `crossorigin` forces a CORS fetch we do not need.
  .replace(/\s+crossorigin(?:="[^"]*")?/gi, "")
  .trim();

if (title) {
  head = head.replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`);
}

const body = bodyMatch[1].trim();
const out = `${head}\n${body}\n`;
const target = resolve(dist, "artifact-page.html");
writeFileSync(target, out, "utf8");

console.log(`Wrote ${target} (${out.length} bytes)`);
console.log(`Title: ${(out.match(/<title>([\s\S]*?)<\/title>/i) ?? [])[1] ?? "(none)"}`);

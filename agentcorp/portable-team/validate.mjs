import { readFileSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const text = (path) => readFileSync(join(root, path), "utf8");
const frontmatter = (content) => {
  const block = content.match(/^---\n([\s\S]*?)\n---/);
  if (!block) throw Error("Missing frontmatter");
  const value = (name) => block[1].match(new RegExp("^" + name + ": (.+)$", "m"))?.[1];
  return { block: block[1], value };
};
const team = frontmatter(text("TEAM.md"));
if (team.value("schema") !== "agentcompanies/v1") throw Error("Unexpected schema");
const includes = [...team.block.matchAll(/^  - (agents\/[^\n]+\/AGENTS\.md)$/gm)].map(m => m[1]);
const paths = [team.value("manager"), ...includes];
if (new Set(paths).size !== paths.length || paths.some(x => !x || x.startsWith("/") || x.includes("..")))
  throw Error("Unsafe or duplicated path");
const records = paths.map(p => {
  if (!existsSync(resolve(root, p))) throw Error("Missing " + p);
  const fm = frontmatter(text(p));
  return { slug: fm.value("slug"), parent: fm.value("reportsTo") };
});
const names = new Set(records.map(x => x.slug));
if (names.size !== records.length) throw Error("Duplicate agent slug");
for (const a of records) {
  if (!a.slug || !a.parent || (a.parent !== "null" && !names.has(a.parent)))
    throw Error("Invalid reporting line for " + a.slug);
}
const ceos = records.filter(x => x.parent === "null");
if (ceos.length !== 1 || ceos[0].slug !== "ceo") throw Error("Must have exactly one CEO root");
console.log("AgentCorp team structure valid: " + records.length + " agents.");

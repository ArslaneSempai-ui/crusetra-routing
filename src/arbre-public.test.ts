/*
 * NO TEAM FOLDER IN A PUBLIC TREE (2026-10-19, angles-morts-1810 #6).
 *
 * `equipe/` (org chart, every agent's standing brief, the cold-email mechanics) was merged to
 * `main` of this public repository on 2026-10-11 (PR #11) and stayed there. The live copies sit
 * in the private team folder; a public copy is a stale duplicate and tells a prospect how the
 * mails are machined. The rule: no tracked path under `equipe/`, none named `agents/*.md`.
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const racine = fileURLToPath(new URL("..", import.meta.url));

export function cheminsInterdits(suivis: string[]): string[] {
  return suivis.filter((c) => c.startsWith("equipe/") || /(^|\/)agents\/[^/]+\.md$/.test(c));
}

test("the rule names an equipe/ path and an agents/*.md path, and nothing else", () => {
  const vus = cheminsInterdits(["equipe/CHARTE.md", "x/agents/dev.md", "src/agents.ts", "README.md", "docs/equipe.md"]);
  assert.deepEqual(vus, ["equipe/CHARTE.md", "x/agents/dev.md"]);
});

test("no tracked file under equipe/ or agents/*.md in this public tree", () => {
  const suivis = execFileSync("git", ["-C", racine, "ls-files"], { encoding: "utf8" }).split("\n").filter(Boolean);
  const mauvais = cheminsInterdits(suivis);
  assert.deepEqual(mauvais, [], `team files in a public tree (${mauvais.length}): ${mauvais.join(", ")}`);
});

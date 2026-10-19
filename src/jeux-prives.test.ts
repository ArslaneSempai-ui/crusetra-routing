import { test } from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

/*
 * WITNESS: the full labelled sets are private, so no git index may track them.
 * The sealed signature and the public sample stay tracked.
 */
const RACINE = fileURLToPath(new URL("..", import.meta.url));

const DEPLACES = [
  "corpus-dur/cas-ambigus.md",
  "corpus-dur/documents-malformes.md",
  "corpus-dur/ecritures-non-latines.md",
  "corpus-dur/formulations.md",
  "corpus-hostile.json",
];

test("no moved labelled set is tracked by git", () => {
  let suivis: string[];
  try {
    suivis = execFileSync("git", ["ls-files", "--", ...DEPLACES], { cwd: RACINE, encoding: "utf8" })
      .split("\n").filter(Boolean);
  } catch (e) {
    assert.fail(`git ls-files failed, so the witness cannot run: ${(e as Error).message}`);
  }
  assert.deepEqual(suivis, [], `these private sets are still tracked: ${suivis.join(", ")}`);
});

test("the seal and the sample stay public", () => {
  const suivis = execFileSync("git", ["ls-files", "--", "corpus-hostile.signature.json", "corpus-dur/ECHANTILLON.md"],
    { cwd: RACINE, encoding: "utf8" }).split("\n").filter(Boolean);
  assert.deepEqual(suivis.sort(), ["corpus-dur/ECHANTILLON.md", "corpus-hostile.signature.json"]);
});

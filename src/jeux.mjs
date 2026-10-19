/*
 * THE DOOR TO THE PRIVATE SETS.
 *
 * The full labelled sets (corpus-dur/*.md, corpus-hostile.json) live in a private
 * folder, not in this repository. CRUSETRA_JEUX points at it; the default is the
 * sibling folder ../crusetra-jeux/crusetra-routing. A measure or a test that needs a
 * set reads it through here, and on a clean clone it skips with the named reason
 * below rather than failing or passing silently.
 */
import { existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { lireVariable } from "./environnement.ts";

const RACINE = fileURLToPath(new URL("..", import.meta.url));

/** The private folder for this tool. */
export function racinePrive() {
  const env = lireVariable("JEUX");
  return env && env.length > 0 ? env : join(RACINE, "..", "crusetra-jeux", "crusetra-routing");
}

/** The absolute path of a private file or folder, whether or not it exists. */
export function cheminPrive(rel) {
  return join(racinePrive(), rel);
}

/** True when the private file or folder is present. */
export function jeuPresent(rel) {
  return existsSync(cheminPrive(rel));
}

/** The reason a test names when it skips for a missing private set. */
export function raisonAbsent(rel) {
  return `private set absent: ${rel} (set CRUSETRA_JEUX or clone crusetra-jeux next to this repository)`;
}

/** The error a measure throws when it needs a set that is absent. */
export class JeuPriveAbsent extends Error {
  constructor(rel) {
    super(raisonAbsent(rel));
    this.name = "JeuPriveAbsent";
  }
}

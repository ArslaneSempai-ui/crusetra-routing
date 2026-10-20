/**
 * NO RECORD OF THIS CORPUS POINTS BACK TO A REAL PERSON (decision of 2026-10-21).
 *
 * The name was already one fixed token. What stayed could still find the person on the SDN list:
 * the OFAC uid, the date of birth, the place of birth, the passport and every other identity
 * number. Each becomes a value of the same shape, drawn at random once per record:
 *
 *   - the id becomes a case number;
 *   - every date gets a random day, month and year shift, the format kept (`12 Mar 1960`, `1960`);
 *   - every run of letters, digits and hyphens that holds a digit is redrawn character by character,
 *     a digit for a digit, a capital for a capital, outside the program segments
 *     (Executive Order, Secondary sanctions, Linked To), which name no person;
 *   - the place of birth keeps only the parts that are a country.
 *
 * The same draw is applied to the `birth` and `document` columns, so each expected answer is
 * still the value that sits in the text, and the measured rates do not move. The draw is
 * random on purpose: a seeded draw could be replayed against the public list.
 */
import { randomInt } from "node:crypto";

const MOIS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MOIS_RX = MOIS.join("|");
const DEBUT_MOIS = /^(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i;
const GARDE = /^(?:Secondary sanctions risk|Additional Sanctions Information|Transactions Prohibited|Linked To|Executive Order|a\.k\.a\.|f\.k\.a\.|n\.k\.a\.)/i;
const POB = /^((?:alt\. )?POB )(.*)$/s;

const PAYS = (() => {
  const noms = new Intl.DisplayNames(["en"], { type: "region" });
  const out = new Set();
  for (let a = 65; a < 91; a++) for (let b = 65; b < 91; b++) {
    const code = String.fromCharCode(a, b);
    try { const n = noms.of(code); if (n && n !== code) out.add(n); } catch { /* not a region */ }
  }
  return [...out];
})();
const estPays = (s) => PAYS.some((p) => new RegExp(`(^|[^A-Za-z])${p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}([^A-Za-z]|$)`).test(s));

const tirage = (alphabet) => alphabet[randomInt(alphabet.length)];
const CHIFFRES = "0123456789", MAJ = "ABCDEFGHIJKLMNOPQRSTUVWXYZ", MIN = "abcdefghijklmnopqrstuvwxyz";

/** One draw per record: the same original value always gets the same replacement inside it. */
export function tirageDuDossier() {
  const jours = new Map(), mois = new Map(), annees = new Map(), suites = new Map();
  const jour = (j) => {
    if (!jours.has(j)) { let n; do n = String(1 + randomInt(28)); while (n === String(Number(j))); jours.set(j, j.length === 2 ? n.padStart(2, "0") : n); }
    return jours.get(j);
  };
  const leMois = (m) => {
    if (!mois.has(m)) { let n; do n = MOIS[randomInt(12)]; while (n === m); mois.set(m, n); }
    return mois.get(m);
  };
  const annee = (a) => {
    if (!annees.has(a)) { let d; do d = randomInt(-6, 7); while (d === 0); annees.set(a, String(Number(a) + d)); }
    return annees.get(a);
  };
  const suite = (s) => {
    if (!suites.has(s)) {
      let n;
      do n = [...s].map((c) => (/\d/.test(c) ? tirage(CHIFFRES) : /[A-Z]/.test(c) ? tirage(MAJ) : /[a-z]/.test(c) ? tirage(MIN) : c)).join("");
      while (n === s || DEBUT_MOIS.test(n) !== DEBUT_MOIS.test(s) || /^id$/i.test(n.slice(0, 2)) !== /^id$/i.test(s.slice(0, 2)));
      suites.set(s, n);
    }
    return suites.get(s);
  };
  const RX = new RegExp(String.raw`\b(\d{1,2}) (${MOIS_RX}) (\d{4})\b|\b(${MOIS_RX}) (\d{4})\b|\b((?:19|20)\d{2})\b|(?:[A-Za-z0-9]+-)*[A-Za-z0-9]*\d[A-Za-z0-9]*(?:-[A-Za-z0-9]+)*`, "g");
  const valeurs = (s) => s.replace(RX, (m, j, mo, a, mo2, a2, a3) =>
    j ? `${jour(j)} ${leMois(mo)} ${annee(a)}` : mo2 ? `${leMois(mo2)} ${annee(a2)}` : a3 ? annee(a3) : suite(m));
  const segment = (seg) => {
    const tete = /^\s*(?:\[name removed\] — )?/.exec(seg)[0];
    const t = seg.slice(tete.length);
    if (GARDE.test(t)) return seg;
    const p = POB.exec(t);
    if (p) {
      const parts = p[2].replace(/[.]$/, "").split(",").map((x) => x.trim());
      const gardees = parts.map((x) => (estPays(x) ? x : "[place removed]"));
      const fin = p[2].endsWith(".") ? "." : "";
      return tete + p[1] + gardees.filter((x, i) => x !== "[place removed]" || gardees[i - 1] !== "[place removed]").join(", ") + fin;
    }
    return valeurs(seg);
  };
  return { valeurs, texte: (s) => s.split(";").map(segment).join(";") };
}

/** A row {id, text, birth, document, country} without any value that names a real person. */
export function sansIdentite(row, rang) {
  const t = tirageDuDossier();
  return {
    ...row,
    id: `OFAC-case-${String(rang + 1).padStart(3, "0")}`,
    text: t.texte(row.text),
    birth: row.birth ? t.valeurs(row.birth) : row.birth,
    document: row.document ? t.valeurs(row.document) : row.document,
  };
}

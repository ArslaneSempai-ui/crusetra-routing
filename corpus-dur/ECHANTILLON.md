# Sample of the hard corpus: 20 cases

The full hard corpus (four files, written by hand before any measurement) is private. This sample is
the only part left public. Each case is copied verbatim from the full file, with the readings it accepts.

Drawing rule, fixed and not hand-picked: for each of the four files, rank every item by the SHA-256 of
the string `crusetra-routing-jeux-2026-10-19:<file>:<item id>` and keep the first five. Items are the `###` cases, or the `## F<n>`
formulations for `formulations.md`.

Drawn: `cas-ambigus.md`: AM8, AM5, AM9, AM7, AM2 of 14; `documents-malformes.md`: O1, T1, E2, D1, E1 of 18; `ecritures-non-latines.md`: G3, A2, I2, G2, A3 of 12; `formulations.md`: F18, F10, F14, F2, F13 of 20.

## From `cas-ambigus.md` (14 items, 5 drawn)

### AM8 — where the surname starts

```
NETHERLANDS — RIJBEWIJS
Naam: JOHANNES VAN DER MEULEN
Geboren: 03.08.1962
Adres: Prinsengracht 271, Amsterdam
```

**Why ambiguous** — the tussenvoegsel `van der` is part of the surname in
everyday use and is conventionally dropped for alphabetisation, so "the surname"
has two established answers in the same country.

**Defensible readings** (again, only if the field is split)
- family name `VAN DER MEULEN`
- family name `MEULEN`, with `van der` recorded separately

**Against AM2** — both are surname-boundary cases and they fail differently: AM2
is under-determined by the document, AM8 is over-determined by two conventions
that both exist. A tier may handle one and not the other.

### AM5 — a two-digit year that could go either way

```
CANADA — HEALTH CARD (REPLACEMENT SLIP)
Holder: J. TREMBLAY
Born: 15.03.25
```

**Why ambiguous** — `25` could be `1925` or `2025`. Unlike a truncated date the
field is complete: two digits is the format, not damage.

**Defensible readings**
- `15 March 1925`
- `15 March 2025`

**Not defensible** — resolving it by plausibility ("nobody is 101") is an
inference from outside the document, and it is wrong often enough to matter on a
document type that is issued to newborns. A tier that returns `15.03.25` verbatim
satisfies both readings and is the best available answer.

### AM9 — one name, and nothing else

```
INDONESIA — KARTU TANDA PENDUDUK
Nama: SUHARTI
Tanggal lahir: 27.02.1971
Alamat: Jl. Melati 6, Yogyakarta
```

**Why ambiguous** — mononyms are ordinary in Indonesia. `SUHARTI` is the person's
entire name. But a `full name` field, and any consumer expecting two parts, has
to decide what the missing part is.

**Defensible readings**
- full name `SUHARTI`, and no surname exists — a blank in any surname field.
- full name `SUHARTI`, with `SUHARTI` repeated as the surname, which is what
  several official systems require.

**Not defensible** — refusing. The name is printed plainly and the document is
undamaged. This case is the counterweight to the refusal-heavy malformed file:
ambiguity about structure is not doubt about the value.

### AM7 — three countries, one field

```
IRELAND — PASSPORT
Surname: NOWAK
Given names: PIOTR
Date of birth: 12.05.1987
Place of birth: KRAKÓW, POLAND
Nationality: IRISH
```

**Why ambiguous** — the field is called `country` and the document offers three:
the issuing state, the nationality, and the country of birth. The field name does
not choose.

**Defensible readings**
- `IRELAND` — country of issue, the header of the document.
- `IRISH` / Ireland — nationality, the field explicitly labelled as such.
- `POLAND` — country of birth, if `country` is read as belonging with the
  person rather than with the document.

**The real finding** — this case says the field is under-specified in the method,
not that the document is unclear. `country` should be renamed before the next
audit. Until it is, all three score, and the per-tier distribution of which one
they pick is more informative than the accuracy number.

### AM2 — several surnames, no marker

```
BRAZIL — CARTEIRA DE IDENTIDADE
Nome: MARIA CARMEN DA SILVA SANTOS
Data de nascimento: 18/11/1984
```

**Why ambiguous** — Portuguese-language naming commonly carries two family names,
maternal before paternal, and `MARIA CARMEN` is a common compound given name. The
document marks no boundary.

**Defensible readings** — for a `full name` field, `MARIA CARMEN DA SILVA
SANTOS` verbatim is correct and unambiguous. The ambiguity bites only if the
field is split:
- given `MARIA CARMEN`, family `DA SILVA SANTOS`
- given `MARIA`, family `CARMEN DA SILVA SANTOS`
- given `MARIA CARMEN DA SILVA`, family `SANTOS` — a single-surname reading, with
  `DA SILVA` treated as part of the given names.

**How to score** — if the chain extracts `full name` whole, score verbatim only
and this case is easy. It is in this file because the moment anyone asks for a
surname column, three readings open at once, and that request usually arrives
after the corpus is frozen.

## From `documents-malformes.md` (18 items, 5 drawn)

### O1 — digit/letter confusion in a date

```
IRELAND — DRIVING LICENCE
Name: CIARA O'BRlEN
Date of birth: l5 JAN 197O
Address: 4 Marlborough Terrace, Galway
```

| field | answer |
|---|---|
| full name | CIARA O'BRIEN |
| date of birth | 15 JAN 1970 |
| document type | DRIVING LICENCE |
| country | IRELAND |
| address | 4 Marlborough Terrace, Galway |

**Why** — nothing here refuses. `O'BRlEN` has a lowercase `l` where `I` belongs;
`l5` is `15` because `l5` is not a number; `197O` is `1970` because `197O` is not
a year. Each has exactly one valid reading under a constraint the field already
carries, so recovery is correct and refusal is over-caution. This case is in the
file to keep the R-series honest: a tier tuned to refuse whenever it sees noise
will fail here, and that cost must be visible.

### T1 — cut mid-value, one reading survives

```
HELLENIC REPUBLIC — RESIDENCE PERMIT
Surname: KARAMANLI
Given name: NIKOLAOS
Date of birth: 03.11.19
```

| field | answer |
|---|---|
| full name | NIKOLAOS KARAMANLI |
| date of birth | **REFUSE** |
| document type | RESIDENCE PERMIT |
| country | HELLENIC REPUBLIC / Greece |
| address | **REFUSE** (absent, see M-series) |

**Why** — `03.11.19` could be a truncated `1900`–`1999` or a complete
two-digit-year date. Both readings are available and the document is cut, so the
value is unrecoverable rather than merely difficult. Returning `03.11.1919` or
`03.11.2019` is the expensive error. The name survives the cut intact and must
still be extracted: a tier that refuses the whole document because part of it is
damaged fails this case too, and that over-refusal is worth counting separately.

### E2 — double-encoded, not recoverable in one pass

```
ESPAÃƒÂ‘A â€” DOCUMENTO NACIONAL DE IDENTIDAD
Apellidos: MuÃƒÂ±oz Iglesias
Nombre: RaÃƒÂºl
Fecha de nacimiento: 15/08/1990
```

| field | answer |
|---|---|
| full name | Raúl Muñoz Iglesias |
| date of birth | 15/08/1990 |
| document type | DOCUMENTO NACIONAL DE IDENTIDAD | *accepted:* national identity document |
| country | ESPAÑA / Spain |
| address | **REFUSE** (absent) |

**Why** — the same corruption applied twice: `ÃƒÂ±` is `ñ` after two passes.
It is still deterministic, so it is still repairable and refusal is still wrong —
this case exists to test whether a tier stops after one pass and returns
`MuÃ±oz`, which is a wrong value dressed as a partial success. Against E1 it
separates "can decode mojibake" from "can tell how many times it was applied".

### D1 — two dates of birth, one document

```
ALBANIA — LETËRNJOFTIM
Emri: ARDIT HOXHA
Datëlindja: 06.02.1994
...
Data e lindjes: 06.02.1949
Adresa: Rruga e Durrësit 118, Tiranë
```

| field | answer |
|---|---|
| full name | ARDIT HOXHA |
| date of birth | **REFUSE** |
| document type | LETËRNJOFTIM | *accepted:* identity card |
| country | ALBANIA |
| address | Rruga e Durrësit 118, Tiranë |

**Why** — two labels, two values, no rule in the document for which governs.
`1994` and `1949` are a plausible transposition, which makes it tempting to pick
the first, or the more recent, or the one that looks less like a typo. All three
heuristics are inventions. **Refusal is correct, and a value plus a note is not a
refusal** — if the chain has a "flag for review" channel this is the case for it,
and if it does not, the blank is the channel.

### E1 — UTF-8 read as Latin-1, once

```
PORTUGUESE REPUBLIC â€” CARTÃƒO DE CIDADÃƒO
Nome: JoÃ£o SimÃµes
Data de nascimento: 27/03/1972
Morada: Rua das AmendoeiraÃ¬ 14, Ã‰vora
```

| field | answer |
|---|---|
| full name | João Simões |
| date of birth | 27/03/1972 |
| document type | CARTÃO DE CIDADÃO | *accepted:* citizen card |
| country | PORTUGUESE REPUBLIC / Portugal |
| address | **REFUSE** |

**Why** — classic mojibake, and it is deterministic: `Ã£` is `ã`, `Ãµ` is `õ`,
`Ã‰` is `É`. Where the mangling is reversible, the repaired value is the answer,
because there is exactly one reading — this is damage, not ambiguity. The address
refuses on a different ground: `AmendoeiraÃ¬` decodes to `Amendoeirà`, which is
not a Portuguese word form, so the mangling there is not a clean single pass and
the original cannot be recovered with confidence. One document, both verdicts.

## From `ecritures-non-latines.md` (12 items, 5 drawn)

### G3 — Greek with final sigma and accent stripping

```
ΑΔΕΙΑ ΔΙΑΜΟΝΗΣ
Ονοματεπώνυμο: Κωνσταντίνος Στεφανίδης
Γεννηθείς: 30/11/1966
Χώρα έκδοσης: Ελλάδα
Οδός: Αγίου Δημητρίου 7, Θεσσαλονίκη 54633
```

| field | answer | accepted alternative |
|---|---|---|
| full name | Κωνσταντίνος Στεφανίδης | — |
| date of birth | 30/11/1966 | — |
| document type | ΑΔΕΙΑ ΔΙΑΜΟΝΗΣ | residence permit |
| country | Ελλάδα | Greece |
| address | Αγίου Δημητρίου 7, Θεσσαλονίκη 54633 | — |

**What it tests** — two failure modes that look identical in an ASCII-normalised
score and are not. Stripping the tonos (`Κωνσταντινος`) is a wrong answer under
rule 1. Uppercasing the name changes final sigma `ς` to `Σ` — also wrong under
rule 1, and it is the one case where a tier "improving" the formatting produces a
value that no longer matches the document. Record which of the two occurred; a
scorer that folds case and accents will report both as correct and this case will
have measured nothing.

### A2 — Arabic with Latin machine-readable zone

```
المملكة الأردنية الهاشمية — جواز سفر
الاسم: ليلى عبد الرحمن الخطيب
تاريخ الميلاد: ٠٩/٠٢/١٩٩٥
العنوان: حي الصويفية، عمّان
P<JORALKHATIB<<LAYLA<ABDALRAHMAN<<<<<<<<<<<<
```

| field | answer | accepted alternative |
|---|---|---|
| full name | ليلى عبد الرحمن الخطيب | LAYLA ABDALRAHMAN ALKHATIB |
| date of birth | ٠٩/٠٢/١٩٩٥ | — |
| document type | جواز سفر | passport |
| country | المملكة الأردنية الهاشمية | Jordan |
| address | حي الصويفية، عمّان | — |

**What it tests** — rule 2 where the transliteration is machine-generated and
lossy. The MRZ prints the name but not the date in Latin form, so the accepted
alternative exists for one field and not the other. A tier that reads only the
MRZ scores one field and misses four; a tier that reads only the Arabic scores
five. Which one a cheap tier does is worth knowing before choosing it. Note the
shadda in `عمّان` — dropping it is a wrong answer under rule 1.

### I2 — Japanese, spaced name, era-free date

```
日本国 運転免許証
氏名：山田 太郎
生年月日：1975年10月8日
住所：東京都渋谷区神南1-19-11
```

| field | answer | accepted alternative |
|---|---|---|
| full name | 山田 太郎 | 山田太郎 |
| date of birth | 1975年10月8日 | — |
| document type | 運転免許証 | driving licence |
| country | 日本国 | Japan |
| address | 東京都渋谷区神南1-19-11 | — |

**What it tests** — the ideographic space (U+3000) between family and given name.
It is a real character, it is not an ASCII space, and it is the only structural
hint the string carries. Both the spaced and unspaced forms are accepted because
the space is presentational; substituting an ASCII space is also accepted under
that reasoning, which is a choice this file makes explicit rather than leaving to
the scorer. Against I1, this pair separates "handles CJK" from "handles the
particular conventions of one CJK language".

### G2 — Greek with printed Latin transliteration

```
ΕΛΛΗΝΙΚΗ ΔΗΜΟΚΡΑΤΙΑ — ΔΙΑΒΑΤΗΡΙΟ / PASSPORT
Επώνυμο / Surname: ΒΛΑΧΟΓΙΑΝΝΗΣ / VLACHOGIANNIS
Όνομα / Given name: ΘΑΝΑΣΗΣ / THANASIS
Ημ. γέννησης / Date of birth: 02 ΜΑΡ / MAR 1979
Διεύθυνση: Λεωφ. Κηφισίας 210, Μαρούσι
```

| field | answer | accepted alternative |
|---|---|---|
| full name | ΘΑΝΑΣΗΣ ΒΛΑΧΟΓΙΑΝΝΗΣ | THANASIS VLACHOGIANNIS |
| date of birth | 02 ΜΑΡ 1979 | 02 MAR 1979 |
| document type | ΔΙΑΒΑΤΗΡΙΟ | PASSPORT / passport |
| country | ΕΛΛΗΝΙΚΗ ΔΗΜΟΚΡΑΤΙΑ | Greece |
| address | Λεωφ. Κηφισίας 210, Μαρούσι | — |

**What it tests** — rule 2, and the trap inside it. Both name forms are printed,
so both score. But the address is printed **only** in Greek, so the accepted
alternative column is empty there: a tier that transliterates consistently gets
four fields right and the address wrong. That per-field split is the finding —
an aggregate rate would show a plausible 80% and conceal the mechanism.

### A3 — Arabic with an embedded Latin fragment

```
تصريح إقامة — RESIDENCE PERMIT
الاسم: يوسف بن علي
تاريخ الميلاد: 1990-12-03
رقم الوثيقة: JO-2291-B
العنوان: 12 Rue de Paris، تونس
```

| field | answer | accepted alternative |
|---|---|---|
| full name | يوسف بن علي | — |
| date of birth | 1990-12-03 | — |
| document type | تصريح إقامة | RESIDENCE PERMIT / residence permit |
| country | تونس | Tunisia |
| address | 12 Rue de Paris، تونس | — |

**What it tests** — bidirectional text with genuinely mixed content. The date is
in Latin digits *in the document*, so under rule 5 the Latin form is the answer
here and the Arabic form would be wrong — the mirror image of A1, and the pair
exists to catch a tier that has learned to convert in one direction only. The
address mixes a Latin street with an Arabic city and an Arabic comma; an
extractor that slices by position will split it in the wrong place, and the
symptom is a truncated address rather than an empty one.

## From `formulations.md` (20 items, 5 drawn)

## F18 — instruction in Greek

*Parent: F1. Axis K (instruction language): English → Greek.*

```
Εξαγάγετε τα εξής πέντε πεδία από το παρακάτω έγγραφο: ονοματεπώνυμο,
ημερομηνία γέννησης, τύπος εγγράφου, χώρα και διεύθυνση.

Έγγραφο:
{document}
```

**A failure here and not in F1** is not one finding but two, and they must be
separated: the tier may have understood the instruction and answered in Greek
(a scoring problem), or not understood it (an extraction problem). Record the
language of the output alongside the score, or this formulation is
uninterpretable. It is in the set because the documents that actually arrive are
read by people working in Greek.

## F10 — missing field: leave empty

*Parent: F1. Axis E (missing-field rule): none → leave empty.*

```
Extract these five fields from the document below: full name, date of birth,
document type, country, and address.

If a field does not appear in the document, leave its value empty.

Document:
{document}
```

**A failure here and not in F1** would be surprising and worth investigating
directly. The interesting comparison is not failure but the *shape* of failure:
this formulation should shift errors from wrong toward blank, which §6 of the
method treats as a different and cheaper kind of error. Report the blank/wrong
split for F1, F10 and F11 side by side — that comparison is the point of the
axis.

## F14 — role framing

*Parent: F1. Axis G (role): absent → present.*

```
You are a document analyst who reads identity and travel documents and records
what they contain.

Extract these five fields from the document below: full name, date of birth,
document type, country, and address.

Document:
{document}
```

**A failure here and not in F1** would say the persona changed behaviour, and
the direction matters: a "document analyst" may become more cautious about
partial evidence, which improves the wrong/blank split while lowering raw
accuracy. Read this one against §6 rather than against the headline rate.

## F2 — terse

*Parent: F1. Axis A (length): medium → terse.*

```
Extract: full name, date of birth, document type, country, address.

{document}
```

**A failure here and not in F1** says the model needed the sentence frame, not
the field list — the task was under-specified rather than mis-specified. Watch
for output that is a bare list of values with no field labels, which is a
formatting failure masquerading as an extraction failure.

## F13 — table

*Parent: F1. Axis F (presentation): prose → table.*

```
Fill in the value column from the document below.

| field          | value |
|----------------|-------|
| full name      |       |
| date of birth  |       |
| document type  |       |
| country        |       |
| address        |       |

Document:
{document}
```

**Against F12**, this separates enumeration from tabulation. A table also
supplies an implicit output format without saying so, which makes F13 partly an
axis-D variant — declared here rather than discovered later. If F13 and F8 move
together, that shared format effect is the explanation.

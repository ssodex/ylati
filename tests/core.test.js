import test from "node:test";
import assert from "node:assert/strict";
import {
  normalize,
  judge,
  parseImport,
  makeCard,
  pickCard,
  choicesFor,
  initialState,
  validateState,
  dayKey,
} from "../core.js";
test("normalizace velikosti, mezer a Unicode", () => {
  assert.equal(normalize("  BUON   giorno  "), "buon giorno");
  assert.equal(judge(" CAFÉ ", "café"), "correct");
  assert.equal(judge("  GRAZIE  ", "grazie"), "correct");
});
test("překlep je skoro, odlišná odpověď je chyba", () => {
  assert.equal(judge("grrazie", "grazie"), "almost");
  assert.equal(judge("graze", "grazie"), "almost");
  assert.equal(judge("pizza", "grazie"), "wrong");
  assert.equal(judge("si", "sì"), "wrong");
  assert.equal(judge("", "grazie"), "wrong");
});
test("import: CRLF, kódový blok, kategorie, duplikáty a vadné řádky", () => {
  const parsed = parseImport(
    "```text\r\nciao | ahoj | základní\r\nGRAZIE | Děkuji\r\n | špatné\r\npizza | pizza | jídlo | navíc\r\nciao | ahoj\r\n```",
    [makeCard("grazie", "děkuji")],
  );
  assert.equal(parsed.cards.length, 1);
  assert.equal(parsed.cards[0].category, "základní");
  assert.equal(parsed.duplicates, 2);
  assert.deepEqual(parsed.errors, [4, 5]);
});
test("problémové kartičky se vybírají častěji, předchozí se vynechá", () => {
  const easy = { ...makeCard("a", "A"), rating: "good" },
    hard = { ...makeCard("b", "B"), rating: "again" };
  let hardCount = 0;
  for (let i = 0; i < 800; i++)
    if (pickCard([easy, hard], null, () => i / 800).id === hard.id) hardCount++;
  assert.equal(hardCount, 700);
  assert.equal(pickCard([easy, hard], hard.id).id, easy.id);
  assert.equal(pickCard([]), null);
  assert.equal(pickCard([hard], hard.id).id, hard.id);
});
test("výběr neobsahuje stejné překlady ani chybné možnosti", () => {
  const a = makeCard("ciao", "ahoj");
  const options = choicesFor(
    a,
    [a, makeCard("salve", "AHOJ"), makeCard("grazie", "děkuji")],
    "cs",
  );
  assert.equal(options.length, 2);
  assert.ok(options.includes("ahoj"));
  assert.equal(new Set(options.map(normalize)).size, 2);
});
test("záloha zachová stav a odmítne poškozená data", () => {
  const state = initialState();
  assert.deepEqual(validateState(JSON.parse(JSON.stringify(state))), state);
  assert.throws(() => validateState({ ...state, version: 5 }));
  assert.throws(() =>
    validateState({ ...state, cards: [state.cards[0], state.cards[0]] }),
  );
  assert.throws(() => validateState({ ...state, history: [{ time: NaN }] }));
  assert.equal(
    validateState({ version: 1, cards: [], history: [] }).cards.length,
    0,
  );
});
test("den se počítá podle místního času", () =>
  assert.equal(dayKey(new Date(2026, 9, 7, 0, 30).getTime()), "2026-10-07"));

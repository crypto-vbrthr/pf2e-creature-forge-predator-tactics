import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { LIBRARY_ID, MODULE_ID, MODULE_VERSION, PREDATOR_ABILITIES, PREDATOR_TACTICS_LIBRARY } from "../scripts/content.js";

const root = new URL("../", import.meta.url);
const readJson = (path) => JSON.parse(fs.readFileSync(new URL(path, root), "utf8"));

test("library has stable metadata and 25 abilities", () => {
  assert.equal(PREDATOR_TACTICS_LIBRARY.id, LIBRARY_ID);
  assert.equal(PREDATOR_TACTICS_LIBRARY.moduleId, MODULE_ID);
  assert.equal(PREDATOR_TACTICS_LIBRARY.version, MODULE_VERSION);
  assert.equal(PREDATOR_ABILITIES.length, 25);
});

test("ability ids and families are structurally safe", () => {
  const ids = new Set();
  for (const ability of PREDATOR_ABILITIES) {
    assert.match(ability.id, /^pf2e-creature-forge-predator-tactics\.ability\./);
    assert.ok(!ids.has(ability.id), `duplicate id: ${ability.id}`);
    ids.add(ability.id);
    assert.ok(ability.family);
    assert.ok(["action", "reaction", "free", "passive"].includes(ability.abilityType));
    if (ability.abilityType === "action") assert.ok([1, 2, 3].includes(ability.actionCost));
    assert.ok(Number.isFinite(ability.powerCost));
    assert.ok(ability.powerCost >= 1 && ability.powerCost <= 3);
  }
});

test("all ability localization keys exist in German and English", () => {
  const en = readJson("lang/en.json");
  const de = readJson("lang/de.json");
  for (const ability of PREDATOR_ABILITIES) {
    assert.ok(en[ability.nameKey], ability.nameKey);
    assert.ok(en[ability.descriptionKey], ability.descriptionKey);
    assert.ok(de[ability.nameKey], ability.nameKey);
    assert.ok(de[ability.descriptionKey], ability.descriptionKey);
  }
  assert.ok(en[PREDATOR_TACTICS_LIBRARY.labelKey]);
  assert.ok(de[PREDATOR_TACTICS_LIBRARY.labelKey]);
});

test("localization has no parent-child string collisions", () => {
  for (const lang of ["en", "de"]) {
    const data = readJson(`lang/${lang}.json`);
    const keys = Object.keys(data);
    for (const key of keys) {
      assert.ok(!keys.some((candidate) => candidate !== key && candidate.startsWith(`${key}.`)), `${lang}: ${key}`);
    }
  }
});

test("manifest and package versions agree", () => {
  const manifest = readJson("module.json");
  const pkg = readJson("package.json");
  assert.equal(manifest.version, MODULE_VERSION);
  assert.equal(pkg.version, MODULE_VERSION);
  assert.equal(manifest.id, MODULE_ID);
});


test("Ambush & Hunt review keeps the first five abilities mechanically explicit", () => {
  const bySlug = new Map(PREDATOR_ABILITIES.map((ability) => [ability.slug, ability]));
  const ambush = bySlug.get("ambush-rush");
  assert.equal(ambush.family, "pounce");
  assert.equal(ambush.actionCost, 2);
  assert.equal(ambush.powerCost, 3);
  assert.ok(ambush.tags.includes("off-guard"));

  const drag = bySlug.get("drag-down");
  assert.equal(drag.actionCost, 2);
  assert.ok(drag.tags.includes("trip"));
  assert.ok(drag.tags.includes("athletics"));

  const hamstring = bySlug.get("hamstring");
  assert.deepEqual(hamstring.applications, [{ type: "effect", ref: "pf2e-creature-forge.effect.hampered-10", target: "target", timing: "on-hit" }]);

  const blood = bySlug.get("blood-scent");
  assert.equal(blood.abilityType, "passive");

  const wounded = bySlug.get("wounded-quarry");
  assert.equal(wounded.powerCost, 2);
  assert.ok(wounded.tags.includes("attack-bonus"));
});

test("Ambush & Hunt localization contains concrete PF2e rule vocabulary", () => {
  const en = readJson("lang/en.json");
  const de = readJson("lang/de.json");
  assert.match(en["PF2E_CF_PREDATOR.Ability.AmbushRush.Description"], /hidden or undetected/);
  assert.match(en["PF2E_CF_PREDATOR.Ability.DragDown.Description"], /multiple attack penalty/);
  assert.match(en["PF2E_CF_PREDATOR.Ability.BloodScent.Description"], /imprecise scent/);
  assert.match(en["PF2E_CF_PREDATOR.Ability.WoundedQuarry.Description"], /circumstance bonus/);
  assert.match(de["PF2E_CF_PREDATOR.Ability.AmbushRush.Description"], /verborgen oder unentdeckt/);
  assert.match(de["PF2E_CF_PREDATOR.Ability.DragDown.Description"], /Malus für Mehrfachangriffe/);
  assert.match(de["PF2E_CF_PREDATOR.Ability.BloodScent.Description"], /ungenauen Geruchssinn/);
  assert.match(de["PF2E_CF_PREDATOR.Ability.WoundedQuarry.Description"], /Situationsbonus von \+1/);
});

test("interactive Predator abilities declare executable PF2e actions or GM chat requests", () => {
  const bySlug = new Map(PREDATOR_ABILITIES.map((ability) => [ability.slug, ability]));
  assert.deepEqual(bySlug.get("drag-down").interactions, [{ kind: "action", slug: "trip", mode: "inline" }]);
  assert.equal(bySlug.get("latching-bite").interactions[0].defense, "fortitude");
  assert.equal(bySlug.get("crushing-grip").interactions[0].statistic, "athletics");
  assert.equal(bySlug.get("territorial-challenge").interactions[0].dcRank, "high");
  assert.equal(bySlug.get("territorial-challenge").interactions[0].mode, "chat");
  assert.equal(bySlug.get("herd-the-prey").interactions[0].statistic, "reflex");
  assert.equal(bySlug.get("herd-the-prey").interactions[0].showDC, "gm");
});

test("interaction localization keys exist in German and English", () => {
  const en = readJson("lang/en.json");
  const de = readJson("lang/de.json");
  for (const ability of PREDATOR_ABILITIES) {
    for (const interaction of ability.interactions ?? []) {
      for (const key of [interaction.labelKey, interaction.requestLabelKey].filter(Boolean)) {
        assert.ok(en[key], `en: ${key}`);
        assert.ok(de[key], `de: ${key}`);
      }
    }
  }
});

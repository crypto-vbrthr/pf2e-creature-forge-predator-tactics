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

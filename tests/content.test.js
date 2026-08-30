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

test("Positioning & Pack Tactics review gives the reviewed block concrete geometry rules", () => {
  const bySlug = new Map(PREDATOR_ABILITIES.map((ability) => [ability.slug, ability]));

  const circling = bySlug.get("circling-predator");
  assert.equal(circling.actionCost, 1);
  assert.equal(circling.powerCost, 2);
  assert.ok(circling.tags.includes("step"));
  assert.ok(circling.tags.includes("flanking"));
  assert.deepEqual(circling.applications, []);

  const isolation = bySlug.get("isolation-hunter");
  assert.equal(isolation.abilityType, "passive");
  assert.equal(isolation.powerCost, 2);
  assert.ok(isolation.tags.includes("off-guard"));
  assert.deepEqual(isolation.applications, []);

  const collapse = bySlug.get("pack-collapse");
  assert.equal(collapse.family, "pack-hunter");
  assert.equal(collapse.actionCost, 2);
  assert.equal(collapse.powerCost, 3);
  assert.deepEqual(collapse.applications, [{ type: "effect", ref: "pf2e-creature-forge.effect.off-guard", target: "target", timing: "on-hit" }]);

  const fade = bySlug.get("flank-and-fade");
  assert.equal(fade.abilityType, "reaction");
  assert.ok(fade.tags.includes("step"));
  assert.ok(fade.tags.includes("flanking"));

  const herd = bySlug.get("herd-the-prey");
  assert.ok(herd.tags.includes("forced-movement"));
  assert.deepEqual(herd.applications, []);
  assert.equal(herd.interactions[0].statistic, "reflex");
  assert.equal(herd.interactions[0].mode, "chat");

  const bounding = bySlug.get("bounding-reposition");
  assert.equal(bounding.powerCost, 2);
  assert.ok(bounding.tags.includes("leap"));
  assert.ok(bounding.tags.includes("reaction-safe"));

  const exchange = bySlug.get("predators-exchange");
  assert.equal(exchange.abilityType, "reaction");
  assert.ok(exchange.tags.includes("step"));
  assert.ok(exchange.tags.includes("flanking"));
});

test("Positioning & Pack Tactics localization uses Step, flanking, and forced-movement terminology", () => {
  const en = readJson("lang/en.json");
  const de = readJson("lang/de.json");
  assert.match(en["PF2E_CF_PREDATOR.Ability.CirclingPredator.Description"], /Steps up to 10 feet/);
  assert.match(en["PF2E_CF_PREDATOR.Ability.IsolationHunter.Description"], /Isolated creatures are off-guard/);
  assert.match(en["PF2E_CF_PREDATOR.Ability.PackCollapse.Description"], /flanking the target/);
  assert.match(en["PF2E_CF_PREDATOR.Ability.FlankAndFade.Description"], /Trigger/);
  assert.match(en["PF2E_CF_PREDATOR.Ability.HerdThePrey.Description"], /forced movement/);
  assert.match(en["PF2E_CF_PREDATOR.Ability.BoundingReposition.Description"], /doesn't trigger reactions/);
  assert.match(de["PF2E_CF_PREDATOR.Ability.CirclingPredator.Description"], /Schritt/);
  assert.match(de["PF2E_CF_PREDATOR.Ability.IsolationHunter.Description"], /isoliert/);
  assert.match(de["PF2E_CF_PREDATOR.Ability.PackCollapse.Description"], /flankieren/);
  assert.match(de["PF2E_CF_PREDATOR.Ability.FlankAndFade.Description"], /Auslöser/);
  assert.match(de["PF2E_CF_PREDATOR.Ability.HerdThePrey.Description"], /Erzwungene Bewegung/);
  assert.match(de["PF2E_CF_PREDATOR.Ability.BoundingReposition.Description"], /keine Reaktionen/);
});


test("rules-text clarity pass makes previously ambiguous abilities operationally explicit", () => {
  const en = readJson("lang/en.json");
  const de = readJson("lang/de.json");

  assert.match(en["PF2E_CF_PREDATOR.Ability.RakeTheFallen.Description"], /Any prone creature/);
  assert.match(en["PF2E_CF_PREDATOR.Ability.RakeTheFallen.Description"], /not triggered/);
  assert.match(de["PF2E_CF_PREDATOR.Ability.RakeTheFallen.Description"], /beliebige liegende Kreatur/);
  assert.match(de["PF2E_CF_PREDATOR.Ability.RakeTheFallen.Description"], /weder durch das Hinfallen noch durch das Aufstehen/);

  for (const key of ["RelentlessPursuit", "CorneredFury", "ShadowTheQuarry", "SavageReversal"]) {
    assert.match(en[`PF2E_CF_PREDATOR.Ability.${key}.Description`], /Trigger/);
    assert.match(de[`PF2E_CF_PREDATOR.Ability.${key}.Description`], /Auslöser/);
  }

  assert.match(en["PF2E_CF_PREDATOR.Ability.SuddenBurst.Description"], /Frequency once per encounter/);
  assert.match(de["PF2E_CF_PREDATOR.Ability.SuddenBurst.Description"], /Häufigkeit Einmal pro Begegnung/);
  assert.match(en["PF2E_CF_PREDATOR.Ability.FinishTheHunt.Description"], /at or below half its maximum Hit Points/);
  assert.match(de["PF2E_CF_PREDATOR.Ability.FinishTheHunt.Description"], /höchstens der Hälfte ihrer maximalen Trefferpunkte/);
});

test("Pursuit & Mobility review gives pursuit abilities explicit timing and non-overlapping families", () => {
  const bySlug = new Map(PREDATOR_ABILITIES.map((ability) => [ability.slug, ability]));
  const pursuit = bySlug.get("relentless-pursuit");
  const shadow = bySlug.get("shadow-the-quarry");
  assert.equal(pursuit.family, "predator-pursuit");
  assert.equal(shadow.family, "predator-pursuit");
  assert.deepEqual(pursuit.interactions, [{ kind: "action", slug: "stride", mode: "inline" }]);
  assert.deepEqual(shadow.interactions, [{ kind: "action", slug: "sneak", mode: "inline" }]);

  const burst = bySlug.get("sudden-burst");
  assert.equal(burst.abilityType, "free");
  assert.deepEqual(burst.interactions, [{ kind: "action", slug: "stride", mode: "inline" }]);

  const patience = bySlug.get("stalkers-patience");
  assert.ok(patience.tags.includes("avoid-notice"));
  assert.deepEqual(patience.interactions, [{ kind: "action", slug: "avoid-notice", mode: "inline" }]);
});

test("Pursuit & Mobility localization states triggers, Step safety, Avoid Notice, and Sneak requirements", () => {
  const en = readJson("lang/en.json");
  const de = readJson("lang/de.json");

  assert.match(en["PF2E_CF_PREDATOR.Ability.RelentlessPursuit.Description"], /After the triggering movement is fully resolved/);
  assert.match(de["PF2E_CF_PREDATOR.Ability.RelentlessPursuit.Description"], /Nachdem die auslösende Bewegung vollständig abgehandelt wurde/);
  assert.match(en["PF2E_CF_PREDATOR.Ability.CorneredFury.Description"], /can't be triggered by Step/);
  assert.match(de["PF2E_CF_PREDATOR.Ability.CorneredFury.Description"], /nicht durch Schritt/);
  assert.match(en["PF2E_CF_PREDATOR.Ability.SuddenBurst.Description"], /not in the middle of resolving another action or activity/);
  assert.match(de["PF2E_CF_PREDATOR.Ability.SuddenBurst.Description"], /nicht mitten während der Abhandlung/);
  assert.match(en["PF2E_CF_PREDATOR.Ability.StalkersPatience.Description"], /Avoid Notice/);
  assert.match(de["PF2E_CF_PREDATOR.Ability.StalkersPatience.Description"], /Unbemerkt nähern/);
  assert.match(en["PF2E_CF_PREDATOR.Ability.ShadowTheQuarry.Description"], /hidden or undetected/);
  assert.match(en["PF2E_CF_PREDATOR.Ability.ShadowTheQuarry.Description"], /cover or concealment/);
  assert.match(de["PF2E_CF_PREDATOR.Ability.ShadowTheQuarry.Description"], /verborgen oder unentdeckt/);
  assert.match(de["PF2E_CF_PREDATOR.Ability.ShadowTheQuarry.Description"], /Deckung oder Tarnung/);
});


test("Finishers & Brutality review limits overlap and tightens high-impact action economy", () => {
  const bySlug = new Map(PREDATOR_ABILITIES.map((ability) => [ability.slug, ability]));

  const latch = bySlug.get("latching-bite");
  assert.equal(latch.actionCost, 2);
  assert.equal(latch.family, "predator-grapple-opener");
  assert.ok(latch.synergy.provides.includes("grapple-control"));

  for (const slug of ["rake-the-fallen", "cull-the-weak", "finish-the-hunt"]) {
    assert.equal(bySlug.get(slug).family, "predator-finisher", slug);
    assert.equal(bySlug.get(slug).powerCost, 2, slug);
  }
  assert.equal(bySlug.get("rake-the-fallen").actionCost, 1);
  assert.equal(bySlug.get("finish-the-hunt").actionCost, 1);

  const grip = bySlug.get("crushing-grip");
  assert.equal(grip.actionCost, 1);
  assert.ok(grip.synergy.prefers.includes("grapple-control"));

  assert.equal(bySlug.get("savage-reversal").family, "predator-counter");
  assert.equal(bySlug.get("apex-instinct").family, "predator-initiative");
  assert.equal(bySlug.get("stalkers-patience").family, "predator-initiative");
  assert.equal(bySlug.get("apex-instinct").powerCost, 2);
});

test("Finishers & Brutality localization states frequency, MAP, release risk, and opening-round payoff", () => {
  const en = readJson("lang/en.json");
  const de = readJson("lang/de.json");

  assert.match(en["PF2E_CF_PREDATOR.Ability.LatchingBite.Description"], /multiple attack penalty/);
  assert.match(en["PF2E_CF_PREDATOR.Ability.LatchingBite.Description"], /critical success/);
  assert.match(de["PF2E_CF_PREDATOR.Ability.LatchingBite.Description"], /Malus für Mehrfachangriffe/);
  assert.match(de["PF2E_CF_PREDATOR.Ability.LatchingBite.Description"], /Kritischen Erfolg/);

  for (const key of ["RakeTheFallen", "FinishTheHunt"]) {
    assert.match(en[`PF2E_CF_PREDATOR.Ability.${key}.Description`], /Frequency once per round/);
    assert.match(de[`PF2E_CF_PREDATOR.Ability.${key}.Description`], /Häufigkeit Einmal pro Runde/);
  }

  assert.match(en["PF2E_CF_PREDATOR.Ability.CullTheWeak.Description"], /circumstance bonus to damage rolls/);
  assert.match(de["PF2E_CF_PREDATOR.Ability.CullTheWeak.Description"], /Situationsbonus von \+2 auf Schadenswürfe/);
  assert.match(en["PF2E_CF_PREDATOR.Ability.CrushingGrip.Description"], /critical failure/);
  assert.match(de["PF2E_CF_PREDATOR.Ability.CrushingGrip.Description"], /Kritischen Fehlschlag/);
  assert.match(en["PF2E_CF_PREDATOR.Ability.SavageReversal.Description"], /doesn't trigger reactions/);
  assert.match(de["PF2E_CF_PREDATOR.Ability.SavageReversal.Description"], /keine durch Bewegung ausgelösten Reaktionen/);
  assert.match(en["PF2E_CF_PREDATOR.Ability.ApexInstinct.Description"], /off-guard/);
  assert.match(de["PF2E_CF_PREDATOR.Ability.ApexInstinct.Description"], /Auf dem Falschen Fuß/);
});

test("release-candidate density hints keep the 25-ability pool from clustering too aggressively", () => {
  const sharedDensityTags = ["predator-library-density", "predator-library-balance", "predator-library-mix"];
  for (const ability of PREDATOR_ABILITIES) {
    for (const tag of sharedDensityTags) {
      assert.ok(ability.tags.includes(tag), `${ability.slug}: missing ${tag}`);
      assert.ok(ability.synergy?.conflicts?.includes(tag), `${ability.slug}: missing conflict ${tag}`);
    }
    if (ability.abilityType === "passive") {
      assert.ok(ability.tags.includes("predator-passive-density"), ability.slug);
      assert.ok(ability.synergy?.conflicts?.includes("predator-passive-density"), ability.slug);
    }
    if (ability.abilityType === "reaction") {
      assert.ok(ability.tags.includes("predator-reaction-density"), ability.slug);
      assert.ok(ability.synergy?.conflicts?.includes("predator-reaction-density"), ability.slug);
    }
  }
});

test("release-candidate clarity fixes align Ambush Rush, Territorial Challenge, and Predator's Exchange with their mechanics", () => {
  const bySlug = new Map(PREDATOR_ABILITIES.map((ability) => [ability.slug, ability]));
  assert.deepEqual(bySlug.get("ambush-rush").interactions, [{ kind: "action", slug: "stride", mode: "inline" }]);
  assert.ok(bySlug.get("territorial-challenge").traits.includes("auditory"));

  const en = readJson("lang/en.json");
  const de = readJson("lang/de.json");
  assert.match(en["PF2E_CF_PREDATOR.Ability.AmbushRush.Description"], /Strides up to twice/);
  assert.match(de["PF2E_CF_PREDATOR.Ability.AmbushRush.Description"], /bis zu zweimal Laufen/);
  assert.match(en["PF2E_CF_PREDATOR.Ability.TerritorialChallenge.Description"], /can hear/);
  assert.match(de["PF2E_CF_PREDATOR.Ability.TerritorialChallenge.Description"], /hören kann/);
  assert.doesNotMatch(en["PF2E_CF_PREDATOR.Ability.PredatorsExchange.Description"], /threaten/i);
  assert.match(en["PF2E_CF_PREDATOR.Ability.PredatorsExchange.Description"], /within melee reach/);
  assert.match(de["PF2E_CF_PREDATOR.Ability.PredatorsExchange.Description"], /Nahkampfreichweite/);
});

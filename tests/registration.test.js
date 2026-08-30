import test from "node:test";
import assert from "node:assert/strict";
import { PREDATOR_TACTICS_LIBRARY } from "../scripts/content.js";

const CORE_EFFECTS = new Set([
  "pf2e-creature-forge.effect.frightened-1",
  "pf2e-creature-forge.effect.hampered-10",
  "pf2e-creature-forge.effect.off-guard",
  "pf2e-creature-forge.effect.enfeebled-1",
  "pf2e-creature-forge.effect.quickened-step"
]);

test("all referenced effect dependencies are part of the stable Creature Forge core surface used by the pack", () => {
  for (const ability of PREDATOR_TACTICS_LIBRARY.content.abilities) {
    for (const application of ability.applications ?? []) {
      if (application.type !== "effect") continue;
      assert.ok(CORE_EFFECTS.has(application.ref), `${ability.id} -> ${application.ref}`);
    }
  }
});

test("selection filters use only Creature Forge 1.x query fields", () => {
  const allowed = new Set(["categories", "requiredSubtypes", "anySubtypes", "subtypes", "roles", "minimumLevel", "maximumLevel"]);
  for (const ability of PREDATOR_TACTICS_LIBRARY.content.abilities) {
    for (const key of Object.keys(ability.selection ?? {})) assert.ok(allowed.has(key), `${ability.id}: ${key}`);
  }
});

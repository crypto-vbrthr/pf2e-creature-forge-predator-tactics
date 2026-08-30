export const MODULE_ID = "pf2e-creature-forge-predator-tactics";
export const MODULE_VERSION = "0.1.0-dev.3";
export const LIBRARY_ID = `${MODULE_ID}.predator-tactics`;

const CORE_EFFECT = Object.freeze({
  frightened1: "pf2e-creature-forge.effect.frightened-1",
  hampered10: "pf2e-creature-forge.effect.hampered-10",
  offGuard: "pf2e-creature-forge.effect.off-guard",
  enfeebled1: "pf2e-creature-forge.effect.enfeebled-1",
  quickenedStep: "pf2e-creature-forge.effect.quickened-step"
});

const ability = (slug, key, extra = {}) => ({
  id: `${MODULE_ID}.ability.${slug}`,
  slug,
  nameKey: `PF2E_CF_PREDATOR.Ability.${key}.Name`,
  descriptionKey: `PF2E_CF_PREDATOR.Ability.${key}.Description`,
  abilityType: extra.abilityType ?? "action",
  actionCost: extra.actionCost ?? (extra.abilityType === "reaction" || extra.abilityType === "free" || extra.abilityType === "passive" ? null : 1),
  category: extra.category ?? "offensive",
  family: extra.family ?? slug,
  uniquePerCreature: extra.uniquePerCreature ?? true,
  powerCost: extra.powerCost,
  baseWeight: extra.baseWeight ?? 60,
  traits: extra.traits ?? [],
  tags: ["predator", "predator-tactics", ...(extra.tags ?? [])],
  selection: extra.selection ?? {},
  synergy: extra.synergy ?? {},
  applications: extra.applications ?? [],
  mechanics: extra.mechanics ?? null,
  interactions: extra.interactions ?? [],
  shareToChat: extra.shareToChat !== false,
  img: extra.img ?? "systems/pf2e/icons/actions/OneAction.webp"
});

const PREDATOR_CATEGORIES = ["animal", "beast", "dragon", "aberration", "fiend", "fey"];
const PHYSICAL_PREDATORS = ["animal", "beast", "dragon", "fiend", "giant", "humanoid"];
const HUNTER_ROLES = ["skirmisher", "brute", "soldier", "sniper", "skillParagon", "custom"];

export const PREDATOR_ABILITIES = Object.freeze([
  ability("ambush-rush", "AmbushRush", {
    actionCost: 2, powerCost: 3, family: "pounce", baseWeight: 90,
    tags: ["ambush", "movement", "strike", "off-guard"],
    selection: { categories: PREDATOR_CATEGORIES, roles: ["skirmisher", "brute", "sniper", "custom"] },
    synergy: { provides: ["close-distance"], prefers: ["ambush", "strike"] }
  }),
  ability("drag-down", "DragDown", {
    actionCost: 2, powerCost: 2, baseWeight: 82,
    tags: ["control", "strike", "trip", "athletics"],
    selection: { categories: PHYSICAL_PREDATORS, roles: ["brute", "soldier", "skirmisher", "custom"] },
    interactions: [{ kind: "action", slug: "trip", mode: "inline" }]
  }),
  ability("hamstring", "Hamstring", {
    actionCost: 1, powerCost: 2, baseWeight: 85,
    tags: ["strike", "movement", "control"],
    selection: { categories: PHYSICAL_PREDATORS, roles: ["skirmisher", "sniper", "skillParagon", "custom"] },
    applications: [{ type: "effect", ref: CORE_EFFECT.hampered10, target: "target", timing: "on-hit" }]
  }),
  ability("blood-scent", "BloodScent", {
    abilityType: "passive", powerCost: 1, baseWeight: 78,
    tags: ["senses", "wounded-prey", "tracking"],
    selection: { categories: ["animal", "beast", "dragon", "fiend", "aberration"] },
    synergy: { provides: ["quarry-awareness"], prefers: ["wounded-prey"] }
  }),
  ability("wounded-quarry", "WoundedQuarry", {
    abilityType: "passive", powerCost: 2, baseWeight: 70,
    tags: ["wounded-prey", "focus-fire", "attack-bonus"],
    selection: { categories: PREDATOR_CATEGORIES, roles: HUNTER_ROLES },
    synergy: { prefers: ["quarry-awareness", "strike"] }
  }),
  ability("circling-predator", "CirclingPredator", {
    actionCost: 1, category: "defensive", powerCost: 2, baseWeight: 80,
    tags: ["movement", "positioning", "self-buff"],
    selection: { categories: PREDATOR_CATEGORIES, roles: ["skirmisher", "sniper", "skillParagon", "custom"] },
    applications: [{ type: "effect", ref: CORE_EFFECT.quickenedStep, target: "self", timing: "after-use" }]
  }),
  ability("isolation-hunter", "IsolationHunter", {
    abilityType: "passive", powerCost: 1, baseWeight: 70,
    tags: ["isolation", "focus-fire", "tactical"],
    selection: { categories: PREDATOR_CATEGORIES, roles: HUNTER_ROLES }
  }),
  ability("pack-collapse", "PackCollapse", {
    actionCost: 2, powerCost: 2, family: "pack-hunter", baseWeight: 76,
    tags: ["pack", "teamwork", "control"],
    selection: { categories: ["animal", "beast", "humanoid", "fey", "fiend"] },
    applications: [{ type: "effect", ref: CORE_EFFECT.offGuard, target: "target", timing: "on-success" }],
    synergy: { provides: ["teamwork"], prefers: ["pack", "focus-fire"] }
  }),
  ability("flank-and-fade", "FlankAndFade", {
    abilityType: "reaction", category: "defensive", powerCost: 2, baseWeight: 82,
    tags: ["reaction", "movement", "teamwork"],
    selection: { categories: PREDATOR_CATEGORIES, roles: ["skirmisher", "sniper", "skillParagon", "custom"] }
  }),
  ability("relentless-pursuit", "RelentlessPursuit", {
    abilityType: "reaction", category: "defensive", powerCost: 2, baseWeight: 92,
    tags: ["reaction", "movement", "pursuit"],
    selection: { categories: PHYSICAL_PREDATORS, roles: ["skirmisher", "brute", "soldier", "custom"] },
    synergy: { provides: ["pursuit"], prefers: ["quarry-awareness"] }
  }),
  ability("cornered-fury", "CorneredFury", {
    abilityType: "reaction", powerCost: 2, baseWeight: 70,
    tags: ["reaction", "strike", "pursuit"],
    selection: { categories: PHYSICAL_PREDATORS, roles: ["brute", "soldier", "skirmisher", "custom"] }
  }),
  ability("latching-bite", "LatchingBite", {
    actionCost: 2, powerCost: 2, baseWeight: 88,
    tags: ["strike", "grapple", "control"],
    selection: { categories: ["animal", "beast", "dragon", "fiend", "aberration"], roles: ["brute", "soldier", "skirmisher", "custom"] },
    interactions: [{ kind: "check", statistic: "athletics", defense: "fortitude", mode: "inline", labelKey: "PF2E_CF_PREDATOR.Interaction.LatchingBite.Check" }]
  }),
  ability("rake-the-fallen", "RakeTheFallen", {
    actionCost: 1, powerCost: 1, baseWeight: 68,
    tags: ["strike", "prone", "finisher"],
    selection: { categories: PHYSICAL_PREDATORS, roles: ["brute", "skirmisher", "soldier", "custom"] }
  }),
  ability("cull-the-weak", "CullTheWeak", {
    abilityType: "passive", powerCost: 1, baseWeight: 74,
    tags: ["debuff", "finisher", "focus-fire"],
    selection: { categories: PREDATOR_CATEGORIES, roles: HUNTER_ROLES }
  }),
  ability("sudden-burst", "SuddenBurst", {
    abilityType: "free", category: "defensive", powerCost: 1, baseWeight: 62,
    tags: ["movement", "burst", "once-per-encounter"],
    selection: { categories: PREDATOR_CATEGORIES, roles: ["skirmisher", "sniper", "brute", "custom"], minimumLevel: 2 }
  }),
  ability("stalkers-patience", "StalkersPatience", {
    abilityType: "passive", category: "defensive", powerCost: 1, baseWeight: 68,
    tags: ["stealth", "ambush", "patience"],
    selection: { categories: ["animal", "beast", "aberration", "fey", "fiend", "humanoid"], roles: ["sniper", "skirmisher", "skillParagon", "custom"] }
  }),
  ability("shadow-the-quarry", "ShadowTheQuarry", {
    abilityType: "reaction", category: "defensive", powerCost: 2, baseWeight: 78,
    tags: ["reaction", "movement", "stealth", "pursuit"],
    selection: { categories: ["animal", "beast", "aberration", "fey", "fiend", "humanoid"], roles: ["sniper", "skirmisher", "skillParagon", "custom"] }
  }),
  ability("territorial-challenge", "TerritorialChallenge", {
    actionCost: 1, powerCost: 2, family: "fear-display", baseWeight: 58,
    traits: ["auditory", "emotion", "fear", "mental"],
    tags: ["fear", "territorial", "control"],
    selection: { categories: ["animal", "beast", "dragon", "giant", "fiend"], roles: ["brute", "soldier", "custom"], minimumLevel: 2 },
    applications: [{ type: "effect", ref: CORE_EFFECT.frightened1, target: "target", timing: "failed-save" }],
    interactions: [{ kind: "check", statistic: "will", dcRank: "high", showDC: "gm", mode: "chat", labelKey: "PF2E_CF_PREDATOR.Interaction.WillSave.Label", requestLabelKey: "PF2E_CF_PREDATOR.Interaction.WillSave.Request" }]
  }),
  ability("herd-the-prey", "HerdThePrey", {
    actionCost: 2, powerCost: 3, baseWeight: 72,
    tags: ["movement", "control", "area", "positioning"],
    mechanics: { area: { shape: "cone", distanceFeet: 15 } },
    selection: { categories: ["animal", "beast", "dragon", "giant", "fiend"], roles: ["brute", "soldier", "skirmisher", "custom"], minimumLevel: 3 },
    applications: [{ type: "effect", ref: CORE_EFFECT.hampered10, target: "failed-save-targets", timing: "failed-save" }],
    interactions: [{ kind: "check", statistic: "reflex", dcRank: "high", showDC: "gm", mode: "chat", labelKey: "PF2E_CF_PREDATOR.Interaction.ReflexSave.Label", requestLabelKey: "PF2E_CF_PREDATOR.Interaction.ReflexSave.Request" }]
  }),
  ability("bounding-reposition", "BoundingReposition", {
    actionCost: 1, category: "defensive", powerCost: 1, baseWeight: 75,
    tags: ["movement", "positioning", "leap"],
    selection: { categories: PREDATOR_CATEGORIES, roles: ["skirmisher", "sniper", "skillParagon", "custom"] }
  }),
  ability("predators-exchange", "PredatorsExchange", {
    abilityType: "reaction", category: "defensive", powerCost: 2, baseWeight: 62,
    tags: ["reaction", "teamwork", "movement", "pack"],
    selection: { categories: ["animal", "beast", "humanoid", "fey", "fiend"], roles: ["skirmisher", "soldier", "skillParagon", "custom"] }
  }),
  ability("crushing-grip", "CrushingGrip", {
    actionCost: 2, powerCost: 2, baseWeight: 70,
    tags: ["grapple", "control", "debuff"],
    selection: { categories: ["animal", "beast", "dragon", "giant", "fiend", "aberration"], roles: ["brute", "soldier", "custom"], minimumLevel: 2 },
    applications: [{ type: "effect", ref: CORE_EFFECT.enfeebled1, target: "target", timing: "on-success" }],
    interactions: [{ kind: "check", statistic: "athletics", defense: "fortitude", mode: "inline", labelKey: "PF2E_CF_PREDATOR.Interaction.CrushingGrip.Check" }]
  }),
  ability("finish-the-hunt", "FinishTheHunt", {
    actionCost: 2, powerCost: 2, baseWeight: 78,
    tags: ["strike", "finisher", "wounded-prey"],
    selection: { categories: PREDATOR_CATEGORIES, roles: HUNTER_ROLES, minimumLevel: 2 },
    synergy: { prefers: ["wounded-prey", "quarry-awareness"] }
  }),
  ability("savage-reversal", "SavageReversal", {
    abilityType: "reaction", category: "defensive", powerCost: 2, baseWeight: 64,
    tags: ["reaction", "movement", "counter"],
    selection: { categories: PHYSICAL_PREDATORS, roles: ["brute", "soldier", "skirmisher", "custom"], minimumLevel: 3 }
  }),
  ability("apex-instinct", "ApexInstinct", {
    abilityType: "passive", powerCost: 1, baseWeight: 54,
    tags: ["initiative", "senses", "apex", "quarry-awareness"],
    selection: { categories: PREDATOR_CATEGORIES, roles: HUNTER_ROLES, minimumLevel: 4 },
    synergy: { provides: ["quarry-awareness"], prefers: ["ambush", "pursuit"] }
  })
]);

export const PREDATOR_TACTICS_LIBRARY = Object.freeze({
  id: LIBRARY_ID,
  moduleId: MODULE_ID,
  version: MODULE_VERSION,
  labelKey: "PF2E_CF_PREDATOR.Library.Name",
  descriptionKey: "PF2E_CF_PREDATOR.Library.Description",
  defaultEnabled: true,
  tags: ["creature-forge-addon", "ability-library", "predator"],
  content: { abilities: PREDATOR_ABILITIES, effects: [] }
});

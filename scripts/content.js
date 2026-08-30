export const MODULE_ID = "pf2e-creature-forge-predator-tactics";
export const MODULE_VERSION = "0.1.0";
export const LIBRARY_ID = `${MODULE_ID}.predator-tactics`;

const CORE_EFFECT = Object.freeze({
  frightened1: "pf2e-creature-forge.effect.frightened-1",
  hampered10: "pf2e-creature-forge.effect.hampered-10",
  offGuard: "pf2e-creature-forge.effect.off-guard",
  enfeebled1: "pf2e-creature-forge.effect.enfeebled-1",
});

const DENSITY_TAGS = Object.freeze(["predator-library-density", "predator-library-balance", "predator-library-mix"]);

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
  tags: ["predator", "predator-tactics", ...DENSITY_TAGS, ...(extra.abilityType === "passive" ? ["predator-passive-density"] : []), ...(extra.abilityType === "reaction" ? ["predator-reaction-density"] : []), ...(extra.tags ?? [])],
  selection: extra.selection ?? {},
  synergy: {
    ...(extra.synergy ?? {}),
    conflicts: [...new Set([
      ...DENSITY_TAGS,
      ...(extra.abilityType === "passive" ? ["predator-passive-density"] : []),
      ...(extra.abilityType === "reaction" ? ["predator-reaction-density"] : []),
      ...(extra.synergy?.conflicts ?? [])
    ])]
  },
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
    interactions: [{ kind: "action", slug: "stride", mode: "inline" }],
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
    actionCost: 1, category: "defensive", powerCost: 2, baseWeight: 84,
    tags: ["movement", "positioning", "step", "flanking"],
    selection: { categories: PREDATOR_CATEGORIES, roles: ["skirmisher", "sniper", "skillParagon", "custom"] },
    synergy: { provides: ["positioning"], prefers: ["teamwork", "flanking"] }
  }),
  ability("isolation-hunter", "IsolationHunter", {
    abilityType: "passive", powerCost: 2, baseWeight: 74,
    tags: ["isolation", "focus-fire", "tactical", "off-guard"],
    selection: { categories: PREDATOR_CATEGORIES, roles: HUNTER_ROLES },
    synergy: { provides: ["isolation-pressure"], prefers: ["focus-fire", "pursuit"] }
  }),
  ability("pack-collapse", "PackCollapse", {
    actionCost: 2, powerCost: 3, family: "pack-hunter", baseWeight: 82,
    tags: ["pack", "teamwork", "movement", "strike", "flanking", "off-guard"],
    selection: { categories: ["animal", "beast", "humanoid", "fey", "fiend"], roles: ["skirmisher", "brute", "soldier", "skillParagon", "custom"] },
    applications: [{ type: "effect", ref: CORE_EFFECT.offGuard, target: "target", timing: "on-hit" }],
    synergy: { provides: ["teamwork", "isolation-pressure"], prefers: ["pack", "focus-fire", "positioning"] }
  }),
  ability("flank-and-fade", "FlankAndFade", {
    abilityType: "reaction", category: "defensive", powerCost: 2, baseWeight: 86,
    tags: ["reaction", "movement", "step", "teamwork", "flanking"],
    selection: { categories: PREDATOR_CATEGORIES, roles: ["skirmisher", "sniper", "skillParagon", "custom"] },
    synergy: { provides: ["positioning"], prefers: ["teamwork", "flanking"] }
  }),
  ability("relentless-pursuit", "RelentlessPursuit", {
    abilityType: "reaction", category: "defensive", powerCost: 2, family: "predator-pursuit", baseWeight: 92,
    tags: ["reaction", "movement", "pursuit", "stride"],
    selection: { categories: PHYSICAL_PREDATORS, roles: ["skirmisher", "brute", "soldier", "custom"] },
    interactions: [{ kind: "action", slug: "stride", mode: "inline" }],
    synergy: { provides: ["pursuit"], prefers: ["quarry-awareness"] }
  }),
  ability("cornered-fury", "CorneredFury", {
    abilityType: "reaction", powerCost: 2, baseWeight: 70,
    tags: ["reaction", "strike", "pursuit", "melee"],
    selection: { categories: PHYSICAL_PREDATORS, roles: ["brute", "soldier", "skirmisher", "custom"] }
  }),
  ability("latching-bite", "LatchingBite", {
    actionCost: 2, powerCost: 2, family: "predator-grapple-opener", baseWeight: 88,
    tags: ["strike", "grapple", "control", "athletics"],
    selection: { categories: ["animal", "beast", "dragon", "fiend", "aberration"], roles: ["brute", "soldier", "skirmisher", "custom"] },
    interactions: [{ kind: "check", statistic: "athletics", defense: "fortitude", mode: "inline", labelKey: "PF2E_CF_PREDATOR.Interaction.LatchingBite.Check" }],
    synergy: { provides: ["grapple-control"], prefers: ["strike", "control"] }
  }),
  ability("rake-the-fallen", "RakeTheFallen", {
    actionCost: 1, powerCost: 2, family: "predator-finisher", baseWeight: 68,
    tags: ["strike", "prone", "finisher", "bonus-damage"],
    selection: { categories: PHYSICAL_PREDATORS, roles: ["brute", "skirmisher", "soldier", "custom"] }
  }),
  ability("cull-the-weak", "CullTheWeak", {
    abilityType: "passive", powerCost: 2, family: "predator-finisher", baseWeight: 74,
    tags: ["debuff", "finisher", "focus-fire", "bonus-damage"],
    selection: { categories: PREDATOR_CATEGORIES, roles: HUNTER_ROLES }
  }),
  ability("sudden-burst", "SuddenBurst", {
    abilityType: "free", category: "defensive", powerCost: 1, baseWeight: 62,
    tags: ["movement", "burst", "once-per-encounter", "stride"],
    selection: { categories: PREDATOR_CATEGORIES, roles: ["skirmisher", "sniper", "brute", "custom"], minimumLevel: 2 },
    interactions: [{ kind: "action", slug: "stride", mode: "inline" }]
  }),
  ability("stalkers-patience", "StalkersPatience", {
    abilityType: "passive", category: "defensive", powerCost: 1, family: "predator-initiative", baseWeight: 68,
    tags: ["stealth", "ambush", "patience", "initiative", "avoid-notice"],
    selection: { categories: ["animal", "beast", "aberration", "fey", "fiend", "humanoid"], roles: ["sniper", "skirmisher", "skillParagon", "custom"] },
    interactions: [{ kind: "action", slug: "avoid-notice", mode: "inline" }],
    synergy: { provides: ["ambush"], prefers: ["stealth"] }
  }),
  ability("shadow-the-quarry", "ShadowTheQuarry", {
    abilityType: "reaction", category: "defensive", powerCost: 2, family: "predator-pursuit", baseWeight: 78,
    tags: ["reaction", "movement", "stealth", "pursuit", "sneak"],
    selection: { categories: ["animal", "beast", "aberration", "fey", "fiend", "humanoid"], roles: ["sniper", "skirmisher", "skillParagon", "custom"] },
    interactions: [{ kind: "action", slug: "sneak", mode: "inline" }],
    synergy: { provides: ["pursuit"], prefers: ["ambush", "stealth", "quarry-awareness"] }
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
    actionCost: 2, powerCost: 3, baseWeight: 78,
    tags: ["movement", "forced-movement", "control", "area", "positioning"],
    mechanics: { area: { shape: "cone", distanceFeet: 15 } },
    selection: { categories: ["animal", "beast", "dragon", "giant", "fiend"], roles: ["brute", "soldier", "skirmisher", "custom"], minimumLevel: 3 },
    interactions: [{ kind: "check", statistic: "reflex", dcRank: "high", showDC: "gm", mode: "chat", labelKey: "PF2E_CF_PREDATOR.Interaction.ReflexSave.Label", requestLabelKey: "PF2E_CF_PREDATOR.Interaction.ReflexSave.Request" }],
    synergy: { provides: ["positioning"], prefers: ["teamwork", "control", "pursuit"] }
  }),
  ability("bounding-reposition", "BoundingReposition", {
    actionCost: 1, category: "defensive", powerCost: 2, baseWeight: 78,
    tags: ["movement", "positioning", "leap", "reaction-safe"],
    selection: { categories: PREDATOR_CATEGORIES, roles: ["skirmisher", "sniper", "skillParagon", "custom"] },
    synergy: { provides: ["positioning"], prefers: ["ambush", "pursuit"] }
  }),
  ability("predators-exchange", "PredatorsExchange", {
    abilityType: "reaction", category: "defensive", powerCost: 2, baseWeight: 72,
    tags: ["reaction", "teamwork", "movement", "step", "pack", "flanking"],
    selection: { categories: ["animal", "beast", "humanoid", "fey", "fiend"], roles: ["skirmisher", "soldier", "skillParagon", "custom"] },
    synergy: { provides: ["positioning", "teamwork"], prefers: ["pack", "flanking"] }
  }),
  ability("crushing-grip", "CrushingGrip", {
    actionCost: 1, powerCost: 2, baseWeight: 70,
    tags: ["grapple", "control", "debuff"],
    selection: { categories: ["animal", "beast", "dragon", "giant", "fiend", "aberration"], roles: ["brute", "soldier", "custom"], minimumLevel: 2 },
    applications: [{ type: "effect", ref: CORE_EFFECT.enfeebled1, target: "target", timing: "on-success" }],
    interactions: [{ kind: "check", statistic: "athletics", defense: "fortitude", mode: "inline", labelKey: "PF2E_CF_PREDATOR.Interaction.CrushingGrip.Check" }],
    synergy: { prefers: ["grapple-control"], provides: ["debilitated-prey"] }
  }),
  ability("finish-the-hunt", "FinishTheHunt", {
    actionCost: 1, powerCost: 2, family: "predator-finisher", baseWeight: 78,
    tags: ["strike", "finisher", "wounded-prey", "bonus-damage"],
    selection: { categories: PREDATOR_CATEGORIES, roles: HUNTER_ROLES, minimumLevel: 2 },
    synergy: { prefers: ["wounded-prey", "quarry-awareness"] }
  }),
  ability("savage-reversal", "SavageReversal", {
    abilityType: "reaction", category: "defensive", powerCost: 2, family: "predator-counter", baseWeight: 64,
    tags: ["reaction", "movement", "counter", "step", "strike"],
    selection: { categories: PHYSICAL_PREDATORS, roles: ["brute", "soldier", "skirmisher", "custom"], minimumLevel: 3 }
  }),
  ability("apex-instinct", "ApexInstinct", {
    abilityType: "passive", powerCost: 2, family: "predator-initiative", baseWeight: 54,
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

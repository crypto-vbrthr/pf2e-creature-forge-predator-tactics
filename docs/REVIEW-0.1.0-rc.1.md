# Predator Tactics 0.1.0-rc.1 — Final Density, Overlap & Selection Review

## Scope

This review covers the full 25-ability library after the Ambush & Hunt, Positioning & Pack Tactics, Pursuit & Mobility, rules-text clarity, and Finishers & Brutality passes. The final pass focuses on candidate density, role/category coverage, repeated mechanics, action-type clustering, core-library coexistence, and release packaging.

## Findings and changes

### Library density

With both Creature Forge Core and Predator Tactics enabled, the unmodified dev.7 pool contributed roughly four out of five selected abilities in the representative review matrix. The individual weights were reasonable; the cause was pool size. Predator Tactics has 25 broadly eligible entries, so candidate count alone gave it too much aggregate selection mass.

The RC adds soft anti-clustering scoring hints to every Predator entry. After the first Predator pick, later Predator candidates become less attractive, but they are not excluded. The same mechanism adds a smaller additional penalty after a passive or reaction has already been selected. This preserves Predator-only generation while improving mixed-library diversity.

### Overlap

Existing hard family exclusions remain appropriate:

- `pounce`: Ambush Rush vs. Core Pounce;
- `pack-hunter`: Pack Collapse vs. Core Pack Hunter;
- `predator-pursuit`: Relentless Pursuit vs. Shadow the Quarry;
- `predator-finisher`: Rake the Fallen, Cull the Weak, Finish the Hunt;
- `predator-initiative`: Stalker's Patience vs. Apex Instinct.

No additional hard exclusions were added. Several frequently paired abilities, such as Stalker's Patience + Shadow the Quarry or Blood Scent + Wounded Quarry, are complementary rather than redundant.

### Rules-text cleanup

Three final wording issues were corrected:

- Ambush Rush now says the creature Strides up to twice, rather than describing one Stride as exceeding normal Speed, and exposes Stride as an inline PF2e action.
- Territorial Challenge is explicitly a threatening cry and requires the target to hear it, matching its auditory trait.
- Predator's Exchange now uses explicit melee-reach geometry instead of the non-PF2e shorthand “threaten.”

## Audit summary

The final deterministic review matrix covers levels 0, 3, 8, 16, and 24 across Animal, Beast, Dragon, Aberration, Fiend, Fey, Giant, and Humanoid and the Skirmisher, Brute, Soldier, Sniper, Skill Paragon, and Custom roles.

Acceptance criteria for the RC:

- every one of the 25 abilities remains selectable in at least one legal context;
- no invalid blueprints or validator warnings;
- no hard-family duplicates;
- mixed Core + Predator generation does not collapse into an all-Predator package as the normal outcome;
- Predator-only source selection still generates full packages;
- passive- and reaction-heavy four-ability packages are rare rather than common;
- DE/EN localization and interactive controls remain complete.

## Measured RC results

The final packaged-content audit used 480 deterministic mixed-library generations and 480 Predator-only generations across the matrix described above.

- Mixed Core + Predator: 1,918 generated ability slots, 1,030 Predator selections (**53.7%**), 0 invalid blueprints, 0 validator warnings, 0 budget warnings, and 0 family duplicates. Only 15/480 creatures received four Predator abilities, and only 1/480 received three or more passive abilities; none received three or more reactions.
- Predator-only: 1,850 generated ability slots, all from Predator Tactics as expected, with 0 invalid blueprints, 0 validator warnings, 0 budget warnings, and 0 family duplicates. All 25 abilities appeared at least once in the deterministic matrix.

The mixed-library share is intentionally not forced to an exact quota. It is an emergent result of soft scoring, so role, level, category, focus tags, and future libraries can still influence the blend.

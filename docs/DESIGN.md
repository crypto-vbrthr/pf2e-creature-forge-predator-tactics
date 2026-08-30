# Predator Tactics design notes

## Purpose

The pack broadens generated creature behavior rather than raw statistics. Its abilities are biased toward predators that change position, pursue, isolate, coordinate, and finish wounded prey.

## Candidate boundaries

The first build intentionally concentrates on Animal, Beast, Dragon, Aberration, Fiend, Fey, Giant, and Humanoid concepts where the individual ability makes sense. It avoids Plant, Fungus, Ooze, Construct, and most incorporeal concepts until a later pack or a dedicated adaptation exists.

## Core-family overlap

`Ambush Rush` uses the `pounce` family so it cannot coexist with Creature Forge core `Pounce` on the same generated creature. `Pack Collapse` similarly uses the `pack-hunter` family to avoid stacking two near-identical pack-hunting passives.

## Automation boundary

Existing Creature Forge effects are reused for off-guard, frightened 1, hampered movement, enfeebled 1, and the short movement boost. Complex positional triggers remain descriptive because target geometry, Grabbed state, ally placement, and exact movement choices are encounter-state decisions.


## Ability quality pass: Ambush & Hunt

The first five entries now use explicit PF2e-facing mechanics. Ambush Rush is intentionally in the `pounce` family but is stronger and conditional: it requires hidden/undetected positioning and compresses two Strides plus a melee Strike into two actions. Drag Down follows the normal subordinate-action/MAP pattern for a Strike followed by Trip. Hamstring reuses Creature Forge's one-round movement penalty effect. Blood Scent is a limited imprecise sense rather than a generic narrative tracking bonus. Wounded Quarry uses a scale-independent +1 circumstance attack bonus only against prey at or below half Hit Points.


## Ability quality pass: Positioning & Pack Tactics

This pass treats battlefield geometry as a rules-facing constraint rather than an automation target. Circling Predator and Flank and Fade use enhanced Steps, preserving the core Step rule that movement-triggered reactions do not fire. Isolation Hunter defines isolation with a fixed 10-foot ally radius and makes off-guard relative to the predator rather than applying a global condition. Pack Collapse converts pack play into action compression and briefly exposes a correctly flanked target to the entire attacking side. Herd the Prey now uses true forced movement with degree-of-success distances instead of a generic Speed penalty. Bounding Reposition is a special reaction-safe Leap, while Predator's Exchange gives pack creatures a crisp vacated-space reaction.


## Ability quality pass: Pursuit & Mobility

Relentless Pursuit and Shadow the Quarry now share the `predator-pursuit` family because both occupy the same reaction niche after enemy movement; a generated creature should not normally receive both. Relentless Pursuit resolves only after the enemy finishes moving and then allows a half-Speed Stride that must actually close distance. Cornered Fury explicitly respects Step and other movement that suppresses movement-triggered reactions. Sudden Burst is a once-per-encounter half-Speed free Stride that can only be inserted between actions on the creature's own turn. Stalker's Patience now keys directly off Avoid Notice and a Stealth initiative roll, removing the ambiguous "hidden from at least one enemy" condition. Shadow the Quarry requires the predator to already be hidden or undetected from the triggering enemy, then uses the normal Sneak action and requires a legal cover/concealment destination.

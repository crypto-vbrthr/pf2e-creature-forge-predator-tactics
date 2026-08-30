# Predator Tactics design notes

## Purpose

The pack broadens generated creature behavior rather than raw statistics. Its abilities are biased toward predators that change position, pursue, isolate, coordinate, and finish wounded prey.

## Candidate boundaries

The first build intentionally concentrates on Animal, Beast, Dragon, Aberration, Fiend, Fey, Giant, and Humanoid concepts where the individual ability makes sense. It avoids Plant, Fungus, Ooze, Construct, and most incorporeal concepts until a later pack or a dedicated adaptation exists.

## Core-family overlap

`Ambush Rush` uses the `pounce` family so it cannot coexist with Creature Forge core `Pounce` on the same generated creature. `Pack Collapse` similarly uses the `pack-hunter` family to avoid stacking two near-identical pack-hunting passives.

## Automation boundary

Existing Creature Forge effects are reused for off-guard, frightened 1, hampered movement, enfeebled 1, and the short movement boost. Complex positional triggers remain descriptive because target geometry, Grabbed state, ally placement, and exact movement choices are encounter-state decisions.

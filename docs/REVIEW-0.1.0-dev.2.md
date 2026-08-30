# Predator Tactics 0.1.0-dev.2
## Ambush & Hunt Ability Quality Review

### Scope

This pass reviews the first five Predator Tactics abilities for PF2e wording, action economy, selection metadata, overlap with Creature Forge core, and automation boundaries.

### Findings

- **Ambush Rush** was too close to core Pounce and too vague about what made it an ambush. It now requires the predator to be hidden or undetected from its target, permits movement up to twice Speed, then a melee Strike, with the target off-guard to that Strike. Its power cost rises from 2 to 3. It remains in the `pounce` family so the generator will not select both.
- **Drag Down** previously described an outcome without a PF2e resolution path. It is now a two-action melee Strike followed, on a damaging hit, by an Athletics Trip attempt against the same target. The free-hand requirement is waived and the multiple attack penalty increases only after the activity.
- **Hamstring** now states that the ability includes a melee Strike and exactly what the linked movement effect represents: a 10-foot / 3-metre Speed penalty until the end of the target's next turn. The existing Creature Forge `hampered-10` resource remains the runtime effect.
- **Blood Scent** becomes a concrete limited imprecise sense: 30 feet / 9 metres, injured living creatures only. This adds tactical information without creating a universal scent sense.
- **Wounded Quarry** receives a level-independent mechanic suitable for all generated levels: +1 circumstance to attack rolls against creatures at or below half maximum HP. Because attack bonuses are high-value in PF2e, its power cost rises from 1 to 2.

### Result

The first block is mechanically distinct, uses the existing Creature Forge power-budget and effect-resource model, and does not require a new runtime subsystem.

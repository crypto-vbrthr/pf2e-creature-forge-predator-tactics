# Predator Tactics 0.1.0-dev.4
## Positioning & Pack Tactics Ability Quality Review

### Scope

This pass reviews Circling Predator, Isolation Hunter, Pack Collapse, Flank and Fade, Herd the Prey, Bounding Reposition, and Predator's Exchange for PF2e movement language, flanking semantics, reaction timing, forced movement, power budget, and runtime boundaries.

### Findings

- **Circling Predator** is now a special 10-foot Step. Because Step explicitly avoids movement-triggered reactions, the ability has a clear tactical identity. Ending in a flank grants +1 circumstance AC against that enemy until the predator's next turn.
- **Isolation Hunter** now defines an isolated target as having no ally within 10 feet. The off-guard benefit is explicitly relative to the predator's melee Strikes, so the pack does not misuse a global off-guard effect.
- **Pack Collapse** now compresses a half-Speed Stride and melee Strike into two actions. When the Strike lands while a packmate completes the flank, the prey is briefly exposed to all attacks. Power cost rises to 3.
- **Flank and Fade** gains a real reaction trigger: an ally hits a creature both hunters are flanking. The predator then takes a special 10-foot Step.
- **Herd the Prey** now resolves as forced movement: 5/10/15 feet away on success/failure/critical failure, with prone on a critical failure. The level-scaled Reflex save remains a GM chat request.
- **Bounding Reposition** becomes a special 15-foot horizontal / 5-foot vertical Leap that does not trigger movement reactions, creating a distinct mobility tool rather than a vague reposition.
- **Predator's Exchange** now triggers when a packmate vacates an adjacent square, lets the predator Step into it, and rewards a newly established flank with +1 circumstance to the next melee attack.

### Rules basis

The review follows the Player Core definitions of Step, flanking, reactions to movement, and forced movement. It also mirrors the system's common pattern of abilities that combine movement with attacks or reposition creatures without requiring Creature Forge to infer encounter geometry.

### Automation boundary

Creature Forge can expose the Reflex save for Herd the Prey and can share all abilities to chat. It intentionally does not auto-move tokens, decide whether a flank exists, or choose legal destination squares. Those remain table-state decisions for the GM.

### Result

The pack-tactics block now creates materially different battlefield behavior without relying on hidden geometry automation or generic numerical bonuses.

# Predator Tactics 0.1.0-dev.6 — Pursuit & Mobility Review

This pass reviews the five pursuit/mobility abilities that determine how a predator closes, shadows, or punishes movement.

## Reviewed abilities

- **Relentless Pursuit** — triggers only after a visible enemy finishes moving farther away; the reaction then gives a half-Speed Stride that must end closer.
- **Cornered Fury** — resolves the melee Strike before the adjacent enemy leaves its space and explicitly does not trigger from Step or equivalent reaction-safe movement.
- **Sudden Burst** — once per encounter, on the creature's own turn, grants a half-Speed Stride as a free action between actions, not during another activity.
- **Stalker's Patience** — now keys off **Avoid Notice** and a Stealth initiative roll, so the prerequisite is a normal PF2e exploration-mode procedure rather than an ambiguous visibility test.
- **Shadow the Quarry** — requires the creature to be hidden or undetected from the triggering enemy and then uses normal **Sneak** rules after that enemy finishes moving. A legal destination must be closer and retain cover or concealment.

## Selection and interaction cleanup

Relentless Pursuit and Shadow the Quarry now share the `predator-pursuit` family to prevent redundant pursuit reactions on the same generated creature. Relentless Pursuit and Sudden Burst expose **Stride**, Stalker's Patience exposes **Avoid Notice**, and Shadow the Quarry exposes **Sneak** through Creature Forge's interactive action controls.

No automatic token movement is attempted. These controls expose the relevant PF2e actions and rules, while the GM remains responsible for legal squares and encounter geometry.

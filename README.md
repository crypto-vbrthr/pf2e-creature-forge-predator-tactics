# PF2E Creature Forge: Predator Tactics

Predator Tactics is an external ability library for **PF2E Creature Forge**. It adds predator-themed generated abilities without modifying Creature Forge core data.

## 0.1.0-dev.1

The first development build registers **25 abilities** focused on:

- ambush and opening attacks;
- pursuit and reaction movement;
- pack coordination and isolation tactics;
- control through dragging, hamstringing, and herding;
- wounded-prey and finishing behavior;
- predatory positioning and battlefield awareness.

The library uses Creature Forge's normal power budget, category/role selection, dependency validation, source selection, locking, and reroll workflows. It is registered through the stable Creature Forge ability-library API and appears in the Creature Forge **Ability libraries** source selector.

## Requirements

- Foundry VTT 14+
- PF2e 8.4.0+
- PF2E Creature Forge 1.0.1+

## Design boundary

Predator Tactics does not replace Creature Forge's generator. It contributes additional candidate abilities. Effects that can be represented by existing Creature Forge resources reuse those resources; movement/positioning sequences that require table context remain explicit GM-facing ability text rather than pretending to be fully automated.

# PF2E Creature Forge: Predator Tactics

Predator Tactics is an external ability library for **PF2E Creature Forge**. It adds predator-themed generated abilities without modifying Creature Forge core data.

## 0.1.1

The first stable release registers **25 abilities** focused on:

- ambush and opening attacks;
- pursuit and reaction movement;
- pack coordination and isolation tactics;
- control through dragging, hamstringing, and herding;
- wounded-prey and finishing behavior;
- predatory positioning and battlefield awareness.

The library uses Creature Forge's normal power budget, category/role selection, dependency validation, source selection, locking, and reroll workflows. It is registered through the stable Creature Forge ability-library API and appears in the Creature Forge **Ability libraries** source selector.

### Stable release

All 25 abilities have completed their individual rules-text and mechanics passes. The final density/overlap review adds soft anti-clustering hints to the library: when Predator Tactics is mixed with the Creature Forge core library, additional Predator picks become progressively less attractive without being forbidden. This keeps the add-on visible without letting a large 25-ability pool drown out core abilities. Passive and reaction entries receive an additional soft diversity penalty after the first pick of the same type.

The final release also clarifies Ambush Rush as up to two subordinate Strides followed by a melee Strike, makes Territorial Challenge explicitly auditory, and rewrites Predator's Exchange without the ambiguous term “threaten.” Interactive Athletics, saves, PF2e actions, and Send Ability to Chat controls remain available.

### 0.1.1 dependency hotfix

This maintenance release changes the required Creature Forge version from the development identifier `1.1.0-dev.1` to the stable `1.1.0` release. No Predator Tactics ability mechanics, localization, selection rules, or runtime behavior are changed. The change avoids Foundry treating the old development-version requirement as incompatible with the stable Creature Forge release.

## Requirements

- Foundry VTT 14+
- PF2e 8.4.0+
- PF2E Creature Forge 1.1.0+

## Design boundary

Predator Tactics does not replace Creature Forge's generator. It contributes additional candidate abilities. Effects that can be represented by existing Creature Forge resources reuse those resources; movement/positioning sequences that require table context remain explicit GM-facing ability text rather than pretending to be fully automated.

## Interactive ability support
With Creature Forge 1.1.0 or newer, Predator Tactics can place native PF2e roll/action controls directly in generated ability descriptions. Source-side actions such as Trip or Athletics checks can be rolled inline, while target-facing saves can be sent to chat by the GM. Generated Predator abilities also inherit Creature Forge's compact **Send ability to chat** control.

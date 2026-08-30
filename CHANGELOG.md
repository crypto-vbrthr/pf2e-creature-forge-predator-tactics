# Changelog

## 0.1.0-dev.3 - Interactive Ability Hooks
- Requires Creature Forge 1.1.0-dev.1 interactive ability support.
- Added native PF2e inline Trip handling for Drag Down.
- Added inline Athletics-vs-Fortitude checks for Latching Bite and Crushing Grip.
- Added GM chat-request saves for Territorial Challenge and Herd the Prey, with level-scaled high creature DCs.
- Every Predator Tactics ability can now use Creature Forge's Send Ability to Chat control.

## 0.1.0-dev.2

- Completed the first ability quality pass for the Ambush & Hunt block.
- Reworked Ambush Rush into a precise hidden/undetected two-Stride opening attack and raised its power cost to 3.
- Reworked Drag Down into a Strike + Trip activity with explicit multiple-attack-penalty handling.
- Clarified Hamstring as a melee Strike that applies the existing 10-foot/3-metre movement penalty on hit.
- Turned Blood Scent into a concrete 30-foot/9-metre imprecise sense limited to injured living creatures.
- Defined Wounded Quarry as a +1 circumstance bonus to attack rolls against targets at or below half Hit Points and raised its power cost to 2.
- Added regression tests for the reviewed abilities and their core-family/effect integration.


## 0.1.0-dev.1

- Added Predator Tactics as an external Creature Forge ability library.
- Added 25 original predator-themed abilities.
- Added German and English localization.
- Added Creature Forge 1.0.1+ dependency metadata.
- Added registration fallback for normal ready-hook and already-available API cases.
- Added localization, manifest, uniqueness, selection, and dependency-shape tests.

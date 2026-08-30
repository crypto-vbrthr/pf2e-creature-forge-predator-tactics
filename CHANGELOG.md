# Changelog

## 0.1.0-dev.7 - Finishers & Brutality Review

- Reviewed Latching Bite, Rake the Fallen, Cull the Weak, Crushing Grip, Finish the Hunt, Savage Reversal, and Apex Instinct.
- Added explicit multiple-attack-penalty timing and critical-success restraint to Latching Bite.
- Limited Rake the Fallen and Finish the Hunt to once per round and placed all three finisher-style damage abilities in the shared `predator-finisher` family to prevent redundant damage packages.
- Reworded Cull the Weak as a PF2e circumstance bonus to damage rolls rather than ambiguous "circumstance damage".
- Reduced Crushing Grip to 1 action, added a critical-failure release risk, and linked it by synergy to grapple-opening abilities.
- Clarified Savage Reversal's special 10-foot Step and its normal Step reaction protection.
- Expanded Apex Instinct into a distinct opening-round predator benefit and put it in the same `predator-initiative` family as Stalker's Patience to prevent redundant initiative bonuses.

## 0.1.0-dev.6

- Reviewed the Pursuit & Mobility block: Relentless Pursuit, Cornered Fury, Sudden Burst, Stalker's Patience, and Shadow the Quarry.
- Made pursuit timing explicit: movement resolves first, then the predator reacts.
- Made Cornered Fury explicitly respect Step and other movement that suppresses movement-triggered reactions.
- Replaced Stalker's Patience's ambiguous visibility condition with the PF2e Avoid Notice + Stealth initiative procedure.
- Added a proper hidden/undetected requirement and legal cover/concealment destination to Shadow the Quarry.
- Put Relentless Pursuit and Shadow the Quarry in the shared `predator-pursuit` family to avoid redundant reaction packages.
- Added Stride, Avoid Notice, and Sneak interactive PF2e action links where useful.


## 0.1.0-dev.5

- Completed a rules-text clarity pass for previously ambiguous Predator Tactics abilities.
- Clarified whether abilities are actions, reactions, passive benefits, or once-per-encounter free actions.
- `Rake the Fallen` / `Am Boden zerfetzen` now explicitly targets any prone creature in melee reach during the predator's own turn and is not a trigger on falling prone or Standing.
- Added concrete triggers and movement limits to Relentless Pursuit, Cornered Fury, Shadow the Quarry, and Savage Reversal.
- Defined concrete effects for Latching Bite, Cull the Weak, Sudden Burst, Stalker's Patience, Finish the Hunt, Crushing Grip, and Apex Instinct.

## 0.1.0-dev.4 - Positioning & Pack Tactics Review
- Reworked Circling Predator into an explicit 10-foot Step with a conditional defensive reward for ending in a flank.
- Defined Isolation Hunter with a concrete 10-foot isolation condition and relative off-guard benefit.
- Reworked Pack Collapse into a two-action half-Speed reposition + melee Strike that can expose a successfully flanked target to the whole pack.
- Added precise triggers and Step movement to Flank and Fade and Predator's Exchange.
- Reworked Herd the Prey into degree-of-success forced movement with the existing GM-facing Reflex save request.
- Reworked Bounding Reposition into a reaction-safe special Leap with explicit distances.
- Added regression coverage for the reviewed block and removed the no-longer-used quickened-step dependency.

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

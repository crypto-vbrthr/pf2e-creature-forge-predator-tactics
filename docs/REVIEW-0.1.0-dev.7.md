# Predator Tactics 0.1.0-dev.7 — Finishers & Brutality Review

## Scope

This pass reviews the final high-impact combat block: **Latching Bite, Rake the Fallen, Cull the Weak, Crushing Grip, Finish the Hunt, Savage Reversal, and Apex Instinct**. The goal is to make each entry immediately executable at the table, reduce overlap, and keep burst damage within the Creature Forge power-budget model.

## Changes

- **Latching Bite** now uses explicit Strike + Athletics timing. Both rolls count toward MAP, but MAP does not increase until the activity is complete. A critical Athletics success restrains instead of merely grabbing.
- **Rake the Fallen** remains a one-action special Strike but is limited to once per round.
- **Cull the Weak** now grants a +2 circumstance bonus to melee Strike damage rolls against debilitated prey.
- **Crushing Grip** is now a one-action follow-up to an existing grab/restraint. A critical failure releases the prey, giving the action a real risk/reward edge.
- **Finish the Hunt** is now a once-per-round one-action special Strike against a target at half Hit Points or fewer.
- **Rake the Fallen, Cull the Weak, and Finish the Hunt** share the `predator-finisher` family, so generated creatures do not stack several near-identical bonus-damage finishers.
- **Savage Reversal** explicitly preserves Step's reaction protection when using its special 10-foot Step option.
- **Apex Instinct** keeps the initiative bonus but adds an opening-round off-guard payoff. It shares the `predator-initiative` family with Stalker's Patience, preventing duplicate initiative packages.

## Rules alignment

The wording follows PF2e's core Strike, Stand, grabbed/restrained, Step, and multiple-attack-penalty patterns. The review deliberately avoids automating positional or target-state decisions that require the tabletop context.

## Result

The Finishers & Brutality block is ready for the full Predator Tactics density/overlap review.

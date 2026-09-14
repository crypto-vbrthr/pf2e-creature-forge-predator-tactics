# Predator Tactics 0.1.1 — Creature Forge Dependency Hotfix

## Issue

Predator Tactics 0.1.0 required `pf2e-creature-forge` with a minimum version of `1.1.0-dev.1`. After Creature Forge was promoted to the stable `1.1.0` release, Foundry could reject Predator Tactics activation because the development-style version identifier was still used as the minimum dependency.

## Fix

The required Creature Forge version is now `1.1.0`. This is the stable release that contains the Interactive Ability Actions API used by Predator Tactics.

## Scope

This is a metadata-only maintenance release. No abilities, localization strings, selection weights, density balancing, interactions, or runtime registration behavior were changed.

## Validation

The package version, manifest version, runtime library version, and dependency floor are regression-tested. The complete add-on test suite and JavaScript syntax checks are run against the packaged release.

import { LIBRARY_ID, MODULE_ID, MODULE_VERSION, PREDATOR_TACTICS_LIBRARY } from "./content.js";

let registered = false;

function creatureForgeApi() {
  return globalThis.game?.modules?.get?.("pf2e-creature-forge")?.api ?? null;
}

function register(api = creatureForgeApi()) {
  if (registered) return true;
  if (!api?.content?.registerAbilityLibrary) {
    console.warn(`${MODULE_ID} | Creature Forge ability-library API is unavailable.`);
    return false;
  }

  try {
    const existing = api.content.getAbilityLibrary?.(LIBRARY_ID);
    if (existing) api.content.unregisterAbilityLibrary?.(LIBRARY_ID);
    const result = api.content.registerAbilityLibrary(PREDATOR_TACTICS_LIBRARY);
    const validation = api.content.validateAbilityLibrary?.(LIBRARY_ID);
    if (validation && validation.valid === false) {
      api.content.unregisterAbilityLibrary?.(LIBRARY_ID);
      console.error(`${MODULE_ID} | Predator Tactics library failed validation.`, validation);
      return false;
    }
    registered = true;
    Hooks.callAll("pf2eCreatureForgePredatorTacticsReady", { id: MODULE_ID, version: MODULE_VERSION, library: result });
    Hooks.callAll("pf2eCreatureForgeContentReady", api.content.getRegistrySnapshot?.());
    console.info(`${MODULE_ID} | Registered ${result?.abilityCount ?? PREDATOR_TACTICS_LIBRARY.content.abilities.length} Predator Tactics abilities.`);
    return true;
  } catch (error) {
    console.error(`${MODULE_ID} | Failed to register Predator Tactics.`, error);
    return false;
  }
}

Hooks.once("pf2eCreatureForgeReady", (api) => register(api));
Hooks.once("ready", () => register());

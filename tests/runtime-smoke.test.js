import test from "node:test";
import assert from "node:assert/strict";

function createHooks() {
  const once = new Map();
  const calls = [];
  return {
    once(name, fn) { once.set(name, fn); },
    callAll(name, ...args) { calls.push([name, ...args]); },
    _once: once,
    _calls: calls
  };
}

test("ready hook registers the library once through the Creature Forge API", async () => {
  const Hooks = createHooks();
  globalThis.Hooks = Hooks;
  globalThis.game = { modules: new Map() };
  let registered = null;
  const api = {
    content: {
      getAbilityLibrary: () => null,
      unregisterAbilityLibrary: () => true,
      registerAbilityLibrary: (library) => { registered = library; return { id: library.id, abilityCount: library.content.abilities.length }; },
      validateAbilityLibrary: () => ({ valid: true, errors: [] }),
      getRegistrySnapshot: () => ({})
    }
  };
  await import(`../scripts/main.js?smoke=${Date.now()}`);
  const callback = Hooks._once.get("pf2eCreatureForgeReady");
  assert.equal(typeof callback, "function");
  assert.equal(callback(api), true);
  assert.equal(registered.content.abilities.length, 25);
  assert.ok(Hooks._calls.some(([name]) => name === "pf2eCreatureForgePredatorTacticsReady"));
});

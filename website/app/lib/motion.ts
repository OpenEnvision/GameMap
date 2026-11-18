import { useSyncExternalStore } from "react";

/** Decorative motion runs only when the visitor has not asked for less of it. */
export const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
/** Hover effects that follow the pointer need a precise, hovering pointer. */
export const FINE_POINTER_MOTION =
  "(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)";

export function matches(query: string, fallback = false) {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function")
    return fallback;
  return window.matchMedia(query).matches;
}

export function watchMedia(query: string, callback: () => void) {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function")
    return () => {};
  const list = window.matchMedia(query);
  list.addEventListener("change", callback);
  return () => list.removeEventListener("change", callback);
}

const subscribeReduced = (callback: () => void) =>
  watchMedia(REDUCED_MOTION, callback);
/** Static HTML renders as reduced motion; the client upgrades after hydration. */
export function useReducedMotion() {
  return useSyncExternalStore(
    subscribeReduced,
    () => matches(REDUCED_MOTION, true),
    () => true,
  );
}

export const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

/** Deterministic PRNG (mulberry32): decorative layouts never depend on Math.random. */
export function seeded(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

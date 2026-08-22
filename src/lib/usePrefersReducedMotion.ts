"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

const getSnapshot = () => window.matchMedia(QUERY).matches;

/* The OS motion preference is an external store, so read it as one rather than
 * mirroring it into state from an effect. This also keeps it live: a user who
 * flips the setting gets the change without a reload, and the server snapshot
 * (false) matches the first client render, so hydration stays clean.
 */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

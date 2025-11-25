'use client';

import { useIsoLayoutEffect } from "./useIsoLayoutEffect.js";
import { useRefWithInit } from "./useRefWithInit.js";
export function useLatestRef(value) {
  const latest = useRefWithInit(createLatestRef, value).current;
  latest.next = value;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useIsoLayoutEffect(latest.effect);
  return latest;
}
function createLatestRef(value) {
  const latest = {
    current: value,
    next: value,
    effect: () => {
      latest.current = latest.next;
    }
  };
  return latest;
}
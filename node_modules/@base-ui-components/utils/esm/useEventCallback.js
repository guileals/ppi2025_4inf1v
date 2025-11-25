'use client';

import * as React from 'react';
import { useRefWithInit } from "./useRefWithInit.js";

// https://github.com/mui/material-ui/issues/41190#issuecomment-2040873379
const useInsertionEffect = React[`useInsertionEffect${Math.random().toFixed(1)}`.slice(0, -3)];
const useSafeInsertionEffect =
// React 17 doesn't have useInsertionEffect.
useInsertionEffect &&
// Preact replaces useInsertionEffect with useLayoutEffect and fires too late.
useInsertionEffect !== React.useLayoutEffect ? useInsertionEffect : fn => fn();
export function useEventCallback(callback) {
  const stable = useRefWithInit(createStableCallback).current;
  stable.next = callback;
  useSafeInsertionEffect(stable.effect);
  return stable.trampoline;
}
function createStableCallback() {
  const stable = {
    next: undefined,
    callback: assertNotCalled,
    trampoline: (...args) => stable.callback?.(...args),
    effect: () => {
      stable.callback = stable.next;
    }
  };
  return stable;
}
function assertNotCalled() {
  if (process.env.NODE_ENV !== 'production') {
    throw new Error('Base UI: Cannot call an event handler while rendering.');
  }
}
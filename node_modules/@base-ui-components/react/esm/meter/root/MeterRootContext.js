'use client';

import * as React from 'react';
export const MeterRootContext = /*#__PURE__*/React.createContext(undefined);
if (process.env.NODE_ENV !== "production") MeterRootContext.displayName = "MeterRootContext";
export function useMeterRootContext() {
  const context = React.useContext(MeterRootContext);
  if (context === undefined) {
    throw new Error('Base UI: MeterRootContext is missing. Meter parts must be placed within <Meter.Root>.');
  }
  return context;
}
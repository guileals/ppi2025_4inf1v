'use client';

import * as React from 'react';
export const CollapsibleRootContext = /*#__PURE__*/React.createContext(undefined);
if (process.env.NODE_ENV !== "production") CollapsibleRootContext.displayName = "CollapsibleRootContext";
export function useCollapsibleRootContext() {
  const context = React.useContext(CollapsibleRootContext);
  if (context === undefined) {
    throw new Error('Base UI: CollapsibleRootContext is missing. Collapsible parts must be placed within <Collapsible.Root>.');
  }
  return context;
}
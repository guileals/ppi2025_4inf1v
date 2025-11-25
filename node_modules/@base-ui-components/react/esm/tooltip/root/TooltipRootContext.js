'use client';

import * as React from 'react';
export const TooltipRootContext = /*#__PURE__*/React.createContext(undefined);
if (process.env.NODE_ENV !== "production") TooltipRootContext.displayName = "TooltipRootContext";
export function useTooltipRootContext() {
  const context = React.useContext(TooltipRootContext);
  if (context === undefined) {
    throw new Error('Base UI: TooltipRootContext is missing. Tooltip parts must be placed within <Tooltip.Root>.');
  }
  return context;
}
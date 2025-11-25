'use client';

import * as React from 'react';
export const PopoverRootContext = /*#__PURE__*/React.createContext(undefined);
if (process.env.NODE_ENV !== "production") PopoverRootContext.displayName = "PopoverRootContext";
export function usePopoverRootContext(optional) {
  const context = React.useContext(PopoverRootContext);
  if (context === undefined && !optional) {
    throw new Error('Base UI: PopoverRootContext is missing. Popover parts must be placed within <Popover.Root>.');
  }
  return context;
}
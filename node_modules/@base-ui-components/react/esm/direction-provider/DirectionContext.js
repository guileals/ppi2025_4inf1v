'use client';

import * as React from 'react';
/**
 * @internal
 */
export const DirectionContext = /*#__PURE__*/React.createContext(undefined);
if (process.env.NODE_ENV !== "production") DirectionContext.displayName = "DirectionContext";
export function useDirection(optional = true) {
  const context = React.useContext(DirectionContext);
  if (context === undefined && !optional) {
    throw new Error('Base UI: DirectionContext is missing.');
  }
  return context?.direction ?? 'ltr';
}
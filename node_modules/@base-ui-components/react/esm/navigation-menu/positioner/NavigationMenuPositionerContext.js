'use client';

import * as React from 'react';
export const NavigationMenuPositionerContext = /*#__PURE__*/React.createContext(undefined);
if (process.env.NODE_ENV !== "production") NavigationMenuPositionerContext.displayName = "NavigationMenuPositionerContext";
export function useNavigationMenuPositionerContext(optional = false) {
  const context = React.useContext(NavigationMenuPositionerContext);
  if (!context && !optional) {
    throw new Error('Base UI: NavigationMenuPositionerContext is missing. NavigationMenuPositioner parts must be placed within <NavigationMenu.Positioner>.');
  }
  return context;
}
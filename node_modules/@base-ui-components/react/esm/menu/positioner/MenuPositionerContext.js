'use client';

import * as React from 'react';
export const MenuPositionerContext = /*#__PURE__*/React.createContext(undefined);
if (process.env.NODE_ENV !== "production") MenuPositionerContext.displayName = "MenuPositionerContext";
export function useMenuPositionerContext(optional) {
  const context = React.useContext(MenuPositionerContext);
  if (context === undefined && !optional) {
    throw new Error('Base UI: MenuPositionerContext is missing. MenuPositioner parts must be placed within <Menu.Positioner>.');
  }
  return context;
}
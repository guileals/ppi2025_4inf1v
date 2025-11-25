'use client';

import * as React from 'react';
export const MenubarContext = /*#__PURE__*/React.createContext(null);
if (process.env.NODE_ENV !== "production") MenubarContext.displayName = "MenubarContext";
export function useMenubarContext(optional) {
  const context = React.useContext(MenubarContext);
  if (context === null && !optional) {
    throw new Error('Base UI: MenubarContext is missing. Menubar parts must be placed within <Menubar>.');
  }
  return context;
}
'use client';

import * as React from 'react';
export const MenuRootContext = /*#__PURE__*/React.createContext(undefined);
if (process.env.NODE_ENV !== "production") MenuRootContext.displayName = "MenuRootContext";
export function useMenuRootContext(optional) {
  const context = React.useContext(MenuRootContext);
  if (context === undefined && !optional) {
    throw new Error('Base UI: MenuRootContext is missing. Menu parts must be placed within <Menu.Root>.');
  }
  return context;
}
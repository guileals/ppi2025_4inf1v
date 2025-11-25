import * as React from 'react';
export const MenuGroupContext = /*#__PURE__*/React.createContext(undefined);
if (process.env.NODE_ENV !== "production") MenuGroupContext.displayName = "MenuGroupContext";
export function useMenuGroupRootContext() {
  const context = React.useContext(MenuGroupContext);
  if (context === undefined) {
    throw new Error('Base UI: MenuGroupRootContext is missing. Menu group parts must be used within <Menu.Group>.');
  }
  return context;
}
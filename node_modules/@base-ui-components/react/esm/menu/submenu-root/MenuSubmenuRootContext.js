import * as React from 'react';
export const MenuSubmenuRootContext = /*#__PURE__*/React.createContext(false);
if (process.env.NODE_ENV !== "production") MenuSubmenuRootContext.displayName = "MenuSubmenuRootContext";
export function useMenuSubmenuRootContext() {
  return React.useContext(MenuSubmenuRootContext);
}
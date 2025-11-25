import * as React from 'react';
export const NavigationMenuItemContext = /*#__PURE__*/React.createContext(undefined);
if (process.env.NODE_ENV !== "production") NavigationMenuItemContext.displayName = "NavigationMenuItemContext";
export function useNavigationMenuItemContext() {
  const value = React.useContext(NavigationMenuItemContext);
  if (value === undefined) {
    throw new Error('Base UI: NavigationMenuItem parts must be used within a <NavigationMenu.Item>.');
  }
  return value;
}
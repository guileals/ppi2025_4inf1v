import * as React from 'react';
export const MenuRadioGroupContext = /*#__PURE__*/React.createContext(undefined);
if (process.env.NODE_ENV !== "production") MenuRadioGroupContext.displayName = "MenuRadioGroupContext";
export function useMenuRadioGroupContext() {
  const context = React.useContext(MenuRadioGroupContext);
  if (context === undefined) {
    throw new Error('Base UI: MenuRadioGroupContext is missing. MenuRadioGroup parts must be placed within <Menu.RadioGroup>.');
  }
  return context;
}
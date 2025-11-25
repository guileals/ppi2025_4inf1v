import * as React from 'react';
export const ComboboxGroupContext = /*#__PURE__*/React.createContext(undefined);
if (process.env.NODE_ENV !== "production") ComboboxGroupContext.displayName = "ComboboxGroupContext";
export function useComboboxGroupContext() {
  const context = React.useContext(ComboboxGroupContext);
  if (context === undefined) {
    throw new Error('Base UI: ComboboxGroupContext is missing. ComboboxGroup parts must be placed within <Combobox.Group>.');
  }
  return context;
}
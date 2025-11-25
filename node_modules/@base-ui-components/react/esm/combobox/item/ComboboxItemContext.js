import * as React from 'react';
export const ComboboxItemContext = /*#__PURE__*/React.createContext(undefined);
if (process.env.NODE_ENV !== "production") ComboboxItemContext.displayName = "ComboboxItemContext";
export function useComboboxItemContext() {
  const context = React.useContext(ComboboxItemContext);
  if (!context) {
    throw new Error('Base UI: ComboboxItemContext is missing. ComboboxItem parts must be placed within <Combobox.Item>.');
  }
  return context;
}
import * as React from 'react';
export const ComboboxRootContext = /*#__PURE__*/React.createContext(undefined);
if (process.env.NODE_ENV !== "production") ComboboxRootContext.displayName = "ComboboxRootContext";
export const ComboboxFloatingContext = /*#__PURE__*/React.createContext(undefined);
if (process.env.NODE_ENV !== "production") ComboboxFloatingContext.displayName = "ComboboxFloatingContext";
export const ComboboxDerivedItemsContext = /*#__PURE__*/React.createContext(undefined);
if (process.env.NODE_ENV !== "production") ComboboxDerivedItemsContext.displayName = "ComboboxDerivedItemsContext";
export function useComboboxRootContext() {
  const context = React.useContext(ComboboxRootContext);
  if (!context) {
    throw new Error('Base UI: ComboboxRootContext is missing. Combobox parts must be placed within <Combobox.Root>.');
  }
  return context;
}
export function useComboboxFloatingContext() {
  const context = React.useContext(ComboboxFloatingContext);
  if (!context) {
    throw new Error('Base UI: ComboboxFloatingContext is missing. Combobox parts must be placed within <Combobox.Root>.');
  }
  return context;
}
export function useComboboxDerivedItemsContext() {
  const context = React.useContext(ComboboxDerivedItemsContext);
  if (!context) {
    throw new Error('Base UI: ComboboxItemsContext is missing. Combobox parts must be placed within <Combobox.Root>.');
  }
  return context;
}
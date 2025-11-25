import * as React from 'react';
export const SelectItemContext = /*#__PURE__*/React.createContext(undefined);
if (process.env.NODE_ENV !== "production") SelectItemContext.displayName = "SelectItemContext";
export function useSelectItemContext() {
  const context = React.useContext(SelectItemContext);
  if (!context) {
    throw new Error('Base UI: SelectItemContext is missing. SelectItem parts must be placed within <Select.Item>.');
  }
  return context;
}
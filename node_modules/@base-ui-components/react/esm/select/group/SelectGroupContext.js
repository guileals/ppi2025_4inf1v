import * as React from 'react';
export const SelectGroupContext = /*#__PURE__*/React.createContext(undefined);
if (process.env.NODE_ENV !== "production") SelectGroupContext.displayName = "SelectGroupContext";
export function useSelectGroupContext() {
  const context = React.useContext(SelectGroupContext);
  if (context === undefined) {
    throw new Error('Base UI: SelectGroupContext is missing. SelectGroup parts must be placed within <Select.Group>.');
  }
  return context;
}
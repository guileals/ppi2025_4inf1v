import * as React from 'react';
export const SelectPortalContext = /*#__PURE__*/React.createContext(undefined);
if (process.env.NODE_ENV !== "production") SelectPortalContext.displayName = "SelectPortalContext";
export function useSelectPortalContext() {
  const value = React.useContext(SelectPortalContext);
  if (value === undefined) {
    throw new Error('Base UI: <Select.Portal> is missing.');
  }
  return value;
}
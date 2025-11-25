'use client';

import * as React from 'react';
export const FieldsetRootContext = /*#__PURE__*/React.createContext({
  legendId: undefined,
  setLegendId: () => {},
  disabled: undefined
});
if (process.env.NODE_ENV !== "production") FieldsetRootContext.displayName = "FieldsetRootContext";
export function useFieldsetRootContext() {
  return React.useContext(FieldsetRootContext);
}
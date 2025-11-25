'use client';

import * as React from 'react';
export const CheckboxRootContext = /*#__PURE__*/React.createContext(undefined);
if (process.env.NODE_ENV !== "production") CheckboxRootContext.displayName = "CheckboxRootContext";
export function useCheckboxRootContext() {
  const context = React.useContext(CheckboxRootContext);
  if (context === undefined) {
    throw new Error('Base UI: CheckboxRootContext is missing. Checkbox parts must be placed within <Checkbox.Root>.');
  }
  return context;
}
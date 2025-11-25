'use client';

import * as React from 'react';
export const NumberFieldRootContext = /*#__PURE__*/React.createContext(undefined);
if (process.env.NODE_ENV !== "production") NumberFieldRootContext.displayName = "NumberFieldRootContext";
export function useNumberFieldRootContext() {
  const context = React.useContext(NumberFieldRootContext);
  if (context === undefined) {
    throw new Error('Base UI: NumberFieldRootContext is missing. NumberField parts must be placed within <NumberField.Root>.');
  }
  return context;
}
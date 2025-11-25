import * as React from 'react';
export const SwitchRootContext = /*#__PURE__*/React.createContext(undefined);
if (process.env.NODE_ENV !== "production") SwitchRootContext.displayName = "SwitchRootContext";
export function useSwitchRootContext() {
  const context = React.useContext(SwitchRootContext);
  if (context === undefined) {
    throw new Error('Base UI: SwitchRootContext is missing. Switch parts must be placed within <Switch.Root>.');
  }
  return context;
}
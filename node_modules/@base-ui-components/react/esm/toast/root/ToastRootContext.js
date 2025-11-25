import * as React from 'react';
export const ToastRootContext = /*#__PURE__*/React.createContext(undefined);
if (process.env.NODE_ENV !== "production") ToastRootContext.displayName = "ToastRootContext";
export function useToastRootContext() {
  const context = React.useContext(ToastRootContext);
  if (!context) {
    throw new Error('Base UI: ToastRootContext is missing. Toast parts must be used within <Toast.Root>.');
  }
  return context;
}
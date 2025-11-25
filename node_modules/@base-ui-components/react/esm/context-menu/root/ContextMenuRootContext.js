import * as React from 'react';
export const ContextMenuRootContext = /*#__PURE__*/React.createContext(undefined);
if (process.env.NODE_ENV !== "production") ContextMenuRootContext.displayName = "ContextMenuRootContext";
export function useContextMenuRootContext(optional = true) {
  const context = React.useContext(ContextMenuRootContext);
  if (context === undefined && !optional) {
    throw new Error('Base UI: ContextMenuRootContext is missing. ContextMenu parts must be placed within <ContextMenu.Root>.');
  }
  return context;
}
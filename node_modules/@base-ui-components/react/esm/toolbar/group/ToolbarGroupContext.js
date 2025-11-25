import * as React from 'react';
export const ToolbarGroupContext = /*#__PURE__*/React.createContext(undefined);
if (process.env.NODE_ENV !== "production") ToolbarGroupContext.displayName = "ToolbarGroupContext";
export function useToolbarGroupContext(optional) {
  const context = React.useContext(ToolbarGroupContext);
  if (context === undefined && !optional) {
    throw new Error('Base UI: ToolbarGroupContext is missing. ToolbarGroup parts must be placed within <Toolbar.Group>.');
  }
  return context;
}
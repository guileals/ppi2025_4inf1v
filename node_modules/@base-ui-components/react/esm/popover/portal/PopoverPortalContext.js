import * as React from 'react';
export const PopoverPortalContext = /*#__PURE__*/React.createContext(undefined);
if (process.env.NODE_ENV !== "production") PopoverPortalContext.displayName = "PopoverPortalContext";
export function usePopoverPortalContext() {
  const value = React.useContext(PopoverPortalContext);
  if (value === undefined) {
    throw new Error('Base UI: <Popover.Portal> is missing.');
  }
  return value;
}
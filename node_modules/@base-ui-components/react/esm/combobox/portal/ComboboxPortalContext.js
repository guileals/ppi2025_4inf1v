import * as React from 'react';
export const ComboboxPortalContext = /*#__PURE__*/React.createContext(undefined);
if (process.env.NODE_ENV !== "production") ComboboxPortalContext.displayName = "ComboboxPortalContext";
export function useComboboxPortalContext() {
  const context = React.useContext(ComboboxPortalContext);
  if (context === undefined) {
    throw new Error('Base UI: <Combobox.Portal> is missing.');
  }
  return context;
}
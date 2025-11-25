import * as React from 'react';
export const AlertDialogPortalContext = /*#__PURE__*/React.createContext(undefined);
if (process.env.NODE_ENV !== "production") AlertDialogPortalContext.displayName = "AlertDialogPortalContext";
export function useAlertDialogPortalContext() {
  const value = React.useContext(AlertDialogPortalContext);
  if (value === undefined) {
    throw new Error('Base UI: <AlertDialog.Portal> is missing.');
  }
  return value;
}
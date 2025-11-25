'use client';

import * as React from 'react';

/**
 * Common context for dialog & dialog alert components.
 */

export const DialogContext = /*#__PURE__*/React.createContext(undefined);
if (process.env.NODE_ENV !== "production") DialogContext.displayName = "DialogContext";
export function useDialogContext() {
  return React.useContext(DialogContext);
}
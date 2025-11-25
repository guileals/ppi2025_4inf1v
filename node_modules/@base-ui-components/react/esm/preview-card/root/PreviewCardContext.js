'use client';

import * as React from 'react';
export const PreviewCardRootContext = /*#__PURE__*/React.createContext(undefined);
if (process.env.NODE_ENV !== "production") PreviewCardRootContext.displayName = "PreviewCardRootContext";
export function usePreviewCardRootContext() {
  const context = React.useContext(PreviewCardRootContext);
  if (context === undefined) {
    throw new Error('Base UI: PreviewCardRootContext is missing. PreviewCard parts must be placed within <PreviewCard.Root>.');
  }
  return context;
}
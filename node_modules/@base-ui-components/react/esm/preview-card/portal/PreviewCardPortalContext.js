import * as React from 'react';
export const PreviewCardPortalContext = /*#__PURE__*/React.createContext(undefined);
if (process.env.NODE_ENV !== "production") PreviewCardPortalContext.displayName = "PreviewCardPortalContext";
export function usePreviewCardPortalContext() {
  const value = React.useContext(PreviewCardPortalContext);
  if (value === undefined) {
    throw new Error('Base UI: <PreviewCard.Portal> is missing.');
  }
  return value;
}
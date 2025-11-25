import * as React from 'react';
export const ScrollAreaViewportContext = /*#__PURE__*/React.createContext(undefined);
if (process.env.NODE_ENV !== "production") ScrollAreaViewportContext.displayName = "ScrollAreaViewportContext";
export function useScrollAreaViewportContext() {
  const context = React.useContext(ScrollAreaViewportContext);
  if (context === undefined) {
    throw new Error('Base UI: ScrollAreaViewportContext missing. ScrollAreaViewport parts must be placed within <ScrollArea.Viewport>.');
  }
  return context;
}
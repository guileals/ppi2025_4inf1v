"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TabsListContext = void 0;
exports.useTabsListContext = useTabsListContext;
var React = _interopRequireWildcard(require("react"));
const TabsListContext = exports.TabsListContext = /*#__PURE__*/React.createContext(undefined);
if (process.env.NODE_ENV !== "production") TabsListContext.displayName = "TabsListContext";
function useTabsListContext() {
  const context = React.useContext(TabsListContext);
  if (context === undefined) {
    throw new Error('Base UI: TabsListContext is missing. TabsList parts must be placed within <Tabs.List>.');
  }
  return context;
}
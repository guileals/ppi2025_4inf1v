"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CollapsibleRootContext = void 0;
exports.useCollapsibleRootContext = useCollapsibleRootContext;
var React = _interopRequireWildcard(require("react"));
const CollapsibleRootContext = exports.CollapsibleRootContext = /*#__PURE__*/React.createContext(undefined);
if (process.env.NODE_ENV !== "production") CollapsibleRootContext.displayName = "CollapsibleRootContext";
function useCollapsibleRootContext() {
  const context = React.useContext(CollapsibleRootContext);
  if (context === undefined) {
    throw new Error('Base UI: CollapsibleRootContext is missing. Collapsible parts must be placed within <Collapsible.Root>.');
  }
  return context;
}
"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToolbarRootContext = void 0;
exports.useToolbarRootContext = useToolbarRootContext;
var React = _interopRequireWildcard(require("react"));
const ToolbarRootContext = exports.ToolbarRootContext = /*#__PURE__*/React.createContext(undefined);
if (process.env.NODE_ENV !== "production") ToolbarRootContext.displayName = "ToolbarRootContext";
function useToolbarRootContext(optional) {
  const context = React.useContext(ToolbarRootContext);
  if (context === undefined && !optional) {
    throw new Error('Base UI: ToolbarRootContext is missing. Toolbar parts must be placed within <Toolbar.Root>.');
  }
  return context;
}
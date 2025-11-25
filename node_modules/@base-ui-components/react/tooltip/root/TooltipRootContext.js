"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TooltipRootContext = void 0;
exports.useTooltipRootContext = useTooltipRootContext;
var React = _interopRequireWildcard(require("react"));
const TooltipRootContext = exports.TooltipRootContext = /*#__PURE__*/React.createContext(undefined);
if (process.env.NODE_ENV !== "production") TooltipRootContext.displayName = "TooltipRootContext";
function useTooltipRootContext() {
  const context = React.useContext(TooltipRootContext);
  if (context === undefined) {
    throw new Error('Base UI: TooltipRootContext is missing. Tooltip parts must be placed within <Tooltip.Root>.');
  }
  return context;
}
"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToggleGroupContext = void 0;
exports.useToggleGroupContext = useToggleGroupContext;
var React = _interopRequireWildcard(require("react"));
const ToggleGroupContext = exports.ToggleGroupContext = /*#__PURE__*/React.createContext(undefined);
if (process.env.NODE_ENV !== "production") ToggleGroupContext.displayName = "ToggleGroupContext";
function useToggleGroupContext(optional = true) {
  const context = React.useContext(ToggleGroupContext);
  if (context === undefined && !optional) {
    throw new Error('Base UI: ToggleGroupContext is missing. ToggleGroup parts must be placed within <ToggleGroup>.');
  }
  return context;
}
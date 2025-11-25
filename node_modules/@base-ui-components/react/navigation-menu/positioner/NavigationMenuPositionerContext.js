"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavigationMenuPositionerContext = void 0;
exports.useNavigationMenuPositionerContext = useNavigationMenuPositionerContext;
var React = _interopRequireWildcard(require("react"));
const NavigationMenuPositionerContext = exports.NavigationMenuPositionerContext = /*#__PURE__*/React.createContext(undefined);
if (process.env.NODE_ENV !== "production") NavigationMenuPositionerContext.displayName = "NavigationMenuPositionerContext";
function useNavigationMenuPositionerContext(optional = false) {
  const context = React.useContext(NavigationMenuPositionerContext);
  if (!context && !optional) {
    throw new Error('Base UI: NavigationMenuPositionerContext is missing. NavigationMenuPositioner parts must be placed within <NavigationMenu.Positioner>.');
  }
  return context;
}
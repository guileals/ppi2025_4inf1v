"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavigationMenuTreeContext = exports.NavigationMenuRootContext = void 0;
exports.useNavigationMenuRootContext = useNavigationMenuRootContext;
exports.useNavigationMenuTreeContext = useNavigationMenuTreeContext;
var React = _interopRequireWildcard(require("react"));
const NavigationMenuRootContext = exports.NavigationMenuRootContext = /*#__PURE__*/React.createContext(undefined);
if (process.env.NODE_ENV !== "production") NavigationMenuRootContext.displayName = "NavigationMenuRootContext";
if (process.env.NODE_ENV !== 'production') {
  NavigationMenuRootContext.displayName = 'NavigationMenuRootContext';
}
function useNavigationMenuRootContext(optional) {
  const context = React.useContext(NavigationMenuRootContext);
  if (context === undefined && !optional) {
    throw new Error('Base UI: NavigationMenuRootContext is missing. Navigation Menu parts must be placed within <NavigationMenu.Root>.');
  }
  return context;
}
const NavigationMenuTreeContext = exports.NavigationMenuTreeContext = /*#__PURE__*/React.createContext(undefined);
if (process.env.NODE_ENV !== "production") NavigationMenuTreeContext.displayName = "NavigationMenuTreeContext";
function useNavigationMenuTreeContext() {
  return React.useContext(NavigationMenuTreeContext);
}
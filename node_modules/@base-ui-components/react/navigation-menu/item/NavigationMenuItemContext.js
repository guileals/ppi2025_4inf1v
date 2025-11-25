"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NavigationMenuItemContext = void 0;
exports.useNavigationMenuItemContext = useNavigationMenuItemContext;
var React = _interopRequireWildcard(require("react"));
const NavigationMenuItemContext = exports.NavigationMenuItemContext = /*#__PURE__*/React.createContext(undefined);
if (process.env.NODE_ENV !== "production") NavigationMenuItemContext.displayName = "NavigationMenuItemContext";
function useNavigationMenuItemContext() {
  const value = React.useContext(NavigationMenuItemContext);
  if (value === undefined) {
    throw new Error('Base UI: NavigationMenuItem parts must be used within a <NavigationMenu.Item>.');
  }
  return value;
}
"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MenuGroupContext = void 0;
exports.useMenuGroupRootContext = useMenuGroupRootContext;
var React = _interopRequireWildcard(require("react"));
const MenuGroupContext = exports.MenuGroupContext = /*#__PURE__*/React.createContext(undefined);
if (process.env.NODE_ENV !== "production") MenuGroupContext.displayName = "MenuGroupContext";
function useMenuGroupRootContext() {
  const context = React.useContext(MenuGroupContext);
  if (context === undefined) {
    throw new Error('Base UI: MenuGroupRootContext is missing. Menu group parts must be used within <Menu.Group>.');
  }
  return context;
}
"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MenubarContext = void 0;
exports.useMenubarContext = useMenubarContext;
var React = _interopRequireWildcard(require("react"));
const MenubarContext = exports.MenubarContext = /*#__PURE__*/React.createContext(null);
if (process.env.NODE_ENV !== "production") MenubarContext.displayName = "MenubarContext";
function useMenubarContext(optional) {
  const context = React.useContext(MenubarContext);
  if (context === null && !optional) {
    throw new Error('Base UI: MenubarContext is missing. Menubar parts must be placed within <Menubar>.');
  }
  return context;
}
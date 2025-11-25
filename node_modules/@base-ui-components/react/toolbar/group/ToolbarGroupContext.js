"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToolbarGroupContext = void 0;
exports.useToolbarGroupContext = useToolbarGroupContext;
var React = _interopRequireWildcard(require("react"));
const ToolbarGroupContext = exports.ToolbarGroupContext = /*#__PURE__*/React.createContext(undefined);
if (process.env.NODE_ENV !== "production") ToolbarGroupContext.displayName = "ToolbarGroupContext";
function useToolbarGroupContext(optional) {
  const context = React.useContext(ToolbarGroupContext);
  if (context === undefined && !optional) {
    throw new Error('Base UI: ToolbarGroupContext is missing. ToolbarGroup parts must be placed within <Toolbar.Group>.');
  }
  return context;
}
"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContextMenuRootContext = void 0;
exports.useContextMenuRootContext = useContextMenuRootContext;
var React = _interopRequireWildcard(require("react"));
const ContextMenuRootContext = exports.ContextMenuRootContext = /*#__PURE__*/React.createContext(undefined);
if (process.env.NODE_ENV !== "production") ContextMenuRootContext.displayName = "ContextMenuRootContext";
function useContextMenuRootContext(optional = true) {
  const context = React.useContext(ContextMenuRootContext);
  if (context === undefined && !optional) {
    throw new Error('Base UI: ContextMenuRootContext is missing. ContextMenu parts must be placed within <ContextMenu.Root>.');
  }
  return context;
}
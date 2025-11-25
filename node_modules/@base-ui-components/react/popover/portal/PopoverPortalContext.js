"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PopoverPortalContext = void 0;
exports.usePopoverPortalContext = usePopoverPortalContext;
var React = _interopRequireWildcard(require("react"));
const PopoverPortalContext = exports.PopoverPortalContext = /*#__PURE__*/React.createContext(undefined);
if (process.env.NODE_ENV !== "production") PopoverPortalContext.displayName = "PopoverPortalContext";
function usePopoverPortalContext() {
  const value = React.useContext(PopoverPortalContext);
  if (value === undefined) {
    throw new Error('Base UI: <Popover.Portal> is missing.');
  }
  return value;
}
"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectPortalContext = void 0;
exports.useSelectPortalContext = useSelectPortalContext;
var React = _interopRequireWildcard(require("react"));
const SelectPortalContext = exports.SelectPortalContext = /*#__PURE__*/React.createContext(undefined);
if (process.env.NODE_ENV !== "production") SelectPortalContext.displayName = "SelectPortalContext";
function useSelectPortalContext() {
  const value = React.useContext(SelectPortalContext);
  if (value === undefined) {
    throw new Error('Base UI: <Select.Portal> is missing.');
  }
  return value;
}
"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectPositionerContext = void 0;
exports.useSelectPositionerContext = useSelectPositionerContext;
var React = _interopRequireWildcard(require("react"));
const SelectPositionerContext = exports.SelectPositionerContext = /*#__PURE__*/React.createContext(undefined);
if (process.env.NODE_ENV !== "production") SelectPositionerContext.displayName = "SelectPositionerContext";
function useSelectPositionerContext() {
  const context = React.useContext(SelectPositionerContext);
  if (!context) {
    throw new Error('Base UI: SelectPositionerContext is missing. SelectPositioner parts must be placed within <Select.Positioner>.');
  }
  return context;
}
"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectItemContext = void 0;
exports.useSelectItemContext = useSelectItemContext;
var React = _interopRequireWildcard(require("react"));
const SelectItemContext = exports.SelectItemContext = /*#__PURE__*/React.createContext(undefined);
if (process.env.NODE_ENV !== "production") SelectItemContext.displayName = "SelectItemContext";
function useSelectItemContext() {
  const context = React.useContext(SelectItemContext);
  if (!context) {
    throw new Error('Base UI: SelectItemContext is missing. SelectItem parts must be placed within <Select.Item>.');
  }
  return context;
}
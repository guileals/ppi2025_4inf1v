"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectGroupContext = void 0;
exports.useSelectGroupContext = useSelectGroupContext;
var React = _interopRequireWildcard(require("react"));
const SelectGroupContext = exports.SelectGroupContext = /*#__PURE__*/React.createContext(undefined);
if (process.env.NODE_ENV !== "production") SelectGroupContext.displayName = "SelectGroupContext";
function useSelectGroupContext() {
  const context = React.useContext(SelectGroupContext);
  if (context === undefined) {
    throw new Error('Base UI: SelectGroupContext is missing. SelectGroup parts must be placed within <Select.Group>.');
  }
  return context;
}
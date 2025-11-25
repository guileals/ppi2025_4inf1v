"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectRootContext = exports.SelectFloatingContext = void 0;
exports.useSelectFloatingContext = useSelectFloatingContext;
exports.useSelectRootContext = useSelectRootContext;
var React = _interopRequireWildcard(require("react"));
const SelectRootContext = exports.SelectRootContext = /*#__PURE__*/React.createContext(null);
if (process.env.NODE_ENV !== "production") SelectRootContext.displayName = "SelectRootContext";
const SelectFloatingContext = exports.SelectFloatingContext = /*#__PURE__*/React.createContext(null);
if (process.env.NODE_ENV !== "production") SelectFloatingContext.displayName = "SelectFloatingContext";
function useSelectRootContext() {
  const context = React.useContext(SelectRootContext);
  if (context === null) {
    throw new Error('Base UI: SelectRootContext is missing. Select parts must be placed within <Select.Root>.');
  }
  return context;
}
function useSelectFloatingContext() {
  const context = React.useContext(SelectFloatingContext);
  if (context === null) {
    throw new Error('Base UI: SelectFloatingContext is missing. Select parts must be placed within <Select.Root>.');
  }
  return context;
}
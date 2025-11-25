"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ComboboxRootContext = exports.ComboboxFloatingContext = exports.ComboboxDerivedItemsContext = void 0;
exports.useComboboxDerivedItemsContext = useComboboxDerivedItemsContext;
exports.useComboboxFloatingContext = useComboboxFloatingContext;
exports.useComboboxRootContext = useComboboxRootContext;
var React = _interopRequireWildcard(require("react"));
const ComboboxRootContext = exports.ComboboxRootContext = /*#__PURE__*/React.createContext(undefined);
if (process.env.NODE_ENV !== "production") ComboboxRootContext.displayName = "ComboboxRootContext";
const ComboboxFloatingContext = exports.ComboboxFloatingContext = /*#__PURE__*/React.createContext(undefined);
if (process.env.NODE_ENV !== "production") ComboboxFloatingContext.displayName = "ComboboxFloatingContext";
const ComboboxDerivedItemsContext = exports.ComboboxDerivedItemsContext = /*#__PURE__*/React.createContext(undefined);
if (process.env.NODE_ENV !== "production") ComboboxDerivedItemsContext.displayName = "ComboboxDerivedItemsContext";
function useComboboxRootContext() {
  const context = React.useContext(ComboboxRootContext);
  if (!context) {
    throw new Error('Base UI: ComboboxRootContext is missing. Combobox parts must be placed within <Combobox.Root>.');
  }
  return context;
}
function useComboboxFloatingContext() {
  const context = React.useContext(ComboboxFloatingContext);
  if (!context) {
    throw new Error('Base UI: ComboboxFloatingContext is missing. Combobox parts must be placed within <Combobox.Root>.');
  }
  return context;
}
function useComboboxDerivedItemsContext() {
  const context = React.useContext(ComboboxDerivedItemsContext);
  if (!context) {
    throw new Error('Base UI: ComboboxItemsContext is missing. Combobox parts must be placed within <Combobox.Root>.');
  }
  return context;
}
"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ComboboxGroupContext = void 0;
exports.useComboboxGroupContext = useComboboxGroupContext;
var React = _interopRequireWildcard(require("react"));
const ComboboxGroupContext = exports.ComboboxGroupContext = /*#__PURE__*/React.createContext(undefined);
if (process.env.NODE_ENV !== "production") ComboboxGroupContext.displayName = "ComboboxGroupContext";
function useComboboxGroupContext() {
  const context = React.useContext(ComboboxGroupContext);
  if (context === undefined) {
    throw new Error('Base UI: ComboboxGroupContext is missing. ComboboxGroup parts must be placed within <Combobox.Group>.');
  }
  return context;
}
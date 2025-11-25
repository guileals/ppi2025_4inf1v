"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ComboboxItemContext = void 0;
exports.useComboboxItemContext = useComboboxItemContext;
var React = _interopRequireWildcard(require("react"));
const ComboboxItemContext = exports.ComboboxItemContext = /*#__PURE__*/React.createContext(undefined);
if (process.env.NODE_ENV !== "production") ComboboxItemContext.displayName = "ComboboxItemContext";
function useComboboxItemContext() {
  const context = React.useContext(ComboboxItemContext);
  if (!context) {
    throw new Error('Base UI: ComboboxItemContext is missing. ComboboxItem parts must be placed within <Combobox.Item>.');
  }
  return context;
}
"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ComboboxChipContext = void 0;
exports.useComboboxChipContext = useComboboxChipContext;
var React = _interopRequireWildcard(require("react"));
const ComboboxChipContext = exports.ComboboxChipContext = /*#__PURE__*/React.createContext(undefined);
if (process.env.NODE_ENV !== "production") ComboboxChipContext.displayName = "ComboboxChipContext";
function useComboboxChipContext() {
  const context = React.useContext(ComboboxChipContext);
  if (!context) {
    throw new Error('useComboboxChipContext must be used within a ComboboxChip');
  }
  return context;
}
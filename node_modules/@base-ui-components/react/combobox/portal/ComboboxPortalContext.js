"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ComboboxPortalContext = void 0;
exports.useComboboxPortalContext = useComboboxPortalContext;
var React = _interopRequireWildcard(require("react"));
const ComboboxPortalContext = exports.ComboboxPortalContext = /*#__PURE__*/React.createContext(undefined);
if (process.env.NODE_ENV !== "production") ComboboxPortalContext.displayName = "ComboboxPortalContext";
function useComboboxPortalContext() {
  const context = React.useContext(ComboboxPortalContext);
  if (context === undefined) {
    throw new Error('Base UI: <Combobox.Portal> is missing.');
  }
  return context;
}
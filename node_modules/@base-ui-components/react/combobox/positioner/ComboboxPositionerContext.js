"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ComboboxPositionerContext = void 0;
exports.useComboboxPositionerContext = useComboboxPositionerContext;
var React = _interopRequireWildcard(require("react"));
const ComboboxPositionerContext = exports.ComboboxPositionerContext = /*#__PURE__*/React.createContext(undefined);
if (process.env.NODE_ENV !== "production") ComboboxPositionerContext.displayName = "ComboboxPositionerContext";
function useComboboxPositionerContext(optional) {
  const context = React.useContext(ComboboxPositionerContext);
  if (context === undefined && !optional) {
    throw new Error('Base UI: <Combobox.Popup> and <Combobox.Arrow> must be used within the <Combobox.Positioner> component');
  }
  return context;
}
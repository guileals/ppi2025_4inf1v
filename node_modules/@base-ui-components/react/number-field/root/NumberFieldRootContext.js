"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NumberFieldRootContext = void 0;
exports.useNumberFieldRootContext = useNumberFieldRootContext;
var React = _interopRequireWildcard(require("react"));
const NumberFieldRootContext = exports.NumberFieldRootContext = /*#__PURE__*/React.createContext(undefined);
if (process.env.NODE_ENV !== "production") NumberFieldRootContext.displayName = "NumberFieldRootContext";
function useNumberFieldRootContext() {
  const context = React.useContext(NumberFieldRootContext);
  if (context === undefined) {
    throw new Error('Base UI: NumberFieldRootContext is missing. NumberField parts must be placed within <NumberField.Root>.');
  }
  return context;
}
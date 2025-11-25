"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RadioRootContext = void 0;
exports.useRadioRootContext = useRadioRootContext;
var React = _interopRequireWildcard(require("react"));
const RadioRootContext = exports.RadioRootContext = /*#__PURE__*/React.createContext(undefined);
if (process.env.NODE_ENV !== "production") RadioRootContext.displayName = "RadioRootContext";
function useRadioRootContext() {
  const value = React.useContext(RadioRootContext);
  if (value === undefined) {
    throw new Error('Base UI: RadioRootContext is missing. Radio parts must be placed within <Radio.Root>.');
  }
  return value;
}
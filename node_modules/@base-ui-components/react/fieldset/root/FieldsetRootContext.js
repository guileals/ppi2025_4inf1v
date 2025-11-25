"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FieldsetRootContext = void 0;
exports.useFieldsetRootContext = useFieldsetRootContext;
var React = _interopRequireWildcard(require("react"));
const FieldsetRootContext = exports.FieldsetRootContext = /*#__PURE__*/React.createContext({
  legendId: undefined,
  setLegendId: () => {},
  disabled: undefined
});
if (process.env.NODE_ENV !== "production") FieldsetRootContext.displayName = "FieldsetRootContext";
function useFieldsetRootContext() {
  return React.useContext(FieldsetRootContext);
}
"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MeterRootContext = void 0;
exports.useMeterRootContext = useMeterRootContext;
var React = _interopRequireWildcard(require("react"));
const MeterRootContext = exports.MeterRootContext = /*#__PURE__*/React.createContext(undefined);
if (process.env.NODE_ENV !== "production") MeterRootContext.displayName = "MeterRootContext";
function useMeterRootContext() {
  const context = React.useContext(MeterRootContext);
  if (context === undefined) {
    throw new Error('Base UI: MeterRootContext is missing. Meter parts must be placed within <Meter.Root>.');
  }
  return context;
}
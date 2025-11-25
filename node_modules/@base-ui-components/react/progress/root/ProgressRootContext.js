"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProgressRootContext = void 0;
exports.useProgressRootContext = useProgressRootContext;
var React = _interopRequireWildcard(require("react"));
/**
 * @internal
 */
const ProgressRootContext = exports.ProgressRootContext = /*#__PURE__*/React.createContext(undefined);
if (process.env.NODE_ENV !== "production") ProgressRootContext.displayName = "ProgressRootContext";
function useProgressRootContext() {
  const context = React.useContext(ProgressRootContext);
  if (context === undefined) {
    throw new Error('Base UI: ProgressRootContext is missing. Progress parts must be placed within <Progress.Root>.');
  }
  return context;
}
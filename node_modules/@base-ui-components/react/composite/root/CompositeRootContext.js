"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CompositeRootContext = void 0;
exports.useCompositeRootContext = useCompositeRootContext;
var React = _interopRequireWildcard(require("react"));
const CompositeRootContext = exports.CompositeRootContext = /*#__PURE__*/React.createContext(undefined);
if (process.env.NODE_ENV !== "production") CompositeRootContext.displayName = "CompositeRootContext";
function useCompositeRootContext(optional = false) {
  const context = React.useContext(CompositeRootContext);
  if (context === undefined && !optional) {
    throw new Error('Base UI: CompositeRootContext is missing. Composite parts must be placed within <Composite.Root>.');
  }
  return context;
}
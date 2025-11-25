"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DirectionContext = void 0;
exports.useDirection = useDirection;
var React = _interopRequireWildcard(require("react"));
/**
 * @internal
 */
const DirectionContext = exports.DirectionContext = /*#__PURE__*/React.createContext(undefined);
if (process.env.NODE_ENV !== "production") DirectionContext.displayName = "DirectionContext";
function useDirection(optional = true) {
  const context = React.useContext(DirectionContext);
  if (context === undefined && !optional) {
    throw new Error('Base UI: DirectionContext is missing.');
  }
  return context?.direction ?? 'ltr';
}
"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AvatarRootContext = void 0;
exports.useAvatarRootContext = useAvatarRootContext;
var React = _interopRequireWildcard(require("react"));
const AvatarRootContext = exports.AvatarRootContext = /*#__PURE__*/React.createContext(undefined);
if (process.env.NODE_ENV !== "production") AvatarRootContext.displayName = "AvatarRootContext";
function useAvatarRootContext() {
  const context = React.useContext(AvatarRootContext);
  if (context === undefined) {
    throw new Error('Base UI: AvatarRootContext is missing. Avatar parts must be placed within <Avatar.Root>.');
  }
  return context;
}
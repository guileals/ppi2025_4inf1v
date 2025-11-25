"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PreviewCardRootContext = void 0;
exports.usePreviewCardRootContext = usePreviewCardRootContext;
var React = _interopRequireWildcard(require("react"));
const PreviewCardRootContext = exports.PreviewCardRootContext = /*#__PURE__*/React.createContext(undefined);
if (process.env.NODE_ENV !== "production") PreviewCardRootContext.displayName = "PreviewCardRootContext";
function usePreviewCardRootContext() {
  const context = React.useContext(PreviewCardRootContext);
  if (context === undefined) {
    throw new Error('Base UI: PreviewCardRootContext is missing. PreviewCard parts must be placed within <PreviewCard.Root>.');
  }
  return context;
}
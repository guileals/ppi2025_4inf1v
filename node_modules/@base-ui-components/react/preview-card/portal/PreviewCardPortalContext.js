"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PreviewCardPortalContext = void 0;
exports.usePreviewCardPortalContext = usePreviewCardPortalContext;
var React = _interopRequireWildcard(require("react"));
const PreviewCardPortalContext = exports.PreviewCardPortalContext = /*#__PURE__*/React.createContext(undefined);
if (process.env.NODE_ENV !== "production") PreviewCardPortalContext.displayName = "PreviewCardPortalContext";
function usePreviewCardPortalContext() {
  const value = React.useContext(PreviewCardPortalContext);
  if (value === undefined) {
    throw new Error('Base UI: <PreviewCard.Portal> is missing.');
  }
  return value;
}
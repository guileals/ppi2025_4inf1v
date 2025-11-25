"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DialogPortalContext = void 0;
exports.useDialogPortalContext = useDialogPortalContext;
var React = _interopRequireWildcard(require("react"));
const DialogPortalContext = exports.DialogPortalContext = /*#__PURE__*/React.createContext(undefined);
if (process.env.NODE_ENV !== "production") DialogPortalContext.displayName = "DialogPortalContext";
function useDialogPortalContext() {
  const value = React.useContext(DialogPortalContext);
  if (value === undefined) {
    throw new Error('Base UI: <Dialog.Portal> is missing.');
  }
  return value;
}
"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlertDialogPortalContext = void 0;
exports.useAlertDialogPortalContext = useAlertDialogPortalContext;
var React = _interopRequireWildcard(require("react"));
const AlertDialogPortalContext = exports.AlertDialogPortalContext = /*#__PURE__*/React.createContext(undefined);
if (process.env.NODE_ENV !== "production") AlertDialogPortalContext.displayName = "AlertDialogPortalContext";
function useAlertDialogPortalContext() {
  const value = React.useContext(AlertDialogPortalContext);
  if (value === undefined) {
    throw new Error('Base UI: <AlertDialog.Portal> is missing.');
  }
  return value;
}
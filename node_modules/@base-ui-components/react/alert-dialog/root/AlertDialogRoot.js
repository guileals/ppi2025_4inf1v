"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlertDialogRoot = void 0;
var React = _interopRequireWildcard(require("react"));
var _AlertDialogRootContext = require("./AlertDialogRootContext");
var _useDialogRoot = require("../../dialog/root/useDialogRoot");
var _jsxRuntime = require("react/jsx-runtime");
/**
 * Groups all parts of the alert dialog.
 * Doesn’t render its own HTML element.
 *
 * Documentation: [Base UI Alert Dialog](https://base-ui.com/react/components/alert-dialog)
 */
const AlertDialogRoot = exports.AlertDialogRoot = function AlertDialogRoot(props) {
  const {
    children,
    defaultOpen = false,
    onOpenChange,
    onOpenChangeComplete,
    open,
    actionsRef
  } = props;
  const parentDialogRootContext = React.useContext(_AlertDialogRootContext.AlertDialogRootContext);
  const dialogRoot = (0, _useDialogRoot.useDialogRoot)({
    open,
    defaultOpen,
    onOpenChange,
    actionsRef,
    onOpenChangeComplete,
    modal: true,
    dismissible: false,
    onNestedDialogClose: parentDialogRootContext?.onNestedDialogClose,
    onNestedDialogOpen: parentDialogRootContext?.onNestedDialogOpen
  });
  const nested = Boolean(parentDialogRootContext);
  const contextValue = React.useMemo(() => ({
    ...dialogRoot,
    nested,
    onOpenChangeComplete
  }), [dialogRoot, nested, onOpenChangeComplete]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_AlertDialogRootContext.AlertDialogRootContext.Provider, {
    value: contextValue,
    children: children
  });
};
if (process.env.NODE_ENV !== "production") AlertDialogRoot.displayName = "AlertDialogRoot";
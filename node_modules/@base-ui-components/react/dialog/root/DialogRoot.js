"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DialogRoot = void 0;
var React = _interopRequireWildcard(require("react"));
var _DialogRootContext = require("./DialogRootContext");
var _DialogContext = require("../utils/DialogContext");
var _useDialogRoot = require("./useDialogRoot");
var _jsxRuntime = require("react/jsx-runtime");
/**
 * Groups all parts of the dialog.
 * Doesn’t render its own HTML element.
 *
 * Documentation: [Base UI Dialog](https://base-ui.com/react/components/dialog)
 */
const DialogRoot = exports.DialogRoot = function DialogRoot(props) {
  const {
    children,
    defaultOpen = false,
    dismissible = true,
    modal = true,
    onOpenChange,
    open,
    actionsRef,
    onOpenChangeComplete
  } = props;
  const parentDialogRootContext = (0, _DialogRootContext.useOptionalDialogRootContext)();
  const dialogRoot = (0, _useDialogRoot.useDialogRoot)({
    open,
    defaultOpen,
    onOpenChange,
    modal,
    dismissible,
    actionsRef,
    onOpenChangeComplete,
    onNestedDialogClose: parentDialogRootContext?.onNestedDialogClose,
    onNestedDialogOpen: parentDialogRootContext?.onNestedDialogOpen
  });
  const nested = Boolean(parentDialogRootContext);
  const dialogContextValue = React.useMemo(() => ({
    ...dialogRoot,
    nested,
    onOpenChangeComplete
  }), [dialogRoot, nested, onOpenChangeComplete]);
  const dialogRootContextValue = React.useMemo(() => ({
    dismissible
  }), [dismissible]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogContext.DialogContext.Provider, {
    value: dialogContextValue,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogRootContext.DialogRootContext.Provider, {
      value: dialogRootContextValue,
      children: children
    })
  });
};
if (process.env.NODE_ENV !== "production") DialogRoot.displayName = "DialogRoot";
"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlertDialogClose = void 0;
var React = _interopRequireWildcard(require("react"));
var _AlertDialogRootContext = require("../root/AlertDialogRootContext");
var _useDialogClose = require("../../dialog/close/useDialogClose");
var _useRenderElement = require("../../utils/useRenderElement");
/**
 * A button that closes the alert dialog.
 * Renders a `<button>` element.
 *
 * Documentation: [Base UI Alert Dialog](https://base-ui.com/react/components/alert-dialog)
 */
const AlertDialogClose = exports.AlertDialogClose = /*#__PURE__*/React.forwardRef(function AlertDialogClose(componentProps, forwardedRef) {
  const {
    render,
    className,
    disabled = false,
    nativeButton = true,
    ...elementProps
  } = componentProps;
  const {
    open,
    setOpen
  } = (0, _AlertDialogRootContext.useAlertDialogRootContext)();
  const {
    getRootProps,
    ref
  } = (0, _useDialogClose.useDialogClose)({
    disabled,
    open,
    setOpen,
    nativeButton
  });
  const state = React.useMemo(() => ({
    disabled
  }), [disabled]);
  return (0, _useRenderElement.useRenderElement)('button', componentProps, {
    state,
    ref: [forwardedRef, ref],
    props: [elementProps, getRootProps]
  });
});
if (process.env.NODE_ENV !== "production") AlertDialogClose.displayName = "AlertDialogClose";
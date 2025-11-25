"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DialogClose = void 0;
var React = _interopRequireWildcard(require("react"));
var _useDialogClose = require("./useDialogClose");
var _DialogRootContext = require("../root/DialogRootContext");
var _useRenderElement = require("../../utils/useRenderElement");
/**
 * A button that closes the dialog.
 * Renders a `<button>` element.
 *
 * Documentation: [Base UI Dialog](https://base-ui.com/react/components/dialog)
 */
const DialogClose = exports.DialogClose = /*#__PURE__*/React.forwardRef(function DialogClose(componentProps, forwardedRef) {
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
  } = (0, _DialogRootContext.useDialogRootContext)();
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
if (process.env.NODE_ENV !== "production") DialogClose.displayName = "DialogClose";
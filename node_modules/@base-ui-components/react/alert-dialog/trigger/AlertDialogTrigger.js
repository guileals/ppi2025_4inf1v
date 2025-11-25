"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlertDialogTrigger = void 0;
var React = _interopRequireWildcard(require("react"));
var _AlertDialogRootContext = require("../root/AlertDialogRootContext");
var _useButton = require("../../use-button/useButton");
var _useRenderElement = require("../../utils/useRenderElement");
var _popupStateMapping = require("../../utils/popupStateMapping");
/**
 * A button that opens the alert dialog.
 * Renders a `<button>` element.
 *
 * Documentation: [Base UI Alert Dialog](https://base-ui.com/react/components/alert-dialog)
 */
const AlertDialogTrigger = exports.AlertDialogTrigger = /*#__PURE__*/React.forwardRef(function AlertDialogTrigger(componentProps, forwardedRef) {
  const {
    render,
    className,
    disabled = false,
    nativeButton = true,
    ...elementProps
  } = componentProps;
  const {
    open,
    setTriggerElement,
    triggerProps
  } = (0, _AlertDialogRootContext.useAlertDialogRootContext)();
  const state = React.useMemo(() => ({
    disabled,
    open
  }), [disabled, open]);
  const {
    getButtonProps,
    buttonRef
  } = (0, _useButton.useButton)({
    disabled,
    native: nativeButton
  });
  return (0, _useRenderElement.useRenderElement)('button', componentProps, {
    state,
    ref: [forwardedRef, buttonRef, setTriggerElement],
    customStyleHookMapping: _popupStateMapping.triggerOpenStateMapping,
    props: [triggerProps, elementProps, getButtonProps]
  });
});
if (process.env.NODE_ENV !== "production") AlertDialogTrigger.displayName = "AlertDialogTrigger";
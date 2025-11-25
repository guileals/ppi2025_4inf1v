"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DialogTrigger = void 0;
var React = _interopRequireWildcard(require("react"));
var _DialogRootContext = require("../root/DialogRootContext");
var _useButton = require("../../use-button/useButton");
var _useRenderElement = require("../../utils/useRenderElement");
var _popupStateMapping = require("../../utils/popupStateMapping");
var _constants = require("../../utils/constants");
/**
 * A button that opens the dialog.
 * Renders a `<button>` element.
 *
 * Documentation: [Base UI Dialog](https://base-ui.com/react/components/dialog)
 */
const DialogTrigger = exports.DialogTrigger = /*#__PURE__*/React.forwardRef(function DialogTrigger(componentProps, forwardedRef) {
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
  } = (0, _DialogRootContext.useDialogRootContext)();
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
    ref: [buttonRef, forwardedRef, setTriggerElement],
    props: [triggerProps, {
      [_constants.CLICK_TRIGGER_IDENTIFIER]: ''
    }, elementProps, getButtonProps],
    customStyleHookMapping: _popupStateMapping.triggerOpenStateMapping
  });
});
if (process.env.NODE_ENV !== "production") DialogTrigger.displayName = "DialogTrigger";
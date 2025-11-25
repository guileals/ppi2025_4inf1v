"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PopoverTrigger = void 0;
var React = _interopRequireWildcard(require("react"));
var _PopoverRootContext = require("../root/PopoverRootContext");
var _useButton = require("../../use-button/useButton");
var _popupStateMapping = require("../../utils/popupStateMapping");
var _useRenderElement = require("../../utils/useRenderElement");
var _constants = require("../../utils/constants");
/**
 * A button that opens the popover.
 * Renders a `<button>` element.
 *
 * Documentation: [Base UI Popover](https://base-ui.com/react/components/popover)
 */
const PopoverTrigger = exports.PopoverTrigger = /*#__PURE__*/React.forwardRef(function PopoverTrigger(componentProps, forwardedRef) {
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
    triggerProps,
    openReason
  } = (0, _PopoverRootContext.usePopoverRootContext)();
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
  const customStyleHookMapping = React.useMemo(() => ({
    open(value) {
      if (value && openReason === 'trigger-press') {
        return _popupStateMapping.pressableTriggerOpenStateMapping.open(value);
      }
      return _popupStateMapping.triggerOpenStateMapping.open(value);
    }
  }), [openReason]);
  const element = (0, _useRenderElement.useRenderElement)('button', componentProps, {
    state,
    ref: [buttonRef, setTriggerElement, forwardedRef],
    props: [triggerProps, {
      [_constants.CLICK_TRIGGER_IDENTIFIER]: ''
    }, elementProps, getButtonProps],
    customStyleHookMapping
  });
  return element;
});
if (process.env.NODE_ENV !== "production") PopoverTrigger.displayName = "PopoverTrigger";
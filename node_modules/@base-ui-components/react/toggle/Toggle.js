"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Toggle = void 0;
var React = _interopRequireWildcard(require("react"));
var _useEventCallback = require("@base-ui-components/utils/useEventCallback");
var _useControlled = require("@base-ui-components/utils/useControlled");
var _useRenderElement = require("../utils/useRenderElement");
var _ToggleGroupContext = require("../toggle-group/ToggleGroupContext");
var _useButton = require("../use-button/useButton");
var _CompositeItem = require("../composite/item/CompositeItem");
var _createBaseUIEventDetails = require("../utils/createBaseUIEventDetails");
var _jsxRuntime = require("react/jsx-runtime");
/**
 * A two-state button that can be on or off.
 * Renders a `<button>` element.
 *
 * Documentation: [Base UI Toggle](https://base-ui.com/react/components/toggle)
 */
const Toggle = exports.Toggle = /*#__PURE__*/React.forwardRef(function Toggle(componentProps, forwardedRef) {
  const {
    className,
    defaultPressed: defaultPressedProp = false,
    disabled: disabledProp = false,
    form,
    // never participates in form validation
    onPressedChange: onPressedChangeProp,
    pressed: pressedProp,
    render,
    type,
    // cannot change button type
    value: valueProp,
    nativeButton = true,
    ...elementProps
  } = componentProps;
  const value = valueProp ?? '';
  const groupContext = (0, _ToggleGroupContext.useToggleGroupContext)();
  const groupValue = groupContext?.value ?? [];
  const defaultPressed = groupContext ? undefined : defaultPressedProp;
  const disabled = (disabledProp || groupContext?.disabled) ?? false;
  const [pressed, setPressedState] = (0, _useControlled.useControlled)({
    controlled: groupContext && value ? groupValue?.indexOf(value) > -1 : pressedProp,
    default: defaultPressed,
    name: 'Toggle',
    state: 'pressed'
  });
  const onPressedChange = (0, _useEventCallback.useEventCallback)((nextPressed, eventDetails) => {
    groupContext?.setGroupValue?.(value, nextPressed, eventDetails.event);
    onPressedChangeProp?.(nextPressed, eventDetails);
  });
  const {
    getButtonProps,
    buttonRef
  } = (0, _useButton.useButton)({
    disabled,
    native: nativeButton
  });
  const state = React.useMemo(() => ({
    disabled,
    pressed
  }), [disabled, pressed]);
  const refs = [buttonRef, forwardedRef];
  const props = [{
    'aria-pressed': pressed,
    onClick(event) {
      const nextPressed = !pressed;
      const details = (0, _createBaseUIEventDetails.createBaseUIEventDetails)('none', event.nativeEvent);
      onPressedChange(nextPressed, details);
      if (details.isCanceled) {
        return;
      }
      setPressedState(nextPressed);
    }
  }, elementProps, getButtonProps];
  const element = (0, _useRenderElement.useRenderElement)('button', componentProps, {
    enabled: !groupContext,
    state,
    ref: refs,
    props
  });
  if (groupContext) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_CompositeItem.CompositeItem, {
      tag: "button",
      render: render,
      className: className,
      state: state,
      refs: refs,
      props: props
    });
  }
  return element;
});
if (process.env.NODE_ENV !== "production") Toggle.displayName = "Toggle";
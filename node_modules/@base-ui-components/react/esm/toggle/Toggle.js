'use client';

import * as React from 'react';
import { useEventCallback } from '@base-ui-components/utils/useEventCallback';
import { useControlled } from '@base-ui-components/utils/useControlled';
import { useRenderElement } from "../utils/useRenderElement.js";
import { useToggleGroupContext } from "../toggle-group/ToggleGroupContext.js";
import { useButton } from "../use-button/useButton.js";
import { CompositeItem } from "../composite/item/CompositeItem.js";
import { createBaseUIEventDetails } from "../utils/createBaseUIEventDetails.js";

/**
 * A two-state button that can be on or off.
 * Renders a `<button>` element.
 *
 * Documentation: [Base UI Toggle](https://base-ui.com/react/components/toggle)
 */
import { jsx as _jsx } from "react/jsx-runtime";
export const Toggle = /*#__PURE__*/React.forwardRef(function Toggle(componentProps, forwardedRef) {
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
  const groupContext = useToggleGroupContext();
  const groupValue = groupContext?.value ?? [];
  const defaultPressed = groupContext ? undefined : defaultPressedProp;
  const disabled = (disabledProp || groupContext?.disabled) ?? false;
  const [pressed, setPressedState] = useControlled({
    controlled: groupContext && value ? groupValue?.indexOf(value) > -1 : pressedProp,
    default: defaultPressed,
    name: 'Toggle',
    state: 'pressed'
  });
  const onPressedChange = useEventCallback((nextPressed, eventDetails) => {
    groupContext?.setGroupValue?.(value, nextPressed, eventDetails.event);
    onPressedChangeProp?.(nextPressed, eventDetails);
  });
  const {
    getButtonProps,
    buttonRef
  } = useButton({
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
      const details = createBaseUIEventDetails('none', event.nativeEvent);
      onPressedChange(nextPressed, details);
      if (details.isCanceled) {
        return;
      }
      setPressedState(nextPressed);
    }
  }, elementProps, getButtonProps];
  const element = useRenderElement('button', componentProps, {
    enabled: !groupContext,
    state,
    ref: refs,
    props
  });
  if (groupContext) {
    return /*#__PURE__*/_jsx(CompositeItem, {
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
'use client';

import * as React from 'react';
import { usePopoverRootContext } from "../root/PopoverRootContext.js";
import { useButton } from "../../use-button/useButton.js";
import { triggerOpenStateMapping, pressableTriggerOpenStateMapping } from "../../utils/popupStateMapping.js";
import { useRenderElement } from "../../utils/useRenderElement.js";
import { CLICK_TRIGGER_IDENTIFIER } from "../../utils/constants.js";

/**
 * A button that opens the popover.
 * Renders a `<button>` element.
 *
 * Documentation: [Base UI Popover](https://base-ui.com/react/components/popover)
 */
export const PopoverTrigger = /*#__PURE__*/React.forwardRef(function PopoverTrigger(componentProps, forwardedRef) {
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
  } = usePopoverRootContext();
  const state = React.useMemo(() => ({
    disabled,
    open
  }), [disabled, open]);
  const {
    getButtonProps,
    buttonRef
  } = useButton({
    disabled,
    native: nativeButton
  });
  const customStyleHookMapping = React.useMemo(() => ({
    open(value) {
      if (value && openReason === 'trigger-press') {
        return pressableTriggerOpenStateMapping.open(value);
      }
      return triggerOpenStateMapping.open(value);
    }
  }), [openReason]);
  const element = useRenderElement('button', componentProps, {
    state,
    ref: [buttonRef, setTriggerElement, forwardedRef],
    props: [triggerProps, {
      [CLICK_TRIGGER_IDENTIFIER]: ''
    }, elementProps, getButtonProps],
    customStyleHookMapping
  });
  return element;
});
if (process.env.NODE_ENV !== "production") PopoverTrigger.displayName = "PopoverTrigger";
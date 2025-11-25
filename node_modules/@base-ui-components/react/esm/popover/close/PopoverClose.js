'use client';

import * as React from 'react';
import { usePopoverRootContext } from "../root/PopoverRootContext.js";
import { useRenderElement } from "../../utils/useRenderElement.js";
import { useButton } from "../../use-button/index.js";
import { createBaseUIEventDetails } from "../../utils/createBaseUIEventDetails.js";

/**
 * A button that closes the popover.
 * Renders a `<button>` element.
 *
 * Documentation: [Base UI Popover](https://base-ui.com/react/components/popover)
 */
export const PopoverClose = /*#__PURE__*/React.forwardRef(function PopoverClose(props, forwardedRef) {
  const {
    render,
    className,
    disabled = false,
    nativeButton = true,
    ...elementProps
  } = props;
  const {
    buttonRef,
    getButtonProps
  } = useButton({
    disabled,
    focusableWhenDisabled: false,
    native: nativeButton
  });
  const {
    setOpen
  } = usePopoverRootContext();
  const element = useRenderElement('button', props, {
    ref: [forwardedRef, buttonRef],
    props: [{
      onClick(event) {
        setOpen(false, createBaseUIEventDetails('close-press', event.nativeEvent));
      }
    }, elementProps, getButtonProps]
  });
  return element;
});
if (process.env.NODE_ENV !== "production") PopoverClose.displayName = "PopoverClose";
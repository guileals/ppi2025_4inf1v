'use client';

import * as React from 'react';
import { useDialogRootContext } from "../root/DialogRootContext.js";
import { useButton } from "../../use-button/useButton.js";
import { useRenderElement } from "../../utils/useRenderElement.js";
import { triggerOpenStateMapping } from "../../utils/popupStateMapping.js";
import { CLICK_TRIGGER_IDENTIFIER } from "../../utils/constants.js";

/**
 * A button that opens the dialog.
 * Renders a `<button>` element.
 *
 * Documentation: [Base UI Dialog](https://base-ui.com/react/components/dialog)
 */
export const DialogTrigger = /*#__PURE__*/React.forwardRef(function DialogTrigger(componentProps, forwardedRef) {
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
  } = useDialogRootContext();
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
  return useRenderElement('button', componentProps, {
    state,
    ref: [buttonRef, forwardedRef, setTriggerElement],
    props: [triggerProps, {
      [CLICK_TRIGGER_IDENTIFIER]: ''
    }, elementProps, getButtonProps],
    customStyleHookMapping: triggerOpenStateMapping
  });
});
if (process.env.NODE_ENV !== "production") DialogTrigger.displayName = "DialogTrigger";
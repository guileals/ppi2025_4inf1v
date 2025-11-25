'use client';

import * as React from 'react';
import { useAlertDialogRootContext } from "../root/AlertDialogRootContext.js";
import { useButton } from "../../use-button/useButton.js";
import { useRenderElement } from "../../utils/useRenderElement.js";
import { triggerOpenStateMapping } from "../../utils/popupStateMapping.js";

/**
 * A button that opens the alert dialog.
 * Renders a `<button>` element.
 *
 * Documentation: [Base UI Alert Dialog](https://base-ui.com/react/components/alert-dialog)
 */
export const AlertDialogTrigger = /*#__PURE__*/React.forwardRef(function AlertDialogTrigger(componentProps, forwardedRef) {
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
  } = useAlertDialogRootContext();
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
    ref: [forwardedRef, buttonRef, setTriggerElement],
    customStyleHookMapping: triggerOpenStateMapping,
    props: [triggerProps, elementProps, getButtonProps]
  });
});
if (process.env.NODE_ENV !== "production") AlertDialogTrigger.displayName = "AlertDialogTrigger";
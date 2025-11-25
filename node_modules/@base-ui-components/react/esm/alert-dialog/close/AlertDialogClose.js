'use client';

import * as React from 'react';
import { useAlertDialogRootContext } from "../root/AlertDialogRootContext.js";
import { useDialogClose } from "../../dialog/close/useDialogClose.js";
import { useRenderElement } from "../../utils/useRenderElement.js";
/**
 * A button that closes the alert dialog.
 * Renders a `<button>` element.
 *
 * Documentation: [Base UI Alert Dialog](https://base-ui.com/react/components/alert-dialog)
 */
export const AlertDialogClose = /*#__PURE__*/React.forwardRef(function AlertDialogClose(componentProps, forwardedRef) {
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
  } = useAlertDialogRootContext();
  const {
    getRootProps,
    ref
  } = useDialogClose({
    disabled,
    open,
    setOpen,
    nativeButton
  });
  const state = React.useMemo(() => ({
    disabled
  }), [disabled]);
  return useRenderElement('button', componentProps, {
    state,
    ref: [forwardedRef, ref],
    props: [elementProps, getRootProps]
  });
});
if (process.env.NODE_ENV !== "production") AlertDialogClose.displayName = "AlertDialogClose";
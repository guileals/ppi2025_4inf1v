'use client';

import * as React from 'react';
import { useDialogClose } from "./useDialogClose.js";
import { useDialogRootContext } from "../root/DialogRootContext.js";
import { useRenderElement } from "../../utils/useRenderElement.js";
/**
 * A button that closes the dialog.
 * Renders a `<button>` element.
 *
 * Documentation: [Base UI Dialog](https://base-ui.com/react/components/dialog)
 */
export const DialogClose = /*#__PURE__*/React.forwardRef(function DialogClose(componentProps, forwardedRef) {
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
  } = useDialogRootContext();
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
if (process.env.NODE_ENV !== "production") DialogClose.displayName = "DialogClose";
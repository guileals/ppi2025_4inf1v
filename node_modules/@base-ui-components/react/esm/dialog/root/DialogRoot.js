'use client';

import * as React from 'react';
import { DialogRootContext, useOptionalDialogRootContext } from "./DialogRootContext.js";
import { DialogContext } from "../utils/DialogContext.js";
import { useDialogRoot } from "./useDialogRoot.js";
import { jsx as _jsx } from "react/jsx-runtime";
/**
 * Groups all parts of the dialog.
 * Doesn’t render its own HTML element.
 *
 * Documentation: [Base UI Dialog](https://base-ui.com/react/components/dialog)
 */
export const DialogRoot = function DialogRoot(props) {
  const {
    children,
    defaultOpen = false,
    dismissible = true,
    modal = true,
    onOpenChange,
    open,
    actionsRef,
    onOpenChangeComplete
  } = props;
  const parentDialogRootContext = useOptionalDialogRootContext();
  const dialogRoot = useDialogRoot({
    open,
    defaultOpen,
    onOpenChange,
    modal,
    dismissible,
    actionsRef,
    onOpenChangeComplete,
    onNestedDialogClose: parentDialogRootContext?.onNestedDialogClose,
    onNestedDialogOpen: parentDialogRootContext?.onNestedDialogOpen
  });
  const nested = Boolean(parentDialogRootContext);
  const dialogContextValue = React.useMemo(() => ({
    ...dialogRoot,
    nested,
    onOpenChangeComplete
  }), [dialogRoot, nested, onOpenChangeComplete]);
  const dialogRootContextValue = React.useMemo(() => ({
    dismissible
  }), [dismissible]);
  return /*#__PURE__*/_jsx(DialogContext.Provider, {
    value: dialogContextValue,
    children: /*#__PURE__*/_jsx(DialogRootContext.Provider, {
      value: dialogRootContextValue,
      children: children
    })
  });
};
if (process.env.NODE_ENV !== "production") DialogRoot.displayName = "DialogRoot";
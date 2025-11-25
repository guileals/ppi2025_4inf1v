'use client';

import * as React from 'react';
import { AlertDialogRootContext } from "./AlertDialogRootContext.js";
import { useDialogRoot } from "../../dialog/root/useDialogRoot.js";
import { jsx as _jsx } from "react/jsx-runtime";
/**
 * Groups all parts of the alert dialog.
 * Doesn’t render its own HTML element.
 *
 * Documentation: [Base UI Alert Dialog](https://base-ui.com/react/components/alert-dialog)
 */
export const AlertDialogRoot = function AlertDialogRoot(props) {
  const {
    children,
    defaultOpen = false,
    onOpenChange,
    onOpenChangeComplete,
    open,
    actionsRef
  } = props;
  const parentDialogRootContext = React.useContext(AlertDialogRootContext);
  const dialogRoot = useDialogRoot({
    open,
    defaultOpen,
    onOpenChange,
    actionsRef,
    onOpenChangeComplete,
    modal: true,
    dismissible: false,
    onNestedDialogClose: parentDialogRootContext?.onNestedDialogClose,
    onNestedDialogOpen: parentDialogRootContext?.onNestedDialogOpen
  });
  const nested = Boolean(parentDialogRootContext);
  const contextValue = React.useMemo(() => ({
    ...dialogRoot,
    nested,
    onOpenChangeComplete
  }), [dialogRoot, nested, onOpenChangeComplete]);
  return /*#__PURE__*/_jsx(AlertDialogRootContext.Provider, {
    value: contextValue,
    children: children
  });
};
if (process.env.NODE_ENV !== "production") AlertDialogRoot.displayName = "AlertDialogRoot";
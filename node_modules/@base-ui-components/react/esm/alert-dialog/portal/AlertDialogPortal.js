'use client';

import * as React from 'react';
import { FloatingPortal } from "../../floating-ui-react/index.js";
import { useAlertDialogRootContext } from "../root/AlertDialogRootContext.js";
import { AlertDialogPortalContext } from "./AlertDialogPortalContext.js";

/**
 * A portal element that moves the popup to a different part of the DOM.
 * By default, the portal element is appended to `<body>`.
 *
 * Documentation: [Base UI Alert Dialog](https://base-ui.com/react/components/alert-dialog)
 */
import { jsx as _jsx } from "react/jsx-runtime";
export function AlertDialogPortal(props) {
  const {
    children,
    keepMounted = false,
    container
  } = props;
  const {
    mounted
  } = useAlertDialogRootContext();
  const shouldRender = mounted || keepMounted;
  if (!shouldRender) {
    return null;
  }
  return /*#__PURE__*/_jsx(AlertDialogPortalContext.Provider, {
    value: keepMounted,
    children: /*#__PURE__*/_jsx(FloatingPortal, {
      root: container,
      children: children
    })
  });
}
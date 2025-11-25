'use client';

import * as React from 'react';
import { FloatingPortal } from "../../floating-ui-react/index.js";
import { useDialogRootContext } from "../root/DialogRootContext.js";
import { DialogPortalContext } from "./DialogPortalContext.js";

/**
 * A portal element that moves the popup to a different part of the DOM.
 * By default, the portal element is appended to `<body>`.
 *
 * Documentation: [Base UI Dialog](https://base-ui.com/react/components/dialog)
 */
import { jsx as _jsx } from "react/jsx-runtime";
export function DialogPortal(props) {
  const {
    children,
    keepMounted = false,
    container
  } = props;
  const {
    mounted
  } = useDialogRootContext();
  const shouldRender = mounted || keepMounted;
  if (!shouldRender) {
    return null;
  }
  return /*#__PURE__*/_jsx(DialogPortalContext.Provider, {
    value: keepMounted,
    children: /*#__PURE__*/_jsx(FloatingPortal, {
      root: container,
      children: children
    })
  });
}
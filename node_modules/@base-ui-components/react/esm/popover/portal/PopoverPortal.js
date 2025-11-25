'use client';

import * as React from 'react';
import { FloatingPortal } from "../../floating-ui-react/index.js";
import { usePopoverRootContext } from "../root/PopoverRootContext.js";
import { PopoverPortalContext } from "./PopoverPortalContext.js";

/**
 * A portal element that moves the popup to a different part of the DOM.
 * By default, the portal element is appended to `<body>`.
 *
 * Documentation: [Base UI Popover](https://base-ui.com/react/components/popover)
 */
import { jsx as _jsx } from "react/jsx-runtime";
export function PopoverPortal(props) {
  const {
    children,
    keepMounted = false,
    container
  } = props;
  const {
    mounted
  } = usePopoverRootContext();
  const shouldRender = mounted || keepMounted;
  if (!shouldRender) {
    return null;
  }
  return /*#__PURE__*/_jsx(PopoverPortalContext.Provider, {
    value: keepMounted,
    children: /*#__PURE__*/_jsx(FloatingPortal, {
      root: container,
      children: children
    })
  });
}
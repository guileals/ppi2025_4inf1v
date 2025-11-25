'use client';

import * as React from 'react';
import { FloatingPortalLite } from "../../utils/FloatingPortalLite.js";

/**
 * A portal element that moves the viewport to a different part of the DOM.
 * By default, the portal element is appended to `<body>`.
 *
 * Documentation: [Base UI Toast](https://base-ui.com/react/components/toast)
 */
import { jsx as _jsx } from "react/jsx-runtime";
export function ToastPortal(props) {
  const {
    children,
    container
  } = props;
  return /*#__PURE__*/_jsx(FloatingPortalLite, {
    root: container,
    children: children
  });
}
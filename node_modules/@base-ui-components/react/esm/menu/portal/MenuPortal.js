'use client';

import * as React from 'react';
import { FloatingPortal } from "../../floating-ui-react/index.js";
import { useMenuRootContext } from "../root/MenuRootContext.js";
import { MenuPortalContext } from "./MenuPortalContext.js";

/**
 * A portal element that moves the popup to a different part of the DOM.
 * By default, the portal element is appended to `<body>`.
 *
 * Documentation: [Base UI Menu](https://base-ui.com/react/components/menu)
 */
import { jsx as _jsx } from "react/jsx-runtime";
export function MenuPortal(props) {
  const {
    children,
    keepMounted = false,
    container
  } = props;
  const {
    mounted
  } = useMenuRootContext();
  const shouldRender = mounted || keepMounted;
  if (!shouldRender) {
    return null;
  }
  return /*#__PURE__*/_jsx(MenuPortalContext.Provider, {
    value: keepMounted,
    children: /*#__PURE__*/_jsx(FloatingPortal, {
      root: container,
      children: children
    })
  });
}
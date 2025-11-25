'use client';

import * as React from 'react';
import { useStore } from '@base-ui-components/utils/store';
import { FloatingPortal } from "../../floating-ui-react/index.js";
import { useComboboxRootContext } from "../root/ComboboxRootContext.js";
import { ComboboxPortalContext } from "./ComboboxPortalContext.js";
import { selectors } from "../store.js";

/**
 * A portal element that moves the popup to a different part of the DOM.
 * By default, the portal element is appended to `<body>`.
 */
import { jsx as _jsx } from "react/jsx-runtime";
export function ComboboxPortal(props) {
  const {
    children,
    keepMounted = false,
    container
  } = props;
  const store = useComboboxRootContext();
  const mounted = useStore(store, selectors.mounted);
  const forceMounted = useStore(store, selectors.forceMounted);
  const shouldRender = mounted || keepMounted || forceMounted;
  if (!shouldRender) {
    return null;
  }
  return /*#__PURE__*/_jsx(ComboboxPortalContext.Provider, {
    value: keepMounted,
    children: /*#__PURE__*/_jsx(FloatingPortal, {
      root: container,
      children: children
    })
  });
}
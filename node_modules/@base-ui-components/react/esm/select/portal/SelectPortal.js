'use client';

import * as React from 'react';
import { useStore } from '@base-ui-components/utils/store';
import { FloatingPortal } from "../../floating-ui-react/index.js";
import { SelectPortalContext } from "./SelectPortalContext.js";
import { useSelectRootContext } from "../root/SelectRootContext.js";
import { selectors } from "../store.js";

/**
 * A portal element that moves the popup to a different part of the DOM.
 * By default, the portal element is appended to `<body>`.
 *
 * Documentation: [Base UI Select](https://base-ui.com/react/components/select)
 */
import { jsx as _jsx } from "react/jsx-runtime";
export function SelectPortal(props) {
  const {
    children,
    container
  } = props;
  const {
    store
  } = useSelectRootContext();
  const mounted = useStore(store, selectors.mounted);
  const forceMount = useStore(store, selectors.forceMount);
  const shouldRender = mounted || forceMount;
  if (!shouldRender) {
    return null;
  }
  return /*#__PURE__*/_jsx(SelectPortalContext.Provider, {
    value: true,
    children: /*#__PURE__*/_jsx(FloatingPortal, {
      root: container,
      children: children
    })
  });
}
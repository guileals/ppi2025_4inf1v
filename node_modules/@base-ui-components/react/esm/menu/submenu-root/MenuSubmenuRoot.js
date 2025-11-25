'use client';

import * as React from 'react';
import { MenuRoot } from "../root/MenuRoot.js";
import { MenuSubmenuRootContext } from "./MenuSubmenuRootContext.js";
import { jsx as _jsx } from "react/jsx-runtime";
export { useMenuSubmenuRootContext } from "./MenuSubmenuRootContext.js";

/**
 * Groups all parts of a submenu.
 * Doesn’t render its own HTML element.
 *
 * Documentation: [Base UI Menu](https://base-ui.com/react/components/menu)
 */
export function MenuSubmenuRoot(props) {
  const {
    closeParentOnEsc = false
  } = props;
  return /*#__PURE__*/_jsx(MenuSubmenuRootContext.Provider, {
    value: true,
    children: /*#__PURE__*/_jsx(MenuRoot, {
      closeParentOnEsc: closeParentOnEsc,
      ...props
    })
  });
}
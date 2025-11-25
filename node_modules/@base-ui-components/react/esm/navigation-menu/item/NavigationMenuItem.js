'use client';

import * as React from 'react';
import { useRenderElement } from "../../utils/useRenderElement.js";
import { NavigationMenuItemContext } from "./NavigationMenuItemContext.js";
import { useBaseUiId } from "../../utils/useBaseUiId.js";

/**
 * An individual navigation menu item.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Navigation Menu](https://base-ui.com/react/components/navigation-menu)
 */
import { jsx as _jsx } from "react/jsx-runtime";
export const NavigationMenuItem = /*#__PURE__*/React.forwardRef(function NavigationMenuItem(componentProps, forwardedRef) {
  const {
    className,
    render,
    value: valueProp,
    ...elementProps
  } = componentProps;
  const fallbackValue = useBaseUiId();
  const value = valueProp ?? fallbackValue;
  const element = useRenderElement('li', componentProps, {
    ref: forwardedRef,
    props: elementProps
  });
  return /*#__PURE__*/_jsx(NavigationMenuItemContext.Provider, {
    value: value,
    children: element
  });
});
if (process.env.NODE_ENV !== "production") NavigationMenuItem.displayName = "NavigationMenuItem";
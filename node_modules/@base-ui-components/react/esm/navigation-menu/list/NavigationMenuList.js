'use client';

import * as React from 'react';
import { CompositeRoot } from "../../composite/root/CompositeRoot.js";
import { useNavigationMenuRootContext } from "../root/NavigationMenuRootContext.js";

/**
 * Contains a list of navigation menu items.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Navigation Menu](https://base-ui.com/react/components/navigation-menu)
 */
import { jsx as _jsx } from "react/jsx-runtime";
export const NavigationMenuList = /*#__PURE__*/React.forwardRef(function NavigationMenuList(componentProps, forwardedRef) {
  const {
    className,
    render,
    ...elementProps
  } = componentProps;
  const {
    orientation,
    open
  } = useNavigationMenuRootContext();
  const state = React.useMemo(() => ({
    open
  }), [open]);
  const defaultProps = {
    // `stopEventPropagation` won't stop the propagation if the end of the list is reached,
    // but we want to block it in this case.
    onKeyDown(event) {
      const shouldStop = orientation === 'horizontal' && (event.key === 'ArrowLeft' || event.key === 'ArrowRight') || orientation === 'vertical' && (event.key === 'ArrowUp' || event.key === 'ArrowDown');
      if (shouldStop) {
        event.stopPropagation();
      }
    }
  };
  return /*#__PURE__*/_jsx(CompositeRoot, {
    render: render,
    className: className,
    state: state,
    refs: [forwardedRef],
    props: [defaultProps, elementProps],
    loop: false,
    orientation: orientation,
    tag: "ul",
    stopEventPropagation: true
  });
});
if (process.env.NODE_ENV !== "production") NavigationMenuList.displayName = "NavigationMenuList";
'use client';

import * as React from 'react';
import { useEventCallback } from '@base-ui-components/utils/useEventCallback';
import { useRenderElement } from "../../utils/useRenderElement.js";
import { useCollapsibleRoot } from "./useCollapsibleRoot.js";
import { CollapsibleRootContext } from "./CollapsibleRootContext.js";
import { collapsibleStyleHookMapping } from "./styleHooks.js";

/**
 * Groups all parts of the collapsible.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Collapsible](https://base-ui.com/react/components/collapsible)
 */
import { jsx as _jsx } from "react/jsx-runtime";
export const CollapsibleRoot = /*#__PURE__*/React.forwardRef(function CollapsibleRoot(componentProps, forwardedRef) {
  const {
    render,
    className,
    defaultOpen = false,
    disabled = false,
    onOpenChange: onOpenChangeProp,
    open,
    ...elementProps
  } = componentProps;
  const onOpenChange = useEventCallback(onOpenChangeProp);
  const collapsible = useCollapsibleRoot({
    open,
    defaultOpen,
    onOpenChange,
    disabled
  });
  const state = React.useMemo(() => ({
    open: collapsible.open,
    disabled: collapsible.disabled,
    transitionStatus: collapsible.transitionStatus
  }), [collapsible.open, collapsible.disabled, collapsible.transitionStatus]);
  const contextValue = React.useMemo(() => ({
    ...collapsible,
    onOpenChange,
    state
  }), [collapsible, onOpenChange, state]);

  // @ts-expect-error Collapsible accepts `render={null}`
  const element = useRenderElement('div', componentProps, {
    state,
    ref: forwardedRef,
    props: elementProps,
    customStyleHookMapping: collapsibleStyleHookMapping
  });
  if (componentProps.render !== null) {
    return /*#__PURE__*/_jsx(CollapsibleRootContext.Provider, {
      value: contextValue,
      children: element
    });
  }
  return /*#__PURE__*/_jsx(CollapsibleRootContext.Provider, {
    value: contextValue,
    children: elementProps.children
  });
});
if (process.env.NODE_ENV !== "production") CollapsibleRoot.displayName = "CollapsibleRoot";
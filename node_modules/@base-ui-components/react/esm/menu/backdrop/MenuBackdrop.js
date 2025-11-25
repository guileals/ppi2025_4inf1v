'use client';

import * as React from 'react';
import { useMenuRootContext } from "../root/MenuRootContext.js";
import { useRenderElement } from "../../utils/useRenderElement.js";
import { popupStateMapping as baseMapping } from "../../utils/popupStateMapping.js";
import { transitionStatusMapping } from "../../utils/styleHookMapping.js";
import { useContextMenuRootContext } from "../../context-menu/root/ContextMenuRootContext.js";
const customStyleHookMapping = {
  ...baseMapping,
  ...transitionStatusMapping
};

/**
 * An overlay displayed beneath the menu popup.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Menu](https://base-ui.com/react/components/menu)
 */
export const MenuBackdrop = /*#__PURE__*/React.forwardRef(function MenuBackdrop(componentProps, forwardedRef) {
  const {
    className,
    render,
    ...elementProps
  } = componentProps;
  const {
    open,
    mounted,
    transitionStatus,
    lastOpenChangeReason
  } = useMenuRootContext();
  const contextMenuContext = useContextMenuRootContext();
  const state = React.useMemo(() => ({
    open,
    transitionStatus
  }), [open, transitionStatus]);
  return useRenderElement('div', componentProps, {
    ref: contextMenuContext?.backdropRef ? [forwardedRef, contextMenuContext.backdropRef] : forwardedRef,
    state,
    customStyleHookMapping,
    props: [{
      role: 'presentation',
      hidden: !mounted,
      style: {
        pointerEvents: lastOpenChangeReason === 'trigger-hover' ? 'none' : undefined,
        userSelect: 'none',
        WebkitUserSelect: 'none'
      }
    }, elementProps]
  });
});
if (process.env.NODE_ENV !== "production") MenuBackdrop.displayName = "MenuBackdrop";
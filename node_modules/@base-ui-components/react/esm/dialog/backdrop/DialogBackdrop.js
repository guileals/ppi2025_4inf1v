'use client';

import * as React from 'react';
import { useDialogRootContext } from "../root/DialogRootContext.js";
import { useRenderElement } from "../../utils/useRenderElement.js";
import { popupStateMapping as baseMapping } from "../../utils/popupStateMapping.js";
import { transitionStatusMapping } from "../../utils/styleHookMapping.js";
const customStyleHookMapping = {
  ...baseMapping,
  ...transitionStatusMapping
};

/**
 * An overlay displayed beneath the popup.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Dialog](https://base-ui.com/react/components/dialog)
 */
export const DialogBackdrop = /*#__PURE__*/React.forwardRef(function DialogBackdrop(componentProps, forwardedRef) {
  const {
    render,
    className,
    forceRender = false,
    ...elementProps
  } = componentProps;
  const {
    open,
    nested,
    mounted,
    transitionStatus,
    backdropRef
  } = useDialogRootContext();
  const state = React.useMemo(() => ({
    open,
    transitionStatus
  }), [open, transitionStatus]);
  return useRenderElement('div', componentProps, {
    state,
    ref: [backdropRef, forwardedRef],
    customStyleHookMapping,
    props: [{
      role: 'presentation',
      hidden: !mounted,
      style: {
        userSelect: 'none',
        WebkitUserSelect: 'none'
      }
    }, elementProps],
    enabled: forceRender || !nested
  });
});
if (process.env.NODE_ENV !== "production") DialogBackdrop.displayName = "DialogBackdrop";
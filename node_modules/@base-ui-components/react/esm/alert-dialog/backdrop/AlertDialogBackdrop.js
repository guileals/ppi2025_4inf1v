'use client';

import * as React from 'react';
import { useAlertDialogRootContext } from "../root/AlertDialogRootContext.js";
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
 * Documentation: [Base UI Alert Dialog](https://base-ui.com/react/components/alert-dialog)
 */
export const AlertDialogBackdrop = /*#__PURE__*/React.forwardRef(function AlertDialogBackdrop(componentProps, forwardedRef) {
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
  } = useAlertDialogRootContext();
  const state = React.useMemo(() => ({
    open,
    transitionStatus
  }), [open, transitionStatus]);
  return useRenderElement('div', componentProps, {
    state,
    ref: [backdropRef, forwardedRef],
    props: [{
      role: 'presentation',
      hidden: !mounted,
      style: {
        userSelect: 'none',
        WebkitUserSelect: 'none'
      }
    }, elementProps],
    customStyleHookMapping,
    enabled: forceRender || !nested
  });
});
if (process.env.NODE_ENV !== "production") AlertDialogBackdrop.displayName = "AlertDialogBackdrop";
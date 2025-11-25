'use client';

import * as React from 'react';
import { useMergedRefs } from '@base-ui-components/utils/useMergedRefs';
import { inertValue } from '@base-ui-components/utils/inertValue';
import { useEventCallback } from '@base-ui-components/utils/useEventCallback';
import { FloatingFocusManager } from "../../floating-ui-react/index.js";
import { useDialogPopup } from "../../dialog/popup/useDialogPopup.js";
import { useAlertDialogRootContext } from "../root/AlertDialogRootContext.js";
import { useRenderElement } from "../../utils/useRenderElement.js";
import { popupStateMapping as baseMapping } from "../../utils/popupStateMapping.js";
import { transitionStatusMapping } from "../../utils/styleHookMapping.js";
import { AlertDialogPopupCssVars } from "./AlertDialogPopupCssVars.js";
import { AlertDialogPopupDataAttributes } from "./AlertDialogPopupDataAttributes.js";
import { InternalBackdrop } from "../../utils/InternalBackdrop.js";
import { useAlertDialogPortalContext } from "../portal/AlertDialogPortalContext.js";
import { useOpenChangeComplete } from "../../utils/useOpenChangeComplete.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const customStyleHookMapping = {
  ...baseMapping,
  ...transitionStatusMapping,
  nestedDialogOpen(value) {
    return value ? {
      [AlertDialogPopupDataAttributes.nestedDialogOpen]: ''
    } : null;
  }
};

/**
 * A container for the alert dialog contents.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Alert Dialog](https://base-ui.com/react/components/alert-dialog)
 */
export const AlertDialogPopup = /*#__PURE__*/React.forwardRef(function AlertDialogPopup(componentProps, forwardedRef) {
  const {
    className,
    render,
    initialFocus,
    finalFocus,
    ...elementProps
  } = componentProps;
  const {
    descriptionElementId,
    floatingRootContext,
    getPopupProps,
    mounted,
    nested,
    nestedOpenDialogCount,
    setOpen,
    open,
    openMethod,
    popupRef,
    setPopupElement,
    titleElementId,
    transitionStatus,
    modal,
    onOpenChangeComplete,
    internalBackdropRef
  } = useAlertDialogRootContext();
  useAlertDialogPortalContext();
  useOpenChangeComplete({
    open,
    ref: popupRef,
    onComplete() {
      if (open) {
        onOpenChangeComplete?.(true);
      }
    }
  });
  const mergedRef = useMergedRefs(forwardedRef, popupRef);
  const {
    popupProps
  } = useDialogPopup({
    descriptionElementId,
    mounted,
    setOpen,
    openMethod,
    ref: mergedRef,
    setPopupElement,
    titleElementId
  });
  const nestedDialogOpen = nestedOpenDialogCount > 0;
  const state = React.useMemo(() => ({
    open,
    nested,
    transitionStatus,
    nestedDialogOpen
  }), [open, nested, transitionStatus, nestedDialogOpen]);
  const element = useRenderElement('div', componentProps, {
    state,
    props: [getPopupProps(), popupProps, {
      style: {
        [AlertDialogPopupCssVars.nestedDialogs]: nestedOpenDialogCount
      },
      role: 'alertdialog'
    }, elementProps],
    customStyleHookMapping
  });

  // Default initial focus logic:
  // If opened by touch, focus the popup element to prevent the virtual keyboard from opening
  // (this is required for Android specifically as iOS handles this automatically).
  const defaultInitialFocus = useEventCallback(interactionType => {
    if (interactionType === 'touch') {
      return popupRef.current;
    }
    return true;
  });
  const resolvedInitialFocus = initialFocus === undefined ? defaultInitialFocus : initialFocus;
  return /*#__PURE__*/_jsxs(React.Fragment, {
    children: [mounted && modal && /*#__PURE__*/_jsx(InternalBackdrop, {
      ref: internalBackdropRef,
      inert: inertValue(!open)
    }), /*#__PURE__*/_jsx(FloatingFocusManager, {
      context: floatingRootContext,
      disabled: !mounted,
      initialFocus: resolvedInitialFocus,
      returnFocus: finalFocus,
      children: element
    })]
  });
});
if (process.env.NODE_ENV !== "production") AlertDialogPopup.displayName = "AlertDialogPopup";
'use client';

import * as React from 'react';
import { useMergedRefs } from '@base-ui-components/utils/useMergedRefs';
import { inertValue } from '@base-ui-components/utils/inertValue';
import { useEventCallback } from '@base-ui-components/utils/useEventCallback';
import { FloatingFocusManager } from "../../floating-ui-react/index.js";
import { useDialogPopup } from "./useDialogPopup.js";
import { useDialogRootContext } from "../root/DialogRootContext.js";
import { useRenderElement } from "../../utils/useRenderElement.js";
import { popupStateMapping as baseMapping } from "../../utils/popupStateMapping.js";
import { transitionStatusMapping } from "../../utils/styleHookMapping.js";
import { DialogPopupCssVars } from "./DialogPopupCssVars.js";
import { DialogPopupDataAttributes } from "./DialogPopupDataAttributes.js";
import { InternalBackdrop } from "../../utils/InternalBackdrop.js";
import { useDialogPortalContext } from "../portal/DialogPortalContext.js";
import { useOpenChangeComplete } from "../../utils/useOpenChangeComplete.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const customStyleHookMapping = {
  ...baseMapping,
  ...transitionStatusMapping,
  nestedDialogOpen(value) {
    return value ? {
      [DialogPopupDataAttributes.nestedDialogOpen]: ''
    } : null;
  }
};

/**
 * A container for the dialog contents.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Dialog](https://base-ui.com/react/components/dialog)
 */
export const DialogPopup = /*#__PURE__*/React.forwardRef(function DialogPopup(componentProps, forwardedRef) {
  const {
    className,
    finalFocus,
    initialFocus,
    render,
    ...elementProps
  } = componentProps;
  const {
    descriptionElementId,
    dismissible,
    floatingRootContext,
    getPopupProps,
    modal,
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
    onOpenChangeComplete,
    internalBackdropRef
  } = useDialogRootContext();
  useDialogPortalContext();
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
        [DialogPopupCssVars.nestedDialogs]: nestedOpenDialogCount
      }
    }, elementProps],
    customStyleHookMapping
  });
  return /*#__PURE__*/_jsxs(React.Fragment, {
    children: [mounted && modal === true && /*#__PURE__*/_jsx(InternalBackdrop, {
      ref: internalBackdropRef,
      inert: inertValue(!open)
    }), /*#__PURE__*/_jsx(FloatingFocusManager, {
      context: floatingRootContext,
      openInteractionType: openMethod,
      disabled: !mounted,
      closeOnFocusOut: dismissible,
      initialFocus: resolvedInitialFocus,
      returnFocus: finalFocus,
      modal: modal !== false,
      restoreFocus: "popup",
      children: element
    })]
  });
});
if (process.env.NODE_ENV !== "production") DialogPopup.displayName = "DialogPopup";
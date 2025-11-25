'use client';

import * as React from 'react';
import { useEventCallback } from '@base-ui-components/utils/useEventCallback';
import { FloatingFocusManager } from "../../floating-ui-react/index.js";
import { usePopoverRootContext } from "../root/PopoverRootContext.js";
import { usePopoverPositionerContext } from "../positioner/PopoverPositionerContext.js";
import { popupStateMapping as baseMapping } from "../../utils/popupStateMapping.js";
import { transitionStatusMapping } from "../../utils/styleHookMapping.js";
import { useOpenChangeComplete } from "../../utils/useOpenChangeComplete.js";
import { useRenderElement } from "../../utils/useRenderElement.js";
import { DISABLED_TRANSITIONS_STYLE, EMPTY_OBJECT } from "../../utils/constants.js";
import { jsx as _jsx } from "react/jsx-runtime";
const customStyleHookMapping = {
  ...baseMapping,
  ...transitionStatusMapping
};

/**
 * A container for the popover contents.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Popover](https://base-ui.com/react/components/popover)
 */
export const PopoverPopup = /*#__PURE__*/React.forwardRef(function PopoverPopup(componentProps, forwardedRef) {
  const {
    className,
    render,
    initialFocus,
    finalFocus,
    ...elementProps
  } = componentProps;
  const {
    open,
    instantType,
    transitionStatus,
    popupProps,
    titleId,
    descriptionId,
    popupRef,
    mounted,
    openReason,
    onOpenChangeComplete,
    modal,
    openMethod
  } = usePopoverRootContext();
  const positioner = usePopoverPositionerContext();
  useOpenChangeComplete({
    open,
    ref: popupRef,
    onComplete() {
      if (open) {
        onOpenChangeComplete?.(true);
      }
    }
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
  const state = React.useMemo(() => ({
    open,
    side: positioner.side,
    align: positioner.align,
    instant: instantType,
    transitionStatus
  }), [open, positioner.side, positioner.align, instantType, transitionStatus]);
  const element = useRenderElement('div', componentProps, {
    state,
    ref: [forwardedRef, popupRef],
    props: [popupProps, {
      'aria-labelledby': titleId,
      'aria-describedby': descriptionId
    }, transitionStatus === 'starting' ? DISABLED_TRANSITIONS_STYLE : EMPTY_OBJECT, elementProps],
    customStyleHookMapping
  });
  return /*#__PURE__*/_jsx(FloatingFocusManager, {
    context: positioner.context,
    openInteractionType: openMethod,
    modal: modal === 'trap-focus',
    disabled: !mounted || openReason === 'trigger-hover',
    initialFocus: resolvedInitialFocus,
    returnFocus: finalFocus,
    restoreFocus: "popup",
    children: element
  });
});
if (process.env.NODE_ENV !== "production") PopoverPopup.displayName = "PopoverPopup";
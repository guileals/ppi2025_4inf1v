'use client';

import * as React from 'react';
import { usePopoverRootContext } from "../root/PopoverRootContext.js";
import { popupStateMapping as baseMapping } from "../../utils/popupStateMapping.js";
import { transitionStatusMapping } from "../../utils/styleHookMapping.js";
import { useRenderElement } from "../../utils/useRenderElement.js";
const customStyleHookMapping = {
  ...baseMapping,
  ...transitionStatusMapping
};

/**
 * An overlay displayed beneath the popover.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Popover](https://base-ui.com/react/components/popover)
 */
export const PopoverBackdrop = /*#__PURE__*/React.forwardRef(function PopoverBackdrop(props, forwardedRef) {
  const {
    className,
    render,
    ...elementProps
  } = props;
  const {
    open,
    mounted,
    transitionStatus,
    openReason,
    backdropRef
  } = usePopoverRootContext();
  const state = React.useMemo(() => ({
    open,
    transitionStatus
  }), [open, transitionStatus]);
  const element = useRenderElement('div', props, {
    state,
    ref: [backdropRef, forwardedRef],
    props: [{
      role: 'presentation',
      hidden: !mounted,
      style: {
        pointerEvents: openReason === 'trigger-hover' ? 'none' : undefined,
        userSelect: 'none',
        WebkitUserSelect: 'none'
      }
    }, elementProps],
    customStyleHookMapping
  });
  return element;
});
if (process.env.NODE_ENV !== "production") PopoverBackdrop.displayName = "PopoverBackdrop";
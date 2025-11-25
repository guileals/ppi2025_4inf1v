'use client';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useControlled } from '@base-ui-components/utils/useControlled';
import { useEventCallback } from '@base-ui-components/utils/useEventCallback';
import { TooltipRootContext } from "./TooltipRootContext.js";
import { useClientPoint, useDelayGroup, useDismiss, useFloatingRootContext, useFocus, useHover, useInteractions, safePolygon } from "../../floating-ui-react/index.js";
import { useTransitionStatus } from "../../utils/useTransitionStatus.js";
import { OPEN_DELAY } from "../utils/constants.js";
import { useOpenChangeComplete } from "../../utils/useOpenChangeComplete.js";
import { useTooltipProviderContext } from "../provider/TooltipProviderContext.js";
import { createBaseUIEventDetails } from "../../utils/createBaseUIEventDetails.js";
import { jsx as _jsx } from "react/jsx-runtime";
/**
 * Groups all parts of the tooltip.
 * Doesn’t render its own HTML element.
 *
 * Documentation: [Base UI Tooltip](https://base-ui.com/react/components/tooltip)
 */
export function TooltipRoot(props) {
  const {
    disabled = false,
    defaultOpen = false,
    onOpenChange,
    open: openProp,
    delay,
    closeDelay,
    hoverable = true,
    trackCursorAxis = 'none',
    actionsRef,
    onOpenChangeComplete
  } = props;
  const delayWithDefault = delay ?? OPEN_DELAY;
  const closeDelayWithDefault = closeDelay ?? 0;
  const [triggerElement, setTriggerElement] = React.useState(null);
  const [positionerElement, setPositionerElement] = React.useState(null);
  const [instantTypeState, setInstantTypeState] = React.useState();
  const popupRef = React.useRef(null);
  const [openState, setOpenState] = useControlled({
    controlled: openProp,
    default: defaultOpen,
    name: 'Tooltip',
    state: 'open'
  });
  const open = !disabled && openState;
  function setOpenUnwrapped(nextOpen, eventDetails) {
    const reason = eventDetails.reason;
    const isHover = reason === 'trigger-hover';
    const isFocusOpen = nextOpen && reason === 'trigger-focus';
    const isDismissClose = !nextOpen && (reason === 'trigger-press' || reason === 'escape-key');
    onOpenChange?.(nextOpen, eventDetails);
    if (eventDetails.isCanceled) {
      return;
    }
    function changeState() {
      setOpenState(nextOpen);
    }
    if (isHover) {
      // If a hover reason is provided, we need to flush the state synchronously. This ensures
      // `node.getAnimations()` knows about the new state.
      ReactDOM.flushSync(changeState);
    } else {
      changeState();
    }
    if (isFocusOpen || isDismissClose) {
      setInstantTypeState(isFocusOpen ? 'focus' : 'dismiss');
    } else if (reason === 'trigger-hover') {
      setInstantTypeState(undefined);
    }
  }
  const setOpen = useEventCallback(setOpenUnwrapped);
  if (openState && disabled) {
    setOpenUnwrapped(false, createBaseUIEventDetails('disabled'));
  }
  const {
    mounted,
    setMounted,
    transitionStatus
  } = useTransitionStatus(open);
  const handleUnmount = useEventCallback(() => {
    setMounted(false);
    onOpenChangeComplete?.(false);
  });
  useOpenChangeComplete({
    enabled: !actionsRef,
    open,
    ref: popupRef,
    onComplete() {
      if (!open) {
        handleUnmount();
      }
    }
  });
  React.useImperativeHandle(actionsRef, () => ({
    unmount: handleUnmount
  }), [handleUnmount]);
  const floatingRootContext = useFloatingRootContext({
    elements: {
      reference: triggerElement,
      floating: positionerElement
    },
    open,
    onOpenChange: setOpen
  });
  const providerContext = useTooltipProviderContext();
  const {
    delayRef,
    isInstantPhase,
    hasProvider
  } = useDelayGroup(floatingRootContext);
  const instantType = isInstantPhase ? 'delay' : instantTypeState;
  const hover = useHover(floatingRootContext, {
    enabled: !disabled,
    mouseOnly: true,
    move: false,
    handleClose: hoverable && trackCursorAxis !== 'both' ? safePolygon() : null,
    restMs() {
      const providerDelay = providerContext?.delay;
      const groupOpenValue = typeof delayRef.current === 'object' ? delayRef.current.open : undefined;
      let computedRestMs = delayWithDefault;
      if (hasProvider) {
        if (groupOpenValue !== 0) {
          computedRestMs = delay ?? providerDelay ?? delayWithDefault;
        } else {
          computedRestMs = 0;
        }
      }
      return computedRestMs;
    },
    delay() {
      const closeValue = typeof delayRef.current === 'object' ? delayRef.current.close : undefined;
      let computedCloseDelay = closeDelayWithDefault;
      if (closeDelay == null && hasProvider) {
        computedCloseDelay = closeValue;
      }
      return {
        close: computedCloseDelay
      };
    }
  });
  const focus = useFocus(floatingRootContext, {
    enabled: !disabled
  });
  const dismiss = useDismiss(floatingRootContext, {
    enabled: !disabled,
    referencePress: true
  });
  const clientPoint = useClientPoint(floatingRootContext, {
    enabled: !disabled && trackCursorAxis !== 'none',
    axis: trackCursorAxis === 'none' ? undefined : trackCursorAxis
  });
  const {
    getReferenceProps,
    getFloatingProps
  } = useInteractions([hover, focus, dismiss, clientPoint]);
  const tooltipRoot = React.useMemo(() => ({
    open,
    setOpen,
    mounted,
    setMounted,
    setTriggerElement,
    positionerElement,
    setPositionerElement,
    popupRef,
    triggerProps: getReferenceProps(),
    popupProps: getFloatingProps(),
    floatingRootContext,
    instantType,
    transitionStatus,
    onOpenChangeComplete
  }), [open, setOpen, mounted, setMounted, setTriggerElement, positionerElement, setPositionerElement, popupRef, getReferenceProps, getFloatingProps, floatingRootContext, instantType, transitionStatus, onOpenChangeComplete]);
  const contextValue = React.useMemo(() => ({
    ...tooltipRoot,
    delay: delayWithDefault,
    closeDelay: closeDelayWithDefault,
    trackCursorAxis,
    hoverable
  }), [tooltipRoot, delayWithDefault, closeDelayWithDefault, trackCursorAxis, hoverable]);
  return /*#__PURE__*/_jsx(TooltipRootContext.Provider, {
    value: contextValue,
    children: props.children
  });
}
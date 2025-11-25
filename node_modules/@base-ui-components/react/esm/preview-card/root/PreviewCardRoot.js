'use client';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useControlled } from '@base-ui-components/utils/useControlled';
import { useEventCallback } from '@base-ui-components/utils/useEventCallback';
import { safePolygon, useDismiss, useHover, useInteractions, useFloatingRootContext } from "../../floating-ui-react/index.js";
import { PreviewCardRootContext } from "./PreviewCardContext.js";
import { CLOSE_DELAY, OPEN_DELAY } from "../utils/constants.js";
import { useFocusWithDelay } from "../../utils/interactions/useFocusWithDelay.js";
import { useOpenChangeComplete } from "../../utils/useOpenChangeComplete.js";
import { useTransitionStatus } from "../../utils/useTransitionStatus.js";
import { jsx as _jsx } from "react/jsx-runtime";
/**
 * Groups all parts of the preview card.
 * Doesn’t render its own HTML element.
 *
 * Documentation: [Base UI Preview Card](https://base-ui.com/react/components/preview-card)
 */
export function PreviewCardRoot(props) {
  const {
    open: externalOpen,
    defaultOpen,
    onOpenChange: onOpenChangeProp,
    delay,
    closeDelay,
    onOpenChangeComplete,
    actionsRef
  } = props;
  const delayWithDefault = delay ?? OPEN_DELAY;
  const closeDelayWithDefault = closeDelay ?? CLOSE_DELAY;
  const [triggerElement, setTriggerElement] = React.useState(null);
  const [positionerElement, setPositionerElement] = React.useState(null);
  const [instantTypeState, setInstantTypeState] = React.useState();
  const popupRef = React.useRef(null);
  const [open, setOpenUnwrapped] = useControlled({
    controlled: externalOpen,
    default: defaultOpen,
    name: 'PreviewCard',
    state: 'open'
  });
  const onOpenChange = useEventCallback(onOpenChangeProp);
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
  const setOpen = useEventCallback((nextOpen, eventDetails) => {
    const isHover = eventDetails.reason === 'trigger-hover';
    const isFocusOpen = nextOpen && eventDetails.reason === 'trigger-focus';
    const isDismissClose = !nextOpen && (eventDetails.reason === 'trigger-press' || eventDetails.reason === 'escape-key');
    onOpenChange(nextOpen, eventDetails);
    if (eventDetails.isCanceled) {
      return;
    }
    function changeState() {
      setOpenUnwrapped(nextOpen);
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
    } else if (eventDetails.reason === 'trigger-hover') {
      setInstantTypeState(undefined);
    }
  });
  const context = useFloatingRootContext({
    elements: {
      reference: triggerElement,
      floating: positionerElement
    },
    open,
    onOpenChange: setOpen
  });
  const instantType = instantTypeState;
  const computedRestMs = delayWithDefault;
  const hover = useHover(context, {
    mouseOnly: true,
    move: false,
    handleClose: safePolygon(),
    restMs: computedRestMs,
    delay: {
      close: closeDelayWithDefault
    }
  });
  const focus = useFocusWithDelay(context, {
    delay: OPEN_DELAY
  });
  const dismiss = useDismiss(context);
  const {
    getReferenceProps,
    getFloatingProps
  } = useInteractions([hover, focus, dismiss]);
  const contextValue = React.useMemo(() => ({
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
    floatingRootContext: context,
    instantType,
    transitionStatus,
    onOpenChangeComplete,
    delay: delayWithDefault,
    closeDelay: closeDelayWithDefault
  }), [open, setOpen, mounted, setMounted, positionerElement, getReferenceProps, getFloatingProps, context, instantType, transitionStatus, onOpenChangeComplete, delayWithDefault, closeDelayWithDefault]);
  return /*#__PURE__*/_jsx(PreviewCardRootContext.Provider, {
    value: contextValue,
    children: props.children
  });
}
'use client';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useTimeout } from '@base-ui-components/utils/useTimeout';
import { useControlled } from '@base-ui-components/utils/useControlled';
import { useEventCallback } from '@base-ui-components/utils/useEventCallback';
import { useClick, useDismiss, useFloatingRootContext, useHover, useInteractions, useRole, FloatingTree, safePolygon, useFloatingParentNodeId } from "../../floating-ui-react/index.js";
import { useTransitionStatus } from "../../utils/useTransitionStatus.js";
import { OPEN_DELAY } from "../utils/constants.js";
import { useOpenInteractionType } from "../../utils/useOpenInteractionType.js";
import { useOpenChangeComplete } from "../../utils/useOpenChangeComplete.js";
import { PATIENT_CLICK_THRESHOLD } from "../../utils/constants.js";
import { useScrollLock } from "../../utils/useScrollLock.js";
import { PopoverRootContext, usePopoverRootContext } from "./PopoverRootContext.js";
import { mergeProps } from "../../merge-props/index.js";
import { jsx as _jsx } from "react/jsx-runtime";
function PopoverRootComponent({
  props
}) {
  const {
    open: externalOpen,
    onOpenChange,
    defaultOpen = false,
    delay = OPEN_DELAY,
    closeDelay = 0,
    openOnHover = false,
    onOpenChangeComplete,
    modal = false
  } = props;
  const [instantType, setInstantType] = React.useState();
  const [titleId, setTitleId] = React.useState();
  const [descriptionId, setDescriptionId] = React.useState();
  const [triggerElement, setTriggerElement] = React.useState(null);
  const [positionerElement, setPositionerElement] = React.useState(null);
  const [openReason, setOpenReason] = React.useState(null);
  const [stickIfOpen, setStickIfOpen] = React.useState(true);
  const backdropRef = React.useRef(null);
  const internalBackdropRef = React.useRef(null);
  const popupRef = React.useRef(null);
  const stickIfOpenTimeout = useTimeout();
  const nested = useFloatingParentNodeId() != null;
  let floatingEvents;
  const [open, setOpenUnwrapped] = useControlled({
    controlled: externalOpen,
    default: defaultOpen,
    name: 'Popover',
    state: 'open'
  });
  const {
    mounted,
    setMounted,
    transitionStatus
  } = useTransitionStatus(open);
  const {
    openMethod,
    triggerProps,
    reset: resetOpenInteractionType
  } = useOpenInteractionType(open);
  const handleUnmount = useEventCallback(() => {
    setMounted(false);
    setStickIfOpen(true);
    setOpenReason(null);
    onOpenChangeComplete?.(false);
    resetOpenInteractionType();
  });
  useOpenChangeComplete({
    enabled: !props.actionsRef,
    open,
    ref: popupRef,
    onComplete() {
      if (!open) {
        handleUnmount();
      }
    }
  });
  React.useImperativeHandle(props.actionsRef, () => ({
    unmount: handleUnmount
  }), [handleUnmount]);
  React.useEffect(() => {
    if (!open) {
      stickIfOpenTimeout.clear();
    }
  }, [stickIfOpenTimeout, open]);
  const setOpen = useEventCallback((nextOpen, eventDetails) => {
    const isHover = eventDetails.reason === 'trigger-hover';
    const isKeyboardClick = eventDetails.reason === 'trigger-press' && eventDetails.event.detail === 0;
    const isDismissClose = !nextOpen && (eventDetails.reason === 'escape-key' || eventDetails.reason === 'none');
    onOpenChange?.(nextOpen, eventDetails);
    if (eventDetails.isCanceled) {
      return;
    }
    const details = {
      open: nextOpen,
      nativeEvent: eventDetails.event,
      reason: eventDetails.reason,
      nested
    };
    floatingEvents?.emit('openchange', details);
    function changeState() {
      setOpenUnwrapped(nextOpen);
      if (nextOpen) {
        setOpenReason(eventDetails.reason);
      }
    }
    if (isHover) {
      // Only allow "patient" clicks to close the popover if it's open.
      // If they clicked within 500ms of the popover opening, keep it open.
      setStickIfOpen(true);
      stickIfOpenTimeout.start(PATIENT_CLICK_THRESHOLD, () => {
        setStickIfOpen(false);
      });
      ReactDOM.flushSync(changeState);
    } else {
      changeState();
    }
    if (isKeyboardClick || isDismissClose) {
      setInstantType(isKeyboardClick ? 'click' : 'dismiss');
    } else {
      setInstantType(undefined);
    }
  });
  const floatingContext = useFloatingRootContext({
    elements: {
      reference: triggerElement,
      floating: positionerElement
    },
    open,
    onOpenChange: setOpen
  });
  floatingEvents = floatingContext.events;
  useScrollLock({
    enabled: open && modal === true && openReason !== 'trigger-hover' && openMethod !== 'touch',
    mounted,
    open,
    referenceElement: positionerElement
  });
  const computedRestMs = delay;
  const hover = useHover(floatingContext, {
    enabled: openOnHover && (openMethod !== 'touch' || openReason !== 'trigger-press'),
    mouseOnly: true,
    move: false,
    handleClose: safePolygon({
      blockPointerEvents: true
    }),
    restMs: computedRestMs,
    delay: {
      close: closeDelay
    }
  });
  const click = useClick(floatingContext, {
    stickIfOpen
  });
  const dismiss = useDismiss(floatingContext, {
    outsidePressEvent: {
      // Ensure `aria-hidden` on outside elements is removed immediately
      // on outside press when trapping focus.
      mouse: modal === 'trap-focus' ? 'sloppy' : 'intentional',
      touch: 'sloppy'
    }
  });
  const role = useRole(floatingContext);
  const {
    getReferenceProps,
    getFloatingProps
  } = useInteractions([hover, click, dismiss, role]);
  const popoverContext = React.useMemo(() => ({
    open,
    setOpen,
    mounted,
    setMounted,
    transitionStatus,
    triggerElement,
    setTriggerElement,
    positionerElement,
    setPositionerElement,
    popupRef,
    titleId,
    setTitleId,
    descriptionId,
    setDescriptionId,
    backdropRef,
    internalBackdropRef,
    triggerProps: mergeProps(getReferenceProps(), triggerProps),
    popupProps: getFloatingProps(),
    floatingRootContext: floatingContext,
    instantType,
    openMethod,
    openReason,
    onOpenChangeComplete,
    openOnHover,
    delay,
    closeDelay,
    modal
  }), [open, setOpen, mounted, setMounted, transitionStatus, positionerElement, titleId, descriptionId, getReferenceProps, triggerElement, triggerProps, getFloatingProps, floatingContext, instantType, openMethod, openReason, onOpenChangeComplete, openOnHover, delay, closeDelay, modal]);
  return /*#__PURE__*/_jsx(PopoverRootContext.Provider, {
    value: popoverContext,
    children: props.children
  });
}

/**
 * Groups all parts of the popover.
 * Doesn’t render its own HTML element.
 *
 * Documentation: [Base UI Popover](https://base-ui.com/react/components/popover)
 */
export function PopoverRoot(props) {
  if (usePopoverRootContext(true)) {
    return /*#__PURE__*/_jsx(PopoverRootComponent, {
      props: props
    });
  }
  return /*#__PURE__*/_jsx(FloatingTree, {
    children: /*#__PURE__*/_jsx(PopoverRootComponent, {
      props: props
    })
  });
}
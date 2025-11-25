'use client';

import * as React from 'react';
import { useEventCallback } from '@base-ui-components/utils/useEventCallback';
import { ownerDocument } from '@base-ui-components/utils/owner';
import { useTimeout } from '@base-ui-components/utils/useTimeout';
import { contains, getTarget, stopEvent } from "../../floating-ui-react/utils.js";
import { useContextMenuRootContext } from "../root/ContextMenuRootContext.js";
import { useRenderElement } from "../../utils/useRenderElement.js";
import { createBaseUIEventDetails } from "../../utils/createBaseUIEventDetails.js";
const LONG_PRESS_DELAY = 500;

/**
 * An area that opens the menu on right click or long press.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Context Menu](https://base-ui.com/react/components/context-menu)
 */
export const ContextMenuTrigger = /*#__PURE__*/React.forwardRef(function ContextMenuTrigger(componentProps, forwardedRef) {
  const {
    render,
    className,
    ...elementProps
  } = componentProps;
  const {
    setAnchor,
    actionsRef,
    internalBackdropRef,
    backdropRef,
    positionerRef,
    allowMouseUpTriggerRef
  } = useContextMenuRootContext(false);
  const triggerRef = React.useRef(null);
  const touchPositionRef = React.useRef(null);
  const longPressTimeout = useTimeout();
  const allowMouseUpTimeout = useTimeout();
  const allowMouseUpRef = React.useRef(false);
  const handleLongPress = useEventCallback((x, y, event) => {
    const isTouchEvent = event.type.startsWith('touch');
    setAnchor({
      getBoundingClientRect() {
        return DOMRect.fromRect({
          width: isTouchEvent ? 10 : 0,
          height: isTouchEvent ? 10 : 0,
          x,
          y
        });
      }
    });
    allowMouseUpRef.current = false;
    actionsRef.current?.setOpen(true, createBaseUIEventDetails('trigger-press', event));
    allowMouseUpTimeout.start(LONG_PRESS_DELAY, () => {
      allowMouseUpRef.current = true;
    });
  });
  const handleContextMenu = useEventCallback(event => {
    allowMouseUpTriggerRef.current = true;
    stopEvent(event);
    handleLongPress(event.clientX, event.clientY, event.nativeEvent);
    const doc = ownerDocument(triggerRef.current);
    doc.addEventListener('mouseup', mouseEvent => {
      allowMouseUpTriggerRef.current = false;
      if (!allowMouseUpRef.current) {
        return;
      }
      allowMouseUpTimeout.clear();
      allowMouseUpRef.current = false;
      if (contains(positionerRef.current, getTarget(mouseEvent))) {
        return;
      }
      actionsRef.current?.setOpen(false, createBaseUIEventDetails('cancel-open', mouseEvent));
    }, {
      once: true
    });
  });
  const handleTouchStart = useEventCallback(event => {
    allowMouseUpTriggerRef.current = false;
    if (event.touches.length === 1) {
      event.stopPropagation();
      const touch = event.touches[0];
      touchPositionRef.current = {
        x: touch.clientX,
        y: touch.clientY
      };
      longPressTimeout.start(LONG_PRESS_DELAY, () => {
        if (touchPositionRef.current) {
          handleLongPress(touchPositionRef.current.x, touchPositionRef.current.y, event.nativeEvent);
        }
      });
    }
  });
  const handleTouchMove = useEventCallback(event => {
    if (longPressTimeout.isStarted() && touchPositionRef.current && event.touches.length === 1) {
      const touch = event.touches[0];
      const moveThreshold = 10;
      const deltaX = Math.abs(touch.clientX - touchPositionRef.current.x);
      const deltaY = Math.abs(touch.clientY - touchPositionRef.current.y);
      if (deltaX > moveThreshold || deltaY > moveThreshold) {
        longPressTimeout.clear();
      }
    }
  });
  const handleTouchEnd = useEventCallback(() => {
    longPressTimeout.clear();
    touchPositionRef.current = null;
  });
  React.useEffect(() => {
    function handleDocumentContextMenu(event) {
      const target = getTarget(event);
      const targetElement = target;
      if (contains(triggerRef.current, targetElement) || contains(internalBackdropRef.current, targetElement) || contains(backdropRef.current, targetElement)) {
        event.preventDefault();
      }
    }
    const doc = ownerDocument(triggerRef.current);
    doc.addEventListener('contextmenu', handleDocumentContextMenu);
    return () => {
      doc.removeEventListener('contextmenu', handleDocumentContextMenu);
    };
  }, [backdropRef, internalBackdropRef]);
  const element = useRenderElement('div', componentProps, {
    ref: [triggerRef, forwardedRef],
    props: [{
      onContextMenu: handleContextMenu,
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
      onTouchCancel: handleTouchEnd,
      style: {
        WebkitTouchCallout: 'none'
      }
    }, elementProps]
  });
  return element;
});
if (process.env.NODE_ENV !== "production") ContextMenuTrigger.displayName = "ContextMenuTrigger";
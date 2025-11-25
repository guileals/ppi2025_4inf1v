'use client';

import * as React from 'react';
import { useAnimationFrame } from '@base-ui-components/utils/useAnimationFrame';
import { useTimeout } from '@base-ui-components/utils/useTimeout';
import { EMPTY_OBJECT } from "../../utils/constants.js";
import { isMouseLikePointerType, isTypeableElement } from "../utils.js";
import { createBaseUIEventDetails } from "../../utils/createBaseUIEventDetails.js";
/**
 * Opens or closes the floating element when clicking the reference element.
 * @see https://floating-ui.com/docs/useClick
 */
export function useClick(context, props = {}) {
  const {
    open,
    onOpenChange,
    dataRef
  } = context;
  const {
    enabled = true,
    event: eventOption = 'click',
    toggle = true,
    ignoreMouse = false,
    stickIfOpen = true,
    touchOpenDelay = 0
  } = props;
  const pointerTypeRef = React.useRef(undefined);
  const frame = useAnimationFrame();
  const touchOpenTimeout = useTimeout();
  const reference = React.useMemo(() => ({
    onPointerDown(event) {
      pointerTypeRef.current = event.pointerType;
    },
    onMouseDown(event) {
      const pointerType = pointerTypeRef.current;
      const nativeEvent = event.nativeEvent;

      // Ignore all buttons except for the "main" button.
      // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button
      if (event.button !== 0 || eventOption === 'click' || isMouseLikePointerType(pointerType, true) && ignoreMouse) {
        return;
      }
      const openEvent = dataRef.current.openEvent;
      const openEventType = openEvent?.type;
      const nextOpen = !(open && toggle && (openEvent && stickIfOpen ? openEventType === 'click' || openEventType === 'mousedown' : true));

      // Animations sometimes won't run on a typeable element if using a rAF.
      // Focus is always set on these elements. For touch, we may delay opening.
      if (isTypeableElement(nativeEvent.target)) {
        const details = createBaseUIEventDetails('trigger-press', nativeEvent);
        if (nextOpen && pointerType === 'touch' && touchOpenDelay > 0) {
          touchOpenTimeout.start(touchOpenDelay, () => {
            onOpenChange(true, details);
          });
        } else {
          onOpenChange(nextOpen, details);
        }
        return;
      }

      // Wait until focus is set on the element. This is an alternative to
      // `event.preventDefault()` to avoid :focus-visible from appearing when using a pointer.
      frame.request(() => {
        const details = createBaseUIEventDetails('trigger-press', nativeEvent);
        if (nextOpen && pointerType === 'touch' && touchOpenDelay > 0) {
          touchOpenTimeout.start(touchOpenDelay, () => {
            onOpenChange(true, details);
          });
        } else {
          onOpenChange(nextOpen, details);
        }
      });
    },
    onClick(event) {
      if (eventOption === 'mousedown-only') {
        return;
      }
      const pointerType = pointerTypeRef.current;
      if (eventOption === 'mousedown' && pointerType) {
        pointerTypeRef.current = undefined;
        return;
      }
      if (isMouseLikePointerType(pointerType, true) && ignoreMouse) {
        return;
      }
      const openEvent = dataRef.current.openEvent;
      const openEventType = openEvent?.type;
      const nextOpen = !(open && toggle && (openEvent && stickIfOpen ? openEventType === 'click' || openEventType === 'mousedown' || openEventType === 'keydown' || openEventType === 'keyup' : true));
      const details = createBaseUIEventDetails('trigger-press', event.nativeEvent);
      if (nextOpen && pointerType === 'touch' && touchOpenDelay > 0) {
        touchOpenTimeout.start(touchOpenDelay, () => {
          onOpenChange(true, details);
        });
      } else {
        onOpenChange(nextOpen, details);
      }
    },
    onKeyDown() {
      pointerTypeRef.current = undefined;
    }
  }), [dataRef, eventOption, ignoreMouse, onOpenChange, open, stickIfOpen, toggle, frame, touchOpenTimeout, touchOpenDelay]);
  return React.useMemo(() => enabled ? {
    reference
  } : EMPTY_OBJECT, [enabled, reference]);
}
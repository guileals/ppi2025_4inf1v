import * as React from 'react';
import { getOverflowAncestors } from '@floating-ui/react-dom';
import { getComputedStyle, getParentNode, isElement, isHTMLElement, isLastTraversableNode, isWebKit } from '@floating-ui/utils/dom';
import { Timeout, useTimeout } from '@base-ui-components/utils/useTimeout';
import { useEventCallback } from '@base-ui-components/utils/useEventCallback';
import { contains, getDocument, getTarget, isEventTargetWithin, isReactEvent, isRootElement, getNodeChildren } from "../utils.js";

/* eslint-disable no-underscore-dangle */

import { useFloatingTree } from "../components/FloatingTree.js";
import { createBaseUIEventDetails } from "../../utils/createBaseUIEventDetails.js";
import { createAttribute } from "../utils/createAttribute.js";
const bubbleHandlerKeys = {
  intentional: 'onClick',
  sloppy: 'onPointerDown'
};
export function normalizeProp(normalizable) {
  return {
    escapeKey: typeof normalizable === 'boolean' ? normalizable : normalizable?.escapeKey ?? false,
    outsidePress: typeof normalizable === 'boolean' ? normalizable : normalizable?.outsidePress ?? true
  };
}
/**
 * Closes the floating element when a dismissal is requested — by default, when
 * the user presses the `escape` key or outside of the floating element.
 * @see https://floating-ui.com/docs/useDismiss
 */
export function useDismiss(context, props = {}) {
  const {
    open,
    onOpenChange,
    elements,
    dataRef
  } = context;
  const {
    enabled = true,
    escapeKey = true,
    outsidePress: outsidePressProp = true,
    outsidePressEvent = 'sloppy',
    referencePress = false,
    referencePressEvent = 'sloppy',
    ancestorScroll = false,
    bubbles,
    capture
  } = props;
  const tree = useFloatingTree();
  const outsidePressFn = useEventCallback(typeof outsidePressProp === 'function' ? outsidePressProp : () => false);
  const outsidePress = typeof outsidePressProp === 'function' ? outsidePressFn : outsidePressProp;
  const endedOrStartedInsideRef = React.useRef(false);
  const {
    escapeKey: escapeKeyBubbles,
    outsidePress: outsidePressBubbles
  } = normalizeProp(bubbles);
  const {
    escapeKey: escapeKeyCapture,
    outsidePress: outsidePressCapture
  } = normalizeProp(capture);
  const touchStateRef = React.useRef(null);
  const cancelDismissOnEndTimeout = useTimeout();
  const insideReactTreeTimeout = useTimeout();
  const isComposingRef = React.useRef(false);
  const currentPointerTypeRef = React.useRef('');
  const trackPointerType = useEventCallback(event => {
    currentPointerTypeRef.current = event.pointerType;
  });
  const getOutsidePressEvent = useEventCallback(() => {
    const type = currentPointerTypeRef.current;
    const computedType = type === 'pen' || !type ? 'mouse' : type;
    const resolved = typeof outsidePressEvent === 'function' ? outsidePressEvent() : outsidePressEvent;
    if (typeof resolved === 'string') {
      return resolved;
    }
    return resolved[computedType];
  });
  const closeOnEscapeKeyDown = useEventCallback(event => {
    if (!open || !enabled || !escapeKey || event.key !== 'Escape') {
      return;
    }

    // Wait until IME is settled. Pressing `Escape` while composing should
    // close the compose menu, but not the floating element.
    if (isComposingRef.current) {
      return;
    }
    const nodeId = dataRef.current.floatingContext?.nodeId;
    const children = tree ? getNodeChildren(tree.nodesRef.current, nodeId) : [];
    if (!escapeKeyBubbles) {
      if (children.length > 0) {
        let shouldDismiss = true;
        children.forEach(child => {
          if (child.context?.open && !child.context.dataRef.current.__escapeKeyBubbles) {
            shouldDismiss = false;
          }
        });
        if (!shouldDismiss) {
          return;
        }
      }
    }
    const native = isReactEvent(event) ? event.nativeEvent : event;
    const eventDetails = createBaseUIEventDetails('escape-key', native);
    onOpenChange(false, eventDetails);
    if (!escapeKeyBubbles && !eventDetails.isPropagationAllowed) {
      event.stopPropagation();
    }
  });
  const shouldIgnoreEvent = useEventCallback(event => {
    const computedOutsidePressEvent = getOutsidePressEvent();
    return computedOutsidePressEvent === 'intentional' && event.type !== 'click' || computedOutsidePressEvent === 'sloppy' && event.type === 'click';
  });
  const closeOnEscapeKeyDownCapture = useEventCallback(event => {
    const callback = () => {
      closeOnEscapeKeyDown(event);
      getTarget(event)?.removeEventListener('keydown', callback);
    };
    getTarget(event)?.addEventListener('keydown', callback);
  });
  const closeOnPressOutside = useEventCallback((event, endedOrStartedInside = false) => {
    if (shouldIgnoreEvent(event)) {
      return;
    }

    // Given developers can stop the propagation of the synthetic event,
    // we can only be confident with a positive value.
    const insideReactTree = dataRef.current.insideReactTree;
    dataRef.current.insideReactTree = false;
    if (getOutsidePressEvent() === 'intentional' && endedOrStartedInside) {
      return;
    }
    if (insideReactTree) {
      return;
    }
    if (typeof outsidePress === 'function' && !outsidePress(event)) {
      return;
    }
    const target = getTarget(event);
    const inertSelector = `[${createAttribute('inert')}]`;
    const markers = getDocument(elements.floating).querySelectorAll(inertSelector);
    let targetRootAncestor = isElement(target) ? target : null;
    while (targetRootAncestor && !isLastTraversableNode(targetRootAncestor)) {
      const nextParent = getParentNode(targetRootAncestor);
      if (isLastTraversableNode(nextParent) || !isElement(nextParent)) {
        break;
      }
      targetRootAncestor = nextParent;
    }

    // Check if the click occurred on a third-party element injected after the
    // floating element rendered.
    if (markers.length && isElement(target) && !isRootElement(target) &&
    // Clicked on a direct ancestor (e.g. FloatingOverlay).
    !contains(target, elements.floating) &&
    // If the target root element contains none of the markers, then the
    // element was injected after the floating element rendered.
    Array.from(markers).every(marker => !contains(targetRootAncestor, marker))) {
      return;
    }

    // Check if the click occurred on the scrollbar
    if (isHTMLElement(target)) {
      const lastTraversableNode = isLastTraversableNode(target);
      const style = getComputedStyle(target);
      const scrollRe = /auto|scroll/;
      const isScrollableX = lastTraversableNode || scrollRe.test(style.overflowX);
      const isScrollableY = lastTraversableNode || scrollRe.test(style.overflowY);
      const canScrollX = isScrollableX && target.clientWidth > 0 && target.scrollWidth > target.clientWidth;
      const canScrollY = isScrollableY && target.clientHeight > 0 && target.scrollHeight > target.clientHeight;
      const isRTL = style.direction === 'rtl';

      // Check click position relative to scrollbar.
      // In some browsers it is possible to change the <body> (or window)
      // scrollbar to the left side, but is very rare and is difficult to
      // check for. Plus, for modal dialogs with backdrops, it is more
      // important that the backdrop is checked but not so much the window.
      const pressedVerticalScrollbar = canScrollY && (isRTL ? event.offsetX <= target.offsetWidth - target.clientWidth : event.offsetX > target.clientWidth);
      const pressedHorizontalScrollbar = canScrollX && event.offsetY > target.clientHeight;
      if (pressedVerticalScrollbar || pressedHorizontalScrollbar) {
        return;
      }
    }
    const nodeId = dataRef.current.floatingContext?.nodeId;
    const targetIsInsideChildren = tree && getNodeChildren(tree.nodesRef.current, nodeId).some(node => isEventTargetWithin(event, node.context?.elements.floating));
    if (isEventTargetWithin(event, elements.floating) || isEventTargetWithin(event, elements.domReference) || targetIsInsideChildren) {
      return;
    }
    const children = tree ? getNodeChildren(tree.nodesRef.current, nodeId) : [];
    if (children.length > 0) {
      let shouldDismiss = true;
      children.forEach(child => {
        if (child.context?.open && !child.context.dataRef.current.__outsidePressBubbles) {
          shouldDismiss = false;
        }
      });
      if (!shouldDismiss) {
        return;
      }
    }
    onOpenChange(false, createBaseUIEventDetails('outside-press', event));
  });
  const handlePointerDown = useEventCallback(event => {
    if (getOutsidePressEvent() !== 'sloppy' || !open || !enabled || isEventTargetWithin(event, elements.floating) || isEventTargetWithin(event, elements.domReference)) {
      return;
    }
    if (event.pointerType === 'touch') {
      touchStateRef.current = {
        startTime: Date.now(),
        startX: event.clientX,
        startY: event.clientY,
        dismissOnPointerUp: false,
        dismissOnMouseDown: true
      };
      cancelDismissOnEndTimeout.start(1000, () => {
        if (touchStateRef.current) {
          touchStateRef.current.dismissOnPointerUp = false;
          touchStateRef.current.dismissOnMouseDown = false;
        }
      });
      return;
    }
    closeOnPressOutside(event);
  });
  const closeOnPressOutsideCapture = useEventCallback(event => {
    // When click outside is lazy (`up` event), handle dragging.
    // Don't close if:
    // - The click started inside the floating element.
    // - The click ended inside the floating element.
    const endedOrStartedInside = endedOrStartedInsideRef.current;
    endedOrStartedInsideRef.current = false;
    if (shouldIgnoreEvent(event)) {
      return;
    }
    cancelDismissOnEndTimeout.clear();
    if (event.type === 'mousedown' && touchStateRef.current && !touchStateRef.current.dismissOnMouseDown) {
      return;
    }
    const callback = () => {
      if (event.type === 'pointerdown') {
        handlePointerDown(event);
      } else {
        closeOnPressOutside(event, endedOrStartedInside);
      }
      getTarget(event)?.removeEventListener(event.type, callback);
    };
    getTarget(event)?.addEventListener(event.type, callback);
  });
  const handlePointerMove = useEventCallback(event => {
    if (getOutsidePressEvent() !== 'sloppy' || event.pointerType !== 'touch' || !touchStateRef.current || isEventTargetWithin(event, elements.floating) || isEventTargetWithin(event, elements.domReference)) {
      return;
    }
    const deltaX = Math.abs(event.clientX - touchStateRef.current.startX);
    const deltaY = Math.abs(event.clientY - touchStateRef.current.startY);
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    if (distance > 5) {
      touchStateRef.current.dismissOnPointerUp = true;
    }
    if (distance > 10) {
      closeOnPressOutside(event);
      cancelDismissOnEndTimeout.clear();
      touchStateRef.current = null;
    }
  });
  const handlePointerUp = useEventCallback(event => {
    if (getOutsidePressEvent() !== 'sloppy' || event.pointerType !== 'touch' || !touchStateRef.current || isEventTargetWithin(event, elements.floating) || isEventTargetWithin(event, elements.domReference)) {
      return;
    }
    if (touchStateRef.current.dismissOnPointerUp) {
      closeOnPressOutside(event);
    }
    cancelDismissOnEndTimeout.clear();
    touchStateRef.current = null;
  });
  React.useEffect(() => {
    if (!open || !enabled) {
      return undefined;
    }
    dataRef.current.__escapeKeyBubbles = escapeKeyBubbles;
    dataRef.current.__outsidePressBubbles = outsidePressBubbles;
    const compositionTimeout = new Timeout();
    function onScroll(event) {
      onOpenChange(false, createBaseUIEventDetails('none', event));
    }
    function handleCompositionStart() {
      compositionTimeout.clear();
      isComposingRef.current = true;
    }
    function handleCompositionEnd() {
      // Safari fires `compositionend` before `keydown`, so we need to wait
      // until the next tick to set `isComposing` to `false`.
      // https://bugs.webkit.org/show_bug.cgi?id=165004
      compositionTimeout.start(
      // 0ms or 1ms don't work in Safari. 5ms appears to consistently work.
      // Only apply to WebKit for the test to remain 0ms.
      isWebKit() ? 5 : 0, () => {
        isComposingRef.current = false;
      });
    }
    const doc = getDocument(elements.floating);
    doc.addEventListener('pointerdown', trackPointerType, true);
    if (escapeKey) {
      doc.addEventListener('keydown', escapeKeyCapture ? closeOnEscapeKeyDownCapture : closeOnEscapeKeyDown, escapeKeyCapture);
      doc.addEventListener('compositionstart', handleCompositionStart);
      doc.addEventListener('compositionend', handleCompositionEnd);
    }
    if (outsidePress) {
      doc.addEventListener('click', outsidePressCapture ? closeOnPressOutsideCapture : closeOnPressOutside, outsidePressCapture);
      doc.addEventListener('pointerdown', outsidePressCapture ? closeOnPressOutsideCapture : closeOnPressOutside, outsidePressCapture);
      doc.addEventListener('pointermove', handlePointerMove, outsidePressCapture);
      doc.addEventListener('pointerup', handlePointerUp, outsidePressCapture);
      doc.addEventListener('mousedown', closeOnPressOutsideCapture, outsidePressCapture);
    }
    let ancestors = [];
    if (ancestorScroll) {
      if (isElement(elements.domReference)) {
        ancestors = getOverflowAncestors(elements.domReference);
      }
      if (isElement(elements.floating)) {
        ancestors = ancestors.concat(getOverflowAncestors(elements.floating));
      }
      if (!isElement(elements.reference) && elements.reference && elements.reference.contextElement) {
        ancestors = ancestors.concat(getOverflowAncestors(elements.reference.contextElement));
      }
    }

    // Ignore the visual viewport for scrolling dismissal (allow pinch-zoom)
    ancestors = ancestors.filter(ancestor => ancestor !== doc.defaultView?.visualViewport);
    ancestors.forEach(ancestor => {
      ancestor.addEventListener('scroll', onScroll, {
        passive: true
      });
    });
    return () => {
      doc.removeEventListener('pointerdown', trackPointerType, true);
      if (escapeKey) {
        doc.removeEventListener('keydown', escapeKeyCapture ? closeOnEscapeKeyDownCapture : closeOnEscapeKeyDown, escapeKeyCapture);
        doc.removeEventListener('compositionstart', handleCompositionStart);
        doc.removeEventListener('compositionend', handleCompositionEnd);
      }
      if (outsidePress) {
        doc.removeEventListener('click', outsidePressCapture ? closeOnPressOutsideCapture : closeOnPressOutside, outsidePressCapture);
        doc.removeEventListener('pointerdown', outsidePressCapture ? closeOnPressOutsideCapture : closeOnPressOutside, outsidePressCapture);
        doc.removeEventListener('pointermove', handlePointerMove, outsidePressCapture);
        doc.removeEventListener('pointerup', handlePointerUp, outsidePressCapture);
        doc.removeEventListener('mousedown', closeOnPressOutsideCapture, outsidePressCapture);
      }
      ancestors.forEach(ancestor => {
        ancestor.removeEventListener('scroll', onScroll);
      });
      compositionTimeout.clear();
    };
  }, [dataRef, elements, escapeKey, outsidePress, open, onOpenChange, ancestorScroll, enabled, escapeKeyBubbles, outsidePressBubbles, closeOnEscapeKeyDown, escapeKeyCapture, closeOnEscapeKeyDownCapture, closeOnPressOutside, outsidePressCapture, closeOnPressOutsideCapture, handlePointerDown, handlePointerMove, handlePointerUp, trackPointerType]);
  React.useEffect(() => {
    dataRef.current.insideReactTree = false;
  }, [dataRef, outsidePress]);
  const reference = React.useMemo(() => ({
    onKeyDown: closeOnEscapeKeyDown,
    ...(referencePress && {
      [bubbleHandlerKeys[referencePressEvent]]: event => {
        onOpenChange(false, createBaseUIEventDetails('trigger-press', event.nativeEvent));
      },
      ...(referencePressEvent !== 'intentional' && {
        onClick(event) {
          onOpenChange(false, createBaseUIEventDetails('trigger-press', event.nativeEvent));
        }
      })
    })
  }), [closeOnEscapeKeyDown, onOpenChange, referencePress, referencePressEvent]);
  const handlePressedInside = useEventCallback(event => {
    const target = getTarget(event.nativeEvent);
    if (!contains(elements.floating, target) || event.button !== 0) {
      return;
    }
    endedOrStartedInsideRef.current = true;
  });
  const handleCaptureInside = useEventCallback(() => {
    dataRef.current.insideReactTree = true;
    insideReactTreeTimeout.start(0, () => {
      dataRef.current.insideReactTree = false;
    });
  });
  const floating = React.useMemo(() => ({
    onKeyDown: closeOnEscapeKeyDown,
    onMouseDown: handlePressedInside,
    onMouseUp: handlePressedInside,
    onPointerDownCapture: handleCaptureInside,
    onMouseDownCapture: handleCaptureInside,
    onClickCapture: handleCaptureInside,
    onMouseUpCapture: handleCaptureInside
  }), [closeOnEscapeKeyDown, handlePressedInside, handleCaptureInside]);
  return React.useMemo(() => enabled ? {
    reference,
    floating
  } : {}, [enabled, reference, floating]);
}
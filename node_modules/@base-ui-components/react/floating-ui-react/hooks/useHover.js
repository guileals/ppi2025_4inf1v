"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDelay = getDelay;
exports.useHover = useHover;
var React = _interopRequireWildcard(require("react"));
var _dom = require("@floating-ui/utils/dom");
var _useTimeout = require("@base-ui-components/utils/useTimeout");
var _useLatestRef = require("@base-ui-components/utils/useLatestRef");
var _useEventCallback = require("@base-ui-components/utils/useEventCallback");
var _useIsoLayoutEffect = require("@base-ui-components/utils/useIsoLayoutEffect");
var _utils = require("../utils");
var _FloatingTree = require("../components/FloatingTree");
var _createBaseUIEventDetails = require("../../utils/createBaseUIEventDetails");
var _createAttribute = require("../utils/createAttribute");
const safePolygonIdentifier = (0, _createAttribute.createAttribute)('safe-polygon');
function getDelay(value, prop, pointerType) {
  if (pointerType && !(0, _utils.isMouseLikePointerType)(pointerType)) {
    return 0;
  }
  if (typeof value === 'number') {
    return value;
  }
  if (typeof value === 'function') {
    const result = value();
    if (typeof result === 'number') {
      return result;
    }
    return result?.[prop];
  }
  return value?.[prop];
}
function getRestMs(value) {
  if (typeof value === 'function') {
    return value();
  }
  return value;
}
/**
 * Opens the floating element while hovering over the reference element, like
 * CSS `:hover`.
 * @see https://floating-ui.com/docs/useHover
 */
function useHover(context, props = {}) {
  const {
    open,
    onOpenChange,
    dataRef,
    events,
    elements
  } = context;
  const {
    enabled = true,
    delay = 0,
    handleClose = null,
    mouseOnly = false,
    restMs = 0,
    move = true
  } = props;
  const tree = (0, _FloatingTree.useFloatingTree)();
  const parentId = (0, _FloatingTree.useFloatingParentNodeId)();
  const handleCloseRef = (0, _useLatestRef.useLatestRef)(handleClose);
  const delayRef = (0, _useLatestRef.useLatestRef)(delay);
  const openRef = (0, _useLatestRef.useLatestRef)(open);
  const restMsRef = (0, _useLatestRef.useLatestRef)(restMs);
  const pointerTypeRef = React.useRef(undefined);
  const timeout = (0, _useTimeout.useTimeout)();
  const handlerRef = React.useRef(undefined);
  const restTimeout = (0, _useTimeout.useTimeout)();
  const blockMouseMoveRef = React.useRef(true);
  const performedPointerEventsMutationRef = React.useRef(false);
  const unbindMouseMoveRef = React.useRef(() => {});
  const restTimeoutPendingRef = React.useRef(false);
  const isHoverOpen = (0, _useEventCallback.useEventCallback)(() => {
    const type = dataRef.current.openEvent?.type;
    return type?.includes('mouse') && type !== 'mousedown';
  });

  // When closing before opening, clear the delay timeouts to cancel it
  // from showing.
  React.useEffect(() => {
    if (!enabled) {
      return undefined;
    }
    function onOpenChangeLocal(details) {
      if (!details.open) {
        timeout.clear();
        restTimeout.clear();
        blockMouseMoveRef.current = true;
        restTimeoutPendingRef.current = false;
      }
    }
    events.on('openchange', onOpenChangeLocal);
    return () => {
      events.off('openchange', onOpenChangeLocal);
    };
  }, [enabled, events, timeout, restTimeout]);
  React.useEffect(() => {
    if (!enabled) {
      return undefined;
    }
    if (!handleCloseRef.current) {
      return undefined;
    }
    if (!open) {
      return undefined;
    }
    function onLeave(event) {
      if (isHoverOpen()) {
        onOpenChange(false, (0, _createBaseUIEventDetails.createBaseUIEventDetails)('trigger-hover', event));
      }
    }
    const html = (0, _utils.getDocument)(elements.floating).documentElement;
    html.addEventListener('mouseleave', onLeave);
    return () => {
      html.removeEventListener('mouseleave', onLeave);
    };
  }, [elements.floating, open, onOpenChange, enabled, handleCloseRef, isHoverOpen]);
  const closeWithDelay = React.useCallback((event, runElseBranch = true) => {
    const closeDelay = getDelay(delayRef.current, 'close', pointerTypeRef.current);
    if (closeDelay && !handlerRef.current) {
      timeout.start(closeDelay, () => onOpenChange(false, (0, _createBaseUIEventDetails.createBaseUIEventDetails)('trigger-hover', event)));
    } else if (runElseBranch) {
      timeout.clear();
      onOpenChange(false, (0, _createBaseUIEventDetails.createBaseUIEventDetails)('trigger-hover', event));
    }
  }, [delayRef, onOpenChange, timeout]);
  const cleanupMouseMoveHandler = (0, _useEventCallback.useEventCallback)(() => {
    unbindMouseMoveRef.current();
    handlerRef.current = undefined;
  });
  const clearPointerEvents = (0, _useEventCallback.useEventCallback)(() => {
    if (performedPointerEventsMutationRef.current) {
      const body = (0, _utils.getDocument)(elements.floating).body;
      body.style.pointerEvents = '';
      body.removeAttribute(safePolygonIdentifier);
      performedPointerEventsMutationRef.current = false;
    }
  });
  const isClickLikeOpenEvent = (0, _useEventCallback.useEventCallback)(() => {
    return dataRef.current.openEvent ? ['click', 'mousedown'].includes(dataRef.current.openEvent.type) : false;
  });

  // Registering the mouse events on the reference directly to bypass React's
  // delegation system. If the cursor was on a disabled element and then entered
  // the reference (no gap), `mouseenter` doesn't fire in the delegation system.
  React.useEffect(() => {
    if (!enabled) {
      return undefined;
    }
    function onReferenceMouseEnter(event) {
      timeout.clear();
      blockMouseMoveRef.current = false;
      if (mouseOnly && !(0, _utils.isMouseLikePointerType)(pointerTypeRef.current) || getRestMs(restMsRef.current) > 0 && !getDelay(delayRef.current, 'open')) {
        return;
      }
      const openDelay = getDelay(delayRef.current, 'open', pointerTypeRef.current);
      if (openDelay) {
        timeout.start(openDelay, () => {
          if (!openRef.current) {
            onOpenChange(true, (0, _createBaseUIEventDetails.createBaseUIEventDetails)('trigger-hover', event));
          }
        });
      } else if (!open) {
        onOpenChange(true, (0, _createBaseUIEventDetails.createBaseUIEventDetails)('trigger-hover', event));
      }
    }
    function onReferenceMouseLeave(event) {
      if (isClickLikeOpenEvent()) {
        clearPointerEvents();
        return;
      }
      unbindMouseMoveRef.current();
      const doc = (0, _utils.getDocument)(elements.floating);
      restTimeout.clear();
      restTimeoutPendingRef.current = false;
      if (handleCloseRef.current && dataRef.current.floatingContext) {
        // Prevent clearing `onScrollMouseLeave` timeout.
        if (!open) {
          timeout.clear();
        }
        handlerRef.current = handleCloseRef.current({
          ...dataRef.current.floatingContext,
          tree,
          x: event.clientX,
          y: event.clientY,
          onClose() {
            clearPointerEvents();
            cleanupMouseMoveHandler();
            if (!isClickLikeOpenEvent()) {
              closeWithDelay(event, true);
            }
          }
        });
        const handler = handlerRef.current;
        doc.addEventListener('mousemove', handler);
        unbindMouseMoveRef.current = () => {
          doc.removeEventListener('mousemove', handler);
        };
        return;
      }

      // Allow interactivity without `safePolygon` on touch devices. With a
      // pointer, a short close delay is an alternative, so it should work
      // consistently.
      const shouldClose = pointerTypeRef.current === 'touch' ? !(0, _utils.contains)(elements.floating, event.relatedTarget) : true;
      if (shouldClose) {
        closeWithDelay(event);
      }
    }

    // Ensure the floating element closes after scrolling even if the pointer
    // did not move.
    // https://github.com/floating-ui/floating-ui/discussions/1692
    function onScrollMouseLeave(event) {
      if (isClickLikeOpenEvent()) {
        return;
      }
      if (!dataRef.current.floatingContext) {
        return;
      }
      handleCloseRef.current?.({
        ...dataRef.current.floatingContext,
        tree,
        x: event.clientX,
        y: event.clientY,
        onClose() {
          clearPointerEvents();
          cleanupMouseMoveHandler();
          if (!isClickLikeOpenEvent()) {
            closeWithDelay(event);
          }
        }
      })(event);
    }
    function onFloatingMouseEnter() {
      timeout.clear();
    }
    function onFloatingMouseLeave(event) {
      if (!isClickLikeOpenEvent()) {
        closeWithDelay(event, false);
      }
    }
    if ((0, _dom.isElement)(elements.domReference)) {
      const reference = elements.domReference;
      const floating = elements.floating;
      if (open) {
        reference.addEventListener('mouseleave', onScrollMouseLeave);
      }
      if (move) {
        reference.addEventListener('mousemove', onReferenceMouseEnter, {
          once: true
        });
      }
      reference.addEventListener('mouseenter', onReferenceMouseEnter);
      reference.addEventListener('mouseleave', onReferenceMouseLeave);
      if (floating) {
        floating.addEventListener('mouseleave', onScrollMouseLeave);
        floating.addEventListener('mouseenter', onFloatingMouseEnter);
        floating.addEventListener('mouseleave', onFloatingMouseLeave);
      }
      return () => {
        if (open) {
          reference.removeEventListener('mouseleave', onScrollMouseLeave);
        }
        if (move) {
          reference.removeEventListener('mousemove', onReferenceMouseEnter);
        }
        reference.removeEventListener('mouseenter', onReferenceMouseEnter);
        reference.removeEventListener('mouseleave', onReferenceMouseLeave);
        if (floating) {
          floating.removeEventListener('mouseleave', onScrollMouseLeave);
          floating.removeEventListener('mouseenter', onFloatingMouseEnter);
          floating.removeEventListener('mouseleave', onFloatingMouseLeave);
        }
      };
    }
    return undefined;
  }, [elements, enabled, context, mouseOnly, move, closeWithDelay, cleanupMouseMoveHandler, clearPointerEvents, onOpenChange, open, openRef, tree, delayRef, handleCloseRef, dataRef, isClickLikeOpenEvent, restMsRef, timeout, restTimeout]);

  // Block pointer-events of every element other than the reference and floating
  // while the floating element is open and has a `handleClose` handler. Also
  // handles nested floating elements.
  // https://github.com/floating-ui/floating-ui/issues/1722
  (0, _useIsoLayoutEffect.useIsoLayoutEffect)(() => {
    if (!enabled) {
      return undefined;
    }

    // eslint-disable-next-line no-underscore-dangle
    if (open && handleCloseRef.current?.__options?.blockPointerEvents && isHoverOpen()) {
      performedPointerEventsMutationRef.current = true;
      const floatingEl = elements.floating;
      if ((0, _dom.isElement)(elements.domReference) && floatingEl) {
        const body = (0, _utils.getDocument)(elements.floating).body;
        body.setAttribute(safePolygonIdentifier, '');
        const ref = elements.domReference;
        const parentFloating = tree?.nodesRef.current.find(node => node.id === parentId)?.context?.elements.floating;
        if (parentFloating) {
          parentFloating.style.pointerEvents = '';
        }
        body.style.pointerEvents = 'none';
        ref.style.pointerEvents = 'auto';
        floatingEl.style.pointerEvents = 'auto';
        return () => {
          body.style.pointerEvents = '';
          ref.style.pointerEvents = '';
          floatingEl.style.pointerEvents = '';
        };
      }
    }
    return undefined;
  }, [enabled, open, parentId, elements, tree, handleCloseRef, isHoverOpen]);
  (0, _useIsoLayoutEffect.useIsoLayoutEffect)(() => {
    if (!open) {
      pointerTypeRef.current = undefined;
      restTimeoutPendingRef.current = false;
      cleanupMouseMoveHandler();
      clearPointerEvents();
    }
  }, [open, cleanupMouseMoveHandler, clearPointerEvents]);
  React.useEffect(() => {
    return () => {
      cleanupMouseMoveHandler();
      timeout.clear();
      restTimeout.clear();
    };
  }, [enabled, elements.domReference, cleanupMouseMoveHandler, timeout, restTimeout]);
  React.useEffect(() => {
    return clearPointerEvents;
  }, [clearPointerEvents]);
  const reference = React.useMemo(() => {
    function setPointerRef(event) {
      pointerTypeRef.current = event.pointerType;
    }
    return {
      onPointerDown: setPointerRef,
      onPointerEnter: setPointerRef,
      onMouseMove(event) {
        const {
          nativeEvent
        } = event;
        function handleMouseMove() {
          if (!blockMouseMoveRef.current && !openRef.current) {
            onOpenChange(true, (0, _createBaseUIEventDetails.createBaseUIEventDetails)('trigger-hover', nativeEvent));
          }
        }
        if (mouseOnly && !(0, _utils.isMouseLikePointerType)(pointerTypeRef.current)) {
          return;
        }
        if (open || getRestMs(restMsRef.current) === 0) {
          return;
        }

        // Ignore insignificant movements to account for tremors.
        if (restTimeoutPendingRef.current && event.movementX ** 2 + event.movementY ** 2 < 2) {
          return;
        }
        restTimeout.clear();
        if (pointerTypeRef.current === 'touch') {
          handleMouseMove();
        } else {
          restTimeoutPendingRef.current = true;
          restTimeout.start(getRestMs(restMsRef.current), handleMouseMove);
        }
      }
    };
  }, [mouseOnly, onOpenChange, open, openRef, restMsRef, restTimeout]);
  return React.useMemo(() => enabled ? {
    reference
  } : {}, [enabled, reference]);
}
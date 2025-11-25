"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContextMenuTrigger = void 0;
var React = _interopRequireWildcard(require("react"));
var _useEventCallback = require("@base-ui-components/utils/useEventCallback");
var _owner = require("@base-ui-components/utils/owner");
var _useTimeout = require("@base-ui-components/utils/useTimeout");
var _utils = require("../../floating-ui-react/utils");
var _ContextMenuRootContext = require("../root/ContextMenuRootContext");
var _useRenderElement = require("../../utils/useRenderElement");
var _createBaseUIEventDetails = require("../../utils/createBaseUIEventDetails");
const LONG_PRESS_DELAY = 500;

/**
 * An area that opens the menu on right click or long press.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Context Menu](https://base-ui.com/react/components/context-menu)
 */
const ContextMenuTrigger = exports.ContextMenuTrigger = /*#__PURE__*/React.forwardRef(function ContextMenuTrigger(componentProps, forwardedRef) {
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
  } = (0, _ContextMenuRootContext.useContextMenuRootContext)(false);
  const triggerRef = React.useRef(null);
  const touchPositionRef = React.useRef(null);
  const longPressTimeout = (0, _useTimeout.useTimeout)();
  const allowMouseUpTimeout = (0, _useTimeout.useTimeout)();
  const allowMouseUpRef = React.useRef(false);
  const handleLongPress = (0, _useEventCallback.useEventCallback)((x, y, event) => {
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
    actionsRef.current?.setOpen(true, (0, _createBaseUIEventDetails.createBaseUIEventDetails)('trigger-press', event));
    allowMouseUpTimeout.start(LONG_PRESS_DELAY, () => {
      allowMouseUpRef.current = true;
    });
  });
  const handleContextMenu = (0, _useEventCallback.useEventCallback)(event => {
    allowMouseUpTriggerRef.current = true;
    (0, _utils.stopEvent)(event);
    handleLongPress(event.clientX, event.clientY, event.nativeEvent);
    const doc = (0, _owner.ownerDocument)(triggerRef.current);
    doc.addEventListener('mouseup', mouseEvent => {
      allowMouseUpTriggerRef.current = false;
      if (!allowMouseUpRef.current) {
        return;
      }
      allowMouseUpTimeout.clear();
      allowMouseUpRef.current = false;
      if ((0, _utils.contains)(positionerRef.current, (0, _utils.getTarget)(mouseEvent))) {
        return;
      }
      actionsRef.current?.setOpen(false, (0, _createBaseUIEventDetails.createBaseUIEventDetails)('cancel-open', mouseEvent));
    }, {
      once: true
    });
  });
  const handleTouchStart = (0, _useEventCallback.useEventCallback)(event => {
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
  const handleTouchMove = (0, _useEventCallback.useEventCallback)(event => {
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
  const handleTouchEnd = (0, _useEventCallback.useEventCallback)(() => {
    longPressTimeout.clear();
    touchPositionRef.current = null;
  });
  React.useEffect(() => {
    function handleDocumentContextMenu(event) {
      const target = (0, _utils.getTarget)(event);
      const targetElement = target;
      if ((0, _utils.contains)(triggerRef.current, targetElement) || (0, _utils.contains)(internalBackdropRef.current, targetElement) || (0, _utils.contains)(backdropRef.current, targetElement)) {
        event.preventDefault();
      }
    }
    const doc = (0, _owner.ownerDocument)(triggerRef.current);
    doc.addEventListener('contextmenu', handleDocumentContextMenu);
    return () => {
      doc.removeEventListener('contextmenu', handleDocumentContextMenu);
    };
  }, [backdropRef, internalBackdropRef]);
  const element = (0, _useRenderElement.useRenderElement)('div', componentProps, {
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
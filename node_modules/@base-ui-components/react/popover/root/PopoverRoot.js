"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PopoverRoot = PopoverRoot;
var React = _interopRequireWildcard(require("react"));
var ReactDOM = _interopRequireWildcard(require("react-dom"));
var _useTimeout = require("@base-ui-components/utils/useTimeout");
var _useControlled = require("@base-ui-components/utils/useControlled");
var _useEventCallback = require("@base-ui-components/utils/useEventCallback");
var _floatingUiReact = require("../../floating-ui-react");
var _useTransitionStatus = require("../../utils/useTransitionStatus");
var _constants = require("../utils/constants");
var _useOpenInteractionType = require("../../utils/useOpenInteractionType");
var _useOpenChangeComplete = require("../../utils/useOpenChangeComplete");
var _constants2 = require("../../utils/constants");
var _useScrollLock = require("../../utils/useScrollLock");
var _PopoverRootContext = require("./PopoverRootContext");
var _mergeProps = require("../../merge-props");
var _jsxRuntime = require("react/jsx-runtime");
function PopoverRootComponent({
  props
}) {
  const {
    open: externalOpen,
    onOpenChange,
    defaultOpen = false,
    delay = _constants.OPEN_DELAY,
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
  const stickIfOpenTimeout = (0, _useTimeout.useTimeout)();
  const nested = (0, _floatingUiReact.useFloatingParentNodeId)() != null;
  let floatingEvents;
  const [open, setOpenUnwrapped] = (0, _useControlled.useControlled)({
    controlled: externalOpen,
    default: defaultOpen,
    name: 'Popover',
    state: 'open'
  });
  const {
    mounted,
    setMounted,
    transitionStatus
  } = (0, _useTransitionStatus.useTransitionStatus)(open);
  const {
    openMethod,
    triggerProps,
    reset: resetOpenInteractionType
  } = (0, _useOpenInteractionType.useOpenInteractionType)(open);
  const handleUnmount = (0, _useEventCallback.useEventCallback)(() => {
    setMounted(false);
    setStickIfOpen(true);
    setOpenReason(null);
    onOpenChangeComplete?.(false);
    resetOpenInteractionType();
  });
  (0, _useOpenChangeComplete.useOpenChangeComplete)({
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
  const setOpen = (0, _useEventCallback.useEventCallback)((nextOpen, eventDetails) => {
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
      stickIfOpenTimeout.start(_constants2.PATIENT_CLICK_THRESHOLD, () => {
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
  const floatingContext = (0, _floatingUiReact.useFloatingRootContext)({
    elements: {
      reference: triggerElement,
      floating: positionerElement
    },
    open,
    onOpenChange: setOpen
  });
  floatingEvents = floatingContext.events;
  (0, _useScrollLock.useScrollLock)({
    enabled: open && modal === true && openReason !== 'trigger-hover' && openMethod !== 'touch',
    mounted,
    open,
    referenceElement: positionerElement
  });
  const computedRestMs = delay;
  const hover = (0, _floatingUiReact.useHover)(floatingContext, {
    enabled: openOnHover && (openMethod !== 'touch' || openReason !== 'trigger-press'),
    mouseOnly: true,
    move: false,
    handleClose: (0, _floatingUiReact.safePolygon)({
      blockPointerEvents: true
    }),
    restMs: computedRestMs,
    delay: {
      close: closeDelay
    }
  });
  const click = (0, _floatingUiReact.useClick)(floatingContext, {
    stickIfOpen
  });
  const dismiss = (0, _floatingUiReact.useDismiss)(floatingContext, {
    outsidePressEvent: {
      // Ensure `aria-hidden` on outside elements is removed immediately
      // on outside press when trapping focus.
      mouse: modal === 'trap-focus' ? 'sloppy' : 'intentional',
      touch: 'sloppy'
    }
  });
  const role = (0, _floatingUiReact.useRole)(floatingContext);
  const {
    getReferenceProps,
    getFloatingProps
  } = (0, _floatingUiReact.useInteractions)([hover, click, dismiss, role]);
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
    triggerProps: (0, _mergeProps.mergeProps)(getReferenceProps(), triggerProps),
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
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_PopoverRootContext.PopoverRootContext.Provider, {
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
function PopoverRoot(props) {
  if ((0, _PopoverRootContext.usePopoverRootContext)(true)) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(PopoverRootComponent, {
      props: props
    });
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_floatingUiReact.FloatingTree, {
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(PopoverRootComponent, {
      props: props
    })
  });
}
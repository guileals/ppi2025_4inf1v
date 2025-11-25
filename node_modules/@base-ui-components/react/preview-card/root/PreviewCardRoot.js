"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PreviewCardRoot = PreviewCardRoot;
var React = _interopRequireWildcard(require("react"));
var ReactDOM = _interopRequireWildcard(require("react-dom"));
var _useControlled = require("@base-ui-components/utils/useControlled");
var _useEventCallback = require("@base-ui-components/utils/useEventCallback");
var _floatingUiReact = require("../../floating-ui-react");
var _PreviewCardContext = require("./PreviewCardContext");
var _constants = require("../utils/constants");
var _useFocusWithDelay = require("../../utils/interactions/useFocusWithDelay");
var _useOpenChangeComplete = require("../../utils/useOpenChangeComplete");
var _useTransitionStatus = require("../../utils/useTransitionStatus");
var _jsxRuntime = require("react/jsx-runtime");
/**
 * Groups all parts of the preview card.
 * Doesn’t render its own HTML element.
 *
 * Documentation: [Base UI Preview Card](https://base-ui.com/react/components/preview-card)
 */
function PreviewCardRoot(props) {
  const {
    open: externalOpen,
    defaultOpen,
    onOpenChange: onOpenChangeProp,
    delay,
    closeDelay,
    onOpenChangeComplete,
    actionsRef
  } = props;
  const delayWithDefault = delay ?? _constants.OPEN_DELAY;
  const closeDelayWithDefault = closeDelay ?? _constants.CLOSE_DELAY;
  const [triggerElement, setTriggerElement] = React.useState(null);
  const [positionerElement, setPositionerElement] = React.useState(null);
  const [instantTypeState, setInstantTypeState] = React.useState();
  const popupRef = React.useRef(null);
  const [open, setOpenUnwrapped] = (0, _useControlled.useControlled)({
    controlled: externalOpen,
    default: defaultOpen,
    name: 'PreviewCard',
    state: 'open'
  });
  const onOpenChange = (0, _useEventCallback.useEventCallback)(onOpenChangeProp);
  const {
    mounted,
    setMounted,
    transitionStatus
  } = (0, _useTransitionStatus.useTransitionStatus)(open);
  const handleUnmount = (0, _useEventCallback.useEventCallback)(() => {
    setMounted(false);
    onOpenChangeComplete?.(false);
  });
  (0, _useOpenChangeComplete.useOpenChangeComplete)({
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
  const setOpen = (0, _useEventCallback.useEventCallback)((nextOpen, eventDetails) => {
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
  const context = (0, _floatingUiReact.useFloatingRootContext)({
    elements: {
      reference: triggerElement,
      floating: positionerElement
    },
    open,
    onOpenChange: setOpen
  });
  const instantType = instantTypeState;
  const computedRestMs = delayWithDefault;
  const hover = (0, _floatingUiReact.useHover)(context, {
    mouseOnly: true,
    move: false,
    handleClose: (0, _floatingUiReact.safePolygon)(),
    restMs: computedRestMs,
    delay: {
      close: closeDelayWithDefault
    }
  });
  const focus = (0, _useFocusWithDelay.useFocusWithDelay)(context, {
    delay: _constants.OPEN_DELAY
  });
  const dismiss = (0, _floatingUiReact.useDismiss)(context);
  const {
    getReferenceProps,
    getFloatingProps
  } = (0, _floatingUiReact.useInteractions)([hover, focus, dismiss]);
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
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_PreviewCardContext.PreviewCardRootContext.Provider, {
    value: contextValue,
    children: props.children
  });
}
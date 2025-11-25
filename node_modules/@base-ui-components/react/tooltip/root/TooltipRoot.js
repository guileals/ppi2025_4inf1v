"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TooltipRoot = TooltipRoot;
var React = _interopRequireWildcard(require("react"));
var ReactDOM = _interopRequireWildcard(require("react-dom"));
var _useControlled = require("@base-ui-components/utils/useControlled");
var _useEventCallback = require("@base-ui-components/utils/useEventCallback");
var _TooltipRootContext = require("./TooltipRootContext");
var _floatingUiReact = require("../../floating-ui-react");
var _useTransitionStatus = require("../../utils/useTransitionStatus");
var _constants = require("../utils/constants");
var _useOpenChangeComplete = require("../../utils/useOpenChangeComplete");
var _TooltipProviderContext = require("../provider/TooltipProviderContext");
var _createBaseUIEventDetails = require("../../utils/createBaseUIEventDetails");
var _jsxRuntime = require("react/jsx-runtime");
/**
 * Groups all parts of the tooltip.
 * Doesn’t render its own HTML element.
 *
 * Documentation: [Base UI Tooltip](https://base-ui.com/react/components/tooltip)
 */
function TooltipRoot(props) {
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
  const delayWithDefault = delay ?? _constants.OPEN_DELAY;
  const closeDelayWithDefault = closeDelay ?? 0;
  const [triggerElement, setTriggerElement] = React.useState(null);
  const [positionerElement, setPositionerElement] = React.useState(null);
  const [instantTypeState, setInstantTypeState] = React.useState();
  const popupRef = React.useRef(null);
  const [openState, setOpenState] = (0, _useControlled.useControlled)({
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
  const setOpen = (0, _useEventCallback.useEventCallback)(setOpenUnwrapped);
  if (openState && disabled) {
    setOpenUnwrapped(false, (0, _createBaseUIEventDetails.createBaseUIEventDetails)('disabled'));
  }
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
  const floatingRootContext = (0, _floatingUiReact.useFloatingRootContext)({
    elements: {
      reference: triggerElement,
      floating: positionerElement
    },
    open,
    onOpenChange: setOpen
  });
  const providerContext = (0, _TooltipProviderContext.useTooltipProviderContext)();
  const {
    delayRef,
    isInstantPhase,
    hasProvider
  } = (0, _floatingUiReact.useDelayGroup)(floatingRootContext);
  const instantType = isInstantPhase ? 'delay' : instantTypeState;
  const hover = (0, _floatingUiReact.useHover)(floatingRootContext, {
    enabled: !disabled,
    mouseOnly: true,
    move: false,
    handleClose: hoverable && trackCursorAxis !== 'both' ? (0, _floatingUiReact.safePolygon)() : null,
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
  const focus = (0, _floatingUiReact.useFocus)(floatingRootContext, {
    enabled: !disabled
  });
  const dismiss = (0, _floatingUiReact.useDismiss)(floatingRootContext, {
    enabled: !disabled,
    referencePress: true
  });
  const clientPoint = (0, _floatingUiReact.useClientPoint)(floatingRootContext, {
    enabled: !disabled && trackCursorAxis !== 'none',
    axis: trackCursorAxis === 'none' ? undefined : trackCursorAxis
  });
  const {
    getReferenceProps,
    getFloatingProps
  } = (0, _floatingUiReact.useInteractions)([hover, focus, dismiss, clientPoint]);
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
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_TooltipRootContext.TooltipRootContext.Provider, {
    value: contextValue,
    children: props.children
  });
}
"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectPositioner = void 0;
var React = _interopRequireWildcard(require("react"));
var _inertValue = require("@base-ui-components/utils/inertValue");
var _useIsoLayoutEffect = require("@base-ui-components/utils/useIsoLayoutEffect");
var _useEventCallback = require("@base-ui-components/utils/useEventCallback");
var _store = require("@base-ui-components/utils/store");
var _SelectRootContext = require("../root/SelectRootContext");
var _CompositeList = require("../../composite/list/CompositeList");
var _popupStateMapping = require("../../utils/popupStateMapping");
var _useAnchorPositioning = require("../../utils/useAnchorPositioning");
var _SelectPositionerContext = require("./SelectPositionerContext");
var _InternalBackdrop = require("../../utils/InternalBackdrop");
var _useRenderElement = require("../../utils/useRenderElement");
var _constants = require("../../utils/constants");
var _utils = require("../popup/utils");
var _store2 = require("../store");
var _useScrollLock = require("../../utils/useScrollLock");
var _createBaseUIEventDetails = require("../../utils/createBaseUIEventDetails");
var _jsxRuntime = require("react/jsx-runtime");
const FIXED = {
  position: 'fixed'
};

/**
 * Positions the select menu popup.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Select](https://base-ui.com/react/components/select)
 */
const SelectPositioner = exports.SelectPositioner = /*#__PURE__*/React.forwardRef(function SelectPositioner(componentProps, forwardedRef) {
  const {
    anchor,
    positionMethod = 'absolute',
    className,
    render,
    side = 'bottom',
    align = 'center',
    sideOffset = 0,
    alignOffset = 0,
    collisionBoundary = 'clipping-ancestors',
    collisionPadding,
    arrowPadding = 5,
    sticky = false,
    trackAnchor = true,
    alignItemWithTrigger = true,
    collisionAvoidance = _constants.DROPDOWN_COLLISION_AVOIDANCE,
    ...elementProps
  } = componentProps;
  const {
    store,
    listRef,
    labelsRef,
    alignItemWithTriggerActiveRef,
    valuesRef,
    initialValueRef,
    setValue
  } = (0, _SelectRootContext.useSelectRootContext)();
  const floatingRootContext = (0, _SelectRootContext.useSelectFloatingContext)();
  const open = (0, _store.useStore)(store, _store2.selectors.open);
  const mounted = (0, _store.useStore)(store, _store2.selectors.mounted);
  const modal = (0, _store.useStore)(store, _store2.selectors.modal);
  const value = (0, _store.useStore)(store, _store2.selectors.value);
  const touchModality = (0, _store.useStore)(store, _store2.selectors.touchModality);
  const positionerElement = (0, _store.useStore)(store, _store2.selectors.positionerElement);
  const triggerElement = (0, _store.useStore)(store, _store2.selectors.triggerElement);
  const scrollUpArrowRef = React.useRef(null);
  const scrollDownArrowRef = React.useRef(null);
  const [controlledAlignItemWithTrigger, setControlledAlignItemWithTrigger] = React.useState(alignItemWithTrigger);
  const alignItemWithTriggerActive = mounted && controlledAlignItemWithTrigger && !touchModality;
  if (!mounted && controlledAlignItemWithTrigger !== alignItemWithTrigger) {
    setControlledAlignItemWithTrigger(alignItemWithTrigger);
  }
  (0, _useIsoLayoutEffect.useIsoLayoutEffect)(() => {
    if (!mounted) {
      if (_store2.selectors.scrollUpArrowVisible(store.state)) {
        store.set('scrollUpArrowVisible', false);
      }
      if (_store2.selectors.scrollDownArrowVisible(store.state)) {
        store.set('scrollDownArrowVisible', false);
      }
    }
  }, [store, mounted]);
  React.useImperativeHandle(alignItemWithTriggerActiveRef, () => alignItemWithTriggerActive);
  (0, _useScrollLock.useScrollLock)({
    enabled: (alignItemWithTriggerActive || modal) && open && !touchModality,
    mounted,
    open,
    referenceElement: triggerElement
  });
  const positioning = (0, _useAnchorPositioning.useAnchorPositioning)({
    anchor,
    floatingRootContext,
    positionMethod,
    mounted,
    side,
    sideOffset,
    align,
    alignOffset,
    arrowPadding,
    collisionBoundary,
    collisionPadding,
    sticky,
    trackAnchor: trackAnchor ?? !alignItemWithTriggerActive,
    collisionAvoidance,
    keepMounted: true
  });
  const renderedSide = alignItemWithTriggerActive ? 'none' : positioning.side;
  const positionerStyles = alignItemWithTriggerActive ? FIXED : positioning.positionerStyles;
  const defaultProps = React.useMemo(() => {
    const hiddenStyles = {};
    if (!open) {
      hiddenStyles.pointerEvents = 'none';
    }
    return {
      role: 'presentation',
      hidden: !mounted,
      style: {
        ...positionerStyles,
        ...hiddenStyles
      }
    };
  }, [open, mounted, positionerStyles]);
  const state = React.useMemo(() => ({
    open,
    side: renderedSide,
    align: positioning.align,
    anchorHidden: positioning.anchorHidden
  }), [open, renderedSide, positioning.align, positioning.anchorHidden]);
  const setPositionerElement = (0, _useEventCallback.useEventCallback)(element => {
    store.set('positionerElement', element);
  });
  const element = (0, _useRenderElement.useRenderElement)('div', componentProps, {
    ref: [forwardedRef, setPositionerElement],
    state,
    customStyleHookMapping: _popupStateMapping.popupStateMapping,
    props: [defaultProps, elementProps]
  });
  const prevMapSizeRef = React.useRef(0);
  const onMapChange = (0, _useEventCallback.useEventCallback)(map => {
    if (map.size === 0 && prevMapSizeRef.current === 0) {
      return;
    }
    if (valuesRef.current.length === 0) {
      return;
    }
    const prevSize = prevMapSizeRef.current;
    prevMapSizeRef.current = map.size;
    if (map.size === prevSize) {
      return;
    }
    const eventDetails = (0, _createBaseUIEventDetails.createBaseUIEventDetails)('none');
    if (prevSize !== 0 && !store.state.multiple && value !== null) {
      const valueIndex = valuesRef.current.indexOf(value);
      if (valueIndex === -1) {
        const initial = initialValueRef.current;
        const hasInitial = initial != null && valuesRef.current.includes(initial);
        const nextValue = hasInitial ? initial : null;
        setValue(nextValue, eventDetails);
      }
    }
    if (prevSize !== 0 && store.state.multiple && Array.isArray(value)) {
      const nextValue = value.filter(v => valuesRef.current.includes(v));
      if (nextValue.length !== value.length || nextValue.some(v => !value.includes(v))) {
        setValue(nextValue, eventDetails);
      }
    }
    if (open && alignItemWithTriggerActive) {
      store.apply({
        scrollUpArrowVisible: false,
        scrollDownArrowVisible: false
      });
      if (positionerElement) {
        (0, _utils.clearPositionerStyles)(positionerElement, {
          height: ''
        });
      }
    }
  });
  const contextValue = React.useMemo(() => ({
    ...positioning,
    side: renderedSide,
    alignItemWithTriggerActive,
    setControlledAlignItemWithTrigger,
    scrollUpArrowRef,
    scrollDownArrowRef
  }), [positioning, renderedSide, alignItemWithTriggerActive, setControlledAlignItemWithTrigger]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_CompositeList.CompositeList, {
    elementsRef: listRef,
    labelsRef: labelsRef,
    onMapChange: onMapChange,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_SelectPositionerContext.SelectPositionerContext.Provider, {
      value: contextValue,
      children: [mounted && modal && /*#__PURE__*/(0, _jsxRuntime.jsx)(_InternalBackdrop.InternalBackdrop, {
        inert: (0, _inertValue.inertValue)(!open),
        cutout: triggerElement
      }), element]
    })
  });
});
if (process.env.NODE_ENV !== "production") SelectPositioner.displayName = "SelectPositioner";
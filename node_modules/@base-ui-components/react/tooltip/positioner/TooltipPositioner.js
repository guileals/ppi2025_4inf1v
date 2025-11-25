"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TooltipPositioner = void 0;
var React = _interopRequireWildcard(require("react"));
var _TooltipRootContext = require("../root/TooltipRootContext");
var _TooltipPositionerContext = require("./TooltipPositionerContext");
var _useAnchorPositioning = require("../../utils/useAnchorPositioning");
var _popupStateMapping = require("../../utils/popupStateMapping");
var _TooltipPortalContext = require("../portal/TooltipPortalContext");
var _useRenderElement = require("../../utils/useRenderElement");
var _constants = require("../../utils/constants");
var _jsxRuntime = require("react/jsx-runtime");
/**
 * Positions the tooltip against the trigger.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Tooltip](https://base-ui.com/react/components/tooltip)
 */
const TooltipPositioner = exports.TooltipPositioner = /*#__PURE__*/React.forwardRef(function TooltipPositioner(componentProps, forwardedRef) {
  const {
    render,
    className,
    anchor,
    positionMethod = 'absolute',
    side = 'top',
    align = 'center',
    sideOffset = 0,
    alignOffset = 0,
    collisionBoundary = 'clipping-ancestors',
    collisionPadding = 5,
    arrowPadding = 5,
    sticky = false,
    trackAnchor = true,
    collisionAvoidance = _constants.POPUP_COLLISION_AVOIDANCE,
    ...elementProps
  } = componentProps;
  const {
    open,
    setPositionerElement,
    mounted,
    floatingRootContext,
    trackCursorAxis,
    hoverable
  } = (0, _TooltipRootContext.useTooltipRootContext)();
  const keepMounted = (0, _TooltipPortalContext.useTooltipPortalContext)();
  const positioning = (0, _useAnchorPositioning.useAnchorPositioning)({
    anchor,
    positionMethod,
    floatingRootContext,
    mounted,
    side,
    sideOffset,
    align,
    alignOffset,
    collisionBoundary,
    collisionPadding,
    sticky,
    arrowPadding,
    trackAnchor,
    keepMounted,
    collisionAvoidance
  });
  const defaultProps = React.useMemo(() => {
    const hiddenStyles = {};
    if (!open || trackCursorAxis === 'both' || !hoverable) {
      hiddenStyles.pointerEvents = 'none';
    }
    return {
      role: 'presentation',
      hidden: !mounted,
      style: {
        ...positioning.positionerStyles,
        ...hiddenStyles
      }
    };
  }, [open, trackCursorAxis, hoverable, mounted, positioning.positionerStyles]);
  const positioner = React.useMemo(() => ({
    props: defaultProps,
    ...positioning
  }), [defaultProps, positioning]);
  const state = React.useMemo(() => ({
    open,
    side: positioner.side,
    align: positioner.align,
    anchorHidden: positioner.anchorHidden
  }), [open, positioner.side, positioner.align, positioner.anchorHidden]);
  const contextValue = React.useMemo(() => ({
    ...state,
    arrowRef: positioner.arrowRef,
    arrowStyles: positioner.arrowStyles,
    arrowUncentered: positioner.arrowUncentered
  }), [state, positioner.arrowRef, positioner.arrowStyles, positioner.arrowUncentered]);
  const element = (0, _useRenderElement.useRenderElement)('div', componentProps, {
    state,
    props: [positioner.props, elementProps],
    ref: [forwardedRef, setPositionerElement],
    customStyleHookMapping: _popupStateMapping.popupStateMapping
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_TooltipPositionerContext.TooltipPositionerContext.Provider, {
    value: contextValue,
    children: element
  });
});
if (process.env.NODE_ENV !== "production") TooltipPositioner.displayName = "TooltipPositioner";
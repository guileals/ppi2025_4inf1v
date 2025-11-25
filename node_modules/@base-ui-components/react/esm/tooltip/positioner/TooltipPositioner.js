'use client';

import * as React from 'react';
import { useTooltipRootContext } from "../root/TooltipRootContext.js";
import { TooltipPositionerContext } from "./TooltipPositionerContext.js";
import { useAnchorPositioning } from "../../utils/useAnchorPositioning.js";
import { popupStateMapping } from "../../utils/popupStateMapping.js";
import { useTooltipPortalContext } from "../portal/TooltipPortalContext.js";
import { useRenderElement } from "../../utils/useRenderElement.js";
import { POPUP_COLLISION_AVOIDANCE } from "../../utils/constants.js";

/**
 * Positions the tooltip against the trigger.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Tooltip](https://base-ui.com/react/components/tooltip)
 */
import { jsx as _jsx } from "react/jsx-runtime";
export const TooltipPositioner = /*#__PURE__*/React.forwardRef(function TooltipPositioner(componentProps, forwardedRef) {
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
    collisionAvoidance = POPUP_COLLISION_AVOIDANCE,
    ...elementProps
  } = componentProps;
  const {
    open,
    setPositionerElement,
    mounted,
    floatingRootContext,
    trackCursorAxis,
    hoverable
  } = useTooltipRootContext();
  const keepMounted = useTooltipPortalContext();
  const positioning = useAnchorPositioning({
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
  const element = useRenderElement('div', componentProps, {
    state,
    props: [positioner.props, elementProps],
    ref: [forwardedRef, setPositionerElement],
    customStyleHookMapping: popupStateMapping
  });
  return /*#__PURE__*/_jsx(TooltipPositionerContext.Provider, {
    value: contextValue,
    children: element
  });
});
if (process.env.NODE_ENV !== "production") TooltipPositioner.displayName = "TooltipPositioner";
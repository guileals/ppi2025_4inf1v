'use client';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { getSide } from '@floating-ui/utils';
import { ownerDocument, ownerWindow } from '@base-ui-components/utils/owner';
import { useTimeout } from '@base-ui-components/utils/useTimeout';
import { disableFocusInside, enableFocusInside, isOutsideEvent } from "../../floating-ui-react/utils.js";
import { useRenderElement } from "../../utils/useRenderElement.js";
import { useNavigationMenuRootContext, useNavigationMenuTreeContext } from "../root/NavigationMenuRootContext.js";
import { useNavigationMenuPortalContext } from "../portal/NavigationMenuPortalContext.js";
import { useAnchorPositioning } from "../../utils/useAnchorPositioning.js";
import { NavigationMenuPositionerContext } from "./NavigationMenuPositionerContext.js";
import { popupStateMapping } from "../../utils/popupStateMapping.js";
import { DROPDOWN_COLLISION_AVOIDANCE, POPUP_COLLISION_AVOIDANCE } from "../../utils/constants.js";
import { jsx as _jsx } from "react/jsx-runtime";
const adaptiveOrigin = {
  name: 'adaptiveOrigin',
  async fn(state) {
    const {
      x: rawX,
      y: rawY,
      rects: {
        floating: floatRect
      },
      elements: {
        floating
      },
      platform,
      strategy,
      placement
    } = state;
    const win = floating.ownerDocument.defaultView;
    const offsetParent = await platform.getOffsetParent?.(floating);
    let offsetDimensions = {
      width: 0,
      height: 0
    };

    // For fixed strategy, prefer visualViewport if available
    if (strategy === 'fixed' && win?.visualViewport) {
      offsetDimensions = {
        width: win.visualViewport.width,
        height: win.visualViewport.height
      };
    } else if (offsetParent === win) {
      const doc = ownerDocument(floating);
      offsetDimensions = {
        width: doc.documentElement.clientWidth,
        height: doc.documentElement.clientHeight
      };
    } else if (await platform.isElement?.(offsetParent)) {
      offsetDimensions = await platform.getDimensions(offsetParent);
    }
    const currentSide = getSide(placement);
    let x = rawX;
    let y = rawY;
    if (currentSide === 'left') {
      x = offsetDimensions.width - (rawX + floatRect.width);
    }
    if (currentSide === 'top') {
      y = offsetDimensions.height - (rawY + floatRect.height);
    }
    const sideX = currentSide === 'left' ? 'right' : 'left';
    const sideY = currentSide === 'top' ? 'bottom' : 'top';
    return {
      x,
      y,
      data: {
        sideX,
        sideY
      }
    };
  }
};

/**
 * Positions the navigation menu against the currently active trigger.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Navigation Menu](https://base-ui.com/react/components/navigation-menu)
 */
export const NavigationMenuPositioner = /*#__PURE__*/React.forwardRef(function NavigationMenuPositioner(componentProps, forwardedRef) {
  const {
    open,
    mounted,
    positionerElement,
    setPositionerElement,
    floatingRootContext,
    nested
  } = useNavigationMenuRootContext();
  const {
    className,
    render,
    anchor,
    positionMethod = 'absolute',
    side = 'bottom',
    align = 'center',
    sideOffset = 0,
    alignOffset = 0,
    collisionBoundary = 'clipping-ancestors',
    collisionPadding = 5,
    collisionAvoidance = nested ? POPUP_COLLISION_AVOIDANCE : DROPDOWN_COLLISION_AVOIDANCE,
    arrowPadding = 5,
    sticky = false,
    trackAnchor = true,
    ...elementProps
  } = componentProps;
  const keepMounted = useNavigationMenuPortalContext();
  const nodeId = useNavigationMenuTreeContext();
  const resizeTimeout = useTimeout();
  const [instant, setInstant] = React.useState(false);
  const positionerRef = React.useRef(null);
  const prevTriggerElementRef = React.useRef(null);

  // https://codesandbox.io/s/tabbable-portal-f4tng?file=/src/TabbablePortal.tsx
  React.useEffect(() => {
    if (!positionerElement) {
      return undefined;
    }

    // Make sure elements inside the portal element are tabbable only when the
    // portal has already been focused, either by tabbing into a focus trap
    // element outside or using the mouse.
    function onFocus(event) {
      if (positionerElement && isOutsideEvent(event)) {
        const focusing = event.type === 'focusin';
        const manageFocus = focusing ? enableFocusInside : disableFocusInside;
        manageFocus(positionerElement);
      }
    }

    // Listen to the event on the capture phase so they run before the focus
    // trap elements onFocus prop is called.
    positionerElement.addEventListener('focusin', onFocus, true);
    positionerElement.addEventListener('focusout', onFocus, true);
    return () => {
      positionerElement.removeEventListener('focusin', onFocus, true);
      positionerElement.removeEventListener('focusout', onFocus, true);
    };
  }, [positionerElement]);
  const positioning = useAnchorPositioning({
    anchor: anchor ?? floatingRootContext?.elements.domReference ?? prevTriggerElementRef,
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
    trackAnchor,
    keepMounted,
    floatingRootContext,
    collisionAvoidance,
    nodeId,
    // Allows the menu to remain anchored without wobbling while its size
    // and position transition simultaneously when side=top or side=left.
    adaptiveOrigin
  });
  const defaultProps = React.useMemo(() => {
    const hiddenStyles = {};
    if (!open) {
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
  }, [open, mounted, positioning.positionerStyles]);
  const state = React.useMemo(() => ({
    open,
    side: positioning.side,
    align: positioning.align,
    anchorHidden: positioning.anchorHidden,
    instant
  }), [open, positioning.side, positioning.align, positioning.anchorHidden, instant]);
  React.useEffect(() => {
    if (!open) {
      return undefined;
    }
    function handleResize() {
      ReactDOM.flushSync(() => {
        setInstant(true);
      });
      resizeTimeout.start(100, () => {
        setInstant(false);
      });
    }
    const win = ownerWindow(positionerElement);
    win.addEventListener('resize', handleResize);
    return () => {
      win.removeEventListener('resize', handleResize);
    };
  }, [open, resizeTimeout, positionerElement]);
  const element = useRenderElement('div', componentProps, {
    state,
    ref: [forwardedRef, setPositionerElement, positionerRef],
    props: [defaultProps, elementProps],
    customStyleHookMapping: popupStateMapping
  });
  return /*#__PURE__*/_jsx(NavigationMenuPositionerContext.Provider, {
    value: positioning,
    children: element
  });
});
if (process.env.NODE_ENV !== "production") NavigationMenuPositioner.displayName = "NavigationMenuPositioner";
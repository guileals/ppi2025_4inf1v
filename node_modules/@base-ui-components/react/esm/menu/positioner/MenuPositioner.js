'use client';

import * as React from 'react';
import { inertValue } from '@base-ui-components/utils/inertValue';
import { FloatingNode, useFloatingNodeId, useFloatingParentNodeId, useFloatingTree } from "../../floating-ui-react/index.js";
import { MenuPositionerContext } from "./MenuPositionerContext.js";
import { useMenuRootContext } from "../root/MenuRootContext.js";
import { useAnchorPositioning } from "../../utils/useAnchorPositioning.js";
import { useRenderElement } from "../../utils/useRenderElement.js";
import { popupStateMapping } from "../../utils/popupStateMapping.js";
import { CompositeList } from "../../composite/list/CompositeList.js";
import { InternalBackdrop } from "../../utils/InternalBackdrop.js";
import { useMenuPortalContext } from "../portal/MenuPortalContext.js";
import { DROPDOWN_COLLISION_AVOIDANCE } from "../../utils/constants.js";
import { useContextMenuRootContext } from "../../context-menu/root/ContextMenuRootContext.js";
import { createBaseUIEventDetails } from "../../utils/createBaseUIEventDetails.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Positions the menu popup against the trigger.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Menu](https://base-ui.com/react/components/menu)
 */
export const MenuPositioner = /*#__PURE__*/React.forwardRef(function MenuPositioner(componentProps, forwardedRef) {
  const {
    anchor: anchorProp,
    positionMethod: positionMethodProp = 'absolute',
    className,
    render,
    side,
    align: alignProp,
    sideOffset: sideOffsetProp = 0,
    alignOffset: alignOffsetProp = 0,
    collisionBoundary = 'clipping-ancestors',
    collisionPadding = 5,
    arrowPadding = 5,
    sticky = false,
    trackAnchor = true,
    collisionAvoidance = DROPDOWN_COLLISION_AVOIDANCE,
    ...elementProps
  } = componentProps;
  const {
    open,
    setOpen,
    floatingRootContext,
    setPositionerElement,
    itemDomElements,
    itemLabels,
    mounted,
    modal,
    lastOpenChangeReason,
    parent,
    setHoverEnabled,
    triggerElement
  } = useMenuRootContext();
  const keepMounted = useMenuPortalContext();
  const nodeId = useFloatingNodeId();
  const parentNodeId = useFloatingParentNodeId();
  const contextMenuContext = useContextMenuRootContext(true);
  let anchor = anchorProp;
  let sideOffset = sideOffsetProp;
  let alignOffset = alignOffsetProp;
  let align = alignProp;
  if (parent.type === 'context-menu') {
    anchor = parent.context?.anchor ?? anchorProp;
    align = align ?? 'start';
    if (!side && align !== 'center') {
      alignOffset = componentProps.alignOffset ?? 2;
      sideOffset = componentProps.sideOffset ?? -5;
    }
  }
  let computedSide = side;
  let computedAlign = align;
  if (parent.type === 'menu') {
    computedSide = computedSide ?? 'inline-end';
    computedAlign = computedAlign ?? 'start';
  } else if (parent.type === 'menubar') {
    computedSide = computedSide ?? 'bottom';
    computedAlign = computedAlign ?? 'start';
  }
  const contextMenu = parent.type === 'context-menu';
  const positioner = useAnchorPositioning({
    anchor,
    floatingRootContext,
    positionMethod: contextMenuContext ? 'fixed' : positionMethodProp,
    mounted,
    side: computedSide,
    sideOffset,
    align: computedAlign,
    alignOffset,
    arrowPadding: contextMenu ? 0 : arrowPadding,
    collisionBoundary,
    collisionPadding,
    sticky,
    nodeId,
    keepMounted,
    trackAnchor,
    collisionAvoidance,
    shiftCrossAxis: contextMenu
  });
  const {
    events: menuEvents
  } = useFloatingTree();
  const positionerProps = React.useMemo(() => {
    const hiddenStyles = {};
    if (!open) {
      hiddenStyles.pointerEvents = 'none';
    }
    return {
      role: 'presentation',
      hidden: !mounted,
      style: {
        ...positioner.positionerStyles,
        ...hiddenStyles
      }
    };
  }, [open, mounted, positioner.positionerStyles]);
  React.useEffect(() => {
    function onMenuOpenChange(details) {
      if (details.open) {
        if (details.parentNodeId === nodeId) {
          setHoverEnabled(false);
        }
        if (details.nodeId !== nodeId && details.parentNodeId === parentNodeId) {
          setOpen(false, createBaseUIEventDetails('sibling-open'));
        }
      } else if (details.parentNodeId === nodeId) {
        // Re-enable hover on the parent when a child closes, except when the child
        // closed due to hovering a different sibling item in this parent (sibling-open).
        // Keeping hover disabled in that scenario prevents the parent from closing
        // immediately when the pointer then leaves it.
        if (details.reason !== 'sibling-open') {
          setHoverEnabled(true);
        }
      }
    }
    menuEvents.on('menuopenchange', onMenuOpenChange);
    return () => {
      menuEvents.off('menuopenchange', onMenuOpenChange);
    };
  }, [menuEvents, nodeId, parentNodeId, setOpen, setHoverEnabled]);

  // Close unrelated child submenus when hovering a different item in the parent menu.
  React.useEffect(() => {
    function onItemHover(event) {
      // If an item within our parent menu is hovered, and this menu's trigger is not that item,
      // close this submenu. This ensures hovering a different item in the parent closes other branches.
      if (!open || event.nodeId !== parentNodeId) {
        return;
      }
      if (triggerElement && event.target && triggerElement !== event.target) {
        setOpen(false, createBaseUIEventDetails('sibling-open'));
      }
    }
    menuEvents.on('itemhover', onItemHover);
    return () => {
      menuEvents.off('itemhover', onItemHover);
    };
  }, [menuEvents, parentNodeId, triggerElement, open, setOpen]);
  React.useEffect(() => {
    const eventDetails = {
      open,
      nodeId,
      parentNodeId,
      reason: lastOpenChangeReason
    };
    menuEvents.emit('menuopenchange', eventDetails);
  }, [menuEvents, open, nodeId, parentNodeId, lastOpenChangeReason]);
  const state = React.useMemo(() => ({
    open,
    side: positioner.side,
    align: positioner.align,
    anchorHidden: positioner.anchorHidden,
    nested: parent.type === 'menu'
  }), [open, positioner.side, positioner.align, positioner.anchorHidden, parent.type]);
  const contextValue = React.useMemo(() => ({
    side: positioner.side,
    align: positioner.align,
    arrowRef: positioner.arrowRef,
    arrowUncentered: positioner.arrowUncentered,
    arrowStyles: positioner.arrowStyles,
    floatingContext: positioner.context
  }), [positioner.side, positioner.align, positioner.arrowRef, positioner.arrowUncentered, positioner.arrowStyles, positioner.context]);
  const element = useRenderElement('div', componentProps, {
    state,
    customStyleHookMapping: popupStateMapping,
    ref: [forwardedRef, setPositionerElement],
    props: {
      ...positionerProps,
      ...elementProps
    }
  });
  const shouldRenderBackdrop = mounted && parent.type !== 'menu' && (parent.type !== 'menubar' && modal && lastOpenChangeReason !== 'trigger-hover' || parent.type === 'menubar' && parent.context.modal);

  // cuts a hole in the backdrop to allow pointer interaction with the menubar or dropdown menu trigger element
  let backdropCutout = null;
  if (parent.type === 'menubar') {
    backdropCutout = parent.context.contentElement;
  } else if (parent.type === undefined) {
    backdropCutout = triggerElement;
  }
  return /*#__PURE__*/_jsxs(MenuPositionerContext.Provider, {
    value: contextValue,
    children: [shouldRenderBackdrop && /*#__PURE__*/_jsx(InternalBackdrop, {
      ref: parent.type === 'context-menu' || parent.type === 'nested-context-menu' ? parent.context.internalBackdropRef : null,
      inert: inertValue(!open),
      cutout: backdropCutout
    }), /*#__PURE__*/_jsx(FloatingNode, {
      id: nodeId,
      children: /*#__PURE__*/_jsx(CompositeList, {
        elementsRef: itemDomElements,
        labelsRef: itemLabels,
        children: element
      })
    })]
  });
});
if (process.env.NODE_ENV !== "production") MenuPositioner.displayName = "MenuPositioner";
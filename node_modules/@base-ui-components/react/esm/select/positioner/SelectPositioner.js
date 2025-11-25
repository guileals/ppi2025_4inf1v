'use client';

import * as React from 'react';
import { inertValue } from '@base-ui-components/utils/inertValue';
import { useIsoLayoutEffect } from '@base-ui-components/utils/useIsoLayoutEffect';
import { useEventCallback } from '@base-ui-components/utils/useEventCallback';
import { useStore } from '@base-ui-components/utils/store';
import { useSelectRootContext, useSelectFloatingContext } from "../root/SelectRootContext.js";
import { CompositeList } from "../../composite/list/CompositeList.js";
import { popupStateMapping } from "../../utils/popupStateMapping.js";
import { useAnchorPositioning } from "../../utils/useAnchorPositioning.js";
import { SelectPositionerContext } from "./SelectPositionerContext.js";
import { InternalBackdrop } from "../../utils/InternalBackdrop.js";
import { useRenderElement } from "../../utils/useRenderElement.js";
import { DROPDOWN_COLLISION_AVOIDANCE } from "../../utils/constants.js";
import { clearPositionerStyles } from "../popup/utils.js";
import { selectors } from "../store.js";
import { useScrollLock } from "../../utils/useScrollLock.js";
import { createBaseUIEventDetails } from "../../utils/createBaseUIEventDetails.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const FIXED = {
  position: 'fixed'
};

/**
 * Positions the select menu popup.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Select](https://base-ui.com/react/components/select)
 */
export const SelectPositioner = /*#__PURE__*/React.forwardRef(function SelectPositioner(componentProps, forwardedRef) {
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
    collisionAvoidance = DROPDOWN_COLLISION_AVOIDANCE,
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
  } = useSelectRootContext();
  const floatingRootContext = useSelectFloatingContext();
  const open = useStore(store, selectors.open);
  const mounted = useStore(store, selectors.mounted);
  const modal = useStore(store, selectors.modal);
  const value = useStore(store, selectors.value);
  const touchModality = useStore(store, selectors.touchModality);
  const positionerElement = useStore(store, selectors.positionerElement);
  const triggerElement = useStore(store, selectors.triggerElement);
  const scrollUpArrowRef = React.useRef(null);
  const scrollDownArrowRef = React.useRef(null);
  const [controlledAlignItemWithTrigger, setControlledAlignItemWithTrigger] = React.useState(alignItemWithTrigger);
  const alignItemWithTriggerActive = mounted && controlledAlignItemWithTrigger && !touchModality;
  if (!mounted && controlledAlignItemWithTrigger !== alignItemWithTrigger) {
    setControlledAlignItemWithTrigger(alignItemWithTrigger);
  }
  useIsoLayoutEffect(() => {
    if (!mounted) {
      if (selectors.scrollUpArrowVisible(store.state)) {
        store.set('scrollUpArrowVisible', false);
      }
      if (selectors.scrollDownArrowVisible(store.state)) {
        store.set('scrollDownArrowVisible', false);
      }
    }
  }, [store, mounted]);
  React.useImperativeHandle(alignItemWithTriggerActiveRef, () => alignItemWithTriggerActive);
  useScrollLock({
    enabled: (alignItemWithTriggerActive || modal) && open && !touchModality,
    mounted,
    open,
    referenceElement: triggerElement
  });
  const positioning = useAnchorPositioning({
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
  const setPositionerElement = useEventCallback(element => {
    store.set('positionerElement', element);
  });
  const element = useRenderElement('div', componentProps, {
    ref: [forwardedRef, setPositionerElement],
    state,
    customStyleHookMapping: popupStateMapping,
    props: [defaultProps, elementProps]
  });
  const prevMapSizeRef = React.useRef(0);
  const onMapChange = useEventCallback(map => {
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
    const eventDetails = createBaseUIEventDetails('none');
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
        clearPositionerStyles(positionerElement, {
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
  return /*#__PURE__*/_jsx(CompositeList, {
    elementsRef: listRef,
    labelsRef: labelsRef,
    onMapChange: onMapChange,
    children: /*#__PURE__*/_jsxs(SelectPositionerContext.Provider, {
      value: contextValue,
      children: [mounted && modal && /*#__PURE__*/_jsx(InternalBackdrop, {
        inert: inertValue(!open),
        cutout: triggerElement
      }), element]
    })
  });
});
if (process.env.NODE_ENV !== "production") SelectPositioner.displayName = "SelectPositioner";